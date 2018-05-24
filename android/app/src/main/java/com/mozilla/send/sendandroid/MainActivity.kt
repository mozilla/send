package com.mozilla.send.sendandroid


import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import im.delight.android.webview.AdvancedWebView
import android.graphics.Bitmap
import android.content.Intent
import android.annotation.SuppressLint
import android.webkit.WebView
import android.util.Log

class MainActivity : AppCompatActivity(), AdvancedWebView.Listener {
    private var mWebView: AdvancedWebView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        mWebView = findViewById<WebView>(R.id.webview) as AdvancedWebView
        mWebView!!.setListener(this, this)

        val webSettings = mWebView!!.getSettings()
        webSettings.setJavaScriptEnabled(true)

        mWebView!!.loadUrl("https://send.firefox.com")
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
