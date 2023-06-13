FormSeq.prototype.BLChatEvents = function (tmpId) {
  $(document).off("mouseenter.Chatbl").on("mouseenter.Chatbl", ".be-chat", function (event) {
    disable_scroll();
  });
  $(document).off("mouseleave.Chatbl").on("mouseleave.Chatbl", ".be-chat", function (event) {
    enable_scroll();
  });
  $("#t" + tmpId + "_chatScroll").off("mouseenter.Chatbl").on("mouseenter.Chatbl", function (event) {
    if (event.relatedTarget === null) {
      event.stopPropagation();
      return;
    }
    $(".chat-bl").css({
      "overflow-y": "auto",
    });
  });
  $("#t" + tmpId + "_chatScroll").off("mouseleave.Chatbl").on("mouseleave.Chatbl", function (event) {
    if (event.relatedTarget === null) {
      event.stopPropagation();
      return;
    }
    $(".chat-bl").css({
      "overflow-y": "hidden",
    });
  });
  $("#t" + tmpId + "_chatScroll").off("scroll").on("scroll", function (event) {
    HideSuggester();
  });
};

function UpdateChatName(tmpId) {
  var imeshcookie = imeshExist();
  if (notEmpty(usercookie.getParameterValue(imeshcookie, "fn")) || (isSet(ReqObj.UserDetail) && notEmpty(ReqObj.UserDetail.fn) && isSet(ReqObj.UserDetail.fn))) {
    var name = usercookie.getParameterValue(imeshcookie, "fn");
    if (!notEmpty(name)) name = ReqObj.UserDetail.fn;
    $("#t" + tmpId + "_hiid").text("Welcome " + name);
  } else {
    $("#t" + tmpId + "_hiid").text("Welcome");
  }
}


FormSeq.prototype.BLChat = function (tmpId) {
  UpdateChatName(tmpId);
  ReqObj.Form[tmpId].IsqStep1 = ReturnCorrectVal(
    ReqObj.Form[tmpId].IsqStep1,
    1
  );
  ReqObj.Form[tmpId].IsqStepN = ReturnCorrectVal(
    ReqObj.Form[tmpId].IsqStepN,
    1
  );
  ReqObj.Form[tmpId].isProdNameQuesShown = false;
  ReqObj.Form[tmpId].isOtpShownOnFirstStep = false;
  ReqObj.Form[tmpId].toCloseChatBL = false;
  this.BLChatQuestionStart(tmpId); //
};
FormSeq.prototype.BLChatQuestionStart = function (tmpId) {
  isChatBlSequenceUpdated = false;
  HideTncBox(tmpId); // new chat bl unidentified
  removechatblerror(tmpId);
  if (imeshExist() !== "") $("#t" + tmpId + "mflag").css("display", "none");
  $("#t" + tmpId + "mflag").remove();
  this.BLChatEvents(tmpId);
  if (
    imeshExist() !== "" &&
    isSecondBl() &&
    usercookie.getParameterValue(imeshExist(), "uv") !== "V" &&
    currentISO() === "IN"
  ) {
    ReqObj.Form[tmpId].isOtpShownOnFirstStep = true;
    ReqObj.Form[tmpId].isProdNameQuesShown = false;
    ReqObj.Form[tmpId].isProdNameShown = false;
    this.BLChatOtp(tmpId);
  } else {
    ReqObj.Form[tmpId].isOtpShown = false;
    ReqObj.Form[tmpId].isProdNameQuesShown = false;
    ReqObj.Form[tmpId].isProdNameShown = false;
      var checkisq = isSet(ReqObj.Form[tmpId].IsqLength) && ReqObj.Form[tmpId].IsqLength != 0;
      if (IsChatBLInline(tmpId) && !imeshExist()) {   //new chat bl unidentified
        ReqObj.Form[tmpId].isqAsked = true;    
              
        if (ShowProdName(tmpId) && !ReqObj.Form[tmpId].isProdNameShown) {
          this.BLChatProdName(tmpId);
        }
        else if(checkisq){
        this.BLChatIsq(tmpId);
        }
        else
        this.BLChatLogin(tmpId);
  }
      else
        this.BLChatLogin(tmpId);
  }
};

FormSeq.prototype.BLChatProdName = function (tmpId) {
  var that = this;
  this.NumberofClassCalled = 1;
  ReqObj.Form[tmpId].isProdNameShown = true;
  if(IsChatBLInline(tmpId) && !imeshExist())   //new chat bl unidentified
  {
    var hooks = {
      pre: [],
      post: [this.BLChatIsq],
      current: [this.BLChatProdName],
    };
  }
  else{
    var hooks = {
      pre: [],
      post: [this.BLChatLogin],
      current: [this.BLChatProdName],
    };
  }
  var array = {
    UiArray: [],
    ServiceArray: [],
  };
  if (
    !(checkblockedUser() && im_issExist() === "") &&
    (ReqObj.Form[tmpId].UserInputs["IsProduct"] ===
      "Change the product".trim() ||
      (isSet(ReqObj.Form[tmpId].isproductshown) &&
        ReqObj.Form[tmpId].isproductshown))
  ) {
    var ProdNameObject = {
      object: {
        obj: new ProductName(tmpId),
        toReplace: true,
        isService: false,
        array: array,
        hooks: hooks,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: false,
      FallbackObj: null,
    };
    CreateSeq(ProdNameObject);
    if (imeshExist()) {
      if (
        currentISO() === "IN" ||
        (currentISO() !== "IN" &&
          usercookie.getParameterValue(
            usercookie.getCookie("ImeshVisitor"),
            "fn"
          ))
      ) {
        hooks = {
          pre: [],
          post: [],
          current: [],
        };
        var GenObject = returnGenObject(tmpId, array, hooks, that, 0);
        this.MakeSeq(GenObject);
      }
    }
  } else {
    //this.BLChatCountry(tmpId);
    if (checkblockedUser()) {
      this.BLChatOtp(tmpId);
      ReqObj.Form[tmpId].isProdNameShown = false;
    } else this.BLChatLogin(tmpId);
  }
};

FormSeq.prototype.BLChatLogin = function (tmpId) {
  var that = this;
  this.NumberofClassCalled = 1;
  ShowHideTNC(tmpId); // new chat bl unidentified
  if (!imeshExist()) {
      if (ShowProdName(tmpId) && !ReqObj.Form[tmpId].isProdNameShown) {  
      var hooks = {
        pre: [],
        post: [this.BLChatProdName],
        current: [this.BLChatLogin],
      };
    } else {
      var hooks = {
        pre: [],
        post: [this.BLChatName],
        current: [this.BLChatQuestionStart],
      };
    }
    var array = {
      UiArray: [],
      ServiceArray: [],
    };

    var UserLoginObject = {
      object: {
        obj: new UserLogin(tmpId),
        toReplace: true,
        isService: false,
        array: array,
        hooks: hooks,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: false,
      FallbackObj: null,
    };
    CreateSeq(UserLoginObject);
    if (currentISO() === "IN") {
      hooks = {
        pre: [],
        post: [],
      };
      var GenObject = {
        object: {
          obj: new Generation(0),
          toReplace: true,
          isService: true,
          array: array,
          hooks: hooks,
        },
        tmpId: tmpId,
        that: that,
        AfterService: [],
        hasFallback: false,
        FallbackObj: null,
      };
      this.MakeSeq(GenObject);
    }
  } else {
    if (ShowProdName(tmpId) && !ReqObj.Form[tmpId].isProdNameShown) {
      this.BLChatProdName(tmpId);
    } else this.BLChatName(tmpId);
  }
};

FormSeq.prototype.BLChatName = function (tmpId) {
  ShowHideTNC(tmpId); // new chat bl unidentified
  var that = this;
  this.NumberofClassCalled = 1;
  if (!(checkblockedUser() && im_issExist() === "") && !(notEmpty(usercookie.getParameterValue(imeshExist(), "fn")) || (isSet(ReqObj.UserDetail) && notEmpty(ReqObj.UserDetail.fn && isSet(ReqObj.UserDetail.fn))))) {
    var array = {
      UiArray: [],
      ServiceArray: [],
    };
    var hooks = {
      pre: [this.BLChatEmail],
      post: [],
      current: [this.BLChatName],
    };
    if (CallGeneration(tmpId)) {
      var GenObject = returnGenObject(tmpId, array, hooks, that, 0);
      this.MakeSeq(GenObject);
      hooks = {
        pre: [],
        post: [],
        current: [],
      };
    }

    var PostBlEnqUpdateObj = returnPostBlEnqObject(tmpId, array, hooks, that, "");
    var NECObj = {
      object: {
        obj: new ContactDetail(1, 0, 0),
        toReplace: false,
        isService: false,
        array: array,
        hooks: hooks,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [PostBlEnqUpdateObj],
      hasFallback: false,
      FallbackObj: null,
    };
    CreateSeq(NECObj);
    //is not indian or offer id not generated
  } else {
    if (checkblockedUser()) this.BLChatOtp(tmpId);
    else this.BLChatEmail(tmpId);
  }
};

FormSeq.prototype.BLChatCity = function (tmpId) {
  var that = this;
  this.NumberofClassCalled = 1;
  var hooks = {
    pre: [this.BLChatOtp],
    post: [],
    current: [this.BLChatCity],
  };
  var array = {
    UiArray: [],
    ServiceArray: [],
  };
  if (CallGeneration(tmpId)) {
    hooks = {
      pre: [],
      post: [],
    };
    var GenObject = returnGenObject(tmpId, array, hooks, that, 0);
    this.MakeSeq(GenObject);
    hooks = {
      pre: [],
      post: [],
      current: [],
    };
  }
  if (!usercookie.getParameterValue(imeshExist(), "ctid") && currentISO() === "IN") {
    //if offer id generated
    var PostBlEnqUpdateObj = returnPostBlEnqObject(tmpId, array, hooks, that, "");

    hooks = {
      pre: [this.BLChatOtp],
      post: [],
      current: [this.BLChatCity],
    };

    var NECObj = {
      object: {
        obj: new ContactDetail(0, 0, 1),
        toReplace: false,
        isService: false,
        array: array,
        hooks: hooks,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [PostBlEnqUpdateObj],
      hasFallback: false,
      FallbackObj: null,
    };
    CreateSeq(NECObj);

    //check here is offerid is generated
  } else {
    if (CallGeneration(tmpId)) {
      // if (currentISO() === "IN") {
      //   this.BLChatIsq(tmpId);
      // } else {
      //   //show static question here
      //   this.BLChatStaticQuestion(tmpId);
      // }
      this.BLChatIsq(tmpId);
    } else {
      this.BLChatOtp(tmpId);
    }
  }
};
FormSeq.prototype.BLChatEmail = function (tmpId) {
  var that = this;
  this.NumberofClassCalled = 1;
  var hooks = {
    pre: [this.BLChatCity],
    post: [],
    current: [this.BLChatEmail],
  };
  var array = {
    UiArray: [],
    ServiceArray: [],
  };
  if (CallGeneration(tmpId)) {
    hooks = {
      pre: [],
      post: [],
    };
    var GenObject = returnGenObject(tmpId, array, hooks, that, 0);
    this.MakeSeq(GenObject);
    hooks = {
      pre: [],
      post: [],
      current: [],
    };
  }
  if (ShowEmail() || ShowMobile()) {
    //if offer id generated
    var PostBlEnqUpdateObj = returnPostBlEnqObject(
      tmpId,
      array,
      hooks,
      that,
      ""
    );

    hooks = {
      pre: [this.BLChatCity],
      post: [],
      current: [this.BLChatEmail],
    };

    var NECObj = {
      object: {
        obj: new ContactDetail(0, 1, 0),
        toReplace: false,
        isService: false,
        array: array,
        hooks: hooks,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [PostBlEnqUpdateObj],
      hasFallback: false,
      FallbackObj: null,
    };
    CreateSeq(NECObj);

    //check here is offerid is generated
  } else {
    this.BLChatCity(tmpId);
  }
};


FormSeq.prototype.BLChatOtp = function (tmpId) {
  var array = {
    UiArray: [],
    ServiceArray: [],
  };
  var hooks = {
    pre: [],
    post: [this.BLChatIsq],
    current: [this.BLChatQuestionStart],
  };
  var messageObj = {
    message: "",
  };
  if (currentISO() === "IN") {
    if (checkblockedUser()) {
      hooks = {
        pre: [],
        post: [this.BLChatLogin],
        current: [this.BLChatOtp],
      };
    } else if (
      isSecondBl() &&
      usercookie.getParameterValue(imeshExist(), "uv") !== "V" &&
      ReqObj.Form[tmpId].isOtpShownOnFirstStep
    ) {
      if (ShowProdName(tmpId) && !ReqObj.Form[tmpId].isProdNameShown) {
        hooks = {
          pre: [],
          post: [this.BLChatProdName],
          current: [this.BLChatOtp],
        };
      } else {
        hooks = {
          pre: [],
          post: [this.BLChatName],
          current: [this.BLChatOtp],
        };
      }
      messageObj.message = "second";
    } else {
      if (ShowProdName(tmpId) && !ReqObj.Form[tmpId].isProdNameShown) {
        hooks = {
          pre: [],
          post: [this.BLChatProdName],

          current: [this.BLChatQuestionStart],
        };
      } else {
        hooks = {
          pre: [],
          post: [this.BLChatIsq],
          current: [this.BLChatQuestionStart],
        };
      }
      messageObj.message = "";
    }
  }

  var that = this;
  this.NumberofClassCalled = 1;

  if (ShowOtp() || (checkblockedUser() && im_issExist() === "")) {
    var UserVerificationObj = {
      object: {
        obj: new UserVerification(tmpId),
        toReplace: false,
        isService: false,
        array: array,
        hooks: hooks,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: false,
      FallbackObj: null,
      message: messageObj,
    };
    CreateSeq(UserVerificationObj);
    if (
      (ReqObj.Form[tmpId].isOtpShownOnFirstStep && imeshExist()) ||
      checkblockedUser()
    ) {
      if (
        checkblockedUser() ||
        currentISO() === "IN" ||
        (currentISO() !== "IN" &&
          usercookie.getParameterValue(imeshExist(), "fn"))
      ) {
        hooks = {
          pre: [],
          post: [],
          current: [],
        };
        var GenObject = returnGenObject(tmpId, array, hooks, that, 0);
        this.MakeSeq(GenObject);
      }
    }
  } else {
    this.BLChatIsq(tmpId);
  }
};

FormSeq.prototype.BLChatIsq = function (tmpId) {
  var that = this;
  this.NumberofClassCalled = 1;

  var array = {
    UiArray: [],
    ServiceArray: [],
  };
  var hooks = {
    pre: [this.BLChatIsqSubsequent],
    post: [],
    current: [this.BLChatIsq],
  };
  //if otp shown

  //else
  // var hooks = {
  //   pre: [this.BLChatOtp],
  //   post: []
  // };

  //check here is offerid is generated and also if it is not in hit array
  if (CallGeneration(tmpId)) {
    hooks = {
      pre: [this.BLChatOtp],
      post: [],
      current: [this.BLChatIsq],
    };
    var GenObject = returnGenObject(tmpId, array, hooks, that, 0);
    this.MakeSeq(GenObject);
    hooks = {
      pre: [],
      post: [],
      current: [this.BLChatIsq],
    };
  }

  if (ShowIsq(tmpId)) {
    if (ShowReqBox(tmpId)) {
      var IsqFallback = {
        object: {
          obj: new RequirementDtl(tmpId),
          toReplace: true,
          isService: false,
          array: array,
          hooks: hooks,
          countlastUpdated: false,
        },
        tmpId: tmpId,
        that: that,
        AfterService: [],
        hasFallback: false,
        FallbackObj: null,
      };
    } else {
      //if otp shown
      var IsqFallback = {
        object: {
          obj: new ThankYou(tmpId),
          toReplace: false,
          objHtmlId: tmpId + "_thankDiv",
          isService: false,
          array: array,
          hooks: hooks,
        },
        tmpId: tmpId,
        that: that,
        AfterService: [],
        hasFallback: false,
        FallbackObj: null,
      };
      //else have otp as fallback
    }
    var IsqObject = {
      object: {
        obj: ReqObj.Form[tmpId].GlobalIsqObject,
        array: array,
        hooks: hooks,
        isService: false,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: true,
      FallbackObj: IsqFallback,
    };
    CreateSeq(IsqObject);
  } else{    // new chat bl unidentified
    if(!imeshExist())
    this.BLChatLogin(tmpId);
    else
    this.BLChatRd(tmpId);
  }
    // this.BLChatRd(tmpId);
};

FormSeq.prototype.BLChatIsqSubsequent = function (tmpId) {
  var that = this;
  this.NumberofClassCalled = 1;
  // ReqObj.Form[tmpId].flags["IsFirstStep"] = false;
  var array = {
    UiArray: [],
    ServiceArray: [],
  };

  //if otp shown
  var hooks = {
    pre: [this.BLChatIsqSubsequent],
    post: [],
    current: [this.BLChatIsqSubsequent],
  };

  if (
    ReqObj.Form[tmpId].IsqArray === "" ||
    (currentISO() === "IN" &&
      ReqObj.Form[tmpId].prevCount < ReqObj.Form[tmpId].IsqLength) ||
    (currentISO() !== "IN" &&
      ReqObj.Form[tmpId].prevCount < ReqObj.Form[tmpId].IsqLength &&
      ReqObj.Form[tmpId].Isq.HasHtmlCalled !== true)
  ) {
    if (!ReqObj.Form[tmpId].flags.isDescDivShown) {
      var IsqFallback = {
        object: {
          obj: new RequirementDtl(tmpId),
          toReplace: true,
          isService: false,
          array: array,
          hooks: hooks,
          countlastUpdated: false,
        },
        tmpId: tmpId,
        that: that,
        AfterService: [],
        hasFallback: false,
        FallbackObj: null,
      };
    } else {
      //if otp shown
      var IsqFallback = {
        object: {
          obj: new ThankYou(tmpId),
          toReplace: false,
          isService: false,
          array: array,
          hooks: hooks,
        },
        tmpId: tmpId,
        that: that,
        AfterService: [],
        hasFallback: false,
        FallbackObj: null,
      };
      //else have otp as fallback
    }
    var IsqObject = {
      object: {
        obj: ReqObj.Form[tmpId].GlobalIsqObject,
        array: array,
        hooks: hooks,
        isService: false,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: true,
      FallbackObj: IsqFallback,
    };
    CreateSeq(IsqObject);
  } else{    // new chat bl unidentified
    if(!imeshExist())
    this.BLChatLogin(tmpId);
    else
    this.BLChatRd(tmpId);
  }
    // this.BLChatRd(tmpId);
};

FormSeq.prototype.BLChatStaticQuestion = function (tmpId) {
  var that = this;
  this.NumberofClassCalled = 1;

  var array = {
    UiArray: [],
    ServiceArray: [],
  };
  var hooks = {
    pre: [this.BLChatRd],
    post: [],
    current: [this.BLChatStaticQuestion],
  };
  if (
    returnIsEnrichShownKeyVal(tmpId) &&
    ReqObj.Form[tmpId].modrefType === "product"
  ) {
    var StaticQues = {
      object: {
        obj: new BlStaticQues(tmpId),
        toReplace: true,
        isService: false,
        array: array,
        hooks: hooks,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: false,
      FallbackObj: null,
    };
    CreateSeq(StaticQues);
  } else {
    this.BLChatRd(tmpId);
  }
};

FormSeq.prototype.BLChatRd = function (tmpId) {
  var that = this;
  this.NumberofClassCalled = 1;
  if(ReqObj.Form[tmpId].isqAsked == true && !ReqObj.Form[tmpId].saveOnce) { //new chat bl unidentified
  ReqObj.Form[tmpId].GlobalIsqObject.onSubmit(tmpId);
  ReqObj.Form[tmpId].saveOnce = true;
  }
  var array = {
    UiArray: [],
    ServiceArray: [],
  };
  var hooks = {
    pre: [this.BlChatCName],
    post: [],
    current: [this.BLChatRd],
  };
  var md = toAskMoreDetails(tmpId);
  if (
    md.ask === false &&
    usercookie.getParameterValue(imeshExist(), "uv") !== "V" &&
    currentISO() === "IN"
  ) {
    var hooks = {
      pre: [this.BLChatOtp],
      post: [],
      current: [this.BLChatRd],
    };
  }
  if (CallGeneration(tmpId)) {
    hooks = {
      pre: [this.BlChatCName],
      post: [],
      current: [this.BLChatRd],
    };
    var GenObject = returnGenObject(tmpId, array, hooks, that, 0);
    this.MakeSeq(GenObject);
    hooks = {
      pre: [],
      post: [],
      current: [this.BLChatRd],
    };
  }

  if (ShowReqBox(tmpId)) {
    var RdObj = {
      object: {
        obj: new RequirementDtl(tmpId),
        toReplace: true,
        isService: false,
        array: array,
        hooks: hooks,
        countlastUpdated: false,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: false,
      FallbackObj: null,
    };
    CreateSeq(RdObj);
  } else {
    if (md.ask == true && md.key === 0) {
      this.BlChatCName(tmpId);
    } else if (EmailAfterReqbox(tmpId)) {
      ReqObj.Form[tmpId].emailAfterReqbox = false;
      this.BLChatThankYou(tmpId);
    } else {
      ReqObj.Form[tmpId].emailAfterReqbox = true;
      this.BLChatEmail(tmpId);
    }
  }
};

FormSeq.prototype.BlChatCName = function (tmpId) {
  var that = this;
  var array = {
    UiArray: [],
    ServiceArray: [],
  };
  // var hooks = {
  //   pre: [this.BLChatThankYou],
  //   post: [],
  //   current: [this.BlChatCName]
  // };
  // if (usercookie.getParameterValue(imeshExist(), "uv") !== "V") {
  var md = toAskMoreDetails(tmpId);
  var hooks = {
    pre: [this.BlChatgst],
    post: [],
    current: [this.BlChatCName],
  };
  // }
  if (md.ask === true && md.key === 0) {
    this.NumberofClassCalled = 1;
    var mdObj = returnmdtlObject(array, hooks, tmpId, that, false, md);
    CreateSeq(mdObj);
  } else {
    this.BlChatgst(tmpId);
  }
};

FormSeq.prototype.BlChatgst = function (tmpId) {
  var that = this;
  var array = {
    UiArray: [],
    ServiceArray: [],
  };
  // var hooks = {
  //   pre: [this.BLChatThankYou],
  //   post: [],
  //   current: [this.BlChatCName]
  // };
  // if (usercookie.getParameterValue(imeshExist(), "uv") !== "V") {
  var md = toAskMoreDetails(tmpId);
  if (md.ask === false) md = urlConditions(tmpId);
  var hooks = {
    pre: [this.BLChatOtp],
    post: [],
    current: [this.BlChatgst],
  };
  // }
  if (md.ask === true && (md.key === 1 || md.key === 2)) {
    this.NumberofClassCalled = 1;
    var mdObj = returnmdtlObject(array, hooks, tmpId, that, false, md);
    CreateSeq(mdObj);
  } else {
    this.BLChatRd(tmpId);
  }
};

FormSeq.prototype.BLChatThankYou = function (tmpId) {
  var that = this;
  this.NumberofClassCalled = 1;
  var array = {
    UiArray: [],
    ServiceArray: [],
  };
  var hooks = {
    pre: [],
    post: [],
    current: [this.BLChatThankYou],
  };
  var ThankYouObj = {
    object: {
      obj: new ThankYou(tmpId),
      toReplace: false,
      objHtmlId: tmpId + "_thankDiv",
      isService: false,
      array: array,
      hooks: hooks,
    },
    tmpId: tmpId,
    that: that,
    AfterService: [],
    hasFallback: false,
    FallbackObj: null,
  };
  this.MakeSeq(ThankYouObj);
};

function BlStaticQues(tmpId) {
  this.StaticHtml = "";
  this.uploadfiles = 0;
  this.files = "";
  this.deleteId = 0;
  this.className = "BlStaticQues";
  this.attachmentCalled = false;
  this.staticCalled = false;
}
BlStaticQues.prototype.hasHtml = function (StaticObj) {
  if (isSet(StaticObj)) {
    // ReqObj.Form[StaticObj.tmpId].Isq.CurrentPageQuestions = [];
    var tmpId = StaticObj.tmpId;
    this.getHtml(tmpId);
    if (this.StaticHtml !== "") {
      ReqObj.Form[tmpId].currentclassCount++;
      this.ifHtmlPresent(StaticObj, tmpId);
    } else {
      this.ifHtmlNotPresent(StaticObj, tmpId);
    }
  }
};

BlStaticQues.prototype.getHtml = function (tmpId) {
  this.StaticHtml += "<div class='bemt15' id='t" + tmpId + "_isqStatic'>";
  this.StaticData = {
    DATA: [],
  };
  if (!StaticQuesForeignUser(tmpId)) {
    if (!ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown) {
      // for enq attach
      this.isAttachmentCalled = true;
      this.StaticHtml += this.attachFiles(tmpId);
    }
    //this.StaticHtml += this.attachFiles(tmpId);
    if (
      currentISO() === "IN" &&
      !ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown
    ) {
      this.isStaticCalled = true;
      this.StaticData = {
        DATA: [
          {
            IM_SPEC_MASTER_FULL_DESC: "",
            IM_SPEC_MASTER_ID: "147968",
            IM_SPEC_MASTER_DESC: "Looking for suppliers",
            IM_SPEC_MASTER_TYPE: "2",
            IM_SPEC_OPTIONS_DESC: DataSeparator([
              "Anywhere in India",
              "Local Only",
              "Specific City",
            ]),
            IM_SPEC_OPTIONS_ID: DataSeparator(["386611", "386612", "386613"]),
          },
        ],
      };
    } else if (currentISO() !== "IN") {
      this.isStaticCalled = true;
    }
  } else {
    ReqObj.Form[tmpId].EnrichmentVal = "";

    // if (StaticQuesForeignUser(tmpId)) {
    //   this.isStaticCalled = true;
    //   if (ReqObj.Form[tmpId].modrefType.toLowerCase() === "product") {

    //     var QuantityUnitArray = [];
    //     var PrioritizedField = ["Unit(s)", "Piece(s)", "Kilogram(s)", "Ton", "Box(es)", "Meter(s)"];
    //     var NormalField = ["Kilogram", "Nos", "Tons", "20' Container", "40' Container", "Bags", "Bag", "Barrel", "Barrels", "Bottles", "Boxes", "Bushel", "Bushels", "Cartons", "Dozens", "Foot", "Gallon", "Grams", "Hectare", "Kilometer", "Kilowatt", "Litre", "Litres", "Long Ton", "Metric Ton", "Metric Tons", "Ounce", "Packets", "Packs", "Pair", "Pairs", "Piece", "Pound", "Reams", "Rolls", "Sets", "Sheets", "Short Ton", "Square Feet", "Square Meters", "Watt"];
    //     QuantityUnitArray = PrioritizedField.concat(NormalField);
    //     var Option_Id = [];
    //     for (var i = 0; i < QuantityUnitArray.length; i++) {
    //       Option_Id.push("1");
    //     }
    //     QuantityUnitArray.push("Other");
    //     Option_Id.push("-99");
    //     this.StaticData = {
    //       "DATA": [
    //         [{
    //           "IM_SPEC_MASTER_FULL_DESC": "",
    //           "IM_SPEC_MASTER_ID": "375782",
    //           "IM_SPEC_MASTER_TYPE": "1",
    //           "IM_SPEC_MASTER_DESC": "Quantity",
    //           "IM_SPEC_OPTIONS_DESC": "None",
    //           "IM_SPEC_OPTIONS_ID": "3433901"
    //         }, {
    //           "IM_SPEC_MASTER_FULL_DESC": "",
    //           "IM_SPEC_MASTER_ID": "376269",
    //           "IM_SPEC_MASTER_TYPE": "3",
    //           "IM_SPEC_MASTER_DESC": "Quantity Unit",
    //           "IM_SPEC_OPTIONS_DESC": DataSeparator(QuantityUnitArray),
    //           "IM_SPEC_OPTIONS_ID": DataSeparator(Option_Id)
    //         }]
    //       ]
    //     };
    //   }

    // }
  }
  ReqObj.Form[tmpId].prevCount = 0;
  ReqObj.Form[tmpId].stopper = 0;
  ReqObj.Form[tmpId].stopper =
    Math.min(3, this.StaticData.DATA.length - ReqObj.Form[tmpId].prevCount) +
    ReqObj.Form[tmpId].prevCount;
  ReqObj.Form[tmpId].Isq.CurrentPageQuestions = [];
  var city =
    isSet(ReqObj.Form[tmpId].preFilledIsq["looking for suppliers"]) &&
      isSet(ReqObj.Form[tmpId].preFilledIsq["looking for suppliers"][0])
      ? ReqObj.Form[tmpId].preFilledIsq["looking for suppliers"][0]
      : "";
  this.prefilled = city;
  this.TraverseStaticQuestion(tmpId);

  this.StaticHtml += "</div>";
};

BlStaticQues.prototype.ifHtmlPresent = function (StaticObj, tmpId) {
  if (this.isStaticCalled === true) {
    ReqObj.Form[StaticObj.tmpId].flags.isEnrichShown.isStaticShown = true; // for enq attach
  }
  if (this.isAttachmentCalled === true) {
    ReqObj.Form[StaticObj.tmpId].flags.isEnrichShown.isAttachmentShown = true; // for enq attach
    ReqObj.Form[StaticObj.tmpId].isAttachmentShown = true;
  }
  StaticObj.that.NumberofClassCalled -= 1;
  AttachObject(StaticObj.object, tmpId);
  if (isSet(StaticObj.AfterService)) {
    for (var i = 0; i < StaticObj.AfterService.length; i++) {
      StaticObj.that.MakeSeq(StaticObj.AfterService[i], tmpId);
    }
  }
  if (StaticObj.that.NumberofClassCalled === 0) {
    makeFinalSeq(StaticObj, tmpId);
  }
};

BlStaticQues.prototype.ifHtmlNotPresent = function (StaticObj, tmpId) {
  if (StaticObj.hasFallback) {
    CreateSeq(StaticObj.FallbackObj);
  }
};

BlStaticQues.prototype.TraverseStaticQuestion = function (tmpId) {
  var finalIsqQuestions = [];
  var finalIsqQuestions2 = [];
  var CurrentPageQuestions = [];
  for (
    var i = ReqObj.Form[tmpId].prevCount;
    i < ReqObj.Form[tmpId].stopper;
    i++
  ) {
    ReqObj.Form[tmpId].Isq.Question = [];

    // whole_wrapper += "<div id=t" + tmpId + "isq_div" + ReqObj.Form[tmpId].IsqDiv + " class='be-row'>";
    ReqObj.Form[tmpId].toGetCurrentPagestring = true;
    FindIsqObject(this.StaticData.DATA[i], tmpId, 0, false, finalIsqQuestions);
    FindIsqObjectQuestions(
      this.StaticData.DATA[i],
      tmpId,
      0,
      false,
      finalIsqQuestions2
    );

    CurrentPageQuestions.push(ReqObj.Form[tmpId].Isq.Question);
  }
  ReqObj.Form[tmpId].Isq.CurrentPageQuestions.push(CurrentPageQuestions);
  ReqObj.Form[tmpId].prevCount = ReqObj.Form[tmpId].stopper;
  // if (whole_wrapper !== "") {
  //   whole_wrapper = IsqContainer + whole_wrapper + "</div>";
  // }
  var IsqBoxSuffixOuterHtml = "";
  var IsqBoxSuffixClosingHtml = "";
  var IsqBoxSuffixHtmlObj = {
    SuffixOuterHtml: IsqBoxSuffixOuterHtml,
    SuffixClosingHtml: IsqBoxSuffixClosingHtml,
    suffix: "",
  };

  //sthis.StaticHtml += MakeWrapper(finalIsqQuestions, tmpId, IsqBoxSuffixHtmlObj);
  this.StaticHtml += MakeWrapper(
    finalIsqQuestions,
    tmpId,
    IsqBoxSuffixHtmlObj,
    ""
  );
  // return whole_wrapper;
};

BlStaticQues.prototype.displayHtml = function (tmpId) {
  if (isOtherEnq(tmpId)) {
    ReqObj.Form[tmpId].calledClassName[
      ReqObj.Form[tmpId].FormSequence.StepCounter
    ] = this.className;
  }
  return [this.StaticHtml];
};
BlStaticQues.prototype.attachFiles = function (tmpId) {
  if (isSSB(tmpId)) return SSBAttachFile(tmpId);
  // var div = '<div><ul class="be-att">';
  // var style = "";
  // var div1 = "";
  // var li = "";
  // for (var i = 1; i < 5; i++) {
  //     if (ReqObj.Form[tmpId].flags.isDescDivShown === true) {
  //         li = (i === 1) ? '<li class="attch_add"' : '<li class="attch_add bedsnone"';
  //         style = (i === 1) ? 'style="clear:both;border-top:1px solid #dfd8d8"' : 'style="border-left:0px;border-top:1px solid #dfd8d8"';
  //     } else {
  //         li = (i === 1) ? '<li class="attch_add"' : '<li class="attch_add bedsnone"';
  //         style = (i === 1) ? 'style="clear:both;"' : 'style="border-left:0px"';
  //     }

  //     if (i < 4) {
  //         div1 = '<div id="t' + tmpId + 'attachaddmore' + i + '" class="add_More bedsnone">+</div>';
  //     }

  //     div += li + 'id="t' + tmpId + 'attachment_div_' + i + '"' + style + '>' + div1 + '<span id="t' + tmpId + 'add_attachment_' + i + '" class="att Be9"><span class="Be10">Attach Files</span></span><div class="posi flt-rgt pdz bedsnone" id="t' + tmpId + 'upload_indicator_' + i + '"><img src=""></div><span href="#" id="t' + tmpId + 'file_attached_' + i + '" class="att2 Be11 bedsnone" target="_blank"></span><span id="t' + tmpId + 'remove_attachment_' + i + '" class="blnewform_sprit Be12 bedsnone"></span><div class="attch_add bedsnone" style="height:150px;"><iframe id="t' + tmpId + 'add_attach_iframe_' + i + '" name="t' + tmpId + 'add_attach_iframe_' + i + '" style="width:100%;height:80px;" border="0" framespacing="0" allowtransparency="true"></iframe><input type="file" id="t' + tmpId + 'input_attach_' + i + '" style="height: 0px; width: 0px;visibility: hidden;" name="image"><input type="hidden" id="t' + tmpId + 'type_' + i + '"><input type="hidden" name="t' + tmpId + 'attachment_path_' + i + '" value="" id="t' + tmpId + 'attachment_path_' + i + '"><input type="hidden" name="t' + tmpId + 'attachment_file_name_' + i + '" value="" id="t' + tmpId + 'attachment_file_name_' + i + '"><input type="hidden" name="success-url" value= "$server_name/eto-upload-attachment.mp" id="t' + tmpId + 'success_url_' + i + '"><input type="hidden" name="failure-url" value="$server_name/eto-upload-attachment.mp" id="t' + tmpId + 'failure_url_' + i + '"><input type="hidden" name="t' + tmpId + 'img_small_ori_' + i + '" value="" id="t' + tmpId + 'img_small_ori_' + i + '"><input type="hidden" name="t' + tmpId + 'myfile_doc_' + i + '" value="" id="t' + tmpId + 'myfile_doc_' + i + '"></li>';
  // }

  // div += '</ul></div>';
  // return div;
  var cbl_br = (isInactiveBL(tmpId)) ? "cbl_br10" : "";
  var width_par = (isInactiveBL(tmpId)) ? "width: 130px; margin-bottom: 20px;" : "";
  var inline = (isInactiveBL(tmpId)) ? "" : "style = 'padding-bottom:20px;'";
  var div =
    '<div id="t' +
    tmpId +
    "myDIV" +
    '" class ="inAtch ' + cbl_br + '" style ="text-align:center;clear:both;border-top:1px solid #dfd8d8;' + width_par + '"><input type="file" id="t' +
    tmpId +
    "myInput" +
    '"  class = "" ><span id="t0102add_attachment_1" class="att Be9"><span id= "t' +
    tmpId +
    "attachfiles" +
    '"  class="Be10">Attach Files</span></span></div><ul id="t' +
    tmpId +
    "myUL" +
    '" class = "myUL" ' + inline + '></ul>';
  return div;
};
BlStaticQues.prototype.SaveDetails = function (tmpId) {
  SaveIsq(tmpId, "static", 0);

  if ($("#spcity").length > 0) {
    ReqObj.Form[tmpId].Static.enrichCityDetail = {};
    ReqObj.Form[tmpId].Static.enrichCity1 = $(
      "#t" + tmpId + "_enrich_city1"
    ).val();
    ReqObj.Form[tmpId].Static.enrichCity2 = $(
      "#t" + tmpId + "_enrich_city2"
    ).val();
    ReqObj.Form[tmpId].Static.enrichCity3 = $(
      "#t" + tmpId + "_enrich_city3"
    ).val();
    ReqObj.Form[tmpId].Static.enrichCity1id = $(
      "#t" + tmpId + "_enrich_city1specificcity_hidden"
    ).val();
    ReqObj.Form[tmpId].Static.enrichCity2id = $(
      "#t" + tmpId + "_enrich_city2specificcity_hidden"
    ).val();
    ReqObj.Form[tmpId].Static.enrichCity3id = $(
      "#t" + tmpId + "_enrich_city3specificcity_hidden"
    ).val();
    ReqObj.Form[tmpId].Static.enrichCityDetail[
      ReqObj.Form[tmpId].Static.enrichCity1
    ] = ReqObj.Form[tmpId].Static.enrichCity1id;
    ReqObj.Form[tmpId].Static.enrichCityDetail[
      ReqObj.Form[tmpId].Static.enrichCity2
    ] = ReqObj.Form[tmpId].Static.enrichCity2id;
    ReqObj.Form[tmpId].Static.enrichCityDetail[
      ReqObj.Form[tmpId].Static.enrichCity3
    ] = ReqObj.Form[tmpId].Static.enrichCity3id;
  }
  for (var i = 1; i < 5; i++) {
    if ($("#t" + tmpId + "file_attached_" + i).length > 0) {
      ReqObj.Form[tmpId].Static["img_small_ori_" + i] = $(
        "#t" + tmpId + "img_small_ori_" + i
      ).val();
      ReqObj.Form[tmpId].Static["myfile_doc_" + i] = $(
        "#t" + tmpId + "myfile_doc_" + i
      ).val();
    } else {
      ReqObj.Form[tmpId].Static["img_small_ori_" + i] = "";
      ReqObj.Form[tmpId].Static["myfile_doc_" + i] = "";
    }
  }
};

BlStaticQues.prototype.getData = function (tmpId) {
  var enrichObj = {};
  enrichObj["modid"] = modIdf;
  enrichObj["offer_id"] = ReqObj.Form[tmpId].generationId;
  enrichObj["s_glusrid"] = usercookie.getParameterValue(imeshExist(), "glid");
  enrichObj["blEnqFlag"] = IsChatbl(tmpId) ? "BL" : ReqObj.Form[tmpId].formType;
  enrichObj["updatevalue"] = "updatevalue";
  if (isSet(ReqObj.Form[tmpId].Static.enrichCityDetail)) {
    var city = Object.keys(ReqObj.Form[tmpId].Static.enrichCityDetail);
    for (var i = 0; i < 3; i++) {
      var index = i + 1;
      if (
        isSet(city[i]) &&
        isSet(ReqObj.Form[tmpId].Static.enrichCityDetail[city[i]])
      ) {
        enrichObj["enrichCity" + index] = city[i];
        enrichObj["enrichCity" + index + "id"] =
          ReqObj.Form[tmpId].Static.enrichCityDetail[city[i]];
      } else {
        enrichObj["enrichCity" + index] = "";
        enrichObj["enrichCity" + index + "id"] = "";
      }
    }
  }
  // enrichObj.enrichCity1 = ReqObj.Form[tmpId].Static.enrichCity1;
  // enrichObj.enrichCity2 = ReqObj.Form[tmpId].Static.enrichCity2;
  // enrichObj.enrichCity3 = ReqObj.Form[tmpId].Static.enrichCity3;
  // enrichObj.enrichCity1id = ReqObj.Form[tmpId].Static.enrichCity1id;
  // enrichObj.enrichCity2id = ReqObj.Form[tmpId].Static.enrichCity2id;
  // enrichObj.enrichCity3id = ReqObj.Form[tmpId].Static.enrichCity3id;
  if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
    enrichObj["r_glusrid"] = ReqObj.Form[tmpId].rcvGlid;
    enrichObj["q_dest"] = ReqObj.Form[tmpId].query_destination;
  }
  if (
    isSet(ReqObj.Form[tmpId].Static.optionsValue) &&
    ReqObj.Form[tmpId].Static.optionsValue.length > 0
  ) {
    if (isSet(ReqObj.Form[tmpId].Static.questionsDesc)) {
      for (var i = 0; i < ReqObj.Form[tmpId].Static.questionsDesc.length; i++) {
        enrichObj.prefered_suppliers_location =
          ReqObj.Form[tmpId].Static.questionsDesc[i] === "Looking for suppliers"
            ? ReqObj.Form[tmpId].Static.optionsValue[i]
            : ""; // looking for suppliers
        // if (StaticQuesForeignUser(tmpId)) {
        //   if (ReqObj.Form[tmpId].Static.questionsDesc[i].toLowerCase() === "quantity")
        //     enrichObj["enrichDesc"] += ReqObj.Form[tmpId].Static.questionsDesc[i] + ": " + ReqObj.Form[tmpId].Static.optionsValue[i] + " ";
        //   else if (ReqObj.Form[tmpId].Static.questionsDesc[i].toLowerCase() === "quantity unit")
        //     enrichObj["enrichDesc"] += ReqObj.Form[tmpId].Static.optionsValue[i];
        // }
      }
    }
  }
  for (var i = 1; i < 5; i++) {
    enrichObj["img_small_ori_" + i] =
      ReqObj.Form[tmpId].Static["img_small_ori_" + i];
    enrichObj["myfile_doc_" + i] = ReqObj.Form[tmpId].Static["myfile_doc_" + i];
  }
  if (ReqObj.Form[tmpId].ReqDtlBox === "") {
    enrichObj["enrichDesc"] = trimVal(enrichObj["enrichDesc"]);
    if (isSet(enrichObj["enrichDesc"]) && enrichObj["enrichDesc"] !== "")
      enrichObj["enrichDesc"] =
        enrichObj["enrichDesc"][enrichObj["enrichDesc"].length - 1] === ","
          ? enrichObj["enrichDesc"].slice(0, -1)
          : enrichObj["enrichDesc"];
  }
  ReqObj.Form[tmpId].EnrichmentVal = enrichObj["enrichDesc"];
  if (isSet(ReqObj.Form[tmpId].ReqDtlBox)) {
    if (ReqObj.Form[tmpId].ReqDtlBox !== "")
      enrichObj["enrichDesc"] =
        isSet(enrichObj["enrichDesc"]) && enrichObj["enrichDesc"] !== ""
          ? ReqObj.Form[tmpId].ReqDtlBox + ", " + enrichObj["enrichDesc"]
          : ReqObj.Form[tmpId].ReqDtlBox;
    else enrichObj["enrichDesc"] = enrichObj["enrichDesc"];
  }
  return ObjectTrim(enrichObj);
};

BlStaticQues.prototype.onSubmit = function (tmpId) {
  var enrichObj = this.getData(tmpId);
  var PreStaticObj = PreAjax("BlStaticQues", tmpId);
  if (isObjectEmpty(enrichObj) && ValidGenId(ReqObj.Form[tmpId].generationId))
    fireAjaxRequest({
      data: {
        ga: {
          s: true,
          f: true,
          gatype: "saveEnrichment",
          source: "",
        },
        tmpId: tmpId,
        ajaxObj: {
          obj: PreStaticObj,
          s: {
            ss: 1,
            sf: {
              af: 0,
              pa: 0,
            },
            f: 1,
          },
          f: {
            f: 1,
          },
        },
        ajaxtimeout: 3000,
        ajaxdata: enrichObj,
        hitfinserv: "",
        type: 1,
      },
    });
  else PostAjax(PreStaticObj, tmpId);
};
//BlStaticQues.prototype.GetDetail = function (tmpId) {};
BlStaticQues.prototype.displayAnswer = function (tmpId) {
  var classtotest = chatBlClass(tmpId, "right");
  var leftright = IsChatbl(tmpId) ? "message-right1" : "";
  return [
    ConversationRightWrapper(tmpId, GetAnswer(tmpId, "static"), {
      classtotest: classtotest,
      leftright: leftright,
    }),
  ];
};

BlStaticQues.prototype.defaultEventsForAttach = function (tmpId) {
  var that = this;
  RadioClick(tmpId);
  $("#t" + tmpId + "myInput").on(
    "change",
    {
      tmpId: tmpId,
      // loop: i,
      modId: modIdf,
      that: that,
    },
    that.uploadFile
  );
  for (var i = 1; i < 5; i++) {
    $("#t" + tmpId + "add_attachment_" + i).on(
      "click",
      {
        tmpId: tmpId,
        loop: i,
      },
      that.openWin
    );
    $("#t" + tmpId + "input_attach_" + i).on(
      "change",
      {
        tmpId: tmpId,
        loop: i,
        modId: modIdf,
        that: that,
      },
      that.uploadFile
    );
    $("#t" + tmpId + "attachaddmore" + i).on(
      "click",
      {
        tmpId: tmpId,
        todo: "addMoreAttachments",
        loop: i,
      },
      that.handleUI
    );
    $("#t" + tmpId + "remove_attachment_" + i).on(
      "click",
      {
        tmpId: tmpId,
        loop: i,
        that: that,
      },
      that.deleteFileOg
    ); //attachfilesellers
  }
};
BlStaticQues.prototype.deleteFileOg = function (event) {
  //attachfilesellers
  if (isSet(event) && isSet(event.data)) {
    var tmpId = event.data.tmpId;
    var i = event.data.loop;
    var obj = event.data.that;
    $.ajax({
      url: appsServerName + "index.php?r=enrichform/DeleteAttachment",
      data: { file: $("#t" + tmpId + "attachment_file_name_" + i).val() },
      dataType: "json",
      type: "GET",
      success: function (res) {
        if (isSet(res)) {
          obj.handleUI({ data: { tmpId: tmpId, loop: i, todo: "deleteFile" } });
        }
      },
      error: function (res) { },
    });
  }
};

BlStaticQues.prototype.openWin = function (event) {
  var tmpId = event.data.tmpId;
  var i = event.data.loop;
  $("#t" + tmpId + "input_attach_" + i).val(null);
  $("#t" + tmpId + "input_attach_" + i).click();
};

BlStaticQues.prototype.getFileData = function (
  tmpId,
  attachLoop,
  modid,
  obj,
  mode,
  event
) {
  //if ($("#t" + tmpId + "input_attach_" + attachLoop).val() === null)
  if (
    $("#t" + tmpId + "myInput").val() === null ||
    $("#t" + tmpId + "input_attach_" + attachLoop).val() === null
  )
    //attachfilesellers

    return "";
  else {
    if (isSet(obj)) {
      var f = 0;
      // var attachment = $("#t" + tmpId + "input_attach_" + attachLoop)[0];
      var attachment =
        modid === "SELLERS" && isSSB(tmpId)
          ? $("#t" + tmpId + "input_attach_" + attachLoop)[0]
          : $("#t" + tmpId + "myInput")[0]; //attachfilesellers
      obj.file = attachment.files[0];

      if (mode === "1") obj.file = event.File;

      var data = new FormData();
      if (isSet(obj.file)) data.append("IMAGE", obj.file);

      var name = isSet(obj.file) ? obj.file.name : ""; // js error TypeError Cannot read properties of undefined (reading 'name')
      name = name.replace(/\'+/g, "_"); /* ' replaced by _ */
      var row_value = 0;
      var img_value = "";

      if (/\//.test(name)) {
        var my_array = name.split("/");
        row_value = my_array[my_array.length - 1];
      } else {
        var my_array = name.split("\\");
        row_value = my_array[my_array.length - 1];
      }

      img_value = row_value.replace(/\\s+/g, "-");
      img_value = img_value.toLowerCase();

      if (img_value.indexOf("\\") > -1) {
        img_value = img_value.replace(/\\/g, "/");
      }
      if (img_value.indexOf(" ") > -1) {
        img_value = img_value.replace(/ /g, "-");
      }

      var img_value_name = img_value.substr(img_value.lastIndexOf("/") + 1);

      $("#t" + tmpId + "attachment_file_name_" + attachLoop).value =
        img_value_name;

      if (img_value_name.length > 65) {
        f = 1;
        alert("Filename cannot have more than 65 characters");
      }

      var img_value_name1 = img_value_name.split(".");

      if (img_value_name1.length > 2) {
        f = 1;
        alert("Filename cannot contain dot(.)");
      }
      if (img_value_name.lastIndexOf(" ") > -1) {
        f = 1;
        alert(
          "Filename can contain only alphabets (a-z A-Z) , numbers (0-9) , underscore (_) or hiphen (-)"
        );
      }

      var ext = img_value.substr(img_value.indexOf("."), img_value.length);
      ext = ext.toLowerCase();
      if (
        ext === ".jpg" ||
        ext === ".gif" ||
        ext === ".png" ||
        ext === ".jpeg"
      ) {
        $("#t" + tmpId + "type_" + attachLoop).val("default");
      } else if (
        ext === ".pdf" ||
        ext === ".doc" ||
        ext === ".docx" ||
        ext === ".xls" ||
        ext === ".xlsx" ||
        ext === ".txt" ||
        ext === ".rtf" ||
        ext === ".ppt" ||
        ext === ".pptx"
      ) {
        $("#t" + tmpId + "type_" + attachLoop).val("doc");
      } else {
        f = 1;
        alert(
          "Attachment can be either of jpg / gif / png / pdf / doc / docx / xls / xlsx / txt / rtf / ppt / pptx file extensions only"
        );
      }

      $("#t" + tmpId + "upload_indicator_" + attachLoop).removeClass(
        "bedsnone"
      );

      data.append("MODID", modid);
      data.append("USR_ID", usercookie.getParameterValue(imeshExist(), "glid"));
      data.append("IMAGE_TYPE", "Rfq");
      data.append("UPLOADED_BY", "User");

      if (f === 1) {
        return false;
      }

      return data;
    }
  }
};

BlStaticQues.prototype.defaultEvents = function (tmpId) {
  this.defaultEventsForAttach(tmpId);
  SelectBoxEvents(tmpId);
  InputBoxEvents();

  CheckBoxClick(tmpId);
  $(document).on("hover", ".info_iconeqbl", function () {
    $(this).children(".full_desc").removeClass("bedsnone");
  });
  $(document).on("mouseout", ".info_iconeqbl", function () {
    $(this).children(".full_desc").addClass("bedsnone");
  });
  RadioClick(tmpId);
  $(".t" + tmpId + "other_radiotemp")
    .off("click")
    .on("click", function (event) {
      if ($(this).hasClass("t" + tmpId + "be-radioboxtemp")) {
        $(this)
          .siblings()
          .each(function () {
            if ($(this).parent().css("display") === "block") {
              isRadioOtherClicked(this);
            }
          });
      }
    });
  get_buyer_info(tmpId);
  if (imeshExist() !== "" && !isInactiveBL(tmpId))
    $("#t" + tmpId + "_leftR").removeClass("lftMgn");
  if (
    isSet(this.prefilled) &&
    this.prefilled.toLowerCase() === "specific city"
  ) {
    findPrefilledcity(
      ReqObj.Form[tmpId].preFilledIsq["preferred_location"],
      tmpId
    );
    enrichCityhtml(
      $(".specCity")[0].id,
      "t" + tmpId,
      1,
      ReqObj.Form[tmpId].staticPrefilledCity
    );
  }
};




function findPrefilledcity(cityString, tmpId) {
  var city1 = "",
    city2 = "",
    city3 = "",
    tempvar;
  if (isSet(cityString)) {
    if (cityString.includes(",")) {
      cityString = cityString.split(",");
      city1 = cityString[0].trim().split(" ");
      city1 = city1[city1.length - 1];
      tempvar = cityString[1].trim().split(" ");
      city2 = tempvar[0];
      city3 = tempvar[2];
    } else if (cityString.includes("and")) {
      cityString = cityString.split("from");
      cityString = cityString[1].trim().split(" ");
      city1 = cityString[0];
      city2 = cityString[2];
    } else if (cityString.includes("from")) {
      cityString = cityString.split("from");
      cityString = cityString[1].trim().split(" ");
      city1 = cityString[0];
    }
  }
  ReqObj.Form[tmpId].staticPrefilledCity = [city1, city2, city3];
}

BlStaticQues.prototype.EventIfScreenPresent = function (tmpId) {
  if (isOtherEnq(tmpId)) {
    this.handleHeading(tmpId);
    ButtonNameUI("isq", tmpId);
  }
};

BlStaticQues.prototype.handleHeading = function (tmpId) {
  if (ReqObj.Form[tmpId].formType.toLowerCase() !== "enq"){
    if(isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0){
      $("#blheading").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    }
    else{
      $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    }
  }
  else {
    if (isImageVidEnq(tmpId) &&ReqObj.Form[tmpId].FormSequence.StepCounter === 0)
      $("#t" + tmpId + "_hdg").addClass("bedsnone").html("");
    else
      $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    if (isOtherEnq(tmpId)) ButtonNameUI("staticques", tmpId);
  }
};

BlStaticQues.prototype.handleButton = function (tmpId) {
  ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
};

BlStaticQues.prototype.validate = function (tmpId) {
  return ValidateQuestions(tmpId, true, 0);
};

function deleteAttachedFile(event) {
  // console.log(event.target);
  event.target.parentElement.style.display = "none";
  BlStaticQues.prototype.deleteFile(event);
}



var attachcounter = 0;
var attachnumber = [0, 1, 2, 3];
BlStaticQues.prototype.uploadFile = function (event, mode) {
  var tmpId = event.data.tmpId;
  ReqObj["Temp_Id"] = tmpId;
  var i = event.data.loop;
  var modid = event.data.modId;
  var obj = event.data.that;
  if (!isSet(event.mode)) event.mode = "0";
  var data = obj.getFileData(tmpId, i, modid, obj, event.mode, event);
  if (imeshExist() === "" && isSSB(tmpId) && data !== "" && data !== false) {
    event.File = event.data.that.file;
    event.mode = "1";
    attachmentCode(tmpId, event);
    return;
  }

  if (data !== "" && data !== false) {
    var url = "";
    if (appsServerName === "//dev-apps.imimg.com/")
      url = "https://dev-uploading.imimg.com/uploadimage";
    else if (appsServerName === "//stg-apps.imimg.com/")
      url = "https://stg-uploading.imimg.com/uploadimage";
    else url = "https://uploading.imimg.com/uploadimage";

    if (
      isObjectEmpty(data) &&
      (ValidGenId(ReqObj.Form[tmpId].generationId) || isSSB(tmpId))
    ) {
      $.ajax({
        url: url,
        type: "POST",
        data: data,
        processData: false,
        contentType: false,
        success: function (response) {
          if (isSet(response)) {
            if (parseInt(response.Code) === 200) {
              obj.uploadfiles++;
              var filepath = response.Data.AwsPath.Image_Original_Path;
              var filename_orig = obj.file.name;
              var filename = filepath.substring(filepath.lastIndexOf("/") + 1);
              if (response.Status === "Success") {
                if (modid === "SELLERS" && isSSB(tmpId)) {
                  //attachfilesellers
                  $("#t" + tmpId + "file_attached_" + i).attr("href", filepath);
                  $("#t" + tmpId + "file_attached_" + i).html(filename_orig);
                  $("#t" + tmpId + "attachment_path_" + i).val(filepath);
                  $("#t" + tmpId + "attachment_file_name_" + i).val(filename);
                } else {
                  if (!(isSSB(tmpId) && mode == "1")) {
                    if (attachcounter < 5) {
                      var attachhtml =
                        '<li class = "myLI" style = "text-align:center;clear:both;border:1px solid #dfd8d8; margin-bottom:4px"><span class="att2 Be11" href = "' +
                        filepath +
                        '" target="_blank"> ' +
                        filename +
                        ' </span><span class="close blnewform_sprit Be12"  onclick = "deleteAttachedFile(event)"></span></li>';
                      $("#t" + tmpId + "myUL").append(attachhtml);
                      $("#t" + tmpId + "myInput").val("");
                      attachcounter += 1;
                      if (attachcounter == 4) {
                        $("#t" + tmpId + "myDIV")
                          .attr("disabled", "disabled")
                          .css({
                            opacity: "0.4",
                            cursor: "default",
                          });
                        $("#t" + tmpId + "attachfiles").addClass("grey");

                        $("#t" + tmpId + "myInput").attr("disabled", true);
                      }
                    }
                  }
                }

                if ($("#t" + tmpId + "type_" + i).val() === "default")
                  $("#t" + tmpId + "img_small_ori_" + i).val(filepath);
                else $("#t" + tmpId + "myfile_doc_" + i).val(filepath);
                obj.handleUI({
                  data: {
                    todo: "uploadSuccess",
                    tmpId: tmpId,
                    loop: i,
                  },
                });
              } else {
                alert(response.Reason);
                obj.handleUI({
                  data: {
                    todo: "uploadFailure",
                    tmpId: tmpId,
                    loop: i,
                  },
                });
                if (isSSB(tmpId) && toDeleteAttachment(tmpId))
                  obj.handleUI({
                    data: {
                      tmpId: tmpId,
                      loop: i,
                      todo: "deleteFile",
                    },
                  });
                return false;
              }
            } else {
              alert(response.Reason);
              obj.handleUI({
                data: {
                  todo: "uploadFailure",
                  tmpId: tmpId,
                  loop: i,
                },
              });
              if (isSSB(tmpId) && toDeleteAttachment(tmpId))
                obj.handleUI({
                  data: {
                    tmpId: tmpId,
                    loop: i,
                    todo: "deleteFile",
                  },
                });
              return false;
            }
          }
        },
        error: function () {
          alert("File is not uploaded.Please try again...");
          obj.handleUI({
            data: {
              todo: "uploadFailure",
              tmpId: tmpId,
              loop: i,
            },
          });
          if (isSSB(tmpId) && toDeleteAttachment(tmpId))
            obj.handleUI({
              data: {
                tmpId: tmpId,
                loop: i,
                todo: "deleteFile",
              },
            });

          return false;
        },
      });
    }
  }
};
BlStaticQues.prototype.handleUI = function (event) {
  var todo = event.data.todo;
  var tmpId = event.data.tmpId;
  var i = event.data.loop;

  if (todo === "uploadSuccess") {
    $("#t" + tmpId + "remove_attachment_" + i).removeClass("bedsnone");
    $("#t" + tmpId + "add_attachment_" + i).addClass("bedsnone");
    var flag = 0;
    for (var k = 1; k < 5; k++) {
      //attachfileseller
      if (
        !$("#t" + tmpId + "add_attachment_" + k).hasClass("bedsnone") &&
        !$("#t" + tmpId + "attachment_div_" + k).hasClass("bedsnone")
      )
        flag = 1;
      if (
        !$("#t" + tmpId + "attachment_div_" + k).hasClass("bedsnone") &&
        !$("#t" + tmpId + "attachaddmore" + k).hasClass("bedsnone")
      )
        flag = 1;
    }
    $("#t" + tmpId + "upload_indicator_" + i).addClass("bedsnone");
    $("#t" + tmpId + "file_attached_" + i).removeClass("bedsnone");
    $("#t" + tmpId + "attachaddmore" + i).removeClass("bedsnone");
  }
  if (todo === "uploadFailure") {
    $("#t" + tmpId + "upload_indicator_" + i).addClass("bedsnone");
  }
  if (todo === "addMoreAttachments") {
    var j = i + 1;
    $("#t" + tmpId + "attachment_div_" + j).removeClass("bedsnone");
    $("#t" + tmpId + "attachaddmore" + i).addClass("bedsnone");
  }
  if (todo === "deleteFile") {
    $("#t" + tmpId + "addmore_attachment" + i).addClass("bedsnone");
    $("#t" + tmpId + "file_attached_" + i).attr("href", "");
    $("#t" + tmpId + "file_attached_" + i).html("");
    $("#t" + tmpId + "file_attached_" + i).addClass("bedsnone");
    $("#t" + tmpId + "attachment_path_" + i).val("");
    $("#t" + tmpId + "attachment_file_name_" + i).val("");
    $("#t" + tmpId + "remove_attachment_" + i).addClass("bedsnone");
    $("#t" + tmpId + "add_attachment_" + i).removeClass("bedsnone");
    $("#t" + tmpId + "upload_indicator_" + i).removeClass("bedsnone");
    $("#t" + tmpId + "attachaddmore" + i).addClass("bedsnone");
    $("#t" + tmpId + "img_small_ori_" + i).val("");
    $("#t" + tmpId + "myfile_doc_" + i).val("");
  }
};
BlStaticQues.prototype.deleteFile = function (event) {
  // var tmpId = event.data.tmpId;
  var tmpId = ReqObj["Temp_Id"];
  // var i = event.data.loop;

  // var i = parseInt(event.target.attributes.name.value);
  // var obj = event.data.that;
  if (imeshExist() === "" && isSSB(tmpId) && toDeleteAttachment(tmpId)) {
    var i = parseInt(event.target.attributes.name.value);
    deleteAttCode(tmpId, i);
  } else {
    $.ajax({
      url: appsServerName + "index.php?r=enrichform/DeleteAttachment",
      data: {
        file: event.target.parentElement.childNodes[0].innerHTML,
      },
      dataType: "json",
      type: "GET",
      success: function (res) {
        if (isSet(res)) {
          // obj.handleUI({
          //     data: {
          //         tmpId: tmpId,
          //         loop: i,
          //         todo: "deleteFile"
          //     }
          // });

          var tmpId = ReqObj["Temp_Id"];
          attachcounter -= 1;

          $("#t" + tmpId + "myDIV")
            .removeAttr("disabled")
            .css({
              opacity: "1",
              cursor: "pointer",
            });

          $("#t" + tmpId + "attachfiles").removeClass("grey");
          $("#t" + tmpId + "myInput").removeAttr("disabled", true);
        }
      },
      error: function (res) { },
    });
  }
};


function InlineDefault(tmpId) {
  $("#t" + tmpId + "_allBtn").html("");
  $("#t" + tmpId + "_thankDiv")
    .html("")
    .addClass("bedsnone");
  if (!recomOnInactive(tmpId)) {   //inactive changes
    $("#t" + tmpId + "_mcont").css({
      display: "flex",
    });
  }
}

function ShowSkip(array, tmpId) {
  var MandatoryClass = ["Isq", "BlStaticQues"];
  if (isSet(array)) {
    for (var i = 0; i < array.length; i++) {
      if ($.inArray(ConstructorName(array[i].Obj), MandatoryClass) !== -1)
        return false;
    }
    return true;
  }
  return true;
}

function ShowButton(array, tmpId) {
  // MoreDetails
  var HideButtonClass = [
    "ThankYou",
    "UserVerification",
    "ProductNameQuestion",
    "UserLogin",
    "ProductName",
    "ContactDetail",
    "TermsConditions",
    "CountrySugg",
  ];
  if (isSet(array)) {
    for (var i = 0; i < array.length; i++) {
      if ($.inArray(ConstructorName(array[i].Obj), HideButtonClass) !== -1)
        return false;
    }
    return true;
  }
  return true;
}
function modificationOnBack(tmpId) {
  if (
    isSet($("#t" + tmpId + "_cname_ocbx").val()) &&
    $("#t" + tmpId + "_cname_ocbx").val() !== ""
  ) {
    $("#t" + tmpId + "ncbx").addClass("bedsnone");
    $("#t" + tmpId + "ocbx").removeClass("bedsnone");
  } else if (
    isSet($("#t" + tmpId + "_cname_ncbx").val()) &&
    $("#t" + tmpId + "_cname_ncbx").val() !== ""
  ) {
    $("#t" + tmpId + "ocbx").addClass("bedsnone");
    $("#t" + tmpId + "ncbx").removeClass("bedsnone");
  } else if (
    isSet($("#t" + tmpId + "_cname_ocbx").val()) &&
    $("#t" + tmpId + "_cname_ocbx").val() === "" &&
    isSet($("#t" + tmpId + "_cname_ncbx").val()) &&
    $("#t" + tmpId + "_cname_ncbx").val() === ""
  ) {
    $("#t" + tmpId + "ocbx").removeClass("bedsnone");
    $("#t" + tmpId + "ncbx").removeClass("bedsnone");
  }
  //   if(isSet($($('input[type=text].oldui')[0]).val()) && $($('input[type=text].oldui')[0]).val() !== ""){
  //     $($('input[type=text].newui')[0]).parent().addClass('bedsnone')
  //     $($('input[type=text].newui')[0]).parent().parent().addClass("bedsnone")
  //     $($('input[type=text].oldui')[0]).parent().removeClass('bedsnone')
  //   }
  //   else if (isSet($($('input[type=text].newui')[0]).val()) && $($('input[type=text].newui')[0]).val() !== ""){
  //     $($('input[type=text].oldui')[0]).parent().addClass('bedsnone')
  //     $($('input[type=text].newui')[0]).parent().removeClass('bedsnone')
  //     $($('input[type=text].newui')[0]).parent().parent().removeClass("bedsnone")
  //   }
  //   else if(isSet($($('input[type=text].oldui')[0]).val()) && $($('input[type=text].oldui')[0]).val() === "" && $($('input[type=text].newui')[0]).val() === "") {
  //     $($('input[type=text].oldui')[0]).parent().removeClass('bedsnone')
  //     $($('input[type=text].newui')[0]).parent().removeClass('bedsnone')
  //     $($('input[type=text].newui')[0]).parent().parent().removeClass("bedsnone")
  //   }
}


function stepNextButton(typeofform, tmpId, currentScreen) {
  var btnObj = restScreensButton(typeofform, tmpId, currentScreen); //rest screens
  backButtonNameUI(tmpId);
  return btnObj;
}

function restScreensButton(typeofform, tmpId, currentScreen) {
  var btnObj = "";
  var imeshCookie = imeshExist();
  var iso = currentISO();
  if (
    checkblockedUser() &&
    new RegExp("userverification").test(currentScreen)
  ) {
    btnObj =
      typeofform === "bl"
        ? {
          buttonText: "Submit",
          buttonCls: "blotpbtn hovsub",
          parentCls: "befstgo3",
        }
        : { buttonText: "Submit", buttonCls: "befstgo3 hovsub", parentCls: "" };
  } else if (imeshCookie === "") {
    var btncls = isGDPRCountry() ? "befstbtn2 hovsub" : "befstgo2 hovsub";
    var bfstgo = isInactiveBL(tmpId) ? (iso == "IN") ? "befstgobl" : "bfstgobl" : (iso == "IN") ? "befstgo" : "befstgo1";
    var bfsbtnbl = isInactiveBL(tmpId) ? "bfsbtnbl hovsub" : "befstbtn hovsub";
    var valuebtn = isInactiveBL(tmpId) ? "Continue" : "Go";
    var gobtn = isInactiveBL(tmpId) ? " gobtn" : "";
    btnObj =
      typeofform === "bl"
        ? iso === "IN"
          ? {
            buttonText: "Go",
            buttonCls: "befstbtn hovsub" + gobtn,
            parentCls: bfstgo,
          }
          : {
            buttonText: valuebtn,
            buttonCls: bfsbtnbl,
            parentCls: bfstgo,
          }
        : {
          buttonText: "Submit",
          buttonCls: btncls + " hovsub",
          parentCls: "",
        }; //login
  } else {
    if (
      new RegExp("contactdetail").test(currentScreen) ||
      new RegExp("productname").test(currentScreen) ||
      currentScreen === "moredetails" ||
      new RegExp("moredetails").test(currentScreen)
    ) {
      var mt0 = isInactiveBL(tmpId) ? (new RegExp("moredetails").test(currentScreen) || (new RegExp("contactdetail").test(currentScreen) && ReqObj.Form[tmpId].FormSequence._screenCounter > 0)) ? " mt20" : " bemt0" : "";
      var btn_cls = isInactiveBL(tmpId) && currentISO() == "IN" ? " blbtn" : "";
      btnObj =
        typeofform === "bl"
          ? {
            buttonText: "Submit",
            buttonCls: "form-btn hovsub" + btn_cls,
            parentCls: "befstgo2" + mt0,
          }
          : {
            buttonText: "Submit",
            buttonCls: " befstgo2 hovsub",
            parentCls: "",
          }; // contact
    }

    if (new RegExp("userverification").test(currentScreen)) {
      btnObj =
        typeofform === "bl"
          ? {
            buttonText: "Submit",
            buttonCls: "blotpbtn hovsub",
            parentCls: "befstgo3",
          }
          : {
            buttonText: "Submit",
            buttonCls: "befstgo3 hovsub ",
            parentCls: "",
          }; // otp
    }
    if (
      new RegExp("isq").test(currentScreen) ||
      currentScreen === "isq" ||
      currentScreen === "isqrequirementdtl" ||
      currentScreen === "requirementdtl" ||
      currentScreen === "staticques" ||
      currentScreen === "requirementdtlblstaticques" ||
      currentScreen === "blstaticques" ||
      currentScreen === "moredetailsblstaticques" ||
      currentScreen === "requirementdtlmoredetails" ||
      currentScreen === "isqrequirementdtlmoredetails" ||
      currentScreen === "moredetailsblstaticques" ||
      currentScreen === "requirementdtlmoredetailsblstaticques" ||
      currentScreen === "isqmoredetails"
    ) {
      var mt0 = isInactiveBL(tmpId) ? (new RegExp("blstaticques").test(currentScreen)) ? "mt20" : "mt2" : "";
      var btn_cls = isInactiveBL(tmpId) && currentISO() == "IN" ? " blbtn" : "";
      btnObj =
        typeofform === "bl"
          ? {
            buttonText: "Next",
            buttonCls:
              isGlIdEven(tmpId) && tmpId.substr(0, 2) === "01"
                ? "form-btn hovsub mbl15_0"
                : "form-btn hovsub" + btn_cls,
            parentCls: "befstgo2 " + mt0,
          }
          : { buttonText: "Next", buttonCls: "befstgo2 hovsub", parentCls: "" }; // isq/enrich
    }
  }
  if (isImageVidEnq(tmpId)) btnObj.buttonCls += direnqImage(tmpId) ? " btmarg befwt" : " befwt";
  return btnObj;
}

function MoreDetailService(tmpId, which) {
  var data = ContactDetail.prototype.getData(tmpId, which);
  if (
    (isEnq(tmpId) || isBl(tmpId)) &&
    currentISO() === "IN" &&
    which.toLowerCase() !== "gst"
  ) {
    if (ReqObj.Form[tmpId].gst.number) {
      var _data = ContactDetail.prototype.multipleHitCases(
        data,
        "again",
        "notgst"
      );
    } else var _data = ContactDetail.prototype.multipleHitCases(data);
    data = _data.data;
  } else if (
    (isEnq(tmpId) || isBl(tmpId)) &&
    currentISO() === "IN" &&
    which.toLowerCase() === "gst"
  ) {
    var _data = ContactDetail.prototype.multipleHitCases(data);
    data = _data.data;
  } else if (
    (isEnq(tmpId) || isBl(tmpId)) &&
    currentISO() !== "IN" &&
    which.toLowerCase() !== "url"
  ) {
    if (ReqObj.Form[tmpId].url.name) {
      which = which + "URL";
      var _data = ContactDetail.prototype.multipleHitCases(
        data,
        "noturl",
        "no"
      );
    } else var _data = ContactDetail.prototype.multipleHitCases(data);
    data = _data.data;
  } else if (
    (isEnq(tmpId) || isBl(tmpId)) &&
    currentISO() !== "IN" &&
    which.toLowerCase() === "url"
  ) {
    var _data = ContactDetail.prototype.multipleHitCases(data, "url", "no");
    data = _data.data;
  } else data = data;

  data["replica"] = "";
  data["scrnNm"] =
    currentISO() === "IN"
      ? which + "Desktop Enquiry/BL Forms"
      : which + "Desktop Enquiry/BL Forms Foreign";
  data = ObjectTrim(data);
  fireAjaxRequest({
    data: {
      ga: {
        s: true,
        f: true,
        gatype: which + "Service",
        source: "",
      },
      tmpId: tmpId,
      ajaxObj: {
        obj: "",
        s: {
          ss: 0,
          sf: {
            af: 0,
            pa: 0,
          },
          f: 0,
        },
        f: {
          f: 0,
        },
      },
      ajaxtimeout: 0,
      ajaxdata: data,
      hitfinserv: "",
      type: 6,
      typename: which,
    },
  });
  if (
    (isEnq(tmpId) || isBl(tmpId)) &&
    currentISO() === "IN" &&
    _data.hitagain === true
  ) {
    MoreDetailService(tmpId, "GST");
  } else if (
    (isEnq(tmpId) || isBl(tmpId)) &&
    currentISO() !== "IN" &&
    _data.hitagain === true
  ) {
    MoreDetailService(tmpId, "URL");
  }
}


function onURLName(tmpId) {
  var url =
    urlConditions(tmpId).ask === false &&
      typeof ReqObj.UserDetail.isurl === "undefined"
      ? true
      : urlConditions(tmpId).ask;
  if (
    imeshExist() !== "" &&
    url &&
    (ReqObj.miniDetailHit.ping === false ||
      ReqObj.miniDetailHit.reply.success === true)
  ) {
    $("#t" + tmpId + "_cdiv").append(
      mdtlHtml(tmpId, 0, { ask: true, what: "URL", key: 2 })
    );
    ReqObj.Form[tmpId].url.html = true;
  }
}

function onCName(tmpId, callFromEvent) {
  if (
    ((tmpId.substring(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq") ||
      isSSB(tmpId)) &&
    $("#t" + tmpId + "_cbx").length === 0
  ) {
    if (cNameConditions(tmpId)) {
      if ($("#t" + tmpId + "_cdiv").length !== 0) {
        if (
          (isSSB(tmpId) &&
            (ReqObj.miniDetailHit.ping === false ||
              ReqObj.miniDetailHit.reply.success === true)) ||
          !isSSB(tmpId)
        )
          $("#t" + tmpId + "_cdiv").html(
            mdtlHtml(tmpId, 0, { ask: true, what: "Company Name", key: 0 })
          );
        (isSSB(tmpId) && isnewSSB(tmpId)) || isEnq(tmpId)
          ? ""
          : manipulateWidth(tmpId, ReqObj.Form[tmpId].cName.cnameId);
        if (
          isEnq(tmpId) &&
          $("#t" + tmpId + "_reqbox").length > 0 &&
          currentISO() !== "IN"
        )
          manipulateWidth(tmpId, ReqObj.Form[tmpId].cName.cnameId);
        ReqObj.Form[tmpId].cName.fs = true;
        ReqObj.Form[tmpId].cName.cdiv = true;
      }
    } else {
      if (
        callFromEvent === true &&
        ReqObj.UserDetail.cName === "" &&
        (ReqObj.Form[tmpId].cName.tov1 === true ||
          ReqObj.Form[tmpId].cName.rb === true)
      ) {
      } else {
        $("#t" + tmpId + "_cdiv").html("");
        ReqObj.Form[tmpId].cName.fs = false;
        ReqObj.Form[tmpId].cName.cdiv = false;
      }
    }
  } else if (
    tmpId.substring(0, 2) === "09" &&
    ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
  ) {
    if (
      $("#t" + tmpId + "_cbx").length === 1 &&
      !cNameConditions(tmpId) &&
      !cNameIsq(tmpId)
    ) {
      ReqObj.Form[tmpId].cName.isShown = false;
      $("#t" + tmpId + "_cbx").addClass("bedsnone");
    } else {
      ReqObj.Form[tmpId].cName.isShown = true;
      $("#t" + tmpId + "_cbx").removeClass("bedsnone");
    }
  }
}
function mdtlError(tmpId, id, md) {
  var html = "";
  var cls =
    (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") ||
      (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
      ? "be-erbx beerrp bedsnone"
      : isSSB(tmpId)
        ? "mb-ertxt mb-mt10 bedsnone"
        : "be-erbx bedsnone";
  html = returnContainer("t" + tmpId, "_mdtlerror_" + md.suffix, cls, "", "");
  html += returnContainer("t" + tmpId, id + "_errmsg", "", "content", "");
  html += "</div >";
  html =
    (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09") ||
      (isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0) ||
      isSSB(tmpId)
      ? html
      : html + '<a class="be-erarw" data-role="arrow"></a>';
  html += "</div >";
  return html;
}

function cnameTooltip(tmpId, outerid) {
  var cls = "int-ct3 info_iconeqbl";
  return (
    '<div class="' +
    cls +
    '"> <div class="blnewform_sprit inft bepr inth inftIcn" style="position: relative!important;"> <div class="inthDtl dn beabult"> <p class>Make sure your company name:</p><ul> <li>is longer than 4 characters</li><li>is not the name of contact person</li><li>is not the name of product you sell</li><li>is not generic e.g. \'textile\',\'SEO services\', \'travel agency\' </li></ul> </div></div></div>'
  );
}

function mdtlHtml(tmpId, todo, md) {
  var oldui = (isEnq(tmpId) || isBl(tmpId)) && md.ui === "old" ? true : false;
  var ui = mdtlUI(tmpId, md, oldui);
  var err = md.key === 2 || md.key === 0 ? mdtlError(tmpId, ui.id, md) : "";
  var cls = IsChatbl(tmpId)
    ? "cpNm cbl_txt"
    : isEnq(tmpId) && oldui === false
      ? "be-slbox inpt_errorbx inPlace mdplc"
      : "cpNm";
  if (oldui === true) cls += " oldui";
  else cls += " newui";
  if (isInactiveBL(tmpId)) cls += " cbl_br10";
  ui.placeholder = isEnq(tmpId) && oldui === false ? "" : ui.placeholder;
  var inp = returnInput(
    "t" + tmpId,
    ui.id,
    "text",
    ui.id,
    ui.placeholder,
    cls,
    "",
    ui.insty,
    ui.maxlength,
    ""
  );
  var htmlobj = {
    OuterWrapper:
      "<div id='t" + tmpId + ui.outerid + "' class='" + ui.dvc + "'>",
    Label:
      "<label id='t" +
      tmpId +
      ui.outerid +
      "_lbl' style='" +
      ui.lbls +
      "' class='" +
      ui.lblc +
      "'>" +
      ui.lbtxt +
      "</label>",
    UserInput: isSSB(tmpId)
      ? isnewSSB(tmpId)
        ? inp + err
        : "<div class='mb-InCon'>" + inp + err + "</div>"
      : isBlInline(tmpId)
        ? "<div class='pflx1'>" + inp + err + "</div>"
        : IsChatbl(tmpId)
          ? inp + skipDiv1(tmpId)
          : inp + err, //chat bl bug
    ClosingWrapper: "</div>",
    Tooltip: cnameTooltip(tmpId, ui.outerid),
  };
  if (md.key === 0 && !IsChatbl(tmpId)) {
    htmlobj.Label =
      !oldui && isEnq(tmpId)
        ? htmlobj.Label
        : "<div class='cbl_df'>" + htmlobj.Label + htmlobj.Tooltip + "</div>";
    htmlobj.ClosingWrapper += !oldui && isEnq(tmpId) ? htmlobj.Tooltip : "";
  }
  var html =
    htmlobj.OuterWrapper +
    htmlobj.Label +
    htmlobj.UserInput +
    htmlobj.ClosingWrapper;
  if (md.key === 0) ReqObj.Form[tmpId].cName.chtml = true;
  if (md.key === 1) ReqObj.Form[tmpId].gst.html = true;
  return todo === 1 ? htmlobj : html;
}

function mdtlUI(tmpId, md, oldui) {
  var lblr =
    ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
    ? pdpenqImage(tmpId)
    ? "color:#05796F"
    : "color:#111"
  : "color:#696969";
  var ins =
    ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
      ? ""
      : "border-radius: 7px;";
  var mdtext =
    md.key === 1
      ? "GST Number"
      : md.key === 2
        ? "Website URL"
        : "Company/ Business Name";
  if (md.key === 0) ReqObj.Form[tmpId].cName["cnameId"] = "_cname_" + md.suffix;
  return {
    id:
      md.key === 0
        ? "_cname_" + md.suffix
        : md.key === 1
          ? "_gstname"
          : "_urlname",
    outerid:
      md.key === 0 ? "_company_" + md.suffix : md.key === 1 ? "_gst" : "_url",
    placeholder:
      md.key === 2
        ? "Eg: www.johnenterprise.com"
        : md.key === 0
          ? IsChatBLInline(tmpId) || pdpenqImage(tmpId)
            ? "Eg: Suguna Foods Private Limited"
            : "Eg: John Enterprises, Suguna Foods Private Limited"
          : IsChatbl(tmpId)
            ? "Please enter your " + mdtext
            : (md.key === 2 &&
              ReqObj.Form[tmpId].formType.toLowerCase() === "bl") ||
              md.key === 1
              ? "Please enter " + mdtext + " to reach more sellers"
              : "Please enter your " + mdtext,
    lbtxt: IsChatbl(tmpId)
      ? md.key === 0
        ? "Please provide your <span class='befwt'>Company/ Business Name</span> to get quick response from the supplier"
        : "Please enter <span class='befwt'>" +
        mdtext +
        "</span> to get quick response from the supplier"
      : md.key === 0
        ? "Company/ Business Name"
        : mdtext,
    dvc: isSSB(tmpId)
      ? isnewSSB(tmpId)
        ? "nb-frm nb-mt25"
        : "mb-flex mb-fxstrt mb-pdt15"
      : isBlInline(tmpId)
        ? "idsf pfstrt mb20"
        : isEnq(tmpId) && oldui === false
          ? pdpenqImage(tmpId)
              ? "eqflot eCwd"
              : "eqflot beW5"
          : pdpenqImage(tmpId)
              ? "bemt10 pr eCnm"
              : "bemt10",
    lblc: isSSB(tmpId)
      ? isnewSSB(tmpId)
        ? "nb-fmlbl"
        : "mb-lbl"
      : isBlInline(tmpId)
        ? "fs15 cl11"
        : isEnq(tmpId) && oldui === false
          ? "be-lbl"
          : "",
    lbls:
      isSSB(tmpId) ||
        isBlInline(tmpId) ||
        IsChatbl(tmpId) ||
        (isEnq(tmpId) && oldui === false)
        ? ""
        : "padding: 12px 0px 9px 0px;font-size: 15px;" +
        lblr +
        ";pointer-events: none;line-height:14px;display: block;",
    insty:
      isSSB(tmpId) || (isEnq(tmpId) && oldui === false)
        ? ""
        : IsChatbl(tmpId)
          ? "width:100%;max-width:100%"
          : "height:42px;vertical-align:top;padding:0px 0 0 8px;font-size: 15px;border:1px solid #c9c6c6;background-color:#fff;color: #000;box-sizing:border-box;width: 50%" +
          ins,
    maxlength: md.key === 1 ? "15" : "",
  };
}

function MoreDetails(tmpId) {
  this.className = "MoreDetails";
  this.mdhtmlObj = [];
  this.mdhtml = "";
  this.mdObj = "";
}
MoreDetails.prototype.hasHtml = function (mdObj) {
  this.mdObj = mdObj;
  this.mdhtmlObj = mdtlHtml(mdObj.tmpId, 1, mdObj.md);
  if (this.mdhtmlObj !== "") {
    if (
      isSet(mdObj.object.countlastUpdated) &&
      mdObj.object.countlastUpdated === false
    )
      ReqObj.Form[mdObj.tmpId].currentclassCount++;
    this.ifHtmlPresent(mdObj);
  } else this.ifHtmlNotPresent(mdObj);
  return true;
};
MoreDetails.prototype.ifHtmlPresent = function (mdObj) {
  if (mdObj.md.key === 0) ReqObj.Form[mdObj.tmpId].cName.isShown = true;
  if (mdObj.md.key === 2) ReqObj.Form[mdObj.tmpId].url.html = true;
  mdObj.that.NumberofClassCalled -= 1;
  AttachObject(mdObj.object, mdObj.tmpId);
  if (isSet(mdObj.AfterService)) {
    for (var i = 0; i < mdObj.AfterService.length; i++) {
      mdObj.that.MakeSeq(mdObj.AfterService[i], mdObj.tmpId);
    }
  }
  if (mdObj.that.NumberofClassCalled === 0) makeFinalSeq(mdObj, mdObj.tmpId);
};
MoreDetails.prototype.ifHtmlNotPresent = function (mdObj) {
  if (mdObj.hasFallback) {
    CreateSeq(mdObj.FallbackObj);
  }
};
MoreDetails.prototype.displayHtml = function (tmpId) {
  if (!IsChatbl(tmpId)) {
    var odiv =
      isSSB(tmpId) && this.mdObj.md.key === 2
        ? "_scbx"
        : isEnq(tmpId) || isBl(tmpId)
          ? this.mdObj.md.suffix
          : "_cbx";
    var cls = isEnq(tmpId) && this.mdObj.md.ui === "new" ? "cbl_df" : "";
    var mdhtmlsuffixobj = {
      SuffixOuterHtml: "<div id='t" + tmpId + odiv + "' class='" + cls + "'>",
      SuffixClosingHtml: "</div>",
      suffix: odiv,
    };
    this.mdhtml = MakeWrapper([[this.mdhtmlObj]], tmpId, mdhtmlsuffixobj, "");
  } else {
    this.mdboxQues = MakeWrapper(
      [[this.mdhtmlObj]],
      tmpId,
      WrapperObj(
        "<div  id='t" + tmpId + "_cnbox' class='cbl_ques cbl_vh'>",
        "</div>",
        "_cnbox"
      ),
      "ques"
    );
    this.mdboxInput = MakeWrapper(
      [[this.mdhtmlObj]],
      tmpId,
      WrapperObj(
        "<div  id='t" +
        tmpId +
        "_cnboxInput ' class='cbl_dtls cbl_name cbl_df t" +
        tmpId +
        "_userInput cbl_br10 dn'>",
        "</div>",
        "_cnbox"
      ),
      "input"
    );
    this.mdhtml = this.mdboxQues + this.mdboxInput;
    return [this.mdboxQues, this.mdboxInput];
  }
  return [this.mdhtml];
};
MoreDetails.prototype.defaultEvents = function (tmpId) {
  var that = this;
  var id =
    that.mdObj.md.key === 0
      ? ReqObj.Form[tmpId].cName.cnameId
      : that.mdObj.md.key === 1
        ? "_gstname"
        : "_urlname";
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    if (IsChatbl(tmpId)) {
      ChatblfooterAns(tmpId);
      setTimeout(function () {
        $("#t" + tmpId + id).focus();
      }, 1800);
    }
    if (isBl(tmpId)) {
      $("#t" + tmpId + id)
        .off("focus keypress")
        .on("focus keypress", function () {
          $("#t" + tmpId + id).removeClass("highlight-err");
          $("#t" + tmpId + id + "_err").addClass("bedsnone");
          $("#" + $("#t" + tmpId + id).parent()[0].id + "_lbl").removeClass(
            "redc"
          );
          $("#t" + tmpId + "_mdtlerror_" + that.mdObj.md["suffix"]).addClass(
            "bedsnone"
          );
        });
      // $("#t" + tmpId + id).off("blur").on("blur", function () {
      //   if($("#t" + tmpId + id).val() === ""){
      //     $("#t" + tmpId + id).parents().removeClass("eqfcsed");
      //     $("#t" + tmpId + id).attr("placeholder",placeholder_b);
      //   }
      // });
    }
    if (isEnq(tmpId)) {
      if (that.mdObj.md.ui === "old")
        manipulateWidth(tmpId, ReqObj.Form[tmpId].cName.cnameId);
      var placeholder_f =
        that.mdObj.md.key === 0
          ? pdpenqImage(tmpId)
            ? "Suguna Foods Private Limited"
            : "Eg: John Enterprises, Suguna Foods Private Limited"
          : that.mdObj.md.key === 1
            ? "Please enter GST Number to reach more sellers"
            : "Eg: www.johnenterprise.com";
      var placeholder_b =
        that.mdObj.md.key === 0 && that.mdObj.md.ui === "old"
          ? placeholder_f
          : "";
      if (id === "_cname" && currentISO() !== "IN") {
        $("input[type=text].newui")
          .off("focus keypress")
          .on("focus keypress", function (e) {
            $($("input[type=text].newui")[0]).parents().addClass("eqfcsed");
            $($("input[type=text].newui")[0]).attr(
              "placeholder",
              placeholder_f
            );
            //$('input[type=text].newui').attr("placeholder", placeholder_f);
          });
        $("input[type=text].newui")
          .off("blur")
          .on("blur", function () {
            if ($("input[type=text].newui").val() === "") {
              $("input[type=text].newui").parents().removeClass("eqfcsed");
              $("input[type=text].newui").attr("placeholder", placeholder_b);
            }
          });
      } else {
        $("#t" + tmpId + id)
          .off("focus keypress")
          .on("focus keypress", function () {
            $("#t" + tmpId + id)
              .parents()
              .addClass("eqfcsed");
            var placeholder =
              that.mdObj.md.key === 0
                ? pdpenqImage(tmpId)
                  ? "Suguna Foods Private Limited"
                  : "Eg: John Enterprises, Suguna Foods Private Limited"
                : that.mdObj.md.key === 1
                  ? "Please enter GST Number to reach more sellers"
                  : "Eg: www.johnenterprise.com";
            $("#t" + tmpId + id).attr("placeholder", placeholder_f);
            $("#t" + tmpId + id).removeClass("highlight-err");
            $("#t" + tmpId + id + "_err").addClass("bedsnone");
            //   $("#t" + tmpId +'_company_ncbx_lbl').removeClass("redc");
            $("#" + $("#t" + tmpId + id).parent()[0].id + "_lbl").removeClass(
              "redc"
            );
            $("#t" + tmpId + id + "_errmsg").html("");
          });
        $("#t" + tmpId + id)
          .off("blur")
          .on("blur", function () {
            if ($("#t" + tmpId + id).val() === "") {
              $("#t" + tmpId + id)
                .parents()
                .removeClass("eqfcsed");
              $("#t" + tmpId + id).attr("placeholder", placeholder_b);
            }
          });
      }
    }
  }
  if (
    !isEnq(tmpId) ||
    (isEnq(tmpId) &&
      $("#t" + tmpId + "_reqbox").length > 0 &&
      that.mdObj.md.ui === "old" &&
      that.mdObj.md.key === 0 &&
      currentISO() !== "IN")
  )
    manipulateWidth(tmpId, ReqObj.Form[tmpId].cName.cnameId);
  if (isSSB(tmpId) && ReqObj.gst.toask === false)
    $("#t" + tmpId + "_gst").addClass("bedsnone");
};
MoreDetails.prototype.handleButton = function (tmpId) {
  ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
};
MoreDetails.prototype.validate = function (tmpId) {
  var that = this;
  var id =
    that.mdObj.md.key === 0
      ? "_cname_" + that.mdObj.md.suffix
      : that.mdObj.md.key === 1
        ? "_gstname"
        : "_urlname";
  var md =
    typeof $("#t" + tmpId + id).val() !== "undefined" &&
      $("#t" + tmpId + id).val() !== ""
      ? $("#t" + tmpId + id).val()
      : "";
  if (that.mdObj.md.key === 2 || that.mdObj.md.key === 0) {
    var validate =
      that.mdObj.md.key === 0
        ? validation.isCnameValid(md, tmpId)
        : validation.isURLValid(md, tmpId);
    if (validate["error_type"] != "") {
      if (!$("#t" + tmpId + id + "_err").length && !IsChatbl(tmpId)) {
        var html = "";
        var cls =
          isSSB(tmpId) || isBlInline(tmpId) || IsChatbl(tmpId) || isEnq(tmpId)
            ? "be-erbx beerrp"
            : "texterr errpdg";
        html += returnContainer("t" + tmpId, id + "_err", cls, "", "");
        html += returnContainer("t" + tmpId, id + "_errmsg", "", "content", "");
        html += "</div>" + validate["error"] + "</div>";
        $("#t" + tmpId + id).after(html);
      }
      if (IsChatbl(tmpId)) {
        addChatblError(tmpId, validate["error"]);
      } else {
        $("#t" + tmpId + id + "_err").removeClass("bedsnone");
        var errorcls = isSSB(tmpId)
          ? isnewSSB(tmpId)
            ? "nb-erbrd"
            : "mb-erbrd"
          : "highlight-err";
        $("#t" + tmpId + id).addClass(errorcls);
        if (
          new RegExp("isq").test(ReqObj.Form[tmpId].currentScreen.toLowerCase())
        )
          ReqObj.Form[tmpId].isret++;
      }
      return false;
    }
    if (validate["type"] === true) return true;
    else {
      if (!isSet(ReqObj.Form[tmpId].mdObjErr)) ReqObj.Form[tmpId].mdObjErr = [];
      ReqObj.Form[tmpId].mdObjErr.push(that.mdObj.md.key);
      if (that.mdObj.md.key === 0) {
        this.MoreDetailsTracking(tmpId, "CompanyName:wrongCname");
      }
      return true;
    }
  } else {
    var validate = validation.isGstValid(md, tmpId);
    if (validate["type"] === true) return true;
    else {
      if (!$("#t" + tmpId + id + "_err").length && !IsChatbl(tmpId)) {
        var html = "";
        var cls =
          isSSB(tmpId) || isBlInline(tmpId) || IsChatbl(tmpId) || isEnq(tmpId)
            ? "be-erbx beerrp"
            : "texterr errpdg";
        html += returnContainer("t" + tmpId, id + "_err", cls, "", "");
        html += returnContainer("t" + tmpId, id + "_errmsg", "", "content", "");
        html += "</div>" + validate["error"] + "</div>";
        $("#t" + tmpId + id).after(html);
      }
      if (IsChatbl(tmpId)) {
        addChatblError(tmpId, validate["error"]);
      } else {
        $("#t" + tmpId + id + "_err").removeClass("bedsnone");
        var errorcls = isSSB(tmpId)
          ? isnewSSB(tmpId)
            ? "nb-erbrd"
            : "mb-erbrd"
          : "highlight-err";
        $("#t" + tmpId + id).addClass(errorcls);
      }
      return false;
    }
  }
};
MoreDetails.prototype.onSubmit = function (tmpId) {
  var that = this;
  var mdObject = PreAjax("MoreDetails", tmpId);
  var screen =
    that.mdObj.md.key === 0
      ? "CompanyName"
      : that.mdObj.md.key === 1
        ? "GST"
        : "URL";
  var compName =
    isSet(ReqObj.Form[tmpId].companyName) &&
      ReqObj.Form[tmpId].companyName !== ""
      ? ReqObj.Form[tmpId].companyName
      : "";
  var gst =
    isSet(ReqObj.Form[tmpId].gst.number) && ReqObj.Form[tmpId].gst.number !== ""
      ? ReqObj.Form[tmpId].gst.number
      : "";
  var url =
    isSet(ReqObj.Form[tmpId].url.name) && ReqObj.Form[tmpId].url.name !== ""
      ? ReqObj.Form[tmpId].url.name
      : "";
  var called = 0;
  if ($.inArray(0, ReqObj.Form[tmpId].mdObjErr) !== -1) compName = "";
  if ($.inArray(2, ReqObj.Form[tmpId].mdObjErr) !== -1) url = "";
  if (
    compName !== "" &&
    (((isEnq(tmpId) || isBl(tmpId)) && called === 0) ||
      (!(isEnq(tmpId) || isBl(tmpId)) && that.mdObj.md.key === 0))
  ) {
    MoreDetailService(tmpId, screen);
    if (isEnq(tmpId) || isBl(tmpId)) called = 1;
  }
  if (
    gst !== 0 &&
    gst !== "" &&
    (((isEnq(tmpId) || isBl(tmpId)) && called === 0) ||
      (!(isEnq(tmpId) || isBl(tmpId)) && that.mdObj.md.key === 1))
  ) {
    MoreDetailService(tmpId, screen);
    if (isEnq(tmpId) || isBl(tmpId)) called = 1;
  }
  if (
    url !== "" &&
    (((isEnq(tmpId) || isBl(tmpId)) && called === 0) ||
      (!(isEnq(tmpId) || isBl(tmpId)) && that.mdObj.md.key === 2))
  ) {
    MoreDetailService(tmpId, screen);
    if (isEnq(tmpId) || isBl(tmpId)) called = 1;
  }
  if (isEnq(tmpId)) ReqObj.Form[tmpId].ServiceSequence.pop();
};
MoreDetails.prototype.handleHeading = function (tmpId) {
  var that = this;
  var append = that.mdObj.md.key === 0 ? "companyname" : that.mdObj.md.key === 1 ? "gst" : "url";
  var call = ReqObj.Form[tmpId].currentScreen.toLowerCase() === "moredetails" && !isEnq(tmpId) ? ReqObj.Form[tmpId].currentScreen + append : "default";
  if(isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0){
    $("#blheading").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
  }
  else{
    $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
  }
};
MoreDetails.prototype.EventIfScreenPresent = function (tmpId) {
  this.handleHeading(tmpId);
  ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
};
MoreDetails.prototype.displayAnswer = function (tmpId) {
  var classtotest = chatBlClass(tmpId, "right");
  var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
  var that = this;
  var md = that.mdObj.md.key === 0 ? returnAnswer(tmpId, "CompanyName") : that.mdObj.md.key === 1 ? returnAnswer(tmpId, "GST") : returnAnswer(tmpId, "URL");
  md = md !== "" ? md : NotFilled;
  return [
    ConversationRightWrapper(tmpId, md, {
      classtotest: classtotest,
      leftright: leftright,
    }),
  ];
};

MoreDetails.prototype.SaveDetails = function (tmpId) {
  var that = this;
  var id =
    that.mdObj.md.key === 0
      ? "_cname_" + that.mdObj.md.suffix
      : that.mdObj.md.key === 1
        ? "_gstname"
        : "_urlname";
  var md =
    typeof $("#t" + tmpId + id).val() !== "undefined" &&
      $("#t" + tmpId + id).val() !== ""
      ? $("#t" + tmpId + id)
        .val()
        .trim()
      : "";
  if (
    isEnq(tmpId) &&
    currentISO() !== "IN" &&
    id === "_cname_" + that.mdObj.md.suffix &&
    md === ""
  ) {
    md = $("input[type=text].newui").is(":visible")
      ? $("input[type=text].newui").val()
      : md;
  }
  if (IsChatbl(tmpId)) {
    if (that.mdObj.md.key === 0)
      ReqObj.Form[tmpId].UserInputs["CompanyName"] = md;
    if (that.mdObj.md.key === 1) ReqObj.Form[tmpId].UserInputs["GST"] = md;
    if (that.mdObj.md.key === 2) ReqObj.Form[tmpId].UserInputs["URL"] = md;
  }
  if (that.mdObj.md.key === 0) {
    ReqObj.Form[tmpId].companyName = md;
    if (md === "") this.MoreDetailsTracking(tmpId, "CompanyName:NotFilled");
  }
  if (that.mdObj.md.key === 1) ReqObj.Form[tmpId].gst.number = md;
  if (that.mdObj.md.key === 2) ReqObj.Form[tmpId].url.name = md;
};

MoreDetails.prototype.MoreDetailsTracking = function (tmpId, toappend) {
  var ftype = ReqObj.Form[tmpId].formType.toLowerCase();
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var tracking = toappend;
  var sampling = ReqObj.Form[tmpId].noSampling;
  ReqObj.Form[tmpId].noSampling = true;
  blenqGATracking(form_type, tracking, getEventLabel(), 0, tmpId);
  ReqObj.Form[tmpId].noSampling = sampling;
};

ContactDetail.prototype.getChatblNameErrorDiv = function (tmpId) {
  var html = "";
  html += returnContainer(
    "t" + tmpId,
    "_error_first_name" + this.classCount,
    "redc bltperor",
    "",
    ""
  );
  html += returnContainer(
    "t" + tmpId,
    "_fname_errmsg" + this.classCount,
    "",
    "content",
    ""
  );
  html += "</div >";
  html += "</div>";
  return html;
};

ContactDetail.prototype.getChatblCityErrorDiv = function (tmpId) {
  var html = "";
  html += returnContainer(
    "t" + tmpId,
    "_error_city" + this.classCount,
    "redc bltperor",
    "",
    ""
  );
  html += returnContainer(
    "t" + tmpId,
    "_city_errmsg" + this.classCount,
    "",
    "content",
    ""
  );
  html += "</div></div>";
  return html;
};

function detachFlag2(tmpId) {
  var ele = $("#t" + tmpId + "country_dropd").detach();
  $("#t" + tmpId + "flagdiv2").append(ele);
}
// function isMoglixUi(tmpId) {
//   return isSet(ReqObj.Form[tmpId].New_UI) && ReqObj.Form[tmpId].New_UI === "1";
// }

function get_message() {
  return {
    msg: "Become a verified free seller in 2 min & <br>Connect with 100+ Buyers from your city",
    cta_msg: "Start Selling for Free",
  };
}
// view mob ab test track
function pnsSubmitTrack(tmpId){
  var that = ReqObj.Form[tmpId].FormSequence || {};
  var sampling = ReqObj.Form[tmpId].noSampling;
  ReqObj.Form[tmpId].noSampling = true;
  if(isSet(ReqObj.Form[tmpId].ctaName) && (ReqObj.Form[tmpId].ctaName.toLowerCase() == "view mob e")){
    if(that.StepCounter == 0)
    blenqGATracking("Send Enquiry", "Sc 1 Submit Clicked", getEventLabel(), 0, tmpId);
    if(that.StepCounter == 1)
    blenqGATracking("Send Enquiry", "Sc 2 Submit Clicked", getEventLabel(), 0, tmpId);
}
ReqObj.Form[tmpId].noSampling = sampling;
}
function inactiveblSubmitTrack(tmpId){    //inactive changes
var that = ReqObj.Form[tmpId].FormSequence || {};
var sampling = ReqObj.Form[tmpId].noSampling;
ReqObj.Form[tmpId].noSampling = true;
var ec= isLightbox(tmpId) ? "Inactive BL New Seller" : "Inactive BL New";
if(that.StepCounter == 0)
    blenqGATracking(ec, "Submit Clicked sc-1", getEventLabel(), 0, tmpId);
if(that.StepCounter == 1)
    blenqGATracking(ec, "Submit Clicked sc-2", getEventLabel(), 0, tmpId);        
  ReqObj.Form[tmpId].noSampling = sampling;
} 

function pnsCloseTrack(tmpId){
  var that = ReqObj.Form[tmpId].FormSequence || {};
  var sampling = ReqObj.Form[tmpId].noSampling;
  ReqObj.Form[tmpId].noSampling = true;
  if(isSet(ReqObj.Form[tmpId].ctaName) && (ReqObj.Form[tmpId].ctaName.toLowerCase() == "view mob e")){
      if(that.StepCounter == 0)
      blenqGATracking("Send Enquiry", "Sc 1 Close Clicked", getEventLabel(), 0, tmpId);
      if(that.StepCounter == 1)
      blenqGATracking("Send Enquiry", "Sc 2 Close Clicked", getEventLabel(), 0, tmpId);
    }
    ReqObj.Form[tmpId].noSampling = sampling;
  }

function inactiveblCloseTrack(tmpId){    //inactive changes
    var that = ReqObj.Form[tmpId].FormSequence || {};
    var sampling = ReqObj.Form[tmpId].noSampling;
    ReqObj.Form[tmpId].noSampling = true;
    var ec= isLightbox(tmpId) ? "Inactive BL New Seller" : "Inactive BL New";
    if(that.StepCounter == 0)
        blenqGATracking(ec, "Cross Clicked sc-1", getEventLabel(), 0, tmpId);
    if(that.StepCounter == 1)
        blenqGATracking(ec, "Cross Clicked sc-2", getEventLabel(), 0, tmpId);        
      ReqObj.Form[tmpId].noSampling = sampling;
} 

function mobEnteredTrack(tmpId,el){   //mob track
  var sampling = ReqObj.Form[tmpId].noSampling;
  ReqObj.Form[tmpId].noSampling = true;
  var ec= (ReqObj.Form[tmpId].formType === "Enq") ? "Send Enquiry" : "Post Buy Leads";  
  var ea="Mobile Number Entered";
  blenqGATracking(ec, ea, el, 0, tmpId);     
  ReqObj.Form[tmpId].noSampling = sampling;
  ReqObj.Form[tmpId].mobEntered=0;         
} 
function emailEnteredTrack(tmpId,el){   
    var sampling = ReqObj.Form[tmpId].noSampling;
    ReqObj.Form[tmpId].noSampling = true;
    var ec= (ReqObj.Form[tmpId].formType === "Enq") ? "Send Enquiry" : "Post Buy Leads";  
    var ea="Email Entered";
    blenqGATracking(ec, ea, el, 0, tmpId);     
    ReqObj.Form[tmpId].noSampling = sampling;
    ReqObj.Form[tmpId].emailEntered=0;         
} 


//next->submit
function hideClickMsg(tmpId) {
  if (EnqPopupDIR(tmpId) && $("#yajaca").css("display") == "block") {
    $("#yajaca").hide();
    if (
      $(
        "#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input"
      ).hasClass("toConv")
    ) {
      $(
        "#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input"
      ).removeClass("toConv");
      $(
        "#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input"
      ).removeClass("subLeft");
    }
    $("#noOtp").removeClass("mrtCh");
    $("#yajaca").removeClass("yaLeft");
    ReqObj.Form[tmpId].msgFromOtp = 0;
  }
}
FormSeq.prototype.OnCloseSeq = function (tmpId) {
  var LastScreen = ""; //PBRENQFORM - 3621
  this.OnCloseServiceArray = [];
  ReqObj.Form[tmpId]["OnCloseArray"] = [];
  ReqObj.Form[tmpId].OnCloseStep = true;
  this.OnCloseCounter = -1;
  this.NumberofClassCalled = 4;
  var that = this;
  ReqObj.Form[tmpId].flags["IsFirstStep"] = false;

  if (isSet(ReqObj.Form[tmpId].UiArray[that.StepCounter])) {
    for (
      var j = 0;
      j < ReqObj.Form[tmpId].UiArray[that.StepCounter].length;
      j++
    ) {
      LastScreen =
        LastScreen +
        ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][j].Obj);
    }
  }
  sectionInitialisationStepWise(tmpId, 1);
  new LeftSide(tmpId, ReqObj.Form[tmpId].typeofform, 1);
  var hooks = {
    pre: [],
    post: [],
    current: [],
  };
  var array = {
    UiArray: [],
    ServiceArray: [],
  };
  if (ShowOtp() && !ReqObj.Form[tmpId].flags.isOtpShown) {
    hooks["pre"] = [];
    hooks["post"] = [this.OnClosegetStep];
    var UserVerificationObj = {
      object: {
        obj: new UserVerification(tmpId),
        toReplace: false,
        isService: false,
        array: array,
        hooks: hooks,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: false,
      FallbackObj: null,
    };
    this.MakeSeq(UserVerificationObj);
    this.OnCloseServiceArray.push(array.ServiceArray);
    ReqObj.Form[tmpId].OnCloseArray.push(array.UiArray);
  }
  //   if (NEC() && LastScreen !== "ContactDetail" && currentISO() === "IN")
  var md = urlConditions(tmpId);
  if ((NEC() && LastScreen !== "ContactDetail") || md.ask === true) {
    //PBRENQFORM - 3621
    if (md.ask === true)
      that.NumberofClassCalled = that.NumberofClassCalled + 1;
    var array = {
      UiArray: [],
      ServiceArray: [],
    };
    hooks["pre"] = [this.OnClosegetStep];
    hooks["post"] = [];
    var NECObj = {
      object: {
        obj: new ContactDetail(1, 1, 1),
        toReplace: false,
        isService: false,
        array: array,
        hooks: hooks,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: false,
      FallbackObj: null,
    };
    this.MakeSeq(NECObj);
    if (md.ask === true) {
      var chpre =
        md.ask === true && NEC() === false ? [this.OnClosegetStep] : "";
      var mdObj = returnmdtlObject(
        array,
        { pre: chpre, post: "" },
        tmpId,
        that,
        false,
        md
      );
      this.MakeSeq(mdObj);
    }
    hooks["pre"] = [];
    hooks["post"] = [];
    var PostBlEnqUpdateObj = returnPostBlEnqObject(
      tmpId,
      array,
      hooks,
      that,
      ""
    );
    this.MakeSeq(PostBlEnqUpdateObj);
    this.OnCloseServiceArray.push(array.ServiceArray);
    ReqObj.Form[tmpId].OnCloseArray.push(array.UiArray);
  }
  var array = {
    UiArray: [],
    ServiceArray: [],
  };
  hooks["pre"] = [];
  hooks["post"] = [];
  var ThankYouObj = {
    object: {
      obj: new ThankYou(tmpId),
      toReplace: false,
      objHtmlId: tmpId + "_thankDiv",
      isService: false,
      array: array,
      hooks: hooks,
    },
    tmpId: tmpId,
    that: that,
    AfterService: [],
    hasFallback: false,
    FallbackObj: null,
  };
  this.MakeSeq(ThankYouObj);
  this.OnCloseServiceArray.push(array.ServiceArray);
  ReqObj.Form[tmpId].OnCloseArray.push(array.UiArray);
  this.OnClosegetStep(tmpId);
};

FormSeq.prototype.OnClosegetStep = function (tmpId) {
  this.getStep(tmpId, true);
};

/*
Currently there are only  two sections left and right. More sections can be added ! Follow the same pattern.
*/
function sectionInitialisationStepWise(tmpId, step) {
  leftSideInitialise(tmpId, step);
  rightSideInitialise(tmpId, step);
  if (isInactiveBL(tmpId)) {
    let relatedProdHtml = downSideInitialise(tmpId);
    if (!document.getElementById("recommendProd")) {
      $("#t" + tmpId + "_mcont").append(relatedProdHtml);
    }

    if (relatedProdHtml != '') {
      $("#recommendProd").css({
        display: "block",
      });
    }
  }
}

function downSideInitialise(tmpId) {    //inactive changes  //recoms
  let brd_mcat_id = ReqObj.Form[tmpId].mcatId;
  let forms_data=null;
  let feat_data = null;
  try{
  forms_data = (ispdp(tmpId) || modIdf === "PDFIM") ? $.parseJSON(sessionStorage.getItem("formsPla" + brd_mcat_id)) : isLightbox(tmpId) ?  $.parseJSON(
    sessionStorage.getItem("poiCatData - " + brd_mcat_id)
  )  : $.parseJSON(
    sessionStorage.getItem("relCatData - " + brd_mcat_id));
  }
  catch(err){
    forms_data = null;
  }
  try{
    feat_data = (!ispdp(tmpId) && modIdf !== "PDFIM" && !isLightbox(tmpId)) ? $.parseJSON(
      sessionStorage.getItem("featCats")
    ) : null;
  }
  catch(err){
        feat_data = null;
  }
  return (isSet(forms_data) && forms_data.length > 1) ? recomendedProds(forms_data, tmpId) : (isSet(feat_data) && feat_data.length > 1) ? showFeaturedRecom(feat_data, tmpId) :'';
}

function recomendedProds(forms_data, tmpId) {  //inactive changes
  if (isSet(forms_data)) {
    var ec= isLightbox(tmpId) ? "Inactive BL New Seller" : "Inactive BL New";
    if(!ispdp(tmpId) && modIdf.toLowerCase() != "pdfim"){
      blenqGATracking(ec, "Related Categories Shown-"+forms_data.length, getEventLabel(), 1, "0901");  //not sampled
    }
    let text= (ispdp(tmpId) || modIdf === "PDFIM") ? "View Similar products" : "View More Products";     //inactive changes
    $('#recommendProd').remove();  
    let html = `<!-- Similar Section -->
            <div id="recommendProd" class="VSP-SEC">
            <div class="vsp-heading">
                <h3>`+text+`</h3>
            </div>
            <ul id="prodList" class="ProBoxUL">`;
    let count = 0;
    var proclass= ispdp(tmpId) ? "procontent" : "proInact";
    var param= (modIdf === "PDFIM") ? 'pdfblform=1' : 'blform=1';
    forms_data.forEach((item) => {
      count += 1; 
      if(ispdp(tmpId) || modIdf === "PDFIM"){
        item.ProdUrl = item.ProdUrl.endsWith(".html") ? item.ProdUrl + '?' + param  : item.ProdUrl + '&' + param;

      html += `<li class="berds10 ibgc" id='recomProd${count}' onclick="bltrack(${count},${tmpId})">
                          <a target="_blank" href=${item.ProdUrl} class="ProBox-Item disp-inl">
                              <div class="Proimg">
                                  <img src=${item.ProdImage} />
                              </div>
                              <p class="${proclass} color3 atxu cbl_fs16 befwt">${item.ProdName}</p>
                              <p class="proPrice">${item.Price}</p>
                          </a>
                    </li>`;
      }
      else if(isLightbox(tmpId)){
        item= isSet(item[0]) ? item[0] : item;
        item.poiCatUrl = item.poiCatUrl.endsWith(".html") ? item.poiCatUrl + '?sllrblform=1' : item.poiCatUrl + '&sllrblform=1' ;
        html += `<li class="berds10 ibgc" id='recomProd${count}' onclick="bltrack(${count},${tmpId})">
                          <a target="_blank" href=${item.poiCatUrl} class="ProBox-Item disp-inl">
                              <div class="Proimg">
                                  <img src=${item.poiCatImg} />
                              </div>
                              <p class="${proclass} color3 atxu cbl_fs16 befwt" style='height:26px'>${item.poiCatName}</p>
                          </a>
                    </li>`;

      }
      else{
        item= isSet(item[0]) ? item[0] : item;
        item.relCatUrl = item.relCatUrl.endsWith(".html") ? 'https://dir.indiamart.com' + item.relCatUrl + '?blform=1' : 'https://dir.indiamart.com' + item.relCatUrl + '&blform=1' ;
        html += `<li class="berds10 ibgc" id='recomProd${count}' onclick="bltrack(${count},${tmpId})">
                          <a target="_blank" href=${item.relCatUrl} class="ProBox-Item disp-inl">
                              <div class="Proimg">
                                  <img src=${item.relCatImg} />
                              </div>
                              <p class="${proclass} color3 atxu cbl_fs16 befwt">${item.relCatName}</p>
                          </a>
                    </li>`;
      }      
    });

    html += `</ul></div>`;
    return html;
  }
}

function showFeaturedRecom(feat_data, tmpId){   //recoms
  // console.log("successfully shown");
  if (isSet(feat_data)) {
    var ec="Inactive BL New";
    blenqGATracking(ec, "Featured Categories Shown-"+feat_data.length, getEventLabel(), 1, "0901");  //not sampled    
    let text= "View More Products";     
    $('#recommendProd').remove();  
    let html = `<!-- Similar Section -->
            <div id="recommendProd" class="VSP-SEC">
            <div class="vsp-heading">
                <h3>`+text+`</h3>
            </div>
            <ul id="prodList" class="ProBoxUL">`;
    let count = 0;
    var proclass= "proInact";
    var param= 'blform=1';
    feat_data.forEach((item) => {
      count += 1; 
      item= isSet(item[0]) ? item[0] : item;
      item.catUrl = item.catUrl.endsWith(".html") ? item.catUrl + '?blform=1' :  item.catUrl + '&blform=1' ;
      html += `<li class="berds10 ibgc" id='recomProd${count}' onclick="bltrack(${count},${tmpId})">
                          <a target="_blank" href=${item.catUrl} class="ProBox-Item disp-inl">
                              <div class="Proimg">
                                  <img src=${item.catImg} />
                              </div>
                              <p class="${proclass} color3 atxu cbl_fs16 befwt">${item.catName}</p>
                          </a>
                    </li>`;
            
    });

    html += `</ul></div>`;
    return html;
  }

}

function bltrack(count, tmpId) {      //inactive changes  //Product Click tracking
  ReqObj.Form['0' + tmpId].inactiveBL = true;    //not sampled
  var ec= ispdp('0' + tmpId) ? "Inactive BL" : isLightbox('0' + tmpId) ? "Inactive BL New Seller" : "Inactive BL New";
  blenqGATracking(ec, "Prod" + count, getEventLabel(), 0, "0901");   
  ReqObj.Form['0' + tmpId].inactiveBL = false; 
}
function leftSideInitialise(tmpId, step) {
  // this will create inner contaniers for left section acc to type of form
  new LeftSide(tmpId, ReqObj.Form[tmpId].typeofform, step);
}

function rightSideInitialise(tmpId, step) {
  // this will create inner contaniers for right section acc to type of form
  if (step === 0) new RightSide(tmpId, ReqObj.Form[tmpId].typeofform, step);
}

function initialiseOuterSection(tmpId) {
  // this will create outer containers for left and right sections
  $("#t" + tmpId + "_leftsection").html("");
  $("#t" + tmpId + "_rightsection").html("");
  $("#t" + tmpId + "_leftsection").html(sectionInitialise(getSections(tmpId, ReqObj.Form[tmpId].typeofform)["left"]));
  $("#t" + tmpId + "_rightsection").html(sectionInitialise(getSections(tmpId, ReqObj.Form[tmpId].typeofform)["right"]));
}

function sectionInitialise(section_obj) {
  var len = section_obj.length;
  var html = "";
  for (var i = 0; i < len; i++) {
    html += returnContainer( section_obj[i].section_id, section_obj[i].section_element, section_obj[i].section_class, "", "", "" ) + "</div>";
  }
  return html;
}
function getSections(tmpId, typeofform) {
  // section wise object
  var section_obj = {};
  section_obj[typeofform] = {
    left: getSectionObject(tmpId, typeofform, "left"),
    right: getSectionObject(tmpId, typeofform, "right"),
  };
  return section_obj[typeofform];
}

function getSectionObject(tmpId, typeofform, side) {
  // by using defined global variables
  var sectionnumber = section_number[typeofform][side];
  var data = {};
  var arr = [];
  for (var i = 1; i <= sectionnumber; i++) {
    // don't start from 0 if 0 pass sectionnumber + 1 in class
    data["section_id"] = "t" + tmpId;
    data["section_element"] = section_class[typeofform][side][i]["id"];
    data["section_name"] = section_class[typeofform][side][i]["name"];
    data["section_class"] = section_class[typeofform][side][i]["cls"];
    arr.push(createSectionObject(data));
  }
  return arr;
}

function createSectionObject(data) {
  // object will be created
  return {
    section_id: data["section_id"],
    section_name: data["section_name"],
    section_class: data["section_class"],
    section_element: data["section_element"],
  };
}

/*
 * Usage : Generation : Intent and BLEnq
 * @function : submit           - accepts argument 1 or 0 ----- 1 for IntentGeneration and 0 for BLEnqgeneration
 * @function : cookies          - read all required cookies
 * @function : getData          - collects data to be sent to request
 * @function : getBlEnqData     - data for BL and Enquiry
 * @function : getIntentData    - data for Intent
 * @function : intentGeneration - generates intent
 * @function : BlEnqGeneration  - generates BL or Enq
 */
/* Generation Class Starts here */

Generation.prototype.defaultEvents = function () { };
Generation.prototype.onSubmit = function (tmpId) {
  this.cookies();
  if (this.arg === 1) this.intentGeneration(tmpId);
  if (this.arg === 0) {
    this.blEnqGeneration(tmpId);
  }
};

Generation.prototype.cookies = function () {
  this.imeshCookie = imeshExist();
  this.imEqGlCookie = usercookie.getCookie("imEqGl");
  this.iplocCookie = usercookie.getCookie("iploc");
  this.v4iilexCookie = usercookie.getCookie("v4iilex");
  this.geoLocCookie = usercookie.getCookie("GeoLoc");
  this.iso = usercookie.getParameterValue(this.imeshCookie, "iso");
};
Generation.prototype.getData = function (tmpId) {
  var data = {};
  var loginmode =
    ReqObj.loginMode !== 0 ? ReqObj.loginMode : new LoginMode().getLoginMode();

  var formType = IsChatbl(tmpId) ? "BL" : ReqObj.Form[tmpId].formType;
  data =
    this.arg === 1
      ? this.getIntentData(tmpId)
      : this.arg === 0
        ? this.getBLEnqData(formType, tmpId)
        : {};

  /* Common for both */
  data["modid"] = modIdf;
  data["mcatID"] = ReqObj.Form[tmpId].mcatId;
  data["catID"] = ReqObj.Form[tmpId].catId;
  data["login_mode"] = loginmode;
  data["s_glusrid"] = usercookie.getParameterValue(this.imeshCookie, "glid");
  data["s_country_iso"] = this.iso; // imesh - lead post

  data["s_ip_country"] = usercookie.getParameterValue(
    this.iplocCookie,
    "gcnnm"
  );
  data["s_ip"] = usercookie.getParameterValue(this.iplocCookie, "gip");
  data["s_ip_country_iso"] = usercookie.getParameterValue(
    this.iplocCookie,
    "gcniso"
  );
  data["curr_page_url"] = window.location.href;
  data["landing_ref_url"] = usercookie.getCookie("site-entry-page");
  data["prev_page_url"] = document.referrer;
  data["s_country_name"] =
    typeof ReqObj.changeUserCountry !== "undefined" &&
      ReqObj.changeUserCountry !== ""
      ? ReqObj.changeUserCountry
      : "";

  if (this.iplocCookie !== "") {
    data["lat"] = usercookie.getParameterValue(this.iplocCookie, "GeoLoc_lt");
    data["long"] = usercookie.getParameterValue(this.iplocCookie, "lg");
    data["lt_lg_accu"] = usercookie.getParameterValue(this.iplocCookie, "accu");
  }
  var cefproddtype = isSet(ReqObj.Form[tmpId].CefProdType)
    ? ReqObj.Form[tmpId].CefProdType
    : "";
  var prodServ = isSet(ReqObj.Form[tmpId].prodServ)
    ? ReqObj.Form[tmpId].prodServ
    : "";
  var prodType =
    isSet(cefproddtype) && cefproddtype !== ""
      ? cefproddtype
      : isSet(prodServ)
        ? prodServ
        : "P";

  var perwidget = ReqObj.Form[tmpId].perWidget;
  var industry_ques = ReqObj.Form[tmpId].industry_ques;
  var refText = ReqObj.Form[tmpId].refText;
  if (isSet(perwidget)) data["rfq_query_ref_text"] = perWidget;
  else if (isSet(industry_ques) && industry_ques !== "")
    data["rfq_query_ref_text"] = refText + industry_ques + "|" + prodType + "|";
  else data["rfq_query_ref_text"] = refText + "|" + prodType + "|";
  return ObjectTrim(data);
};
Generation.prototype.getBLEnqData = function (formType, tmpId) {
  /* Common for both Enq and BL */
  var data = {};
  data =
    formType.toLowerCase() === "enq"
      ? this.getEnqData(formType, tmpId)
      : this.getBlData(formType, tmpId);
  var temp = usercookie.getParameterValue(this.imeshCookie, "fn");
  if (temp === "") {
    data["s_name"] =
      $("#t" + tmpId + "_q_first_nm" + ReqObj.Form[tmpId].nec.classCount)
        .length > 0
        ? $(
          "#t" + tmpId + "_q_first_nm" + ReqObj.Form[tmpId].nec.classCount
        ).val()
        : ReqObj.UserDetail["fn"];
    if (IsChatbl(tmpId)) data["s_name"] = ReqObj.Form[tmpId].UserInputs["Name"];
  } else data["s_name"] = temp;
  data["s_first_name"] = data["s_name"];

  if (formType.toLowerCase() === "bl") {
    if (isSet(this.iso) && this.iso === "IN") {
      temp = usercookie.getParameterValue(this.imeshCookie, "mb1");
      data["s_mobile"] =
        temp !== ""
          ? temp
          : $("#t" + tmpId + "_q_mobile").length > 0
            ? $("#t" + tmpId + "_q_mobile").val()
            : ReqObj.UserDetail["mb1"];
    } else {
      temp = usercookie.getParameterValue(this.imeshCookie, "em");
      data["s_email"] =
        temp !== ""
          ? temp
          : $("#t" + tmpId + "_q_email").length > 0
            ? $("#t" + tmpId + "_q_email").val()
            : ReqObj.UserDetail["em"];
    }
  }
  data["rfq_search_keyword"] = ReqObj.Form[tmpId].ss; //correct
  var adcampCookie = usercookie.getCookie("adcamp");
  var emktgCookie = usercookie.getCookie("emktg");
  data["source_campaign"] = "";
  if (adcampCookie !== "") {
    var adcmp = usercookie.getParameterValue(adcampCookie, "adcmp");
    data["source_campaign"] = data["source_campaign"] + adcampCookie;
    data["adcmp"] = adcmp;
  }
  if (emktgCookie !== "") {
    var affl_id = usercookie.getParameterValue(emktgCookie, "Affliate_id");
    data["source_campaign"] =
      data["source_campaign"] === ""
        ? "emktg" + affl_id
        : data["source_campaign"] + "|" + "emktg" + affl_id;
  }
  data["city_others"] =
    ReqObj.UserDetail["ctid"] !== "" ? "" : ReqObj.UserDetail["cityname"];
  data["state_others"] = "";
  data["prod_serv"] = ReqObj.Form[tmpId].prodServ;
  data["flag"] = formType;
  data["afflid"] = ReqObj.Form[tmpId].afflId;
  data["s_city_name"] =
    $("#t" + tmpId + "_q_city_oth").length > 0
      ? $("#t" + tmpId + "_q_city_oth").val()
      : ReqObj.UserDetail["cityname"];
  if (currentISO() === "IN") {
    data["s_state_name"] =
      isSet(ReqObj.UserDetail["statename"]) &&
        ReqObj.UserDetail["statename"] !== ""
        ? ReqObj.UserDetail["statename"]
        : "";
  }
  data["s_city_id"] = usercookie.getParameterValue(this.imeshCookie, "ctid");
  var custtyp_paid = {
    1399: 0,
    1299: -1,
    1879: 0,
    1890: 0,
    1999: 0,
    4299: 0,
    149: -1,
    2199: -1,
    199: -1,
    1199: -1,
    1899: 0,
    3299: 0,
    699: -1,
    1499: -1,
    2399: -1,
    1869: 0,
    179: -1,
    700: -1,
    750: -1,
  };
  var custwt = ReqObj.Form[tmpId].rcvCustType;
  data["category_type"] =
    typeof custtyp_paid[custwt] !== "undefined" && custtyp_paid[custwt] === 0
      ? "f"
      : "p";
  if (ReqObj.Form[tmpId].insert === "R" || ReqObj.Form[tmpId].insert === "U") {
    data["flag"] = "R";
    data["req_id"] = ReqObj.Form[tmpId].generationId; /* passed by platform */
  }
  data["modref_id"] =
    isSet(ReqObj.Form[tmpId].pDispId) && ReqObj.Form[tmpId].pDispId !== ""
      ? ReqObj.Form[tmpId].pDispId
      : "";
  data["ref_mod"] =
    isSet(ReqObj.Form[tmpId].ref_mod) && ReqObj.Form[tmpId].ref_mod !== ""
      ? ReqObj.Form[tmpId].ref_mod
      : "";
  return data;
};
Generation.prototype.getEnqData = function (formType, tmpId) {
  return {
    r_glusrid: ReqObj.Form[tmpId].rcvGlid,
    modref_type: ReqObj.Form[tmpId].modrefType
      ? ReqObj.Form[tmpId].modrefType
      : ReqObj.Form[tmpId].prodServ === "P"
        ? 1
        : 2,
    s_company: ReqObj.Form[tmpId].C_S_organization,
    s_prod_name: ReqObj.Form[tmpId].prodName,
    s_prod_dispname:
      typeof ReqObj.Form[tmpId].prodDispName !== "undefined" &&
        ReqObj.Form[tmpId].prodDispName !== "" &&
        ReqObj.Form[tmpId].prodDispName !== null &&
        ReqObj.Form[tmpId].prodDispName !== "null"
        ? ReqObj.Form[tmpId].prodDispName
        : "",
    ALTERNATE_DISPLAY_ID:
      isSet(ReqObj.Form[tmpId].ALTERNATE_DISPLAY_ID) &&
        ReqObj.Form[tmpId].ALTERNATE_DISPLAY_ID !== ""
        ? ReqObj.Form[tmpId].ALTERNATE_DISPLAY_ID
        : "",
  };
};

Generation.prototype.getBlData = function (formType, tmpId) {
  var data = {};
  if (
    isSet(ReqObj.Form[tmpId].sendImageBL) &&
    ReqObj.Form[tmpId].sendImageBL !== "" &&
    parseInt(ReqObj.Form[tmpId].sendImageBL) === 1
  ) {
    data = {
      sIdp: "1",
      rfq_image_orig: ReqObj.Form[tmpId].rfq_image_orig,
      rfq_ofr_img_wh: ReqObj.Form[tmpId].rfq_ofr_img_wh,
      rfq_image_large: ReqObj.Form[tmpId].rfq_image_large,
      rfq_ofr_limg_wh: ReqObj.Form[tmpId].rfq_ofr_limg_wh,
      rfq_image_medium: ReqObj.Form[tmpId].rfq_image_medium,
      rfq_ofr_mimg_wh: ReqObj.Form[tmpId].rfq_ofr_mimg_wh,
      rfq_image_small: ReqObj.Form[tmpId].rfq_image_small,
      rfq_ofr_simg_wh: ReqObj.Form[tmpId].rfq_ofr_simg_wh,
    };
  }

  var title_field = $("#t" + tmpId + "prodtitle").val();
  data["s_prod_name"] =
    ReqObj.Form[tmpId].prodName !== title_field &&
      typeof title_field !== "undefined" &&
      title_field !== ""
      ? title_field
      : ReqObj.Form[tmpId].prodName;
  return data;
};

Generation.prototype.getIntentData = function (tmpId) {
  var data = {};
  var data = {
    modref_type: ReqObj.Form[tmpId].modrefType,
    modref_id: ReqObj.Form[tmpId].pDispId,
    r_glusrid: ReqObj.Form[tmpId].rcvGlid,
    s_prod_name: ReqObj.Form[tmpId].prodName,
    s_first_name: usercookie.getParameterValue(this.imeshCookie, "fn"),
  };
  var enqsent = ReqObj.Form[tmpId].reqSent;
  if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
    var enqsent = ReqObj.Form[tmpId].reqSent;
    data["flag"] =
      enqsent === "Yes" || enqsent === "yes" || enqsent === 1 ? 12 : 1;
  } else if (
    ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ||
    IsChatbl(tmpId)
  ) {
    var blIntent =
      isSet(ReqObj.Form[tmpId].BLIntent) && ReqObj.Form[tmpId].BLIntent !== ""
        ? ReqObj.Form[tmpId].BLIntent.toLowerCase()
        : "";
    if (
      blIntent === "yes" &&
      ReqObj.Form[tmpId].ctaName.toLowerCase() === "mcat video"
    )
      data["flag"] = 16;
    if (this.blIntent === 1) data["flag"] = 14;
  }

  if (isSet(this.iso) && this.iso === "IN") {
    data["s_mobile"] = usercookie.getParameterValue(this.imeshCookie, "mb1");
  } else {
    data["s_email"] = usercookie.getParameterValue(this.imeshCookie, "em");
  }

  return data;
};
Generation.prototype.intentGeneration = function (tmpId) {
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  if (this.imeshCookie !== "") {
    var data = this.getData(tmpId);
    data["form_type"] = form_type;
    data["tmpId"] = tmpId;
    GenerateIntent(data);
  }
};
Generation.prototype.blEnqGeneration = function (tmpId) {
  if (
    !isSSB(tmpId) &&
    !Bl04(tmpId) &&
    !Bl09(tmpId) &&
    ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
    usercookie.getParameterValue(imeshExist(), "uv").toLowerCase() !== "v" &&
    isSecondBl() &&
    ReqObj.Form[tmpId].FormSequence.StepCounter < 1
  ) {
    return;
  }
  if (
    ReqObj.Form[tmpId].mcatId === -2 ||
    !isSet(usercookie.getParameterValue(imeshExist(), "glid")) ||
    usercookie.getParameterValue(imeshExist(), "glid") === "" ||
    (ReqObj.Form[tmpId].generationId > 1 &&
      !(ReqObj.Form[tmpId].insert === "R" || ReqObj.Form[tmpId].insert === "U"))
  ) {
    if (
      ReqObj.Form[tmpId].generationId > 1 &&
      !(ReqObj.Form[tmpId].insert === "R" || ReqObj.Form[tmpId].insert === "U")
    ) {
      var genObject = PreAjax("Generation", tmpId);
      PostAjax(genObject, tmpId);
    } else {
      SpliceObject("Generation", ReqObj.Form[tmpId].ServiceSequence);
    }
    return;
  } else {
    if (ReqObj.Form[tmpId].generationCalled) {
      if (
        ReqObj.Form[tmpId].insert !== "I" &&
        isSet(ReqObj.Form[tmpId].ServiceSequence[0].cb) &&
        ReqObj.Form[tmpId].ServiceSequence[0].cb.length > 0
      )
        PostAjax(ReqObj.Form[tmpId].ServiceSequence[0], tmpId);
      SpliceObject("Generation", ReqObj.Form[tmpId].ServiceSequence);
      return;
    }
    var data = this.getData(tmpId);
    if (
      (currentISO() !== "IN" &&
        !isSet(data["s_first_name"]) &&
        !data["s_first_name"]) ||
      (currentISO() === "IN" && !toFireGeneration(tmpId))
    ) {
      SpliceObject("Generation", ReqObj.Form[tmpId].ServiceSequence);
      return;
    }

    if (
      !isSet(data["s_prod_name"]) &&
      !data["s_prod_name"] &&
      (!isSet(ReqObj.Form[tmpId].modrefType) ||
        (isSet(ReqObj.Form[tmpId].modrefType) &&
          ReqObj.Form[tmpId].modrefType.toLowerCase() === "product"))
    ) {
      SpliceObject("Generation", ReqObj.Form[tmpId].ServiceSequence);
      return;
    }
    termNcdata(tmpId);
    ReqObj.Form[tmpId].generationCalled = true;
    if (document.cookie.indexOf("conv=") === -1) {
          var now = new Date();
          now.setTime(now.getTime() + 1 * 1200 * 1000);
        document.cookie = "conv=true; path=/; expires=" + now.toUTCString() + "; domain=.indiamart.com;";   //converted cookie
        }
    var genObject = PreAjax("Generation", tmpId);
    if (
      isSet(this.imEqGlCookie) &&
      usercookie.getParameterValue(this.imeshCookie, "iso") === "IN" &&
      isSet(ReqObj.Form[tmpId].insert) &&
      ReqObj.Form[tmpId].insert === "I"
    ) {
      var appendedVal = appendImEqGlCookie(tmpId, "firsttimecreation");
    }
    if (
      ReqObj.Form[tmpId].insert === "R" ||
      ReqObj.Form[tmpId].insert === "U"
    ) {
      if (ReqObj.Form[tmpId].generationId >= 1) {
        data["req_id"] = ReqObj.Form[tmpId].generationId;
        data["flag"] = ReqObj.Form[tmpId].insert;
      }
    }
    if (IsChatbl(tmpId)) {
      data["flag"] = "BL";
    }
    if (
      isSet(ReqObj.Form[tmpId].FenqKey) &&
      ReqObj.Form[tmpId].FenqKey !== "" &&
      ReqObj.Form[tmpId].FenqKey.toLowerCase() === "jobs"
    ) {
      data["modref_type"] = "jobs";
    }
    var ftype = ReqObj.Form[tmpId].formType.toLowerCase();
    var type = "";
    var cbsource = "";
    if (isSet(ReqObj.Form[tmpId].insert)) {
      if (ftype === "enq" && ReqObj.Form[tmpId].insert === "I")
        type = "Enquiry generation";
      else if (ftype !== "enq" && ReqObj.Form[tmpId].insert === "I") {
        type = "BL generation";
        cbsource =
          IsChatbl(tmpId) && isSet(ReqObj.Form[tmpId].source) ? cbsource : "";
      } else type = "BL Update generation";
    }
    fireAjaxRequest({
      data: {
        ga: {
          s: true,
          f: true,
          gatype: type,
          source: cbsource === "" ? "" : "source :" + cbsource,
        },
        tmpId: tmpId,
        ajaxObj: {
          obj: genObject,
          s: {
            ss: 1,
            sf: {
              af: 1,
              pa: 0,
            },
            f: 1,
          },
          f: {
            f: 1,
          },
        },
        ajaxtimeout: 0,
        ajaxdata: data,
        hitfinserv: "",
        type: 8,
        key: {
          appendedVal: appendedVal,
        },
      },
    });
  }
};
/*--------------------------GlusrupdateonSuccess----------------------- */
function GlusrUpdateOnSuccess(revent, todo, res) {
  var userlogin = new UserLogin();
  var imesh = imeshExist();
  if (usercookie.getParameterValue(imesh, "usts") === "2")
    userlogin.reAuthenticate({
      data: {
        logObject: "",
        tmpId: revent.data.tmpId,
        userlogin: userlogin,
        blureve: false,
        todo: "glusrupdate",
        source: "updateservice",
      },
    });
  else
    userlogin.sendRequest({
      data: {
        logObject: "",
        tmpId: revent.data.tmpId,
        userlogin: userlogin,
        blureve: false,
        todo: "glusrupdate",
        source: "updateservice",
      },
    });
  if (todo === 0) callToIdentifiedQ(revent.data.tmpId, "from-Form");
  if (todo === 1) {
    if (revent.data.typename === "CompanyName")
      ReqObj.UserDetail.cName = ReqObj.Form[revent.data.tmpId].companyName;
    if (
      revent.data.typename === "GST" &&
      isSet(res.msg) &&
      isSet(res.msg.DET_MESSSAGE) &&
      isSet(res.msg.DET_MESSSAGE.STATUS)
    ) {
      if (res.msg.DET_MESSSAGE.STATUS.toLowerCase() === "successful")
        ReqObj.gst.toask = false;
      else ReqObj.gst.toask = true;
    }
    if (
      revent.data.typename === "URL" &&
      isSet(res.msg) &&
      isSet(res.msg.MESSAGE) &&
      isSet(res.msg.MESSAGE.STATUS)
    ) {
      if (res.msg.MESSAGE.STATUS.toLowerCase() === "successful")
        ReqObj.url.toask = false;
      else ReqObj.url.toask = true;
    }
    if (
      isEnq(revent.data.tmpId) ||
      Bl09(revent.data.tmpId) ||
      Bl01(revent.data.tmpId) ||
      Bl04(revent.data.tmpId)
    )
      miniDetailService(revent.data.tmpId);
  }
}
function GlusrUpdateOnError(revent, todo, res) {
  if (todo === 0) UpdateUserDetailKey();
  if (todo === 1) {
    if (revent.data.typename === "CompanyName") ReqObj.UserDetail.cName = "";
    if (revent.data.typename === "GST") ReqObj.gst.toask = true;
  }
}
/*------------------------------------Enquiry On Success-------------------------------------------*/

function EnqGenOnSuccess(event, res) {
  if (ReqObj.Form[event.data.tmpId].insert === "I")
    var IsResponseIdValid = ValidGenId(res.queryid);
  if (
    isSet(ReqObj.Form[event.data.tmpId].insert) &&
    ((ReqObj.Form[event.data.tmpId].insert === "I" && IsResponseIdValid) ||
      ReqObj.Form[event.data.tmpId].insert !== "I")
  ) {
    if (ReqObj.Form[event.data.tmpId].insert === "I") {
      ReqObj.Form[event.data.tmpId].generationId = SanitizeId(res.queryid);
      ReqObj.Form[event.data.tmpId].query_destination = res.query_destination;
      disableEnquiryButton(event.data.tmpId);
    }
  }
  if (ReqObj.Form[event.data.tmpId].toFireIsq === true)
    new Isq(event.data.tmpId).onSubmit(event.data.tmpId, true);
  if (
    isEnq(event.data.tmpId) &&
    ReqObj.Form[event.data.tmpId].ReqDtlBox &&
    isSet(ReqObj.Form[event.data.tmpId].flags.isEnrichCalled) &&
    !ReqObj.Form[event.data.tmpId].flags.isEnrichCalled
  )
    new RequirementDtl(event.data.tmpId).onSubmit(event.data.tmpId, true);
  if (event.data.tmpId === ReqObj.finEnq) {
    ReqObj.finEnq = "";
    var data = {
      ofr_id: res.queryid,
      rfq_queryDestination: res.query_destination,
      modId: event.data.ajaxdata.modid,
    };
    var data_arr = { sr: "gen", data_res: data };
    FinishEnquiryService(event.data.tmpId, data_arr);
  }
}
/*------------------------------------BL On Success-------------------------------------------*/

function BLGenOnSuccess(event, res) {
  if (
    ReqObj.Form[event.data.tmpId].insert === "I" &&
    IsFormBL(event.data.tmpId)
  )
    var IsResponseIdValid = ValidGenId(res.ofr);

  if (
    isSet(res) &&
    isSet(ReqObj.Form[event.data.tmpId].insert) &&
    ((ReqObj.Form[event.data.tmpId].insert === "I" && IsResponseIdValid) ||
      ReqObj.Form[event.data.tmpId].insert !== "I")
  ) {
    if (
      IsFormBL(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].insert === "I"
    ) {
      ReqObj.Form[event.data.tmpId].generationId = SanitizeId(res.ofr);
    }
  }
  if (
    ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl" &&
    ReqObj.Form[event.data.tmpId].toFireIsq === true
  )
    new Isq(event.data.tmpId).onSubmit(event.data.tmpId, true);
  if (
    (Bl09(event.data.tmpId) ||
      Bl01(event.data.tmpId) ||
      Bl04(event.data.tmpId)) &&
    ReqObj.Form[event.data.tmpId].ReqDtlBox &&
    isSet(ReqObj.Form[event.data.tmpId].flags.isEnrichCalled) &&
    !ReqObj.Form[event.data.tmpId].flags.isEnrichCalled
  )
    new RequirementDtl(event.data.tmpId).onSubmit(event.data.tmpId, true);
}
/*------------------------------------Enquiry/BL On Error-------------------------------------------*/

function BlEnqOnError(revent, res) {
  usercookie.deleteCookie("imEqGl");
  $("#t" + revent.data.tmpId + "_cls")
    .off("click")
    .on("click", function (event) {
      CloseForm(revent.data.tmpId);
    });
}
function defaultScreenMsg(ctanamemodid, tmpId, ctaname) {
  if(isEnq(tmpId)){
    if(direnqImage(tmpId)){
      return "";
    }
    if(isPnsEnq(tmpId)){
      let pnsno = isSet(ReqObj.Form[tmpId].pnsNumber) ? ReqObj.Form[tmpId].pnsNumber : "09XXXXXXXX";
      let pns_extn='';
      if(isSet(ReqObj.Form[tmpId].pns_extn) && ReqObj.Form[tmpId].pns_extn!='')
        pns_extn = `<span class="befs13">, Dial Ext. ${ReqObj.Form[tmpId].pns_extn}</span>`;
      if (ispdp(tmpId) && currentISO() === "IN"){
        pnsno = pnsno.slice(4);
        pnsno = '0' + pnsno;
      }
      return "Please provide a few details to get quick response from the supplier"; 
      // + "<div class='mt5 vmngrey'>" + `<span class='cbl_fs17'>You can contact supplier on </span><span class='befwt cbl_fs17'>${pnsno}</span>${pns_extn}` +"</div>";
    }
    return "Please provide a few details to get quick response from the supplier";
  }
  else{
    if(imeshExist()==''){
      return getLoginHeading(ctanamemodid, tmpId, ctaname);
    }
    else{
      return loginDefaultmsg(tmpId, ctaname, "Connect with ");
    }
  }
}
function getReqHeading(ctanamemodid, tmpId, ctaname) {
  switch (ctanamemodid) {
    case "all":
      return "Send a quick message to the seller for more information.";
    default:
      return defaultCaseHeading(ctanamemodid, tmpId, ctaname);
  }
}

function getUserVerificationHeading(ctanamemodid, tmpId, ctaname) {
  switch (ctanamemodid) {
    case "all":
      if (direnqImage(tmpId)) {
        return "";
      }
      else {
        return "Confirm your requirement";
      }
    default:
      return defaultCaseHeading(ctanamemodid, tmpId, ctaname);
  }
}

function getBlStaticIsqReqHeading(ctanamemodid, tmpId, ctaname) {
  switch (ctanamemodid) {
    case "all":
      if (direnqImage(tmpId)) {
        return "";
      }
      else {
        if(isPnsEnq(tmpId)){
          let pnsno = isSet(ReqObj.Form[tmpId].pnsNumber) ? ReqObj.Form[tmpId].pnsNumber : "09XXXXXXXX";
          let pns_extn='';
          if(isSet(ReqObj.Form[tmpId].pns_extn) && ReqObj.Form[tmpId].pns_extn!='')
            pns_extn = `<span class="befs13">, Dial Ext. ${ReqObj.Form[tmpId].pns_extn}</span>`;
          if (ispdp(tmpId) && currentISO() === "IN"){
            pnsno = pnsno.slice(4)
            pnsno = '0' + pnsno;
          }
          return "Almost done!";
          //  + "<div class='mt5 vmngrey'>" + `<span class='cbl_fs17'>You can contact supplier on </span><span class='befwt cbl_fs17'>${pnsno}</span>${pns_extn}` +"</div>";
        }
        return getMorePh(tmpId) ? ReqObj.Form[tmpId].FormSequence.StepCounter === 0 ? "Add a few details of your requirement to <strong>get more photos</strong> and details from the seller quickly" : "Add a few details of your requirement to get more photos and details from the seller quickly" : "Almost done!";
      }
    // new gmp
    default:
      defaultCaseHeading(ctanamemodid, tmpId, ctaname);
  }
}

function getContactDetailOnCloseInHeading(ctanamemodid, tmpId, ctaname) {
  switch (ctanamemodid) {
    case "all":
      return "Looks like you missed a few details!";
    default:
      return defaultCaseHeading(ctanamemodid, tmpId, ctaname);
  }
}

function getContactDetailOnCloseNotInHeading(ctanamemodid, tmpId, ctaname) {
  switch (ctanamemodid) {
    case "all":
      return "Awesome! You're Done";
    default:
      return defaultCaseHeading(ctanamemodid, tmpId, ctaname);
  }
}