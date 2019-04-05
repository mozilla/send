package org.mozilla.firefoxsend

import android.annotation.SuppressLint
import android.content.ComponentName
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Base64
import android.util.Log
import android.view.View
import android.webkit.*
import im.delight.android.webview.AdvancedWebView
import kotlinx.android.synthetic.main.activity_main.*
import mozilla.components.service.fxa.Config
import mozilla.components.service.fxa.FirefoxAccount
import mozilla.components.service.fxa.FxaResult
import org.json.JSONObject

internal class LoggingWebChromeClient : WebChromeClient() {
    override fun onConsoleMessage(cm: ConsoleMessage): Boolean {
        Log.d(TAG, String.format("%s @ %d: %s",
                cm.message(), cm.lineNumber(), cm.sourceId()))
        return true
    }

    companion object {
        private const val TAG = "CONTENT"
    }
}

class WebAppInterface(private val mContext: MainActivity) {
    @JavascriptInterface
    fun beginOAuthFlow() {
        mContext.beginOAuthFlow()
    }

    @JavascriptInterface
    fun shareUrl(url: String) {
        mContext.shareUrl(url)
    }
}

class MainActivity : AppCompatActivity(), AdvancedWebView.Listener {

    private var mToShare: String? = null
    private var mToCall: String? = null
    private var mAccount: FirefoxAccount? = null

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG)
        webView.apply {
            setListener(this@MainActivity, this@MainActivity)
            addJavascriptInterface(WebAppInterface(this@MainActivity), JS_INTERFACE_NAME)
            setLayerType(View.LAYER_TYPE_HARDWARE, null)
            webChromeClient = LoggingWebChromeClient()

            settings.apply {
                userAgentString = "Send Android"
                allowUniversalAccessFromFileURLs = true
                javaScriptEnabled = true
            }
        }

        val type = intent.type
        if (Intent.ACTION_SEND == intent.action && type != null) {
            if (type == "text/plain") {
                val sharedText = intent.getStringExtra(Intent.EXTRA_TEXT)
                // Log.d(TAG_INTENT, "text/plain $sharedText")
                mToShare = "data:text/plain;base64," + Base64.encodeToString(sharedText.toByteArray(), 16).trim()
            } else if (type.startsWith("image/")) {
                val imageUri = intent.getParcelableExtra(Intent.EXTRA_STREAM) as Uri
                // Log.d(TAG_INTENT, "image/ $imageUri")
                mToShare = "data:text/plain;base64," + Base64.encodeToString(imageUri.path.toByteArray(), 16).trim()
            }
        }
        webView.loadUrl("file:///android_asset/android.html")
    }

    fun beginOAuthFlow() {
        Config.release().then { value ->
            mAccount = FirefoxAccount(value, "20f7931c9054d833", "https://send.firefox.com/fxa/android-redirect.html")
            mAccount?.beginOAuthFlow(arrayOf("profile", "https://identity.mozilla.com/apps/send"), true)
                    ?.then { url ->
                        // Log.d(TAG_CONFIG, "GOT A URL $url")
                        this@MainActivity.runOnUiThread {
                            webView.loadUrl(url)
                        }
                        FxaResult.fromValue(Unit)
                    }
            // Log.d(TAG_CONFIG, "CREATED FIREFOXACCOUNT")
            FxaResult.fromValue(Unit)
        }
    }

    fun shareUrl(url: String) {
        val shareIntent = Intent().apply {
            action = Intent.ACTION_SEND
            type = "text/plain"
            putExtra(Intent.EXTRA_TEXT, url)
        }

        val components = arrayOf(ComponentName(applicationContext, MainActivity::class.java))
        val chooser = Intent.createChooser(shareIntent, "")
                .putExtra(Intent.EXTRA_EXCLUDE_COMPONENTS, components)

        startActivity(chooser)
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
    }

    override fun onPause() {
        webView.onPause()
        super.onPause()
    }

    override fun onDestroy() {
        webView.onDestroy()
        super.onDestroy()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, intent: Intent?) {
        super.onActivityResult(requestCode, resultCode, intent)
        webView.onActivityResult(requestCode, resultCode, intent)
    }

    override fun onBackPressed() {
        if (!webView.onBackPressed()) {
            return
        }
        super.onBackPressed()
    }

    override fun onPageStarted(url: String, favicon: Bitmap?) {
        if (url.startsWith("https://send.firefox.com/fxa/android-redirect.html")) {
            // We load this here so the user doesn't see the android-redirect.html page
            webView.loadUrl("file:///android_asset/android.html")

            val uri = Uri.parse(url)
            uri.getQueryParameter("code")?.let { code ->
                uri.getQueryParameter("state")?.let { state ->
                    mAccount?.completeOAuthFlow(code, state)?.whenComplete { info ->
                        mAccount?.getProfile(false)?.then { profile ->
                            val profileJsonPayload = JSONObject()
                                    .put("accessToken", info.accessToken)
                                    .put("keys", info.keys)
                                    .put("avatar", profile.avatar)
                                    .put("displayName", profile.displayName)
                                    .put("email", profile.email)
                                    .put("uid", profile.uid).toString()
                            mToCall = "finishLogin($profileJsonPayload)"
                            this@MainActivity.runOnUiThread {
                                // Clear the history so that the user can't use the back button to see broken pages
                                // that were inserted into the history by the login process.
                                webView.clearHistory()

                                // We also reload this here because we need to make sure onPageFinished runs after mToCall has been set.
                                // We can't guarantee that onPageFinished wasn't already called at this point.
                                webView.loadUrl("file:///android_asset/android.html")
                            }
                            FxaResult.fromValue(Unit)
                        }
                    }
                }
            }
        }
        if (!url.startsWith("file:///android_asset/") && !url.startsWith("https://accounts.firefox.com/")) {
            // Don't allow loading anything other than the app in our webview
            // It should be possible to do this with shouldOverrideUrlLoading
            // but it didn't seem to be working, so this works as a hack.
            webView.loadUrl("file:///android_asset/android.html")
            Log.d(TAG_MAIN, "BAD URL " + url)
        } else {
            // Log.d(TAG_MAIN, "onPageStarted " + url)
        }
    }

    override fun onPageFinished(url: String) {
        // Log.d(TAG_MAIN, "onPageFinished")
        if (mToShare != null) {
            // Log.d(TAG_INTENT, mToShare)

            webView.postWebMessage(WebMessage(mToShare), Uri.EMPTY)
            mToShare = null
        }
        if (mToCall != null) {
            this@MainActivity.runOnUiThread {
                webView.evaluateJavascript(mToCall) {
                    mToCall = null
                }
            }
        }
    }

    override fun onPageError(errorCode: Int, description: String, failingUrl: String) {
        Log.d(TAG_MAIN, "onPageError($errorCode, $description, $failingUrl)")
    }

    override fun onDownloadRequested(url: String,
                                     suggestedFilename: String,
                                     mimeType: String,
                                     contentLength: Long,
                                     contentDisposition: String,
                                     userAgent: String) {
        // Log.d(TAG_MAIN, "onDownloadRequested")
    }

    override fun onExternalPageRequest(url: String) {
        // Log.d(TAG_MAIN, "onExternalPageRequest($url)")
    }

    companion object {
        private const val TAG_MAIN = "MAIN"
        private const val TAG_INTENT = "INTENT"
        private const val TAG_CONFIG = "CONFIG"
        private const val JS_INTERFACE_NAME = "Android"
    }
}
