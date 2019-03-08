package org.mozilla.sendandroid

import android.os.Bundle
import android.content.Intent
import android.content.Context
import android.net.Uri
import android.util.AttributeSet
import android.util.Log
import android.util.Base64
import android.view.View
import androidx.appcompat.app.AppCompatActivity

import mozilla.components.feature.session.SessionFeature
import mozilla.components.feature.session.SessionUseCases
import mozilla.components.browser.session.SessionManager
import mozilla.components.browser.session.Session
import mozilla.components.concept.engine.DefaultSettings
import mozilla.components.browser.engine.gecko.GeckoEngine
import mozilla.components.concept.engine.EngineView
import org.mozilla.geckoview.GeckoRuntime
import org.mozilla.geckoview.GeckoRuntimeSettings

/*
internal class LoggingWebChromeClient : WebChromeClient() {
    override fun onConsoleMessage(cm: ConsoleMessage): Boolean {
        Log.w("CONTENT", String.format("%s @ %d: %s",
                cm.message(), cm.lineNumber(), cm.sourceId()))
        return true
    }
}

// TODO Replace with geckoview equivalent
class WebAppInterface(private val mContext: MainActivity) {
    @JavascriptInterface
    fun beginOAuthFlow() {
        mContext.beginOAuthFlow();
    }

    @JavascriptInterface
    fun shareUrl(url: String) {
        mContext.shareUrl(url)
    }
}
*/

class MainActivity : AppCompatActivity() {
    // private var mWebView: AdvancedWebView? = null
    private var mToShare: String? = null
    private var mToCall: String? = null
    private var mSessionFeature: SessionFeature? = null
    private var mGeckoRuntime: GeckoRuntime? = null
    private var mGeckoEngine: GeckoEngine? = null
    private var mSessionManager: SessionManager? = null
    private var mEngineView: EngineView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if(mEngineView == null) {
            val builder = GeckoRuntimeSettings.Builder().consoleOutput(true).remoteDebuggingEnabled(true)
            mGeckoRuntime = GeckoRuntime.create(applicationContext, builder.build())
            val settings = DefaultSettings()
            settings.userAgentString = "Send Android"
            mGeckoEngine = GeckoEngine(applicationContext, settings, mGeckoRuntime!!)
            mSessionManager =
                SessionManager(mGeckoEngine!!, defaultSession = { Session("resource://android/assets/hello.html") })
            val sessionUseCases = SessionUseCases(mSessionManager!!)
            val sessionId = "sendandroid"
            mEngineView = mGeckoEngine!!.createView(applicationContext)
            mSessionFeature = SessionFeature(
                mSessionManager!!,
                sessionUseCases,
                mEngineView!!,
                sessionId
            )

            val initialSession = Session("resource://android/assets/hello.html")
            mSessionManager!!.add(initialSession, selected = true)
            mEngineView!!.render(mSessionManager!!.getOrCreateEngineSession())
        }

        setContentView(R.layout.activity_main)

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
                mToShare = "data:text/plain;base64," + Base64.encodeToString(imageUri.path!!.toByteArray(), 16).trim()
            }
        }
    }

    override fun onCreateView(parent: View?, name: String, context: Context, attrs: AttributeSet): View? {
        if (name == EngineView::class.java.name) {
            return mEngineView!!.asView()
        } else {
            return super.onCreateView(parent, name, context, attrs)
        }

        // https://developers.google.com/web/tools/chrome-devtools/remote-debugging/webviews
        // WebView.setWebContentsDebuggingEnabled(true); // TODO only dev builds

        // mWebView = findViewById<WebView>(R.id.webview) as AdvancedWebView
        // mWebView!!.setListener(this, this)
        // mWebView!!.setWebChromeClient(LoggingWebChromeClient())
        // mWebView!!.addJavascriptInterface(WebAppInterface(this), "Android")
        // mWebView!!.setLayerType(View.LAYER_TYPE_HARDWARE, null);

        // val webSettings = mWebView!!.getSettings()
        // webSettings.setUserAgentString("Send Android")
        // webSettings.setAllowUniversalAccessFromFileURLs(true)
        // webSettings.setJavaScriptEnabled(true)


        // mWebView!!.loadUrl("file:///android_asset/android.html")
    }
    override fun onStart() {
        super.onStart()
        if (mSessionFeature != null) {
            mSessionFeature!!.start()
        }
    }

    override fun onStop() {
        super.onStop()
        if (mSessionFeature != null) {
            mSessionFeature!!.stop()
        }
    }
/*
    fun beginOAuthFlow() {
        Config.release().then(fun (value: Config): FxaResult<Unit> {
            mAccount = FirefoxAccount(value, "20f7931c9054d833", "https://send.firefox.com/fxa/android-redirect.html")
            mAccount?.beginOAuthFlow(arrayOf("profile", "https://identity.mozilla.com/apps/send"), true)?.then(fun (url: String): FxaResult<Unit> {
                Log.w("CONFIG", "GOT A URL " + url)
                this@MainActivity.runOnUiThread({
                    // mWebView!!.loadUrl(url)
                })
                return FxaResult.fromValue(Unit)
            })
            Log.w("CONFIG", "CREATED FIREFOXACCOUNT")
            return FxaResult.fromValue(Unit)
        })
    }

    fun shareUrl(url: String) {
        val shareIntent = Intent()
        shareIntent.action = Intent.ACTION_SEND
        shareIntent.type = "text/plain"
        shareIntent.putExtra(Intent.EXTRA_TEXT, url)
        val chooser = Intent.createChooser(shareIntent, "")
        chooser.putExtra(Intent.EXTRA_EXCLUDE_COMPONENTS, arrayOf(ComponentName(applicationContext, MainActivity::class.java)))
        startActivity(chooser)
    }

    @SuppressLint("NewApi")
    override fun onResume() {
        super.onResume()
        // mWebView!!.onResume()
        // ...
    }

    @SuppressLint("NewApi")
    override fun onPause() {
        // mWebView!!.onPause()
        // ...
        super.onPause()
    }

    override fun onDestroy() {
        // mWebView!!.onDestroy()
        // ...
        super.onDestroy()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, intent: Intent?) {
        super.onActivityResult(requestCode, resultCode, intent)
        // mWebView!!.onActivityResult(requestCode, resultCode, intent)
        // ...
    }

    override fun onBackPressed() {
        // if (!mWebView!!.onBackPressed()) {
            // return
        // }
        // ...
        super.onBackPressed()
    }

    fun onPageStarted(url: String, favicon: Bitmap?) {
        if (url.startsWith("https://send.firefox.com/fxa/android-redirect.html")) {
            // We load this here so the user doesn't see the android-redirect.html page
            // mWebView!!.loadUrl("file:///android_asset/android.html")

            val parsed = Uri.parse(url)
            val code = parsed.getQueryParameter("code")
            val state = parsed.getQueryParameter("state")

            code?.let { code ->
                state?.let { state ->
                    mAccount?.completeOAuthFlow(code, state)?.whenComplete { info ->
                        //displayAndPersistProfile(code, state)
                        val profile = mAccount?.getProfile(false)?.then(fun (profile: Profile): FxaResult<Unit> {
                            val accessToken = info.accessToken
                            val keys = info.keys
                            val avatar = profile.avatar
                            val displayName = profile.displayName
                            val email = profile.email
                            val uid = profile.uid
                            val toPass = "{\"accessToken\": \"${accessToken}\", \"keys\": '${keys}', \"avatar\": \"${avatar}\", \"displayName\": \"${displayName}\", \"email\": \"${email}\", \"uid\": \"${uid}\"}"
                            mToCall = "finishLogin(${toPass})"
                            this@MainActivity.runOnUiThread({
                                // Clear the history so that the user can't use the back button to see broken pages
                                // that were inserted into the history by the login process.
                                // mWebView!!.clearHistory()

                                // We also reload this here because we need to make sure onPageFinished runs after mToCall has been set.
                                // We can't guarantee that onPageFinished wasn't already called at this point.
                                // mWebView!!.loadUrl("file:///android_asset/android.html")
                            })


                            return FxaResult.fromValue(Unit)
                        })
                    }
                }
            }
        }
        Log.w("MAIN", "onPageStarted");
    }

    fun onPageFinished(url: String) {
        Log.w("MAIN", "onPageFinished")
        if (mToShare != null) {
            Log.w("INTENT", mToShare)

            // mWebView?.postWebMessage(WebMessage(mToShare), Uri.EMPTY)
            mToShare = null
        }
        if (mToCall != null) {
            this@MainActivity.runOnUiThread({
                // mWebView?.evaluateJavascript(mToCall, fun (value: String) {
                    // mToCall = null
                // })
            })
        }
    }

    fun onPageError(errorCode: Int, description: String, failingUrl: String) {
        Log.w("MAIN", "onPageError " + description)
    }

    fun onDownloadRequested(url: String, suggestedFilename: String, mimeType: String, contentLength: Long, contentDisposition: String, userAgent: String) {
        Log.w("MAIN", "onDownloadRequested")
    }

    fun onExternalPageRequest(url: String) {
        Log.w("MAIN", "onExternalPageRequest")
    }
*/
}
