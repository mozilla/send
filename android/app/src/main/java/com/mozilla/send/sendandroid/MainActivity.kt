package com.mozilla.send.sendandroid


import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import im.delight.android.webview.AdvancedWebView
import android.graphics.Bitmap
import android.content.Intent
import android.annotation.SuppressLint
import android.net.Uri
import android.webkit.WebView
import android.webkit.WebMessage
import android.util.Log
import android.util.Base64
import android.provider.MediaStore
import android.R.attr.data







class MainActivity : AppCompatActivity(), AdvancedWebView.Listener {
    private var mWebView: AdvancedWebView? = null
    private var mToShare: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        mWebView = findViewById<WebView>(R.id.webview) as AdvancedWebView
        mWebView!!.setListener(this, this)

        val webSettings = mWebView!!.getSettings()
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

                // TODO Currently this causes a Permission Denied error
                // val stream = contentResolver.openInputStream(imageUri)
            }
            mWebView!!.loadUrl("file:///android_asset/intent-target.html")

        } else {
            mWebView!!.loadUrl("file:///android_asset/index.html")
        }

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
        Log.w("MAIN", "onPageStarted");
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
