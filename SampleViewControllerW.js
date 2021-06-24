var SampleViewControllerW = JSB.defineClass(
  "SampleViewControllerW : UIViewController <UIWebViewDelegate>",
  {
    viewDidLoad: function () {
      self.text = "";
      self.positon = "rb";
      self.isAddNoteiD = false;

      var savedPosition = NSUserDefaults.standardUserDefaults().objectForKey(
        "marginnote_flomo_positon"
      );
      if (savedPosition) self.positon = savedPosition;

      var webFrame = self.view.bounds;
      self.webView = new UIWebView(webFrame);
      self.webView.backgroundColor = UIColor.whiteColor();
      self.webView.scalesPageToFit = true;
      self.webView.autoresizingMask = (1 << 1) | (1 << 4);
      self.webView.delegate = self;
      self.webView.scrollView.delegate = self;
      self.webView.layer.cornerRadius = 10;
      self.webView.layer.masksToBounds = true;
      self.view.layer.shadowOffset = {
        width: 0,
        height: 0,
      };
      self.view.layer.shadowRadius = 10;
      self.view.layer.shadowOpacity = 0.5;
      self.view.layer.shadowColor = UIColor.colorWithWhiteAlpha(0.5, 1);
      self.view.addSubview(self.webView);
      self.webView.loadRequest(
        NSURLRequest.requestWithURL(
          NSURL.URLWithString("https://flomoapp.com/login/")
        )
      );

      /* Function Info
       * Author:      extrastu
       * CreateTime:  6/23/2021, 1:22:31 PM
       * LastEditor:  extrastu
       * ModifyTime:  6/23/2021, 1:22:31 PM
       * Description: changePositon
       */

      self.posButton = UIButton.buttonWithType(0);
      self.posButton.frame = {
        x: webFrame.x + 10,
        y: webFrame.y + webFrame.height - 50,
        width: 80,
        height: 40,
      };
      self.posButton.autoresizingMask = 1 << 3;
      self.posButton.setTitleForState("右下", 0);
      self.posButton.setTitleColorForState(
        Application.sharedInstance().defaultTintColorForDarkBackground,
        0
      );
      var highlightColor = UIColor.blendedColor(
        Application.sharedInstance().defaultTintColorForDarkBackground,
        Application.sharedInstance().defaultTextColor,
        0.8
      );
      self.posButton.setTitleColorForState(highlightColor, 1);
      self.posButton.backgroundColor =
        Application.sharedInstance().defaultTextColor.colorWithAlphaComponent(
          0.6
        );
      self.posButton.layer.cornerRadius = 10;
      self.posButton.layer.masksToBounds = true;
      self.posButton.titleLabel.font = UIFont.systemFontOfSize(14);
      self.posButton.addTargetActionForControlEvents(
        self,
        "changePositon:",
        1 << 6
      );
      self.view.addSubview(self.posButton);
      self.updateButton();
      /* Function Info
       * Author:      extrastu
       * CreateTime:  6/24/2021, 10:25:26 AM
       * LastEditor:  extrastu
       * ModifyTime:  6/24/2021, 10:25:26 AM
       * Description: back btn
       */

      self.backButton = UIButton.buttonWithType(0);
      self.backButton.frame = {
        x: webFrame.x + 100,
        y: webFrame.y + webFrame.height - 50,
        width: 80,
        height: 40,
      };
      self.backButton.autoresizingMask = 1 << 3;
      self.backButton.setTitleForState("back", 0);
      self.backButton.setTitleColorForState(
        Application.sharedInstance().defaultTintColorForDarkBackground,
        0
      );
      var highlightColor = UIColor.blendedColor(
        Application.sharedInstance().defaultTintColorForDarkBackground,
        Application.sharedInstance().defaultTextColor,
        0.8
      );
      self.backButton.setTitleColorForState(highlightColor, 1);
      self.backButton.backgroundColor =
        Application.sharedInstance().defaultTextColor.colorWithAlphaComponent(
          0.6
        );
      self.backButton.layer.cornerRadius = 10;
      self.backButton.layer.masksToBounds = true;
      self.backButton.titleLabel.font = UIFont.systemFontOfSize(14);
      self.backButton.addTargetActionForControlEvents(self, "back:", 1 << 6);
      self.view.addSubview(self.backButton);

      /* Function Info
       * Author:      extrastu
       * CreateTime:  6/24/2021, 10:26:42 AM
       * LastEditor:  extrastu
       * ModifyTime:  6/24/2021, 10:26:42 AM
       * Description: isAddNoteId
       */

      self.setButton = UIButton.buttonWithType(0);
      self.setButton.frame = {
        x: webFrame.x + 190,
        y: webFrame.y + webFrame.height - 50,
        width: 80,
        height: 40,
      };
      self.setButton.autoresizingMask = 1 << 3;
      self.setButton.setTitleForState("笔记不带id", 0);
      self.setButton.setTitleColorForState(
        Application.sharedInstance().defaultTintColorForDarkBackground,
        0
      );
      var highlightColor = UIColor.blendedColor(
        Application.sharedInstance().defaultTintColorForDarkBackground,
        Application.sharedInstance().defaultTextColor,
        0.8
      );
      self.setButton.setTitleColorForState(highlightColor, 1);
      self.setButton.backgroundColor =
        Application.sharedInstance().defaultTextColor.colorWithAlphaComponent(
          0.6
        );
      self.setButton.layer.cornerRadius = 10;
      self.setButton.layer.masksToBounds = true;
      self.setButton.titleLabel.font = UIFont.systemFontOfSize(14);
      self.setButton.addTargetActionForControlEvents(self, "set:", 1 << 6);
      self.view.addSubview(self.setButton);
    },
    viewWillAppear: function (animated) {
      self.webView.delegate = self;
    },
    viewWillDisappear: function (animated) {
      self.webView.stopLoading();
      self.webView.delegate = null;
      UIApplication.sharedApplication().networkActivityIndicatorVisible = false;
    },
    webViewDidStartLoad: function (webView) {
      UIApplication.sharedApplication().networkActivityIndicatorVisible = true;
    },
    webViewDidFinishLoad: function (webView) {
      webView.evaluateJavaScript(
        "function setContent(val){document.querySelector('.ProseMirror').innerHTML = val}"
      );
      UIApplication.sharedApplication().networkActivityIndicatorVisible = false;
    },
    webViewDidFailLoadWithError: function (webView, error) {
      UIApplication.sharedApplication().networkActivityIndicatorVisible = false;
      var errorString =
        "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\"><html><head><meta http-equiv='Content-Type' content='text/html;charset=utf-8'><title></title></head><body><div style='width: 100%%; text-align: center; font-size: 36pt; color: red;'>An error occurred:<br>%@</div></body></html>";
      errorString = errorString.replace("%@", error.localizedDescription);

      self.webView.loadHTMLStringBaseURL(errorString, null);
    },
    changePositon: function (sender) {
      if (self.popoverController) {
        self.popoverController.dismissPopoverAnimated(true);
      }
      var menuController = MenuController.new();
      menuController.commandTable = [
        {
          title: "左上",
          object: self,
          selector: "changePositonTo:",
          param: "lt",
          checked: self.positon == "lt",
        },
        {
          title: "右上",
          object: self,
          selector: "changePositonTo:",
          param: "rt",
          checked: self.positon == "rt",
        },
        {
          title: "中",
          object: self,
          selector: "changePositonTo:",
          param: "ct",
          checked: self.positon == "ct",
        },
        {
          title: "左下",
          object: self,
          selector: "changePositonTo:",
          param: "lb",
          checked: self.positon == "lb",
        },
        {
          title: "右下",
          object: self,
          selector: "changePositonTo:",
          param: "rb",
          checked: self.positon == "rb",
        },
      ];
      menuController.rowHeight = 44;
      menuController.preferredContentSize = {
        width: 200,
        height: menuController.rowHeight * menuController.commandTable.length,
      };
      var studyController = Application.sharedInstance().studyController(
        self.view.window
      );
      self.popoverController = new UIPopoverController(menuController);
      var r = sender.convertRectToView(sender.bounds, studyController.view);
      self.popoverController.presentPopoverFromRect(
        r,
        studyController.view,
        1 << 1,
        true
      );
    },
    changePositonTo: function (param) {
      self.positon = param;
      self.updateButton();
      NSUserDefaults.standardUserDefaults().setObjectForKey(
        self.positon,
        "marginnote_flomo_positon"
      );
      self.popoverController.dismissPopoverAnimated(true);
      Application.sharedInstance().showHUD(
        "重新开关插件后生效",
        self.view.window,
        2
      );
    },
    back: function (sender) {
      if (self.webView.canGoBack) {
        self.webView.goBack();
      } else {
        Application.sharedInstance().showHUD(
          "已经是flomo啦",
          self.view.window,
          2
        );
      }
    },
    set: function (sender) {
      self.isAddNoteiD = !self.isAddNoteiD;
      Application.sharedInstance().showHUD(
        self.isAddNoteiD ? "开启笔记带id" : "关闭笔记带id",
        self.view.window,
        2
      );
      self.setButton.setTitleForState(
        self.isAddNoteiD ? "笔记带id" : "笔记不带id",
        0
      );
    },
    webViewShouldStartLoadWithRequestNavigationType: function (
      webView,
      request,
      type
    ) {
      JSB.log("MNLOG %@", request);
      return true;
    },
  }
);

SampleViewControllerW.prototype.saveText = function (text, noteId) {
  if (!this.webView || !this.webView.window) return;
  if (noteId) {
    if (this.isAddNoteiD) {
      this.text = text + " <br/> marginnote3app://note/" + noteId;
    } else {
      this.text = text;
    }
  } else {
    this.text = text;
  }

  var jsCode =
    "setContent('- " +
    this.text
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/\n/g, "\\n") +
    "');";
  // Application.sharedInstance().alert(text);
  this.webView.evaluateJavaScript(jsCode);
};

SampleViewControllerW.prototype.updateButton = function () {
  if (this.positon == "lt") this.posButton.setTitleForState("左上", 0);
  else if (this.positon == "rt") this.posButton.setTitleForState("右上", 0);
  else if (this.positon == "ct") this.posButton.setTitleForState("中", 0);
  else if (this.positon == "lb") this.posButton.setTitleForState("左下", 0);
  else if (this.positon == "rb") this.posButton.setTitleForState("右下", 0);
};
