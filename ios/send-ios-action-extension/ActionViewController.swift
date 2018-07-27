//
//  ActionViewController.swift
//  send-ios-action-extension
//
//  Created by Donovan Preston on 7/26/18.
//  Copyright © 2018 Donovan Preston. All rights reserved.
//

import UIKit
import WebKit
import MobileCoreServices

var typesToLoad = [("com.adobe.pdf", "application/pdf"), ("public.png", "image/png"),
                   ("public.jpeg", "image/jpeg"), ("com.compuserve.gif", "image/gif"),
                   ("com.microsoft.bmp", "image/bmp"), ("public.plain-text", "text/plain")]

class ActionViewController: UIViewController, WKScriptMessageHandler {

    @IBOutlet var webView: WKWebView!
    var typeToSend: String?
    var dataToSend: Data?

    override func viewDidLoad() {
        super.viewDidLoad()
        self.webView.frame = self.view.bounds
        self.webView?.configuration.userContentController.add(self, name: "loaded")
        self.webView?.configuration.userContentController.add(self, name: "copy")

        if let url = Bundle.main.url(
            forResource: "index",
            withExtension: "html",
            subdirectory: "assets") {
            self.webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
        // Get the item[s] we're handling from the extension context.
        
        for item in self.extensionContext!.inputItems as! [NSExtensionItem] {
            for provider in item.attachments! as! [NSItemProvider] {
                for (type, mimeType) in typesToLoad {
                    if provider.hasItemConformingToTypeIdentifier(type) {
                        provider.loadDataRepresentation(forTypeIdentifier: type, completionHandler: { (data, error) in
                            OperationQueue.main.addOperation {
                                self.typeToSend = mimeType
                                self.dataToSend = data
                            }
                        })
                        return
                    }
                }
            }
        }
    }

    public func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        print("Message received: \(message.name) with body: \(message.body)")
        if (message.name == "loaded") {
                let stringToSend = "window.sendBase64EncodedFromSwift('data:\(self.typeToSend ?? "application/octet-stream");base64,\(self.dataToSend?.base64EncodedString() ?? "")')";
                self.webView.evaluateJavaScript(stringToSend) { (object: Any?, error: Error?) -> Void in
                    print("completed")
                }
        } else if (message.name == "copy") {
            UIPasteboard.general.string = "\(message.body)"
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func done() {
        // Return any edited content to the host app.
        // This template doesn't do anything, so we just echo the passed in items.
        self.extensionContext!.completeRequest(returningItems: self.extensionContext!.inputItems, completionHandler: nil)
    }

}
