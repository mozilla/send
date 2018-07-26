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

class ActionViewController: UIViewController, WKScriptMessageHandler {

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
            self.webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
        // Get the item[s] we're handling from the extension context.
        
        // For example, look for an image and place it into an image view.
        // Replace this with something appropriate for the type[s] your extension supports.
        var imageFound = false
        for item in self.extensionContext!.inputItems as! [NSExtensionItem] {
            for provider in item.attachments! as! [NSItemProvider] {
                if provider.hasItemConformingToTypeIdentifier(kUTTypeImage as String) {
                    // This is an image. We'll load it, then place it in our image view.
                    weak var weakWebView = self.webView
                    provider.loadItem(forTypeIdentifier: kUTTypeImage as String, options: nil, completionHandler: { (imageURL, error) in
                        OperationQueue.main.addOperation {
                            if let strongWebView = weakWebView {
                                if let url = Bundle.main.url(
                                    forResource: "index",
                                    withExtension: "html",
                                    subdirectory: "assets") {
                                    strongWebView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
                                }

//                                if let imageURL = imageURL as? URL {
//                                    strongImageView.image = UIImage(data: try! Data(contentsOf: imageURL))
//                                }
                            }
                        }
                    })
                    
                    imageFound = true
                    break
                }
            }
            
            if (imageFound) {
                // We only handle one image, so stop looking for more.
                break
            }
        }
    }

    public func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        print("Message received: \(message.name) with body: \(message.body)")
        if (message.name == "loaded") {
            print("LOADED")
            let stringToSend = "window.sendBase64EncodedFromSwift('data:,Hello%2C%20World!')";
            //let stringToSend = "Object.getOwnPropertyNames(window)";
            print("eval js \(stringToSend)")
            self.webView.evaluateJavaScript(stringToSend) { (object: Any?, error: Error?) -> Void in
                print("completed \(object) \(error)")
            }
        } else if (message.name == "copy") {
            print("COPY")
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
