//
//  ViewController.swift
//  send-ios
//
//  Created by Donovan Preston on 7/19/18.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKScriptMessageHandler {
    @IBOutlet var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.webView.frame = self.view.bounds
        self.webView?.configuration.userContentController.add(self, name: "loaded")
        self.webView?.configuration.userContentController.add(self, name: "copy")
        if let url = Bundle.main.url(
            forResource: "index",
            withExtension: "html",
            subdirectory: "assets") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
    }

    public func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        print("Message received: \(message.name) with body: \(message.body)")
        UIPasteboard.general.string = "\(message.body)"
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

