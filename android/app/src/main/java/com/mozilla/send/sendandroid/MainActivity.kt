package com.mozilla.send.sendandroid


import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import im.delight.android.webview.AdvancedWebView
import android.graphics.Bitmap
import android.content.Context
import android.content.Intent
import android.annotation.SuppressLint
import android.net.Uri
import android.webkit.WebView
import android.webkit.WebMessage
import android.util.Log
import android.util.Base64
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import mozilla.components.service.fxa.Config
import mozilla.components.service.fxa.FirefoxAccount
import mozilla.components.service.fxa.OAuthInfo
import mozilla.components.service.fxa.Profile
import mozilla.components.service.fxa.FxaResult

internal class LoggingWebChromeClient : WebChromeClient() {
    override fun onConsoleMessage(cm: ConsoleMessage): Boolean {
        Log.w("CONTENT", String.format("%s @ %d: %s",
                cm.message(), cm.lineNumber(), cm.sourceId()))
        return true
    }
}

class WebAppInterface(private val mContext: MainActivity) {
    @JavascriptInterface
    fun beginOAuthFlow() {
        mContext.beginOAuthFlow();
    }
}

class MainActivity : AppCompatActivity(), AdvancedWebView.Listener {
    private var mWebView: AdvancedWebView? = null
    private var mToShare: String? = null
    private var mAccount: FirefoxAccount? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        mWebView = findViewById<WebView>(R.id.webview) as AdvancedWebView
        mWebView!!.setListener(this, this)
        mWebView!!.setWebChromeClient(LoggingWebChromeClient())
        mWebView!!.addJavascriptInterface(WebAppInterface(this), "Android")

        val webSettings = mWebView!!.getSettings()
        webSettings.setUserAgentString("Send Android")
        webSettings.setAllowUniversalAccessFromFileURLs(true)
        webSettings.setJavaScriptEnabled(true)

        val intent = getIntent()
        val action = intent.getAction()
        val type = intent.getType()

        if (Intent.ACTION_SEND.equals(action) && type != null) {
            if (type.equals("text/plain")) {
                val sharedText = intent.getStringExtra(Intent.EXTRA_TEXT)
                Log.w("INTENT", "text/plain " + sharedText)
                mToShare = "data:text/plain;base64," + Base64.encodeToString(sharedText.toByteArray(), 16).trim()
            } else if (type.startsWith("image/")) {
                val imageUri = intent.getParcelableExtra(Intent.EXTRA_STREAM) as Uri
                Log.w("INTENT", "image/ " + imageUri)
                mToShare = "data:text/plain;base64," + Base64.encodeToString(imageUri.path.toByteArray(), 16).trim()
            }
        }
        mWebView!!.loadUrl("file:///android_asset/android.html")

    }

    fun beginOAuthFlow() {
        Config.custom("https://send-fxa.dev.lcip.org").then(fun (value: Config): FxaResult<Unit> {
            mAccount = FirefoxAccount(value, "12cc4070a481bc73", "fxaclient://android.redirect")
            mAccount?.beginOAuthFlow(arrayOf("profile", "https://identity.mozilla.com/apps/send"), true)?.then(fun (url: String): FxaResult<Unit> {
                Log.w("CONFIG", "GOT A URL " + url)
                this@MainActivity.runOnUiThread({
                    mWebView!!.loadUrl(url)
                })
                return FxaResult.fromValue(Unit)
            })
            Log.w("CONFIG", "CREATED FIREFOXACCOUNT")
            return FxaResult.fromValue(Unit)
        })
    }

    @SuppressLint("NewApi")
    override fun onResume() {
        super.onResume()
        mWebView!!.onResume()
        // ...
    }

    @SuppressLint("NewApi")
    override fun onPause() {
        mWebView!!.onPause()
        // ...
        super.onPause()
    }

    override fun onDestroy() {
        mWebView!!.onDestroy()
        // ...
        super.onDestroy()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, intent: Intent) {
        super.onActivityResult(requestCode, resultCode, intent)
        mWebView!!.onActivityResult(requestCode, resultCode, intent)
        // ...
    }

    override fun onBackPressed() {
        if (!mWebView!!.onBackPressed()) {
            return
        }
        // ...
        super.onBackPressed()
    }

    override fun onPageStarted(url: String, favicon: Bitmap?) {
        if (url.startsWith("fxaclient")) {
            mWebView!!.loadUrl("file:///android_asset/android.html")
            val parsed = Uri.parse(url)
            val code = parsed.getQueryParameter("code")
            val state = parsed.getQueryParameter("state")

            code?.let { it ->
                state?.let { state ->
                    mAccount?.completeOAuthFlow(it, state)?.whenComplete {
                        //displayAndPersistProfile(code, state)
                         val toSend = "{\"code\": \"${it}\", \"state\": \"${state}\"}"

                        // TODO get k from it.keys
                        // TODO get profile from mAccount.getProfile
                        // TODO get access_token
                        // mWebView.evaluateJavascript("finishLogin()") //TODO arguments

                        //mToShare = "data:text/plain;base64," + Base64.encodeToString(toSend.toByteArray(), 16).trim()
                    }
                }
            }
        }
        Log.w("MAIN", "onPageStarted");
        // account.completeOAuthFlow()
    }

    override fun onPageFinished(url: String) {
        Log.w("MAIN", "onPageFinished")
        if (mToShare != null) {
            Log.w("INTENT", mToShare)

            val webView = findViewById<WebView>(R.id.webview) as AdvancedWebView
            webView.postWebMessage(WebMessage(mToShare), Uri.EMPTY)
        }

    }

    override fun onPageError(errorCode: Int, description: String, failingUrl: String) {
        Log.w("MAIN", "onPageError")
    }

    override fun onDownloadRequested(url: String, suggestedFilename: String, mimeType: String, contentLength: Long, contentDisposition: String, userAgent: String) {
        Log.w("MAIN", "onDownloadRequested")
    }

    override fun onExternalPageRequest(url: String) {
        Log.w("MAIN", "onExternalPageRequest")
    }

}
