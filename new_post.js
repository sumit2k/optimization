/**
 *
 * @description
 * @param {*} fName constructor name of the class
 * @returns object which is found in service sequence and inserted in hitarray
 * @usage takes object from the service sequence and inserts the same into hit array
 */
function PreAjax(fName, tmpId) {
  if (isSet(fName) && isSet(tmpId) && isSet(ReqObj.Form[tmpId].ServiceSequence)) {
    var CalledObj = RemoveObjFromService(fName, tmpId, ReqObj.Form[tmpId].ServiceSequence);
    if (checkblockedUser() && imeshExist() === "" && fName.toLowerCase() === "userlogin" && ReqObj.Form[tmpId].FormSequence.ServiceSequenceBlocked.length === 0 && isSSB(tmpId)) {
      ReqObj.Form[tmpId].FormSequence.ServiceSequenceBlocked.push(CalledObj);
      var cb = ReqObj.Form[tmpId].FormSequence.ServiceSequenceBlocked[0].cb;
      var len = cb.length - 1;
      var index = tofindindexfn(cb, "userverification", "fn");
      while (len >= 0) {
        if (isSet(cb[len].fn) && ConstructorName(cb[len].fn) !== "UserVerification") {
          var popCatch = cb.pop();
          ConstructorName(popCatch.fn) !== "Generation" ? cb[index].cb.push(popCatch) : "";
        }
        len -= 1;
      }
    }
    if (isSet(ReqObj.Form[tmpId].HitArray))
      ReqObj.Form[tmpId].HitArray.push(CalledObj);
    if (isSet(CalledObj) && CalledObj !== "") {
      return CalledObj;
    }
  }
}

/**
 *
 *
 * @param {*} fName object which to be removed from the service sequence
 * @param {*} tmpId
 * @returns removed object from the service sequence
 */
function RemoveObjFromService(fName, tmpId) {
  var ServiceArrayObj = "";
  if (isSet(tmpId)) {
    ServiceArrayObj = RemoveObjFromArray(
      fName,
      tmpId,
      ReqObj.Form[tmpId].ServiceSequence
    );
  }
  return ServiceArrayObj;
}

//please correct this code for ecom product
FormSeq.prototype._screen2 = function (tmpId, typeOfForm) {
  currentscreen_no = 2;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  // firefox  bug
  const Elem = EnqPopupDIR(tmpId) && (navigator.userAgent.indexOf('Firefox') !== -1) ? 1 : 0 ;
  if(Elem){
    $("#t" + tmpId + "_submitdiv").css({
      "text-align": "center",
    });
  } 
  else{
    "";
  }
  // 
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
  };
  var _classObj = null;
  var _case = data.imeshcookie && isSet(data.iso) && _contactScreen(data.iso) && (data.iso === "IN" || (data.iso !== "IN" && (ReqObj.Form[tmpId].FormSequence._stepCounter < 0 || (Enq04(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter < 1)))) ? 0 : -1;

  if (!Bl09(tmpId) && ((!isImageVidEnq(tmpId) && _that._stepCounter === -1) || ((isImageVidEnq(tmpId) || Enq04(tmpId) || Bl01(tmpId) || Bl04(tmpId)) && _that._stepCounter === 0)) && isSet(data.iso) && data.iso === "IN" && _mandatDetailsFilled() && ((isEnq(tmpId) && isSecondEnq(tmpId)) || ((Bl01(tmpId) || Bl04(tmpId)) && isSecondBl())) && ReqObj.UserDetail.uv === "")
    _case = -1;
  if ((Enq04(tmpId) || Bl04(tmpId)) && isSet(data.iso) && data.iso !== "IN" && isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "")
    _case = -1;
  if (currentISO() !== "IN" && ReqObj.UserDetail.mb1 === "") _case = 0;
  if (!(checkblockedUser() && im_issExist() === "") && _case !== -1 && ReqObj.Form[tmpId].flags.isNECShown === false) {
    classObj = isBl(tmpId) && data.imeshcookie !== "" && ReqObj.Form[tmpId].FormSequence._stepCounter < 0
      ? isImageVidEnq(tmpId) && isEcomProduct(tmpId)
        ? { classArray: ["ProductName"] }
        : { classArray: ["ProductName", "ContactDetail"] }
      : isImageVidEnq(tmpId) && isEcomProduct(tmpId)
        ? { classArray: ["enquirenow"] }
        : { classArray: ["ContactDetail"] };
    _classObj = {
      numberOfClassCalled: classObj.classArray.length,
      hooks: { 1: { pre: [_that._screen3], post: [] } },
      classArray: classObj.classArray,
      array: _makeDataAndServiceArr(classObj.classArray, data.array, 1),
      that: _that,
      tmpId: tmpId,
      afterService: _makeDataAndServiceArr(classObj.classArray, [], 2),
      extraKeys: _makeExtraKey(classObj.classArray, null),
      leadServiceObj:
        isImageVidEnq(tmpId) &&
          ReqObj.UserDetail.uv === "" &&
          isSecondEnq(tmpId) &&
          _that._stepCounter === -1 &&
          _mandatDetailsFilled()
          ? null
          : { 1: "generate" },
      nonMandatory: { name: false },
      additionalkey: { onlastscreen: false },
    };
    if (typeOfForm === "bl" && !Bl04(tmpId) && data.imeshcookie !== "" && ReqObj.Form[tmpId].FormSequence._stepCounter < 0) {
      _classObj.hooks = {
        1: { pre: [], post: [_that._screen3] },
        2: { pre: [], post: [] },
      };
      _classObj.leadServiceObj = isSecondBl(tmpId) === false || (isSecondBl(tmpId) && ReqObj.UserDetail.uv !== "") ? { 1: "generate" } : { 1: "generate" };
    }
    _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
    _that._objectSequence(tmpId, _classObj);
  } else _that._switchNext(tmpId, typeOfForm);
};
FormSeq.prototype._screen3 = function (tmpId, typeOfForm) {
  currentscreen_no = 3;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  // firefox  bug
  const Elem = EnqPopupDIR(tmpId) && (navigator.userAgent.indexOf('Firefox') !== -1) ? 1 : 0 ;
  if(Elem){
    $("#t" + tmpId + "_submitdiv").css({
      "text-align": "",
    });
  } 
  else{
    "";
  }
  // 
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
  };
  var _classObj = null;
  var message = currentISO() === "IN" && ((isEnq(tmpId) && isSecondEnq()) || (isBl(tmpId) && isSecondBl())) && usercookie.getParameterValue(imeshExist(), "uv") !== "V" && ReqObj.Form[tmpId].isOtpShownOnFirstStep ? "second" : "";
  var _case = checkblockedUser() && im_issExist() === "" ? 2 : data.imeshcookie && isSet(data.iso) && data.iso === "IN" && usercookie.getParameterValue(data.imeshcookie, "uv") === "" ? 0 : -1;
  if (_case !== -1 && ReqObj.Form[tmpId].flags.isOtpShown === false) {
    _classObj = {
      numberOfClassCalled: 1,
      hooks: _case === 2 ? { 1: { pre: [], post: [_that._screen2] } } : { 1: { pre: [], post: [_that._screen4] } },
      classArray: ["UserVerification"],
      array: { 1: data.array },
      that: _that,
      tmpId: tmpId,
      afterService: { 1: [] },
      extraKeys: { 1: { tr: false, is: false, hf: false, fobj: null } },
      leadServiceObj: { 1: "generate" },
      message: { 1: message },
    };
    _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
    _that._objectSequence(tmpId, _classObj);
  } else _that._switchNext(tmpId, typeOfForm);
};
FormSeq.prototype._screen4 = function (tmpId, typeOfForm) {

  currentscreen_no = 4;
  if (direnqImage(tmpId)) {
    $("#t" + tmpId + "_isqdetails" + "0R").addClass("bedsnone");
  }
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
    md: { ask: true, what: "Company Name", key: 0, ui: "old", suffix: "ocbx" },
  };
  ReqObj.Form[tmpId].IsqStep1 = ReturnCorrectVal(
    ReqObj.Form[tmpId].IsqStep1,
    3
  );
  ReqObj.Form[tmpId].IsqStepN = ReturnCorrectVal(
    ReqObj.Form[tmpId].IsqStepN,
    3
  );
  var toask = toAskCname(tmpId);
  var _classObj = null;
  var _rclassObj = {
    numberOfClassCalled: 1,
    hooks: { 1: { pre: [_that._screen5], post: [] }, 2: { pre: [], post: [] } },
    classArray: ["RequirementDtl", "MoreDetails", "BlStaticQues"],
    array: { 1: data.array, 2: data.array },
    that: _that,
    tmpId: tmpId,
    afterService: { 1: [], 2: [] },
    extraKeys: {
      1: { tr: true, is: false, hf: false, fobj: null },
      2: { tr: true, is: false, hf: false, fobj: null },
    },
    copyhooks: true,
    leadServiceObj: { 1: "generate" },
    md: { 2: data.md },
  };
  var _fallback =
    typeOfForm === "inenquiry"
      ? null
      : _that.returnClassObjects(0, _rclassObj.classArray[0], _rclassObj);
  if (Bl04(tmpId) || Bl09(tmpId)) {
    _fallback = [];
    _fallback[0] = _that.returnClassObjects(
      0,
      _rclassObj.classArray[0],
      _rclassObj
    );
    if (currentISO() !== "IN") {
      for (i = 1; i < _rclassObj.classArray.length; i++) {
        if (toask)
          _fallback[i] = _that.returnClassObjects(
            1,
            _rclassObj.classArray[i],
            _rclassObj
          );
        else {
          _fallback[i] = _that.returnClassObjects(
            1,
            _rclassObj.classArray[2],
            _rclassObj
          );
          break;
        }
      }
    }
  }
  var toCheckIsq =
    typeOfForm === "bl" &&
      ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown === true
      ? false
      : true;
  if (
    toCheckIsq &&
    ShowIsq(tmpId) &&
    parseInt(ReqObj.Form[tmpId].disableIsq) !== 1 &&
    parseInt(ReqObj.Form[tmpId].isqMcat) !== -1
  ) {
    var specialCase =
      isImageVidEnq(tmpId) && _that._stepCounter === -1 ? true : false;
    var _case = data.imeshcookie && isSet(data.iso) && data.iso !== "IN" ? 1 : 0;
    var classObj = {
      classArray:
        specialCase === true
          ? ["EnquireNow"]
          : _case === 0
            ? pdpenq(tmpId) && !Enq04(tmpId)
              ? ["Isq", "RequirementDtl"]
              : ["Isq"]
            : isBl(tmpId)
              ? _case === 1 && ReqObj.Form[tmpId].isProdNameChanged
                ? ["Isq"]
                : toask
                  ? ShowReqBox(tmpId)
                    ? ["Isq", "RequirementDtl", "MoreDetails", "BlStaticQues"]
                    : ["Isq", "MoreDetails", "BlStaticQues"]
                  : ShowReqBox(tmpId)
                    ? ["Isq", "RequirementDtl", "BlStaticQues"]
                    : ["Isq", "BlStaticQues"]
              : typeOfForm !== "inenquiry"
                ? toask
                  ? ["Isq", "RequirementDtl", "MoreDetails"]
                  : ["Isq", "RequirementDtl"]
                : toask
                  ? ["Isq", "MoreDetails"]
                  : ["Isq"],
    };
    _classObj = {
      numberOfClassCalled: classObj.classArray.length,
      hooks:
        (_case === 0 && !pdpenq(tmpId)) || specialCase === true
          ? { 1: { pre: [_that._screen5], post: [] } }
          : {
            1: { pre: [_that._screen5], post: [] },
            2: { pre: [], post: [] },
            3: { pre: [], post: [] },
            4: { pre: [], post: [] },
          },
      classArray: classObj.classArray,
      array: _makeDataAndServiceArr(classObj.classArray, data.array, 1),
      that: _that,
      tmpId: tmpId,
      afterService: { 1: [], 2: [], 3: [] },
      extraKeys: _makeExtraKey(classObj.classArray, _fallback),
      copyhooks: true,
      leadServiceObj: { 1: "generate" },
      md:
        _case === 1 &&
          toask &&
          !(
            typeOfForm === "inenquiry" ||
            (typeOfForm == "bl" && ReqObj.Form[tmpId].isFrInline == 1)
          )
          ? { 3: data.md }
          : _case === 1 &&
            toask &&
            (typeOfForm === "inenquiry" ||
              (typeOfForm == "bl" && ReqObj.Form[tmpId].isFrInline == 1))
            ? { 2: data.md }
            : null,
    };
    _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
    _that._objectSequence(tmpId, _classObj);
  } else {
    _that._switchNext(tmpId, typeOfForm);
  }
};
FormSeq.prototype._screen5 = function (tmpId, typeOfForm) {
  currentscreen_no = 5;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
  };

  var totalisqlength = ReqObj.Form[tmpId].IsqLength;

  if (
    (showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2) || displayedisq) &&
    isNewInlineBl(tmpId)
  ) {
    totalisqlength -= 1;
  }

  if ( !pdpenq(tmpId) && !(isBl(tmpId) && ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown) && parseInt(ReqObj.Form[tmpId].disableIsq) !== 1 && isSet(data.iso) && data.iso === "IN" && ReqObj.Form[tmpId].IsqArray !== null && ReqObj.Form[tmpId].prevCount < totalisqlength )
    _that._screen4(tmpId, typeOfForm);
  else if (ShowReqBox(tmpId)) {
    var toask = toAskCname(tmpId) && currentISO() !== "IN" ? true : false;
    var classObj = isBl(tmpId)
      ? {
        classArray: toask
          ? ["RequirementDtl", "MoreDetails", "BlStaticQues"]
          : ["RequirementDtl", "BlStaticQues"],
      }
      : {
        classArray: toask
          ? ["RequirementDtl", "MoreDetails"]
          : ["RequirementDtl"],
      };
    var _classObj = {
      numberOfClassCalled: classObj.classArray.length,
      hooks: {
        1: { pre: [_that._screen6], post: [] },
        2: { pre: [], post: [] },
        3: { pre: [], post: [] },
      },
      classArray: classObj.classArray,
      array: _makeDataAndServiceArr(classObj.classArray, data.array, 1),
      that: _that,
      tmpId: tmpId,
      afterService: { 1: [], 2: [], 3: [] },
      extraKeys: _makeExtraKey(classObj.classArray, null),
      leadServiceObj: { 1: "generate" },
      md: toask
        ? {
          2: {
            ask: true,
            what: "Company Name",
            key: 0,
            ui: "old",
            suffix: "ocbx",
          },
        }
        : null,
    };
    _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
    _that._objectSequence(tmpId, _classObj);
  } else if (
    isBl(tmpId) &&
    !ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown
  ) {
    if (
      currentISO() !== "IN" &&
      (Bl04(tmpId) || Bl01(tmpId)) &&
      ReqObj.Form[tmpId].isAttachmentShown === true
    )
      _that._switchNext(tmpId, typeOfForm);
    else {
      var toask = toAskCname(tmpId) && currentISO() !== "IN" ? true : false;
      var _classObj = {
        numberOfClassCalled: currentISO() !== "IN" && toask ? 2 : 1,
        hooks:
          currentISO() !== "IN" && toask
            ? {
              1: { pre: [_that._screen6], post: [] },
              2: { pre: [], post: [] },
            }
            : { 1: { pre: [_that._screen6], post: [] } },
        classArray:
          currentISO() !== "IN" && toask
            ? ["MoreDetails", "BlStaticQues"]
            : ["BlStaticQues"],
        array:
          currentISO() !== "IN" && toask
            ? { 1: data.array, 2: data.array }
            : { 1: data.array },
        that: _that,
        tmpId: tmpId,
        afterService:
          currentISO() !== "IN" && toask ? { 1: [], 2: [] } : { 1: [] },
        extraKeys:
          currentISO() !== "IN" && toask
            ? {
              1: { tr: true, is: false, hf: false, fobj: null },
              2: { tr: true, is: false, hf: false, fobj: null },
            }
            : { 1: { tr: true, is: false, hf: false, fobj: null } },
        leadServiceObj: { 1: "generate" },
        md:
          currentISO() !== "IN" && toask
            ? {
              1: {
                ask: true,
                what: "Company Name",
                key: 0,
                ui: "old",
                suffix: "ocbx",
              },
            }
            : null,
      };
      _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
      _that._objectSequence(tmpId, _classObj);
    }
  } else _that._switchNext(tmpId, typeOfForm);
};
FormSeq.prototype._screen6 = function (tmpId, typeOfForm) {
  currentscreen_no = 6;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  var LastScreen = _that._returnLastScreen(tmpId);
  var contactScreen = false;
  var _extraDefault = { tr: false, is: false, hf: false, fobj: null };
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
    emptyHook: { pre: [], post: [] },
  };
  var _classObj = {
    numberOfClassCalled: 0,
    hooks: {
      1: { pre: [_that._screen7], post: {} },
      2: data.emptyHook,
      3: data.emptyHook,
    },
    classArray: [],
    array: { 1: data.array, 2: data.array, 3: data.array },
    that: _that,
    tmpId: tmpId,
    afterService: {},
    extraKeys: { 1: _extraDefault, 2: _extraDefault, 3: _extraDefault },
    md: {},
    nonMandatory: {},
  };
  if (isSet(data.iso) && _contactScreen(data.iso)) {
    contactScreen = true;
    _classObj.numberOfClassCalled += 1;
    _classObj.classArray.push("ContactDetail");
    _classObj.afterService[_classObj.numberOfClassCalled] = [
      returnPostBlEnqObject(tmpId, data.array, data.emptyHook, _that, ""),
    ];
    _classObj.md[_classObj.numberOfClassCalled] = null;
    _classObj.nonMandatory = isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn === "" ? { name: false } : null;
    _classObj.additionalkey = { onlastscreen: true };
  }
  if (toAskCname(tmpId) && (typeof ReqObj.Form[tmpId].companyName === "undefined" || (isSet(ReqObj.Form[tmpId].companyName) && ReqObj.Form[tmpId].companyName === ""))) {
    _classObj.numberOfClassCalled += 1;
    _classObj.classArray.push("MoreDetails");
    _classObj.afterService[_classObj.numberOfClassCalled] = [];
    _classObj.md[_classObj.numberOfClassCalled] = {
      ask: true,
      what: "Company Name",
      key: 0,
      ui: "new",
      suffix: "ncbx",
    };
  }
  if (isSet(data.iso) && data.iso === "IN" && ReqObj.gst.toask === true) {
    _classObj.numberOfClassCalled += 1;
    _classObj.classArray.push("MoreDetails");
    _classObj.afterService[_classObj.numberOfClassCalled] = [];
    _classObj.md[_classObj.numberOfClassCalled] = {
      ask: true,
      what: "GST Number",
      key: 1,
      ui: "new",
      suffix: "cgst",
    };
  }
  if (isSet(data.iso) && data.iso !== "IN" && ReqObj.url.toask === true) {
    _classObj.numberOfClassCalled += 1;
    _classObj.classArray.push("MoreDetails");
    _classObj.afterService[_classObj.numberOfClassCalled] = [];
    _classObj.md[_classObj.numberOfClassCalled] = {
      ask: true,
      what: "Website Url",
      key: 2,
      ui: "new",
      suffix: "curl",
    };
  }
  if (LastScreen === "ContactDetail" && contactScreen === true && _classObj.numberOfClassCalled === 1)
    _classObj.numberOfClassCalled = 0;
  if (_classObj.numberOfClassCalled !== 0) {
    _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
    _that._objectSequence(tmpId, _classObj);
  } else _that._switchNext(tmpId, typeOfForm);
};

FormSeq.prototype._screen7 = function (tmpId, typeOfForm) {
  currentscreen_no = 7;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
  };
  var _classObj = {
    numberOfClassCalled: 1,
    hooks: { 1: { pre: [], post: [] } },
    classArray: ["ThankYou"],
    array: { 1: data.array },
    that: _that,
    tmpId: tmpId,
    afterService: { 1: [] },
    extraKeys: { 1: { tr: false, is: false, hf: false, fobj: null } },
  };
  _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
  _that._objectSequence(tmpId, _classObj);
};

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
function ShowIsq(tmpId) {
  //|| (tmpId.substring(0, 2) === "09" && currentISO() !== "IN")
  if (
    parseInt(ReqObj.Form[tmpId].disableIsq) === 1 ||
    (currentISO() !== "IN" && ReqObj.Form[tmpId].Isq.HasHtmlCalled === true)
  )
    return false;
  else if (pdpenq(tmpId) && !ShowReqBox(tmpId)) {
    return false;
  }
  else if (
    ReqObj.Form[tmpId].IsqArray === "" ||
    ReqObj.Form[tmpId].prevCount < ReqObj.Form[tmpId].IsqLength
  )
    return true;
  else return false;
}
function ChatBlMsgs(QuestionText, type) {
  if (isSet(QuestionText)) {
    var defaultmsg = "What is your preferred";
    if (isSet(type) && type.toLowerCase() === "radio") {
      defaultmsg = "Please select";
    }
    var QuestionTextMatch = trimVal(QuestionText.toLowerCase());
    if (QuestionTextMatch in ChatBlStaticMsg) {
      return ChatBlStaticMsg[QuestionTextMatch];
    } else {
      var splitting = defaultmsg.split(" ");
      var last_word = splitting[splitting.length - 1];
      splitting = QuestionText.split(" ");
      var first_word = splitting[0];
      if (QuestionText.toLowerCase().includes("sample order"))
        return "Is this a sample order" + QuestionEnding;
      if (first_word.toLocaleLowerCase() === last_word.toLocaleLowerCase()) {
        defaultmsg = defaultmsg.substr(0, defaultmsg.lastIndexOf(" ") + 1);
      }
      defaultmsg += " ";
      if (isSet(type) && type.toLowerCase() === "radio") {
        return defaultmsg + "<strong>" + QuestionText + "</strong>";
      }
      return (
        defaultmsg + "<strong>" + QuestionText + "</strong>" + QuestionEnding
      );
    }
  }
}
function ssbClass(type, tmpId) {
  if (type === "label") return isnewSSB(tmpId) ? "nb-fmlbl" : "mb-lbl";
  if (type === "reqBxLbl")
    return isnewSSB(tmpId) ? "nb-fmlbl" : "mb-lbl mb-mt10";
  if (type === "wrprClass")
    return isnewSSB(tmpId) ? "nb-frm nb-mt25" : "mb-flex mb-pdt15 mb-fxstrt";
  if (type === "radin") return isnewSSB(tmpId) ? "nb-radin" : "mb-radin";
  if (type === "radio")
    return isnewSSB(tmpId) ? "nb-rad radioClick" : "mb-rad radioClick";
  if (type === "radlbl") return isnewSSB(tmpId) ? "nb-radlbl" : "mb-radlbl";
  if (type === "otp")
    return isnewSSB(tmpId)
      ? "nb-flex nb-otpm "
      : "mb-wdIn mb-flex mb-otpm mb-otpHt";
  if (type === "skipotp") return isnewSSB(tmpId) ? "nb-crPnt" : "mb-crPnt";
  if (type === "resendotp")
    return isnewSSB(tmpId) ? "nb-rsd nb-crPnt" : "mb-rsd mb-crPnt";
  if (type === "errorotp")
    return isnewSSB(tmpId)
      ? "nb-ertxt nb-dib bedsnone"
      : "mb-ertxt mb-dib bedsnone";
  if (type === "verifyotp")
    return isnewSSB(tmpId) ? "nb-mbuTxt nb-lh18" : "mb-mbuTxt mb-lh18";
  if (type === "otplabel")
    return isnewSSB(tmpId) ? "nb-lbl nb-pdt10 nb-pdr10" : "mb-lbl";
  if (type === "otpwrap")
    return isnewSSB(tmpId)
      ? "nb-flex nb-pdt15 nb-fxstrt"
      : "mb-flex mb-pdt15 mb-fxstrt";
  if (type === "speccity")
    return isnewSSB(tmpId) ? "nb-w160 nb-Mr15" : "mb-w222 mb-Mr15";
  if (type === "html")
    return isnewSSB(tmpId)
      ? "nb-SbHd nb-hp nb-pr nb-pdt15 nb-crPnt"
      : "mb-SbHd mb-hp mb-pr mb-pdt15 mb-crPnt";
  if (type === "htmli") return isnewSSB(tmpId) ? "nb-SbHd" : "mb-SbHd";
  if (type === "disable") return isnewSSB(tmpId) ? "nb-inpDisb" : "mb-inpDisb";
}
function ConversationLeftWrapper(tmpId, message, classObj, name) {
  /* add attributes at end  */
  if (isSet(message) && message !== "") {
    if (IsChatbl(tmpId) && !isSet(name)) {
      return classObj.leftright + message + "</div>";
    }
    return (
      '<div class="' +
      classObj.leftright +
      '"><div class="' +
      classObj.classtotest +
      '">' +
      message +
      "</div></div>"
    );
  }
}

function ConversationRightWrapper(tmpId, message, classObj) {
  /* add attributes at end  */
  if (
    IsChatbl(tmpId) &&
    isSet(message) &&
    (message.toLowerCase() === "not answered" || message === "")
  ) {
    return "";
  }
  if (isSet(message) && message !== "") {
    var messagetoshow = IsChatbl(tmpId)
      ? "<div class='txt_area'>" + message + "</div>"
      : "";

    return IsChatbl(tmpId)
      ? '<div class="' + classObj.leftright + '">' + messagetoshow + "</div>"
      : '<div class="' +
      classObj.leftright +
      '"><div class="' +
      classObj.classtotest +
      '">' +
      messagetoshow +
      "</div></div>";
  }
}

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
function ShowUserAns(tmpId) {
  if (isSet(tmpId)) {
    removeBLLoader(tmpId, "center");
    var array = [];
    var that = ReqObj.Form[tmpId].FormSequence;
    if (that.OnCloseCounter > -1) {
      if (that.OnCloseCounter > 0)
        array = ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter - 1];
      else array = [];
    } else {
      if (that.StepCounter > 0)
        array = ReqObj.Form[tmpId].UiArray[that.StepCounter - 1];
      else array = [];
    }
    for (var i = 0; i < array.length; i++) {
      if (isSet(array[i].Obj)) {
        var FormId = IsChatbl(tmpId)
          ? "#t" + tmpId + "_new_chatbl"
          : "#t" + tmpId + "_bl_form";
        var IdToHide = "";
        if (isSet(array[i].Obj.idToAppend) && array[i].Obj.idToAppend !== "") {
          FormId = array[i].Obj.idToAppend;
        }
        if (isSet(array[i].Obj.idToHide) && array[i].Obj.idToHide !== "") {
          IdToHide = array[i].Obj.idToHide;
        }
        // console.log(array[i].Obj.idToAppend);
        if (typeof array[i].Obj.displayAnswer === "function") {
          // removeBLLoader(tmpId, "center");
          var FormIdSel = $(FormId);
          var HtmlArray = array[i].Obj.displayAnswer(tmpId);
          RenderHtml(FormIdSel, HtmlArray, tmpId);
          // FormIdSel
          //   .append(array[i].Obj.displayAnswer(tmpId));
          if (FormIdSel.hasClass("bedsnone")) {
            FormIdSel.removeClass("bedsnone");
          }
          if (isSet(IdToHide) && IdToHide !== "")
            $(IdToHide).css({
              display: "none",
            });
        }
      }
    }
  }
}

function SaveIsq(tmpId, type, IsqScreen) {
  if (type.toLowerCase() === "isq") {
    var questionsId = ReqObj.Form[tmpId].questionsId;
    var questionsDesc = ReqObj.Form[tmpId].questionsDesc;
    var optionsId = ReqObj.Form[tmpId].optionsId;
    var optionsValue = ReqObj.Form[tmpId].optionsValue;
  } else if (type.toLowerCase() === "static") {
    var questionsId = ReqObj.Form[tmpId].Static.questionsId;
    var questionsDesc = ReqObj.Form[tmpId].Static.questionsDesc;
    var optionsId = ReqObj.Form[tmpId].Static.optionsId;
    var optionsValue = ReqObj.Form[tmpId].Static.optionsValue;
  }
  var CurrentPageQuestions = [];
  if (
    isnewSSB(tmpId) &&
    isSet(ReqObj.Form[tmpId].Isq.CurrentPageQuestionsStatic) &&
    type.toLowerCase() === "static" &&
    currentISO() === "IN"
  ) {
    var CurrentPageQuestions =
      ReqObj.Form[tmpId].Isq.CurrentPageQuestionsStatic;
  } else if (IsqScreen > -1) {
    var CurrentPageQuestions =
      ReqObj.Form[tmpId].Isq.CurrentPageQuestions[IsqScreen];
  }
  ReqObj.Form[tmpId].Isq.newIsqAdded = false;

  // if(isImageVidEnq(tmpId) && !isSet(CurrentPageQuestions)){
  //   var CurrentPageQuestions = (ReqObj.Form[tmpId].Isq.CurrentPageQuestions.length !== 0) ? ReqObj.Form[tmpId].Isq.CurrentPageQuestions[0] : CurrentPageQuestions;
  // }

  if (isSet(CurrentPageQuestions)) {
    // var AnswerArray = [];
    ReqObj.Form[tmpId].IsqUpdated = false;
    for (var n = 0; n < CurrentPageQuestions.length; n++) {
      if (CurrentPageQuestions[n].length > 0) {
        var AnswerText = "";
        var QuestionText = "";
      } else continue;
      for (var m = 0; m < CurrentPageQuestions[n].length; m++) {
        var indexofIsq = IsqAlreadyPresent(
          tmpId,
          CurrentPageQuestions[n][m].questionText
        );

        if (CurrentPageQuestions[n][m].type === "TEXTBOX") {
          var toappend =
            tmpId.substr(0, 2) === "09" &&
              ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
              ? tmpId + "_" + (ReqObj.Form[tmpId].FormSequence.StepCounter + 1)
              : tmpId;
          var optionValue = trimVal(
            $(CurrentPageQuestions[n][m].optionSelector).val()
          );
          CurrentPageQuestions[n][m].questionText.toLowerCase() ===
            "quantity unit"
            ? updateOptionId(tmpId, $(".unsug" + toappend).attr("id"))
            : "";
          if (indexofIsq === -1) {
            if (optionValue) {
              QuestionText =
                QuestionText !== ""
                  ? QuestionText
                  : CurrentPageQuestions[n][m].questionText;
              questionsId.push(CurrentPageQuestions[n][m].questionId);
              questionsDesc.push(CurrentPageQuestions[n][m].questionText);
              optionsId.push(
                $(CurrentPageQuestions[n][m].optionSelector).attr("optionid")
              );
              optionsValue.push(optionValue);

              if (trimVal(AnswerText.toLowerCase()) !== "not sure") {
                AnswerText += " " + optionValue;
                ReqObj.Form[tmpId].Isq.newIsqAdded = true;
              } else {
                AnswerText = NotFilled;
              }
            } else {
              AnswerText = NotFilled;
              if (
                CurrentPageQuestions[n][m].questionText.toLowerCase() ===
                "quantity"
              )
                break;
            }
          } else {
            if (optionValue) {
              QuestionText =
                QuestionText !== ""
                  ? QuestionText
                  : CurrentPageQuestions[n][m].questionText;
              questionsId[indexofIsq] = CurrentPageQuestions[n][m].questionId;
              questionsDesc[indexofIsq] =
                CurrentPageQuestions[n][m].questionText;
              optionsId[indexofIsq] = $(
                CurrentPageQuestions[n][m].optionSelector
              ).attr("optionid");
              optionsValue[indexofIsq] = optionValue;

              if (trimVal(AnswerText.toLowerCase()) !== "not sure") {
                AnswerText += " " + optionValue;
                ReqObj.Form[tmpId].Isq.newIsqAdded = true;
              } else {
                AnswerText = NotFilled;
              }
            } else {
              ReqObj.Form[tmpId].IsqUpdated = true;
              questionsId.splice(indexofIsq, 1);
              questionsDesc.splice(indexofIsq, 1);
              optionsId.splice(indexofIsq, 1);
              optionsValue.splice(indexofIsq, 1);
            }
          }
        } else if (CurrentPageQuestions[n][m].type === "SELECT") {
          var selectbx_val = "";
          var optionId = IsChatbl(tmpId)
            ? $(".cbl_selected").attr("optionid")
            : $(
              CurrentPageQuestions[n][m].optionSelector + " option:selected"
            ).attr("optionid");
          var optionVal = IsChatbl(tmpId)
            ? trimVal(
              $(CurrentPageQuestions[n][m].optionSelector).attr("value")
            ).toLowerCase()
            : trimVal(
              $(
                CurrentPageQuestions[n][m].optionSelector + " option:selected"
              ).attr("value")
            ).toLowerCase();
          if (optionVal === "other" || optionVal === "others")
            selectbx_val = IsChatbl(tmpId)
              ? trimVal(
                $(CurrentPageQuestions[n][m].optionSelector).attr("value")
              )
              : trimVal($(CurrentPageQuestions[n][m].others[0]).val());
          else
            selectbx_val = IsChatbl(tmpId)
              ? trimVal(
                $(CurrentPageQuestions[n][m].optionSelector).attr("value")
              )
              : trimVal($(CurrentPageQuestions[n][m].optionSelector).val());

          if (indexofIsq === -1) {
            if (selectbx_val) {
              QuestionText =
                QuestionText !== ""
                  ? QuestionText
                  : CurrentPageQuestions[n][m].questionText;
              questionsId.push(CurrentPageQuestions[n][m].questionId);
              questionsDesc.push(CurrentPageQuestions[n][m].questionText);
              optionsId.push(optionId);
              optionsValue.push(selectbx_val);

              if (trimVal(AnswerText.toLowerCase()) !== "not sure") {
                AnswerText += " " + selectbx_val;
                ReqObj.Form[tmpId].Isq.newIsqAdded = true;
              }
            } else {
              AnswerText = NotFilled;
            }
          } else {
            if (selectbx_val) {
              QuestionText =
                QuestionText !== ""
                  ? QuestionText
                  : CurrentPageQuestions[n][m].questionText;
              questionsId[indexofIsq] = CurrentPageQuestions[n][m].questionId;
              questionsDesc[indexofIsq] =
                CurrentPageQuestions[n][m].questionText;
              optionsId[indexofIsq] = optionId;
              optionsValue[indexofIsq] = selectbx_val;

              if (trimVal(AnswerText.toLowerCase()) !== "not sure") {
                ReqObj.Form[tmpId].Isq.newIsqAdded = true;
                AnswerText += " " + selectbx_val;
              }
            } else {
              ReqObj.Form[tmpId].IsqUpdated = true;
              AnswerText = NotFilled;
              questionsId.splice(indexofIsq, 1);
              questionsDesc.splice(indexofIsq, 1);
              optionsId.splice(indexofIsq, 1);
              optionsValue.splice(indexofIsq, 1);
            }
          }
        }

        //keep this for future
        else if (CurrentPageQuestions[n][m].type === "CHECKBOX") {
          if (indexofIsq !== -1) {
            ReqObj.Form[tmpId].IsqUpdated = true;
            for (var t = 0; t < questionsDesc.length;) {
              if (
                CurrentPageQuestions[n][m].questionText.toLowerCase() ===
                questionsDesc[t].toLowerCase()
              ) {
                questionsId.splice(t, 1);
                questionsDesc.splice(t, 1);
                optionsId.splice(t, 1);
                optionsValue.splice(t, 1);
              } else {
                t++;
              }
            }
          }
          if (trimVal($(CurrentPageQuestions[n][m].optionSelector).val())) {
            $.each(
              $(CurrentPageQuestions[n][m].optionSelector + ":checked"),
              function () {
                QuestionText =
                  QuestionText !== ""
                    ? QuestionText
                    : CurrentPageQuestions[n][m].questionText;
                questionsId.push(CurrentPageQuestions[n][m].questionId);
                questionsDesc.push(CurrentPageQuestions[n][m].questionText);
                optionsId.push($(this).siblings("label").attr("optionid"));
                optionsValue.push(trimVal($(this).val()));

                if (trimVal(AnswerText.toLowerCase()) !== "not sure")
                  AnswerText += ", " + trimVal($(this).val());
              }
            );
          }
          for (var j = 0; j < CurrentPageQuestions[n][m].others.length; j++) {
            var optionValue = trimVal(
              $(CurrentPageQuestions[n][m].others[j]).val()
            );

            if (optionValue) {
              QuestionText =
                QuestionText !== ""
                  ? QuestionText
                  : CurrentPageQuestions[n][m].questionText;
              questionsId.push(CurrentPageQuestions[n][m].questionId);
              questionsDesc.push(CurrentPageQuestions[n][m].questionText);
              optionsId.push(
                $(CurrentPageQuestions[n][m].others[j])
                  .siblings("label")
                  .attr("optionid")
              );
              optionsValue.push(optionValue);

              if (trimVal(AnswerText.toLowerCase()) !== "not sure") {
                AnswerText += ", " + optionValue;
                ReqObj.Form[tmpId].Isq.newIsqAdded = true;
              }
            }
          }
          if (trimVal(AnswerText) === "") AnswerText = NotFilled;
          else {
            AnswerText = trimVal(AnswerText);
            AnswerText = AnswerText.replace(/(^,)|(,$)/g, "");
            ReqObj.Form[tmpId].Isq.newIsqAdded = true;
          }
        } else if (CurrentPageQuestions[n][m].type === "RADIO") {
          if (indexofIsq !== -1) {
            ReqObj.Form[tmpId].IsqUpdated = true;
            questionsId.splice(indexofIsq, 1);
            questionsDesc.splice(indexofIsq, 1);
            optionsId.splice(indexofIsq, 1);
            optionsValue.splice(indexofIsq, 1);
          }
          var optionValue = trimVal(
            $(CurrentPageQuestions[n][m].optionSelector + ":checked").val()
          );
          if (optionValue) {
            QuestionText =
              QuestionText !== ""
                ? QuestionText
                : CurrentPageQuestions[n][m].questionText;
            questionsId.push(CurrentPageQuestions[n][m].questionId);
            questionsDesc.push(CurrentPageQuestions[n][m].questionText);
            optionsId.push(
              $(CurrentPageQuestions[n][m].optionSelector + ":checked")
                .siblings("label")
                .attr("optionid")
            );
            optionsValue.push(optionValue);
            if (trimVal(AnswerText.toLowerCase()) !== "not sure") {
              AnswerText += " " + optionValue;
              ReqObj.Form[tmpId].Isq.newIsqAdded = true;
            }
          }
          for (var j = 0; j < CurrentPageQuestions[n][m].others.length; j++) {
            optionValue = trimVal(
              $(CurrentPageQuestions[n][m].others[j]).val()
            );
            if (optionValue) {
              QuestionText =
                QuestionText !== ""
                  ? QuestionText
                  : CurrentPageQuestions[n][m].questionText;
              questionsId.push(CurrentPageQuestions[n][m].questionId);
              questionsDesc.push(CurrentPageQuestions[n][m].questionText);
              optionsId.push(
                $(CurrentPageQuestions[n][m].others[j])
                  .siblings("label")
                  .attr("optionid")
              );
              optionsValue.push(optionValue);
              if (trimVal(AnswerText.toLowerCase()) !== "not sure") {
                AnswerText += " " + optionValue;
                ReqObj.Form[tmpId].Isq.newIsqAdded = true;
              }
            }
          }
          if (trimVal(AnswerText) === "") AnswerText = NotFilled;
        }
      }

      ReqObj.Form[tmpId].Isq.CurrentScreenAnswers = trimVal(AnswerText);
      ReqObj.Form[tmpId].Isq.KeyQuestion = trimVal(QuestionText);
    }
  }
  // ReqObj.Form[tmpId].Isq.CurrentScreenAnswers = AnswerArray;

  CurrentPageQuestions = [];
}

function ValidateQuestions(tmpId, staticQues, IsqScreen) {
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var StepNumber = ReqObj.Form[tmpId].FormSequence.StepCounter + 1;
  var CurrentPageQuestions = [];
  var isquantityfilled = false;
  var isunitfilled = false;
  var isqtutvalidate = false;
  var iserrorcr = true;
  if (IsqScreen > -1) {
    var CurrentPageQuestions =
      ReqObj.Form[tmpId].Isq.CurrentPageQuestions[IsqScreen];
  }
  if (isSet(CurrentPageQuestions)) {
    //   if(!IsChatbl(tmpId) &&isSet(ReqObj.Form[tmpId].QtUtError) && ReqObj.Form[tmpId].QtUtError === true) return false;
    for (var n = 0; n < CurrentPageQuestions.length; n++) {
      var errorCount = 0; //
      var errorSelect = "";
      var tracking = "";
      var checkovalid = false,
        radioovalid = false,
        textovalid = false,
        qunutvalid = false;
      var errorObject = {};
      if (!IsChatbl(tmpId)) {
        errorObject = {
          error_block_class: "beerrp3",
          anchor_class: "bearwL2",
        };
      }
      if (isSet(CurrentPageQuestions[n])) {
        var NumberofQuestions = CurrentPageQuestions[n].length;
        var option_type;
        for (var m = 0; m < CurrentPageQuestions[n].length; m++) {
          if (CurrentPageQuestions[n][m].type === "TEXTBOX") {
            var optionValue = trimVal(
              $(CurrentPageQuestions[n][m].optionSelector).val()
            );
            if (!optionValue) {
              if (
                errorCount < 1 &&
                CurrentPageQuestions[n][m].questionText.toLowerCase() ===
                "quantity unit"
              ) {
                isqtutvalidate = true;
                option_type = "quantity unit";
              }
              errorCount++;
              errorObject["msg"] =
                "Please enter " + CurrentPageQuestions[n][m].questionText;
              if (IsChatbl(tmpId)) {
                if (NumberofQuestions > 1 && m === 0)
                  errorObject["error_block_class"] = " erchat";
              }
              if (
                CurrentPageQuestions[n][m].questionText.toLowerCase() ===
                "quantity"
              )
                isquantityfilled = false;
              else if (
                CurrentPageQuestions[n][m].questionText.toLowerCase() ===
                "quantity unit"
              )
                isunitfilled = false;

              errorSelect = CurrentPageQuestions[n][m].optionSelector;
              tracking =
                "Validation_Error" + CurrentPageQuestions[n][m].questionText;
            } else if (
              CurrentPageQuestions[n][m].questionText.toLowerCase() ===
              "quantity"
            ) {
              if (
                returnValidateTypeError(
                  optionValue,
                  CurrentPageQuestions[n][m].questionText.toLowerCase()
                ) === "1"
              ) {
                errorCount++;
                errorObject["msg"] = "Enter a valid Quantity";
                errorSelect = CurrentPageQuestions[n][m].optionSelector;
                tracking =
                  "Validation_Error" + CurrentPageQuestions[n][m].questionText;
                isqtutvalidate = true;
                break;
              }
              if (
                CurrentPageQuestions[n][m].questionText.toLowerCase() ===
                "quantity"
              )
                isquantityfilled = true;
            } else if (
              CurrentPageQuestions[n][m].questionText.toLowerCase() ===
              "quantity unit"
            ) {
              if (isScriptTag(optionValue)) {
                errorCount = 1;
                errorObject["msg"] = "Enter a valid Quantity Unit";
                errorSelect = CurrentPageQuestions[n][m].optionSelector;
                qunutvalid = true;
                option_type = "quantity unit";
                break;
              } else isunitfilled = true;
            } else if (
              staticQues &&
              CurrentPageQuestions[n][m].questionText.toLowerCase() ===
              "quantity" &&
              (parseInt(optionValue, 10) === 0 ||
                !ValidNumber(optionValue) ||
                !(parseInt(optionValue, 10) > 0))
            ) {
              errorCount++;
              if (isHindi(optionValue))
                errorObject["msg"] = "Please do not use special symbols";
              else {
                if (parseInt(optionValue, 10) === 0)
                  errorObject["msg"] = "Quantity should be numeric except 0";
                else if (
                  !ValidNumber(optionValue) ||
                  !(parseInt(optionValue, 10) > 0)
                )
                  errorObject["msg"] = "Quantity should be numeric except 0";
              }
              if (IsChatbl(tmpId)) {
                if (NumberofQuestions > 1 && m === 0)
                  errorObject["error_block_class"] = " erchat";
              }
              isquantityfilled = true;
              errorSelect = CurrentPageQuestions[n][m].optionSelector;
              tracking =
                "Validation_Error" + CurrentPageQuestions[n][m].questionText;
              break;
            } else if (
              IsChatbl(tmpId) &&
              CurrentPageQuestions[n][m].questionText.toLowerCase() ===
              "quantity" &&
              !isAllNumbers(optionValue)
            ) {
              errorCount++;
              errorObject["msg"] =
                "Please enter " + CurrentPageQuestions[n][m].questionText;
              if (IsChatbl(tmpId)) {
                if (NumberofQuestions > 1 && m === 0)
                  errorObject["error_block_class"] = " erchat";
              }
              isquantityfilled = true;
              errorSelect = CurrentPageQuestions[n][m].optionSelector;
              tracking =
                "Validation_Error" + CurrentPageQuestions[n][m].questionText;
            } else {
              isquantityfilled = false;
              if (isScriptTag(optionValue)) {
                textovalid = true;
                option_type = "text";
                errorObject["msg"] = "Enter a valid details";
                errorSelect = CurrentPageQuestions[n][m].optionSelector;
                if (IsChatbl(tmpId)) {
                  if (NumberofQuestions > 1)
                    errorObject["error_block_class"] = " erchat";
                }
                break;
              }
            }
          } else if (CurrentPageQuestions[n][m].type === "SELECT") {
            var selectbx_val = "";
            var optionId = IsChatbl(tmpId)
              ? trimVal(
                $(CurrentPageQuestions[n][m].optionSelector).attr("value")
              ).toLowerCase()
              : trimVal(
                $(
                  CurrentPageQuestions[n][m].optionSelector +
                  " option:selected"
                ).attr("value")
              ).toLowerCase();
            if (optionId === "other" || optionId === "others")
              selectbx_val = IsChatbl(tmpId)
                ? trimVal($(CurrentPageQuestions[n][m].optionSelector).val())
                : trimVal($(CurrentPageQuestions[n][m].others[0]).val());
            else
              selectbx_val = trimVal(
                $(CurrentPageQuestions[n][m].optionSelector).val()
              );
            if (!selectbx_val) {
              errorCount++;
              errorObject["msg"] =
                "Please enter " + CurrentPageQuestions[n][m].questionText;
              if (IsChatbl(tmpId)) {
                if (NumberofQuestions > 1 && m === 0)
                  errorObject["error_block_class"] = " erchat";
              }
              errorSelect = CurrentPageQuestions[n][m].optionSelector;
              tracking =
                "Validation_Error" + CurrentPageQuestions[n][m].questionText;
              isunitfilled = false;
            } else isunitfilled = true;
          }

          //keep this for future
          else if (CurrentPageQuestions[n][m].type === "CHECKBOX") {
            if (
              $(CurrentPageQuestions[n][m]["others"][0]).val() &&
              isScriptTag($(CurrentPageQuestions[n][m]["others"][0]).val())
            ) {
              option_type = "checkbox";
              checkovalid = true;
              errorObject["msg"] = "Enter a valid details";
              errorSelect = CurrentPageQuestions[n][m]["others"][0];
              if (IsChatbl(tmpId)) {
                if (NumberofQuestions > 1)
                  errorObject["error_block_class"] = " erchat";
              }
              break;
            }
          } else if (
            CurrentPageQuestions[n][m].type === "RADIO" &&
            CurrentPageQuestions[n].questionText != "Looking for suppliers"
          ) {
            if (
              $(CurrentPageQuestions[n][m]["others"][0]).val() &&
              isScriptTag($(CurrentPageQuestions[n][m]["others"][0]).val())
            ) {
              radioovalid = true;
              option_type = "radio";
              errorObject["msg"] = "Enter a valid details";
              errorSelect = CurrentPageQuestions[n][m]["others"][0];
              if (IsChatbl(tmpId)) {
                if (NumberofQuestions > 1)
                  errorObject["error_block_class"] = " erchat";
              }
              break;
            }
          }
        }

        if (
          isqtutvalidate ||
          qunutvalid ||
          checkovalid ||
          radioovalid ||
          textovalid
        ) {
          isqtutvalidate = false;
          handleQuantityUiErrorMsg({
            data: {
              tmpId: tmpId,
              option_type: option_type,
              errorObject: errorObject,
              errorSelect: errorSelect,
              errorClass: "beerrp",
            },
          });
          //return false;
          iserrorcr = false;
        } else if (!isquantityfilled && isunitfilled) {
          //do nothing no validation needed
          ReqObj.Form[tmpId].qtutsave = false;
        } else if (errorCount && errorCount < CurrentPageQuestions[n].length) {
          var el = IsChatbl(tmpId)
            ? $("#t" + tmpId + "verify_error")
            : $(errorSelect);
          IsChatbl(tmpId)
            ? ""
            : isSSB(tmpId)
              ? isnewSSB(tmpId)
                ? el.addClass("mb-erbrd")
                : el.addClass("mb-erbrd")
              : el
                .addClass("highlight-err")
                .focus()
                .siblings("label")
                .addClass("redc");
          if (
            isSSB(tmpId) &&
            errorObject.msg.toLowerCase() === "please enter currency"
          ) {
            $("#t" + tmpId + "_curr_err").html(errorObject.msg);
          } else if (!(el.siblings(".isq_error_block").length > 0)) {
            el.parent().append(errorBlockFunction(errorObject, tmpId));
          }
          blenqGATracking(form_type, tracking + StepNumber + "|IsqValidate", getEventLabel(), 0, tmpId);
          iserrorcr = false;
        }
        if (
          (CurrentPageQuestions[n].type == "RADIO" ||
            CurrentPageQuestions[n][0].type == "RADIO") &&
          (CurrentPageQuestions[n].questionText == "Looking for suppliers" ||
            CurrentPageQuestions[n][0].questionText ==
            "Looking for suppliers") &&
          $("#t" + tmpId + "_enrich_city1").length
        ) {
          var iserr = true,
            ediv = 0;
          for (var i = 1; i < 4; i++) {
            if (isScriptTag($("#t" + tmpId + "_enrich_city" + i).val())) {
              var cls = "highlight-err";
              iserr = false;
              $("#t" + tmpId + "_enrich_city" + i).addClass(cls);
              //if (isSSB(tmpId)) $("#t" + tmpId + "_enrich_city" + i).focus();
            }
          }
          if (!iserr) {
            if ($("#t" + tmpId + "_enrich_city_err").length == 0) {
              var html = "";
              html += returnContainer(
                "t" + tmpId,
                "_enrich_city_err",
                "texterr errpdg",
                "",
                ""
              );
              html += returnContainer(
                "t" + tmpId,
                "_enrich_city_errmsg",
                "",
                "content",
                ""
              );
              html += "</div>Please enter valid city name</div>";
              var inputid = CurrentPageQuestions[n].optionSelector
                ? $(CurrentPageQuestions[n].optionSelector).attr("id")
                : $(CurrentPageQuestions[n][0].optionSelector).attr("id");
              $("#spcity").after(html);
            }
            iserrorcr = iserr;
            $("#t" + tmpId + "_enrich_city_err").removeClass("bedsnone");
            if (isSSB(tmpId)) $("#t" + tmpId + "_enrich_city_err").focus();
            $("#t" + tmpId + "_enrich_city1")
              .off("click keyup")
              .on("click keyup", function () {
                $("#t" + tmpId + "_enrich_city_err").addClass("bedsnone");
                $("#t" + tmpId + "_enrich_city1").removeClass("highlight-err");
              });
            $("#t" + tmpId + "_enrich_city2")
              .off("click keyup")
              .on("click keyup", function () {
                $("#t" + tmpId + "_enrich_city_err").addClass("bedsnone");
                $("#t" + tmpId + "_enrich_city2").removeClass("highlight-err");
              });
            $("#t" + tmpId + "_enrich_city3")
              .off("click keyup")
              .on("click keyup", function () {
                $("#t" + tmpId + "_enrich_city_err").addClass("bedsnone");
                $("#t" + tmpId + "_enrich_city3").removeClass("highlight-err");
              });
          }
        }
      }
    }
    return iserrorcr;
  }
  return true;
}

UserLogin.prototype.displayAnswer = function (tmpId) {
  var name = this.toChange === true ? "" : ReturnBlUserName(tmpId);
  var toget = this.toChange === true ? "toChange" : "PrimaryInfo";
  var classtotest = chatBlClass(tmpId, "right");
  var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
  $("#t" + tmpId + "mflag").css("display", "none");
  return [
    ConversationRightWrapper(tmpId, returnAnswer(tmpId, toget), {
      classtotest: classtotest,
      leftright: leftright,
    }),
    name,
  ];
};

UserLogin.prototype.registerForm = function (tmpId) {
  var meta2 = document.createElement("script");
  meta2.src = "https://apis.google.com/js/platform.js";
  document.getElementsByTagName("head")[0].appendChild(meta2);
  var clientID = "";
  var that = this;
  if (
    appsServerName == "//dev-apps.imimg.com/" ||
    appsServerName == "//stg-apps.imimg.com/"
  ) {
    clientID =
      "335658149809-o25hpstdu2tdo43j8ppg8l6n6i0dtfl0.apps.googleusercontent.com";
  } else {
    clientID =
      "432055510365-4for8jpqviklkgt2lssm41sfhhfo0ovs.apps.googleusercontent.com";
  }
  meta2.onload = function () {
    if (typeof gapi !== "undefined") {
      gapi.load("auth2", function () {
        auth2 = gapi.auth2.init({
          client_id: clientID,
          //cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        googleSigninFr(
          document.getElementById("t" + tmpId + "signinBtnFr"),
          tmpId,
          that
        );
      });
    }
  };
};

function googleSigninFr(element, tmpId, userlogin) {
  auth2.attachClickHandler(
    element,
    {},

    function (googleUser) {
      var form_type =
        ReqObj.Form[tmpId].formType === "Enq"
          ? "Send Enquiry"
          : "Post Buy Leads";

      var id_token = googleUser.getAuthResponse().id_token;
      gusrname = googleUser.getBasicProfile().getName();
      gusremail = googleUser.getBasicProfile().getEmail();
      blenqGATracking(form_type, "GoogleSigninClicked", getEventLabel(), 1, tmpId);
      if (gusremail != "") {
        userlogin.checkEmailExistOrNotFR(gusremail, id_token, gusrname, tmpId, userlogin);
      }
    },
    function (error) { }
  );
}

UserLogin.prototype.checkEmailExistOrNotFR = function (gusremail, id_token, gusrname, tmpId, userlogin) {
  var that = userlogin;
  var iso = currentISO();
  var ph_country = ReqObj.isoFlag;
  var url = this.getGoogleLoginAjaxURL();
  if (typeof country_ip === "undefined" || country_ip === null) {
    // country_ip not defined
    var iploc = usercookie.getCookie("iploc");
    var country_ip = usercookie.getParameterValue(iploc, "gip");
  }
  var params_request = {
    username: gusremail,
    iso: iso,
    modid: modIdf,
    format: "JSON",
    create_user: 1,
    originalreferer: window.location.href,
    GEOIP_COUNTRY_ISO: iso,
    ip: country_ip,
    screen_name: "BL/Enq Forms",
    id_token: id_token,
    gusername: gusrname,
    guseremail: gusremail,
    ph_country: ph_country,
  };
  var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var msg_ga = "failure";
  $.ajax({
    url: url,
    type: "POST",
    data: params_request,
    jsonpCallback: "create_callback",
    crossDomain: true,
    success: function (jsonResult) {
      // if(gusremail == "manisince1999@gmail.com"){
      //     jsonResult = '{"code":"204","message":"We have multiple account linked with this Email ID","access":"0","data_num":"7008439239,8456093931,1946948846,1658845666,7978532529","msg":"Multiple accounts are linked with this Email ID.  Please enter your registered mobile number to continue"}'
      // }

      // remove if error already present
      if (!$("#t" + tmpId + "_msg_primary_info_err_login").hasClass("bedsnone")) {
        that.handleUI({
          data: {
            tmpId: tmpId,
            todo: "removeError",
            obj: that,
          },
        });
      }
      if (!$("#t" + tmpId + "_error_first_name1").hasClass("bedsnone")) {
        $("#t" + tmpId + "_q_first_nm" + "1")
          .removeClass("highlight-err mb-erbrd nb-erbrd")
          .siblings(".redc")
          .removeClass("redc");
        $("#t" + tmpId + "_error_first_name" + "1").addClass("bedsnone");
      }

      $("#t" + tmpId + "_login_field").val(gusremail);
      $("#t" + tmpId + "_q_first_nm1").val(gusrname);
      $("#t" + tmpId + "_q_first_nm1").parent().addClass("eqfcsed");
      var jsonResult = $.parseJSON(jsonResult);
      if (jsonResult["code"] == 200) {
        var access = jsonResult.access;
        if (access != undefined && access == "2") {
          document.cookie = "ImeshVisitor=; domain=.indiamart.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.reload();
          return;
        }
        if (isSet(jsonResult.DataCookie.iso) && jsonResult.DataCookie.iso == "IN") {
          that.handleUI({
            data: {
              tmpId: tmpId,
              todo: "tryagain",
              obj: userlogin,
              msg: "You seem to be from India. Select India as Country",
            },
          });
        } else {
          var msg = jsonResult["msg"];
          if (msg == "Unique Email found in Primary Email") {
            var glid = jsonResult["GLID"];
            var data1 = jsonResult.DataCookie;
            verifyEmailViaLWG(gusremail, glid);
            var loginSet = jsonResult.LoginCookie;
            var tokenSet = jsonResult.im_iss;
            imesh_obj.set(data1, "ImeshVisitor");
            v4iilex_obj.set(loginSet, "v4iilex");
            im_iss_obj.set(tokenSet, "im_iss");
            msg_ga = "success";
            UpdateAfterLogin("fn");
            UpdateAfterLogin("em");
            UpdateAfterLogin("ctid");
            UpdateAfterLogin("mb1");
            UpdateAfterLogin("uv");
            if (
              imeshExist() !== "" &&
              usercookie.getParameterValue(imeshExist(), "ctid") === ""
            ) {
              ReqObj.UserDetail.cityname = "";
              ReqObj.UserDetail.ctoth = "";
            }
            $("#t" + tmpId + "_q_first_nm1")
              .parent()
              .addClass("eqfcsed");
            ReqObj.Form[tmpId].FormSequence.FormSubmit(tmpId, {
              source: "google-login",
              target: "google",
            });
          }
        }
      } else {
        if (jsonResult["code"] == "204") {
          var err_msg = jsonResult["msg"];
          if (jsonResult["message"] == "ISO MisMatch") {
            invalidMsgLogin(err_msg);
            $("#country-dropdown").css("pointer-events", "auto");
          } else if (jsonResult["message"].match(/suspicious/g)) {
            var msg = jsonResult["message"];
            invalidMsgLogin(err_msg);
          } else if (
            jsonResult["message"] ==
            "We have multiple account linked with this Email ID"
          ) {
            var var_msg = jsonResult["message"];
            var mobile_numbers = jsonResult["data_num"];
            that.handleUI({
              data: {
                tmpId: tmpId,
                todo: "tryagain",
                obj: userlogin,
                msg: var_msg,
              },
            });
          } else if (
            jsonResult["message"] == "No Email found in Primary Email"
          ) {
            $("#t" + tmpId + "_q_first_nm1")
              .parent()
              .addClass("eqfcsed");
            if (!isGDPRCountry()) {
              ReqObj.Form[tmpId].FormSequence.FormSubmit(tmpId, {
                source: "google-login",
                target: "google",
                code: "204",
              });
              msg_ga = "success";
            }
          } else if (jsonResult["message"] == "Invalid Token ID") {
            invalidMsgLogin("Invalid token request");
          } else {
            invalidMsgLogin(err_msg);
          }
        }
      }
    },
    error: function (event) {
      msg_ga = "failure";
    },
    complete: function (event) {
      blenqGATracking(form_type, "GoogleSignin : " + msg_ga, getEventLabel(), 1, tmpId);
    },
  });
};

UserLogin.prototype.EventIfScreenPresent = function (tmpId) {
  if (isOtherEnq(tmpId)) {
    this.handleHeading(tmpId);
    ButtonNameUI("isq", tmpId);
  }
};

UserLogin.prototype.SaveDetails = function (tmpId, event) {
  if (IsChatbl(tmpId)) {
    ReqObj.Form[tmpId].UserInputs["PrimaryInfo"] = $(
      "#t" + tmpId + "_login_field"
    ).val(); /* change using event target Id */
    if (isSet(event.target.textContent) && event.target.textContent !== "")
      ReqObj.Form[tmpId].UserInputs["toChange"] = event.target.textContent;
  }
};

UserLogin.prototype.onSubmit = function (tmpId) {
  // $("#yajaca").hide(); // click away message on pns form
  // pns login screen changes
  if (isSet(tmpId)) {
    if(isPnsEnq(tmpId)){
      if(isSet(ReqObj.Form[tmpId].ctaName) && ReqObj.Form[tmpId].ctaName.toLowerCase() == "view mob e")
      $("#pnsnoenq").html(ReqObj.Form[tmpId].pnsNumber);
    }
  }
  if (isSet(tmpId)) {
    //mob track
    if(currentISO() === "IN"){    
         ReqObj.Form[tmpId].mobEntered=1;
        //  console.log("mob entered");
    }
    else{
      ReqObj.Form[tmpId].emailEntered=1;
      // console.log("email entered");
    }

    var logObject = PreAjax("UserLogin", tmpId);
    if (this.toChange === false) {
      this.sendRequest({
        data: {
          logObject: logObject,
          tmpId: tmpId,
          userlogin: this,
          blureve: false,
          todo: "login",
        },
      });
    } else {
      PostAjax(logObject, tmpId);
    }
  }
};


ContactDetail.prototype.displayAnswer = function (tmpId) {
  var key = this.returnKey(tmpId);
  var name = "";

  if (this.name === 1 && this.email === 0 && this.city === 0) {
    name = ReturnBlUserName(tmpId);
  }
  var classtotest = chatBlClass(tmpId, "right");
  var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
  return [
    ConversationRightWrapper(tmpId, returnAnswer(tmpId, key), {
      classtotest: classtotest,
      leftright: leftright,
    }),
    name,
  ];
};

ContactDetail.prototype.EventIfScreenPresent = function (tmpId) {
  if (isOtherEnq(tmpId)) {
    this.handleHeading(tmpId);
    ButtonNameUI("isq", tmpId);
  }
};

ContactDetail.prototype.SaveDetails = function (tmpId, event) {
  if (IsChatbl(tmpId) || isSSB(tmpId)) {
    ReqObj.Form[tmpId].UserInputs["Name"] = $(
      "#t" + tmpId + "_q_first_nm" + this.classCount
    ).val();
    ReqObj.Form[tmpId].UserInputs["Mobile"] = $(
      "#t" + tmpId + "_q_mobile_f" + this.classCount
    ).val();
    ReqObj.Form[tmpId].UserInputs["Email"] = $(
      "#t" + tmpId + "_q_email_in" + this.classCount
    ).val()
      ? $("#t" + tmpId + "_q_email_in" + this.classCount)
        .val()
        .trim()
      : "";
    ReqObj.Form[tmpId].UserInputs["City"] =
      isSet(ReqObj.Form[tmpId].UserInputs["City"]) &&
        ReqObj.Form[tmpId].UserInputs["City"] !== ""
        ? ReqObj.Form[tmpId].UserInputs["City"]
        : $("#t" + tmpId + "_q_city_oth" + this.classCount).val();
    IsChatBLInline(tmpId) &&
      isSet($("#t" + tmpId + "_q_city_oth" + this.classCount).val()) &&
      isSet($(".t0801_CitySuggestor"))
      ? $(".t0801_CitySuggestor").css("display", "none")
      : "";
    /* OptiNeeded-this change is not related to save details functions - write it in appropriate place */
  }
};

ContactDetail.prototype.onSubmit = function (tmpId) {
  // $("#yajaca").hide(); // click away message
  var CDObject = PreAjax("ContactDetail", tmpId);
  this.sendRequest(CDObject, tmpId);
};

ContactDetail.prototype.validate = function (tmpId) {
  this.classCount = returnObjectSize(ReqObj.Form[tmpId].ContactDetail);
  ReqObj.Form[tmpId].nec.classCount = this.classCount;
  this.cookies(tmpId);
  var isValid = this.validateUserDetails(tmpId);
  if (isValid === true) this.captureDetails(tmpId);
  return isValid;
};

ContactDetail.prototype.validateUserDetails = function (tmpId) {
  if (!isSet(validation)) createGlobalObject();
  var validate = "";
  var that = this;
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var StepNumber =
    ReqObj.Form[tmpId].OnCloseStep && isSet(ReqObj.Form[tmpId].FormSequence)
      ? ReqObj.Form[tmpId].FormSequence.StepCounter +
      1 +
      ReqObj.Form[tmpId].FormSequence.OnCloseCounter +
      1
      : ReqObj.Form[tmpId].FormSequence.StepCounter + 1;
  ReqObj.Form[tmpId].errorDivId = "";
  if (
    $("#t" + tmpId + "_q_first_nm" + that.classCount).length > 0 &&
    (that.nonMandatory === "" ||
      (isSet(that.nonMandatory) && that.nonMandatory["name"] === false) ||
      $("#t" + tmpId + "_q_first_nm" + that.classCount).val() !== "" ||
      isSSB(tmpId))
  ) {
    validate = validation.isNameValid(
      $("#t" + tmpId + "_q_first_nm" + that.classCount).val()
    );
    if (!validate["type"]) {
      ReqObj.Form[tmpId].validateArray.push(
        "t" + tmpId + "_q_first_nm" + that.classCount
      );
      var nametypeele =
        isOtherEnq(tmpId) &&
          tmpId.substring(0, 2) !== "09" &&
          ReqObj.Form[tmpId].FormSequence.StepCounter < 1
          ? "inline"
          : "";
      blenqGATracking(form_type, "Validation_Error_Name|" + StepNumber + "|ContactDetail", getEventLabel(), 0, tmpId);
      that.handleUI({
        data: {
          tmpId: tmpId,
          elementhtml: "_fname_errmsg" + that.classCount,
          elementremoveClass: "_error_first_name" + that.classCount,
          elementaddClass: "_q_first_nm" + that.classCount,
          validate: validate,
          todo: "showError",
          formType: ReqObj.Form[tmpId].formType.toLowerCase(),
          chatelement: "_name-lb" + that.classCount,
          isinline: nametypeele,
        },
      });
      if (isSet(validate["specialcase"]) && validate["specialcase"] === true) {
        ReqObj.UserDetail["fn"] = "";
      }
      var err_obj = validate;
    }
  }

  if (that.usercountry === "IN") {
    if ($("#t" + tmpId + "_q_email_in" + that.classCount).length > 0) {
      var email_val = $("#t" + tmpId + "_q_email_in" + that.classCount).val();
      validate = validation.isEmailValid(email_val);
      if (!validate["type"]) {
        ReqObj.Form[tmpId].validateArray.push(
          "t" + tmpId + "_q_email_in" + that.classCount
        );
        var nametypeele =
          isOtherEnq(tmpId) &&
            tmpId.substring(0, 2) !== "09" &&
            ReqObj.Form[tmpId].FormSequence.StepCounter < 1
            ? "inline"
            : "";
        blenqGATracking(form_type, "Validation_Error_Email|" + StepNumber + "|ContactDetail", getEventLabel(), 0, tmpId);
        that.handleUI({
          data: {
            tmpId: tmpId,
            elementhtml: "_email_errmsg" + that.classCount,
            elementremoveClass: "_err_email" + that.classCount,
            elementaddClass: "_q_email_in" + that.classCount,
            validate: validate,
            todo: "showError",
            formType: ReqObj.Form[tmpId].formType.toLowerCase(),
            chatelement: "_email-lb" + that.classCount,
            isinline: nametypeele,
          },
        });
        if (
          isSet(validate["specialcase"]) &&
          validate["specialcase"] === true
        ) {
          ReqObj.UserDetail["em"] = "";
        }
        err_obj = validate;
      }
    }
    if ($("#t" + tmpId + "_q_city_oth" + that.classCount).length > 0) {
      if (
        isSSB(tmpId) &&
        $("#t" + tmpId + "_q_city_oth" + that.classCount)
          .parent()
          .parent()
          .hasClass("cbl_vh")
      ) {
        return true;
      }
      validate = validation.isCityValid(
        $("#t" + tmpId + "_q_city_oth" + that.classCount).val()
      );
      if (!validate["type"]) {
        ReqObj.Form[tmpId].validateArray.push(
          "t" + tmpId + "_q_city_oth" + that.classCount
        );
        var nametypeele =
          isOtherEnq(tmpId) &&
            tmpId.substring(0, 2) !== "09" &&
            ReqObj.Form[tmpId].FormSequence.StepCounter < 1
            ? "inline"
            : "";
        blenqGATracking(form_type, "Validation_Error_City |" + StepNumber + "|ContactDetail", getEventLabel(), 0, tmpId);
        that.handleUI({
          data: {
            tmpId: tmpId,
            elementhtml: "_city_errmsg" + that.classCount,
            elementremoveClass: "_error_city" + that.classCount,
            elementaddClass: "_q_city_oth" + that.classCount,
            validate: validate,
            todo: "showError",
            formType: ReqObj.Form[tmpId].formType.toLowerCase(),
            chatelement: "_for-city-lb" + that.classCount,
            isinline: nametypeele,
          },
        });
        if (
          isSet(validate["specialcase"]) &&
          validate["specialcase"] === true
        ) {
          ReqObj.UserDetail["cityname"] = "";
        }
        err_obj = validate;
      }
    }
  } else {
    if ($("#t" + tmpId + "_q_mobile_f").length > 0) {
      validate = validation.isMobileChValid(
        $("#t" + tmpId + "_q_mobile_f").val()
      );
      if (!validate["type"]) {
        var nametypeele =
          isOtherEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter < 1
            ? "inline"
            : "";
        that.handleUI({
          data: {
            tmpId: tmpId,
            elementhtml: "_mobile_errmsg" + that.classCount,
            elementremoveClass: "_error_mobile" + that.classCount,
            elementaddClass: "_q_mobile_f" + that.classCount,
            validate: validate,
            todo: "showError",
            formType: ReqObj.Form[tmpId].formType.toLowerCase(),
            chatelement: "_mobile-lb" + that.classCount,
            isinline: nametypeele,
          },
        });
        if (
          isSet(validate["specialcase"]) &&
          validate["specialcase"] === true
        ) {
          ReqObj.UserDetail["mb1"] = "";
        }
        err_obj = validate;
      }
    }
  }
  if (isSet(err_obj) && !err_obj["type"]) return false;
  else return true;
};

ContactDetail.prototype.sendRequest = function (CDObject, tmpId, type) {
  var data = this.getData(tmpId);
  var iso = currentISO();
  var toFire = false;
  fireCityTracking(tmpId, data);
  if (
    (iso !== "IN" &&
      (data["s_first_name"] !== "" ||
        data["s_mobile"] !== "" ||
        data["url"] !== "" ||
        data["s_companyName"] !== "")) ||
    (iso === "IN" &&
      (data["s_first_name"] !== "" ||
        data["s_email"] !== "" ||
        data["s_city_name"] !== "" ||
        data["gst"] !== "" ||
        data["s_companyName"] !== ""))
  ) {
    toFire = true;
  }
  if (toFire) {
    var _data = this.multipleHitCases(data, type);
    data = isEnq(tmpId) || isBl(tmpId) ? _data.data : data;
    data["replica"] = "";
    data = ObjectTrim(data);
    fireAjaxRequest({
      data: {
        ga: {
          s: true,
          f: true,
          gatype: "GlusrUpdate",
          source: "",
        },
        tmpId: tmpId,
        ajaxObj: {
          obj: CDObject,
          s: {
            ss: 1,
            sf: {
              af: 0,
              pa: 1,
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
        type: 6,
      },
    });
    if ((isEnq(tmpId) || isBl(tmpId) || IsChatbl(tmpId)) && _data.hitagain === true) {
      this.sendRequest(CDObject, tmpId, "again");
    }
  }
};

ContactDetail.prototype.getData = function (tmpId, which) {
  var that = this;
  this.cookies(tmpId);
  var formType = ReqObj.Form[tmpId].formType.toLowerCase();
  var data = {};
  var iso = currentISO();
  var cityid = usercookie.getParameterValue(this.imeshCookie, "ctid");
  var ctid =
    IsChatbl(tmpId) || isSSB(tmpId)
      ? ReqObj.Form[tmpId].UserInputs["CityId"]
      : ReqObj.UserDetail["ctid"];
  data["s_city_id"] = isSet(ctid) && ctid !== "" ? ctid : cityid;
  if (!isSet(data["s_city_id"]) || data["s_city_id"] === "") {
    ReqObj.Form[tmpId].cityOth =
      IsChatbl(tmpId) || isSSB(tmpId)
        ? ReqObj.Form[tmpId].UserInputs["City"]
        : ReqObj.UserDetail["ctoth"];
  }
  var name =
    IsChatbl(tmpId) || isSSB(tmpId)
      ? ReqObj.Form[tmpId].UserInputs["Name"]
      : ReqObj.UserDetail["fn"] !== ""
        ? ReqObj.UserDetail["fn"]
        : $(
          "#t" + tmpId + "_q_first_nm" + ReqObj.Form[tmpId].nec.classCount
        ).val();
  name = isSet(name) ? name.trim() : "";
  if (name) {
    if (name.indexOf(" ") !== -1) {
      var fn = name.substr(0, name.indexOf(" "));
      fn.trim();
      $("#t" + tmpId + "_q_first_nm_hidden").val(fn);
      var ln = name.substr(name.indexOf(" ") + 1);
    } else $("#t" + tmpId + "_q_first_nm_hidden").val(name);
  }
  data["s_first_name"] = isSet(fn) && fn !== "" ? fn : name;
  data["s_last_name"] = isSet(ln) && ln !== "" ? ln : "";

  if (iso === "IN") {
    data["s_email"] =
      IsChatbl(tmpId) || isSSB(tmpId)
        ? ReqObj.Form[tmpId].UserInputs["Email"]
        : ReqObj.UserDetail["em"];
    data["s_city_name"] =
      IsChatbl(tmpId) || isSSB(tmpId)
        ? ReqObj.Form[tmpId].UserInputs["City"]
        : ReqObj.UserDetail["cityname"];
    var primary = usercookie.getParameterValue(this.imeshCookie, "mb1");
    data["s_mobile"] =
      primary !== ""
        ? primary
        : IsChatbl(tmpId) || isSSB(tmpId)
          ? ReqObj.Form[tmpId].UserInputs["PrimaryInfo"]
          : ReqObj.UserDetail["mb1"];
  } else {
    data["s_mobile"] =
      IsChatbl(tmpId) || isSSB(tmpId)
        ? ReqObj.Form[tmpId].UserInputs["Mobile"]
        : ReqObj.UserDetail["mb1"]; // check for foreign users..
    var primary = usercookie.getParameterValue(this.imeshCookie, "em");
    data["s_email"] =
      primary !== ""
        ? primary
        : IsChatbl(tmpId) || isSSB(tmpId)
          ? ReqObj.Form[tmpId].UserInputs["PrimaryInfo"]
          : ReqObj.UserDetail["em"];
  }
  data["s_glusrid"] = usercookie.getParameterValue(this.imeshCookie, "glid");
  data["curr_page_url"] = window.location.href;
  data["s_ip"] = usercookie.getParameterValue(this.iplocCookie, "gip");
  data["s_ip_country"] = usercookie.getParameterValue(
    this.iplocCookie,
    "gcnnm"
  );
  data["s_ip_country_iso"] = this.geoip_country_iso;
  data["flag"] = ReqObj.Form[tmpId].formType;
  data["modid"] = modIdf;
  data["s_companyName"] =
    isSet(ReqObj.Form[tmpId].mdObjErr) &&
      $.inArray(0, ReqObj.Form[tmpId].mdObjErr) !== -1
      ? ""
      : isSet(ReqObj.Form[tmpId].companyName) &&
        ReqObj.Form[tmpId].companyName !== ""
        ? ReqObj.Form[tmpId].companyName
        : "";
  data["gst"] =
    isSet(ReqObj.Form[tmpId].gst.number) &&
      parseInt(ReqObj.Form[tmpId].gst.number) !== 0
      ? ReqObj.Form[tmpId].gst.number
      : "";
  data["url"] =
    isSet(ReqObj.Form[tmpId].mdObjErr) &&
      $.inArray(2, ReqObj.Form[tmpId].mdObjErr) !== -1
      ? ""
      : isSet(ReqObj.Form[tmpId].url.name) &&
        parseInt(ReqObj.Form[tmpId].url.name) !== ""
        ? ReqObj.Form[tmpId].url.name
        : "";
  data["s_country_iso"] =
    iso !== ""
      ? iso
      : usercookie.getParameterValue(usercookie.getCookie("iploc"), "gcniso");
  data["s_email"] =
    isSet(data["s_email"]) && data["s_email"].match(/\*/) !== null
      ? ""
      : data["s_email"];
  data["s_mobile"] =
    isSet(data["s_mobile"]) && data["s_mobile"].match(/\*/) !== null
      ? ""
      : data["s_mobile"];
  data["replica"] = {
    mobile: data["s_mobile"],
    email: data["s_email"],
    cname: data["s_companyName"],
    url: data["url"],
    name: data["s_first_name"],
    city: data["s_city_name"],
    gst: data["gst"],
  };
  return ObjectTrim(data);
};


Isq.prototype.displayAnswer = function (tmpId) {
  if (
    IsChatbl(tmpId) &&
    isSet(ReqObj.Form[tmpId].isqans) &&
    ReqObj.Form[tmpId].isqans === false
  ) {
  } else {
    var classtotest = chatBlClass(tmpId, "right");
    var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
    return [
      ConversationRightWrapper(tmpId, GetAnswer(tmpId, "isq"), {
        classtotest: classtotest,
        leftright: leftright,
      }),
    ];
  }
};

Isq.prototype.EventIfScreenPresent = function (tmpId) {
  if (isOtherEnq(tmpId)) {
    this.handleHeading(tmpId);
    ButtonNameUI("isq", tmpId);
  }
};

Isq.prototype.SaveDetails = function (tmpId) {
  var IsqScreen = this.IsqScreen;
  SaveIsq(tmpId, "isq", IsqScreen);
  if (
    !isSSB(tmpId) &&
    ReqObj.Form[tmpId].intentCalled === false &&
    imeshExist() !== ""
  )
    toFireGeneration(tmpId);
};

Isq.prototype.onSubmit = function (tmpId, after) {
  var IsqObject = isSet(after) && after === true ? "" : PreAjax("Isq", tmpId);
  var hitfinserv = "";

  var isq_data = {
    modid: modIdf,
    ofr_id: ReqObj.Form[tmpId].generationId,
    b_response: ReqObj.Form[tmpId].optionsValue,
    q_desc: ReqObj.Form[tmpId].questionsDesc,
    UPDIP: "India",
    UPDURL: window.document.URL.toString().substr(0, 450),
    UPDIP_COUNTRY: "India",
    UPDATESCREEN:
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
        ? "DESKTOP ENQUIRY FORM"
        : "DESKTOP BL FORM",
    glusr_id: usercookie.getParameterValue(imeshExist(), "glid"),
    q_id: ReqObj.Form[tmpId].questionsId,
    b_id: ReqObj.Form[tmpId].optionsId,
  };

  // $("#yajaca").hide(); // click away message on pns form

  if (ReqObj.Form[tmpId].mcatId === "-1" || ReqObj.Form[tmpId].mcatId === "") {
    isq_data.mcat_id = ReqObj.Form[tmpId].catId;
  } else {
    isq_data.mcat_id = ReqObj.Form[tmpId].mcatId;
  }
  isq_data.glusr_email = "";
  if (ReqObj.Form[tmpId].formType === "Enq") {
    isq_data.enq = 1;
    isq_data.funcToCall = "Enq";
  }
  if (
    (!isSet(ReqObj.Form[tmpId].toFireIsq) || ReqObj.Form[tmpId].toFireIsq) &&
    isSet(ReqObj.Form[tmpId].optionsValue) &&
    (ReqObj.Form[tmpId].IsqUpdated ||
      ReqObj.Form[tmpId].optionsValue.length > 0) &&
    isSet(ReqObj.Form[tmpId].Isq.newIsqAdded) &&
    ReqObj.Form[tmpId].Isq.newIsqAdded &&
    ValidGenId(ReqObj.Form[tmpId].generationId)
  ) {
    ReqObj.Form[tmpId].waitFinServ += 1;
    if (ReqObj.Form[tmpId].typeofform === "bl")
      ReqObj.Form[tmpId].Isq.newIsqAdded = false;
    fireAjaxRequest({
      data: {
        ga: {
          gatype: "saveIsqBlEnq",
          source: "",
          s: true,
          f: true,
        },
        tmpId: tmpId,
        ajaxObj: {
          obj: IsqObject,
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
        ajaxtimeout: 0,
        ajaxdata: isq_data,
        hitfinserv: hitfinserv,
        type: 3,
      },
    });
  } else {
    PostAjax(IsqObject, tmpId);
  }
};


ProductName.prototype.displayAnswer = function (tmpId) {
  var classtotest = chatBlClass(tmpId, "right");
  var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
  return [
    ConversationRightWrapper(tmpId, returnAnswer(tmpId, "ProductName"), {
      classtotest: classtotest,
      leftright: leftright,
    }),
  ];
};

ProductName.prototype.selectTitle = function (event, ui) {
  var that = ReqObj.Form[$(this).attr("templateId")].productObject;
  if (isSet(that)) {
    if (isSSB(that.tmpId) && IsBlEnqProdNameChanged(that.tmpId))
      ReqObj.Form[that.tmpId].url.html = false;
    if (
      // $("#t" + that.tmpId + "prodtitle").length &&
      ReqObj.Form[that.tmpId].prodName !==
      $("#t" + that.tmpId + "prodtitle").val()
    ) {
      if (isSet(ui) && isSet(ui.item)) {
        if (ui.item.value) {
          $("#t" + that.tmpId + "prodtitle").val(ui.item.value);
          if (IsChatbl(that.tmpId))
            ReqObj.Form[that.tmpId].UserInputs["ProductName"] = ui.item.value;
          ReqObj.Form[that.tmpId].prodName = ui.item.value;
          ReqObj.Form[that.tmpId].prodDispName = "";
          ReqObj.Form[that.tmpId].mcatName = "";
        }
        if (
          isSet(ui.item.mcat_id) &&
          isSet(ui.item.mcat_id[0]) &&
          isSet(ui.item.cat_id) &&
          isSet(ui.item.cat_id[0])
        ) {
          ReqObj.Form[that.tmpId].mcatId = ui.item.mcat_id[0];
          ReqObj.Form[that.tmpId].catId = ui.item.cat_id[0];
          ReqObj.Form[that.tmpId].callLeftSide = false;
          that.getMcatImage(that.tmpId, "select");
          if (isSet(that.tmpId) && that.tmpId.substring(0, 2) === "09")
            AfterFormDefaults(that.tmpId);
          $("#t" + that.tmpId + "prodtitle").focus();
        } else {
          ReqObj.Form[that.tmpId].IsProdNameChanged = true;
          that.getMcatDetail(
            $("#t" + that.tmpId + "prodtitle").val(),
            that.tmpId,
            "select"
          );
        }
      } else {
        ReqObj.Form[that.tmpId].IsProdNameChanged = true;
        that.getMcatDetail(
          $("#t" + that.tmpId + "prodtitle").val(),
          that.tmpId,
          "select"
        );
      }
    }
  }
};

ProductName.prototype.SaveDetails = function (tmpId, event) {
  if (IsChatbl(tmpId)) {
    ReqObj.Form[tmpId].UserInputs["ProductName"] = $(
      "#t" + tmpId + "prodtitle"
    ).val(); /* for chat bl*/
  }
  //
};

ProductName.prototype.getMcatImage = function (tmpId) {
  if (
    isSet(tmpId) &&
    isSet(ReqObj.Form[tmpId]) &&
    isSet(ReqObj.Form[tmpId].formType)
  ) {
    //POPUPCHATBL
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    $("#t" + tmpId + "_imglodr").removeClass("bedsnone");
    ReqObj.Form[tmpId].mcatImage = "";
    if (
      !isSSB(tmpId) &&
      isSet(ReqObj.Form[tmpId].mcatId) &&
      parseInt(ReqObj.Form[tmpId].mcatId) !== -1
    ) {
      getMcatImage(tmpId, "", 1);
    } else if (parseInt(ReqObj.Form[tmpId].mcatId, 10) === -1) {
      ReqObj.Form[tmpId].displayImage = "";
      ReqObj.Form[tmpId].zoomImage = "";
      $("#t" + tmpId + "_imglodr").addClass("bedsnone");
      leftSideTransition(0, tmpId);
    }
  }
};
/***
 * Function ID - 2
 *
 * Usage: Function to fetch mcat detail
 *
 * Output: It will set Mcat-ID, Cat-ID, Type in global object
 ***/
ProductName.prototype.getMcatDetail = function (
  mcatMatch,
  tmpId,
  eventName,
  prdnmObj,
  from
) {
  var that = this;
  // /var submit_url = appsServerName + 'models/mcatid-suggestion.php?search_param=' + encodeURIComponent(mcatMatch);
  if (isSet(ReqObj.Form[tmpId].isBlQtutShown)) {
    ReqObj.Form[tmpId].isBlQtutShown = false;
  }
  if (isSet(mcatMatch) && mcatMatch !== "") {
    var submit_url =
      "//apps.imimg.com/models/mcatid-suggestion.php?search_param=" +
      encodeURIComponent(mcatMatch);
    addBlLoader(tmpId, "center");
    ReqObj.Form[tmpId].mcatId = -2;
    if (IsChatbl(tmpId)) {
      $("#t" + tmpId + "prodtitle")
        .prop("disabled", true)
        .addClass("chatblur");
      $("#t" + tmpId + "_submit")
        .prop("disabled", true)
        .addClass("chatblur");
    }
    $.ajax({
      cache: false,
      url: submit_url,
      type: "GET",
      //timeout: 3000,
      dataType: "json",
      success: function (data) {
        if (isSet(data) && data !== "") {
          ReqObj.Form[tmpId].mcatId = isSet(data["mcatid"])
            ? data["mcatid"]
            : -1;
          ReqObj.Form[tmpId].catId = isSet(data["catid"]) ? data["catid"] : -1;
          ReqObj.Form[tmpId].mcatType = isSet(data["type"]) ? data["type"] : "";
          ReqObj.Form[tmpId].prodDispName = "";
          ReqObj.Form[tmpId].mcatName = "";
        } else {
          ReqObj.Form[tmpId].mcatId = -1;
          ReqObj.Form[tmpId].catId = -1;
          ReqObj.Form[tmpId].mcatType = "";
        }
      },
      error: function (o, st, e) {
        ReqObj.Form[tmpId].mcatId = -1;
        ReqObj.Form[tmpId].catId = -1;
        ReqObj.Form[tmpId].mcatType = "";
        return;
      },
      complete: function (res) {
        //this is the case for enter functionality of the form
        ReqObj.Form[tmpId].isProdNameChanged = true;
        addDetachedFlag(tmpId);
        //detachFlag2(tmpId);
        ReqObj.Form[tmpId].cName.prodServ = ReqObj.Form[tmpId].mcatType;
        if (IsChatbl(tmpId)) {
          $("#t" + tmpId + "prodtitle")
            .prop("disabled", false)
            .removeClass("chatblur");
          $("#t" + tmpId + "_submit")
            .prop("disabled", false)
            .removeClass("chatblur");
        }
        if (StaticQuesForeignUser(tmpId)) {
          if (ReqObj.Form[tmpId].mcatType.toLowerCase() === "p")
            ReqObj.Form[tmpId].modrefType = "product";
          else ReqObj.Form[tmpId].modrefType = "company";
        }
        removeBLLoader(tmpId, "center");
        if (isBl(tmpId) || isSSB(tmpId)) {
          savenem(tmpId);
          if (isSet(ReqObj.Form[tmpId].ReqDtlBox))
            ReqObj.Form[tmpId].ReqDtlBox = "";
          if (
            isSet(ReqObj.Form[tmpId].userFilledIsq) &&
            ReqObj.Form[tmpId].userFilledIsq.length
          )
            ReqObj.Form[tmpId].userFilledIsq = [];
          if (isSSB(tmpId) && currentISO() == "IN") savemc(tmpId);
        }
        if (that.isProdNameChanged) {
          DirectSubmitWithoutBlur(tmpId);
        }
        ReqObj.Form[tmpId].prodName = mcatMatch;
        ReqObj.Form[tmpId].callLeftSide = false;
        if (IsChatbl(tmpId)) {
          "" !== ReqObj.Form[tmpId].mcatName
            ? updateChatBlProdName(tmpId)
            : $(".productname").text(ReqObj.Form[tmpId].prodName); //
        }

        that.getMcatImage(tmpId);
        if(IsChatBLInline(tmpId)){     // new chat bl
        var chatblInterval = setInterval(function(){
          if(isSet(ReqObj.Form[tmpId].IsqComplete) && ReqObj.Form[tmpId].IsqComplete){
            clearInterval(chatblInterval);
            if (isSet(prdnmObj)) PostAjax(prdnmObj, tmpId);
          }
        },100);
      }
      else{
        if (isSet(prdnmObj)) PostAjax(prdnmObj, tmpId);
      }

        if (
          isSet(eventName) &&
          (eventName === "blur" || eventName === "select")
        ) {
          ReqObj.Form[tmpId].flags.autofocusPName = true;
          if (
            $("#t" + tmpId + "prodtitle").length > 0 &&
            $("#t" + tmpId + "prodtitle").val() === mcatMatch
          ) {
            if (!IsChatbl(tmpId)) {
              if (isBl(tmpId) && NEC()) {
                ReqObj.Form[tmpId].flags.isNECShown = false;
              }
              AfterFormDefaults(tmpId);
              // if (tmpId.substring(0, 2) === "09")

              // // OpenForm(ReqObj.Form[tmpId]);
              // else InlineForm(ReqObj.Form[tmpId]);
            } else {
              GetIsqFromService(tmpId);
            }
          }

          // if (!IsChatbl(tmpId)) $('#t' + that.tmpId + 'prodtitle').focus();
          // $('#t' + that.tmpId + 'prodtitle').focus();

          if (IsChatbl(tmpId)) {
            // $('#t' + that.tmpId + 'prodtitle').off("focus");
            // $('#t' + that.tmpId + 'prodtitle').focus();
            // that.setTitleSuggester(that.tmpId);
          }
        }

        //}
      },
    });
  }
};

ProductName.prototype.onSubmit = function (tmpId) {
  var that = this;
  var prdnmObj = PreAjax("ProductName", tmpId);
  if (IsBlEnqProdNameChanged(tmpId)) {
    this.isProdNameChanged = true;
  }
  if (isInactiveBL(tmpId)) {
    $("#recommendProd").css({
      display: "none",
    });
    $("#t" + tmpId + "_helpQuest").css({
      display: "block",
    });
    $("#blheading").css({
      display: "none",
    });
  }

  this.checkMcatID(
    {
      param1: tmpId,
      param2: "submit",
    },
    prdnmObj
  );
};

ProductName.prototype.validate = function (tmpId, event) {
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var productName = $("#t" + tmpId + "prodtitle").val();
  if (!isSet(validation)) createGlobalObject();
  var isProductNameValid = validation.isProductNameValid(productName);
  var StepNumber = ReqObj.Form[tmpId].FormSequence.StepCounter + 1;
  if (isProductNameValid["type"] === false) {
    blenqGATracking(form_type, "Validation_Error_Prd_Title|" + StepNumber + "|ProductName", getEventLabel(), 1, tmpId);
    if (IsChatbl(tmpId)) {
      addChatblError(tmpId, isProductNameValid.error);
    } else {
      var errorcls = isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? "nb-erbrd"
          : "mb-erbrd"
        : "highlight-err";
      $("#t" + tmpId + "_error_title")
        .removeClass("bedsnone")
        .focus();
      var prderrm = isProductNameValid["specialcase"]
        ? "Enter valid product/service name"
        : "Enter product/service name";
      $("#t" + tmpId + "_error_title")
        .children("div")
        .first()
        .text(prderrm);
      $("#t" + tmpId + "prodtitle").addClass(errorcls);
      isSSB(tmpId) ? $("#t" + tmpId + "prodtitle").focus() : "";
    }
    if (!isSSB(tmpId) && !IsChatbl(tmpId))
      $("#t" + tmpId + "_name-l").addClass("redc");
    ReqObj.Form[tmpId].validateArray.push("t" + tmpId + "prodtitle");
    return false;
  } else {
    // var isMandatory = true;
    // return IsTNCChecked(tmpId, isMandatory, usercookie.getParameterValue(imeshExist(), "fn"));
    return true;
  }
};

ProductName.prototype.checkMcatIDJquery = function (event) {
  event.data.pnObject.checkMcatID(event.data);
};

ProductName.prototype.checkMcatID = function (eventData, prdnmObj) {
  var tmpId = eventData.param1;
  var eventName = eventData.param2;
  if (isScriptTag($("#t" + tmpId + "prodtitle").val())) {
    if (IsChatbl(tmpId)) {
      addChatblError(tmpId, isProductNameValid.error);
    } else {
      var errorcls = isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? "nb-erbrd"
          : "mb-erbrd"
        : "highlight-err";
      $("#t" + tmpId + "_error_title")
        .removeClass("bedsnone")
        .focus();
      var prderrm = "Enter valid product/service name";
      $("#t" + tmpId + "_error_title")
        .children("div")
        .first()
        .text(prderrm);
      $("#t" + tmpId + "prodtitle").addClass(errorcls);
      isSSB(tmpId) ? $("#t" + tmpId + "prodtitle").focus() : "";
    }
    if (!isSSB(tmpId) && !IsChatbl(tmpId))
      $("#t" + tmpId + "_name-l").addClass("redc");

    return;
  }

  if (IsBlEnqProdNameChanged(tmpId)) {
    this.getMcatDetail(
      $("#t" + tmpId + "prodtitle").val(),
      tmpId,
      eventName,
      prdnmObj
    );
  } else {
    if (isSet(prdnmObj)) PostAjax(prdnmObj, tmpId);
  }
};

RequirementDtl.prototype.getPrefilledText = function (tmpId) {
  var text = "Hi," + "\n";
  if (ReqObj.Form[tmpId].modrefType.toLowerCase() === "product") {
    text += "I am interested in buying " + ReqObj.Form[tmpId].prodName;
  } else {
    text +=
      "I am looking for service provider for " + ReqObj.Form[tmpId].prodName;
  }
  text += "\n" + "Kindly send me quotations.";

  return text;
};

RequirementDtl.prototype.resetClass = function (tmpId) {
  ReqObj.Form[tmpId].flags.isDescDivShown = false;
  if (ReqObj.Form[tmpId].flags.isDescDivShown) {
    ReqObj.Form[tmpId].prevCount -= ReqObj.Form[tmpId].IsqStepN; //isqstepn
  } else {
    ReqObj.Form[tmpId].prevCount -= ReqObj.Form[tmpId].IsqStep1; //isqstep1
  }
};

RequirementDtl.prototype.EventIfScreenPresent = function (tmpId) {
  if (isOtherEnq(tmpId)) {
    this.handleHeading(tmpId);
    ButtonNameUI("isq", tmpId);
  }
  //onCName(tmpId);
};

RequirementDtl.prototype.validate = function (tmpId) {
  if (isSet(tmpId) && isSet(ReqObj.Form[tmpId])) {
    var sel = $("#t" + tmpId + "_reqBoxTemplates");
    if (!isSet(validation)) createGlobalObject();
    var description = validation.isDescriptionFilled(sel.val());
    if (description["type"] === false) {
      // this.fireTracking({
      //   data: {
      //     tmpId: tmpId,
      //     todo: "default",
      //   },
      // });
      if (
        !$("#t" + tmpId + "_reqBoxTemplates_err").length &&
        !IsChatbl(tmpId)
      ) {
        var html = "";
        var cls = "texterr errpdg";
        html += returnContainer(
          "t" + tmpId,
          "_reqBoxTemplates_err",
          cls,
          "",
          ""
        );
        html += returnContainer(
          "t" + tmpId,
          "_reqBoxTemplates_errmsg",
          "",
          "content",
          ""
        );
        html += "</div>" + description["error"] + "</div>";
        sel.after(html);
      }
      if (IsChatbl(tmpId)) {
        addChatblError(tmpId, description["error"]);
      } else {
        $("#t" + tmpId + "_reqBoxTemplates_err").removeClass("bedsnone");
        var errorcls = isSSB(tmpId)
          ? isnewSSB(tmpId)
            ? "nb-erbrd"
            : "mb-erbrd"
          : "highlight-err";
        sel.addClass(errorcls);
        if (
          new RegExp("isq").test(ReqObj.Form[tmpId].currentScreen.toLowerCase())
        )
          ReqObj.Form[tmpId].isret++;
        //(isSSB(tmpId)) ? sel.focus() : "";
      }
      return false;
    } else return true;
  }

  return true;
};

RequirementDtl.prototype.fireTracking = function (event) {
  var todo = event.data.todo;
  var tmpId = event.data.tmpId;

  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  if (todo === "default") {
    var StepNumber = ReqObj.Form[tmpId].FormSequence.StepCounter + 1;
    blenqGATracking(form_type, "Validation_Error_Desc|" + StepNumber + "|RequirementDetail", getEventLabel(), 0, tmpId);
  }
  if (todo === "onsuggselect") {
    var text = event.data.text;
    var prodName =
      ReqObj.Form[tmpId].modrefType.toLowerCase() === "product"
        ? ReqObj.Form[tmpId].prodName
        : ReqObj.Form[tmpId].mcatName;
    blenqGATracking(form_type, "|Suggselected-" + text + "|mcat-" + prodName, getEventLabel(), 0, tmpId);
  }
};

RequirementDtl.prototype.SaveDetails = function (tmpId) {
  if (isSet(tmpId)) {
    ReqObj.Form[tmpId].ReqDtlBox = $("#t" + tmpId + "_reqBoxTemplates").val();
    if (isSet(ReqObj.Form[tmpId].ReqDtlBox) && ReqObj.Form[tmpId].ReqDtlBox)
      ReqObj.Form[tmpId].ReqDtlBox = ReqObj.Form[tmpId].ReqDtlBox.trim();
    var type = isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" && ReqObj.UserDetail.uv !== "V" && isSecondEnq(tmpId) ? "intent" : "";
    if (Enq04(tmpId) && ReqObj.Form[tmpId].intentCalled === false && imeshExist() !== "")
      toFireGeneration(tmpId, type);
  }
};

RequirementDtl.prototype.displayAnswer = function (tmpId) {
  var ReqBoxAns = NotFilled;
  if (isSet(ReqObj.Form[tmpId].ReqDtlBox) && ReqObj.Form[tmpId].ReqDtlBox)
    ReqBoxAns = ReqObj.Form[tmpId].ReqDtlBox;
  var classtotest = chatBlClass(tmpId, "right");
  var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
  return [
    ConversationRightWrapper(tmpId, ReqBoxAns, {
      classtotest: classtotest,
      leftright: leftright,
    }),
  ];
};

RequirementDtl.prototype.getData = function (tmpId) {
  var data = {
    offer_id: ReqObj.Form[tmpId].generationId,
    s_glusrid: usercookie.getParameterValue(imeshExist(), "glid"),
    modid: modIdf,
    blEnqFlag: IsChatbl(tmpId) ? "BL" : ReqObj.Form[tmpId].formType,
  };
  var Comma =
    trimVal(ReqObj.Form[tmpId].ReqDtlBox) !== "" &&
      trimVal(ReqObj.Form[tmpId].EnrichmentVal) !== ""
      ? ", "
      : "";

  // get more photos form changes //new gmp

  var pdname = typeof ReqObj.Form[tmpId].prodDispName !== "undefined" &&
                 ReqObj.Form[tmpId].prodDispName !== "" &&
                 ReqObj.Form[tmpId].prodDispName !== null &&
                 ReqObj.Form[tmpId].prodDispName !== "null"
                 ? ReqObj.Form[tmpId].prodDispName
                 : isSet(ReqObj.Form[tmpId].prodName)? ReqObj.Form[tmpId].prodName : "";
  RD_prefilled = "Please share the latest Photos of " + pdname ;

  if(getMorePh(tmpId) && ReqObj.Form[tmpId].ReqDtlBox === ""){
      data["enrichDesc"] =
      RD_prefilled + Comma + ReqObj.Form[tmpId].EnrichmentVal;
      // data["enrichDesc"] = RD_prefilled;
  }
      
  
  else{
      data["enrichDesc"] =
      ReqObj.Form[tmpId].ReqDtlBox + Comma + ReqObj.Form[tmpId].EnrichmentVal;
  }

  // ends here 

  if (
    isSet(ReqObj.Form[tmpId].formType) &&
    ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
  ) {
    data["r_glusrid"] = ReqObj.Form[tmpId].rcvGlid;
    data["q_dest"] = ReqObj.Form[tmpId].query_destination;
  }
  return ObjectTrim(data);
};

RequirementDtl.prototype.onSubmit = function (tmpId, after) {
  if (isSet(tmpId)) {
    var data = this.getData(tmpId);
    var PreRdObj =
      isSet(after) && after === true ? "" : PreAjax("RequirementDtl", tmpId);
    var hitfinserv = "";

    // $("#yajaca").hide(); // click away message on pns form

    if (
      ReqObj.Form[tmpId].ReqDtlBox &&
      ValidGenId(ReqObj.Form[tmpId].generationId)
    ) {
      if (isBl(tmpId) && ReqObj.Form[tmpId].flags.isEnrichCalled) return;
      ReqObj.Form[tmpId].waitFinServ += 1;
      ReqObj.Form[tmpId].flags.isEnrichCalled = true;
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
            obj: PreRdObj,
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
          hitfinserv: hitfinserv,
          type: 1,
        },
      });
    } else PostAjax(PreRdObj, tmpId);
  }
};

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


/**-------------------new seq----------------------------- */
function EnquireNow() {
  this.className = "EnquireNow";
  this.enquirehtml = "";
}
EnquireNow.prototype.hasHtml = function (EnquireObj) {
  var IsqBoxSuffixHtmlObj = {
    SuffixOuterHtml: "<div  id='t" + EnquireObj.tmpId + "_enqnow'>",
    SuffixClosingHtml: "</div>",
    suffix: "_isqBox",
  };
  this.enquirehtml = MakeWrapper(
    [[returnEnquireNowHtml(EnquireObj.tmpId)]],
    EnquireObj.tmpId,
    IsqBoxSuffixHtmlObj,
    ""
  );
  EnquireObj.that.NumberofClassCalled -= 1;
  if (this.enquirehtml !== "") {
    ReqObj.Form[EnquireObj.tmpId].currentclassCount++;
    this.ifHtmlPresent(EnquireObj);
  } else {
    this.ifHtmlNotPresent(EnquireObj);
  }
  if (this.enquirehtml !== "") return true;
  else return false;
};
EnquireNow.prototype.ifHtmlPresent = function (EnquireObj) {
  AttachObject(EnquireObj.object, EnquireObj.tmpId);
  if (isSet(EnquireObj.AfterService)) {
    for (var i = 0; i < EnquireObj.AfterService.length; i++) {
      EnquireObj.that.MakeSeq(EnquireObj.AfterService[i], EnquireObj.tmpId);
    }
  }
  if (EnquireObj.that.NumberofClassCalled === 0) {
    makeFinalSeq(EnquireObj, EnquireObj.tmpId);
  }
};
EnquireNow.prototype.ifHtmlNotPresent = function (EnquireObj) {
  if (EnquireObj.hasFallback) {
    CreateSeq(EnquireObj.FallbackObj);
  }
};
EnquireNow.prototype.displayHtml = function (tmpId) {
  return this.enquirehtml;
};
EnquireNow.prototype.onSubmit = function (tmpId) {
  var enqNow = PreAjax("EnquireNow", tmpId);
};
EnquireNow.prototype.validate = function (tmpId) {
  return true;
};
EnquireNow.prototype.handleButton = function (tmpId) {
  ButtonNameUI("enquirenow", tmpId);
};

/**-------------------new seq----------------------------- */

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
//Term n condition

function termNcdata(tmpId) {
  var iploc = usercookie.getCookie("iploc");
  var data = {};
  data["s_glusrid"] = usercookie.getParameterValue(imeshExist(), "glid");
  data["modid"] = modIdf;
  data["s_user_agent"] = navigator.userAgent;
  data["s_ip"] = usercookie.getParameterValue(iploc, "gip");
  data["s_ip_country"] = usercookie.getParameterValue(iploc, "gcnnm");
  data["curr_page_url"] = window.location.href;
  data["reference_text"] = ReqObj.Form[tmpId].refText;
  data["s_ip_country_iso"] = usercookie.getParameterValue(iploc, "gcniso");
  if (
    isSet(data["s_ip"]) &&
    data["s_ip"] !== "" &&
    isSet(data["s_glusrid"]) &&
    data["s_glusrid"] !== "" &&
    isSet(data["s_user_agent"]) &&
    data["s_user_agent"] !== "" &&
    isSet(data["modid"]) &&
    data["modid"] !== "" &&
    isSet(data["s_ip_country_iso"]) &&
    data["s_ip_country_iso"] !== "IN"
  )
    fireAjaxRequest({
      data: {
        ga: {
          s: true,
          f: true,
          gatype: "TermNCondition",
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
        ajaxdata: data,
        ajaxtimeout: 0,
        type: 4,
        hitfinserv: "",
      },
    });
}

function CallGeneration(tmpId) {
  if (isSet(tmpId)) {
    if (
      parseInt(ReqObj.Form[tmpId].generationId, 10) <= 1 &&
      ExistsInArray(ReqObj.Form[tmpId].HitArray, "Generation") !== true &&
      ExistsInArray(ReqObj.Form[tmpId].ServiceSequence, "Generation") !== true
    )
      return true;
    else return false;
  } else {
  }
}
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
function getProdDetailsHtml(tmpId, typeofform, step) {
  var html = pdpenqImage(tmpId) ? "<div class='epLf30'>" : "";

  html += returnContainer("t" + tmpId, "_Prodname" + step, "", "", "", "") + "</div>";

  var pprice = returnContainer("t" + tmpId, "_ProdPrice" + step, "befs16", "", "", "") + "<span id='t" + tmpId + "_price" + step + "'></span ><span id='t" + tmpId + "_unit" + step + "'></span > " + "</div > ";

  var pcom = returnContainer("t" + tmpId, "_Compname" + step, "befs16", "", "", "") + "</div>";

  var psold = returnContainer("t" + tmpId, "_soldBy" + step, "befs16", "", "", "") + "<span id='t" + tmpId + "_sold" + step + "'></span><span id='t" + tmpId + "_addr" + step + "'></span>" + "</div>";

  var pnsno = isSet(ReqObj.Form[tmpId].pnsNumber) ? ReqObj.Form[tmpId].pnsNumber : "09XXXXXXXX";

  if (currentISO() === "IN" )
    pnsno = [pnsno.slice(0, 11), " ", pnsno.slice(11)].join('');   // no breathing space in pns number

  var enqpns = returnContainer("t" + tmpId, "_pnsEnq" + step, "befs16", "", "", "") + "<span class='pnsEnq'  ><span id='pnsnoenq' class='pnsno'>" + pnsno + "</span></span>" + "</div>"; //pns on enq form

  html += pdpenqImage(tmpId) ? "</div><div class='ibgc epLf30 epB10 epT10'>" : direnqImage(tmpId) ? "<div >" : "";

  html = html + pprice + pcom + psold;

  if (isPnsEnq(tmpId) )
    //pns on enq form
    html += enqpns;
  if (pdpenqImage(tmpId) || direnqImage(tmpId)) {
    var review = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls.reviewCount) && ReqObj.Form[tmpId].additionalDtls.reviewCount !== 0 ? ReqObj.Form[tmpId].additionalDtls.reviewCount : -1;

    var starCount = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls.seller_rating) && ReqObj.Form[tmpId].additionalDtls.seller_rating !== 0 ? ReqObj.Form[tmpId].additionalDtls.seller_rating : 0;

    if (starCount && review && !(parseInt(starCount) <= 0 && parseInt(review) <= 0)) {
      html += '<div class="befs14 eqRC1 disp-inl bemt5">';
      if (parseInt(starCount) > 0) {
        var width_par = (starCount / 5) * 100;
        html += '<span class="befwt">' + starCount + '</span>/5 <div class="eqsRt disp-inl e_f18 txtl bepr"><div class="eqflsRt eqd_l0 beabult" style="width:' + width_par + '%"><span>★★★★★</span></div><div class="eqemsRt"><span>★★★★★</span></div></div>';
      }
      html += parseInt(review) > 0 ? '<span class="eqRC2 epf12">(' + review + " Review)</span>" : "";
      html += "</div>";
    }
    var verf = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls["verified"]) ? ReqObj.Form[tmpId].additionalDtls["verified"] : 0;
    var supp = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls["supplier"]) ? ReqObj.Form[tmpId].additionalDtls["supplier"] : 0;

    var verfexp = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls["VerifiedExporter"]) ? ReqObj.Form[tmpId].additionalDtls["VerifiedExporter"] : 0;

    if (direnqImage(tmpId)) {
      html += '<div class="idsf eflwp befs14 eqRC3 bemt5 sldby">';
    }
    else {
      html += '<div class="idsf eflwp befs14 eqRC3 bemt5 ">';
    }

    if (supp === "1" || supp === "2")
      html += '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' + supplier[supp]["class"] + '"></i>' + supplier[supp]["name"] + "</div>";

    if (verf === "1" || verf === "2")
      html += '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' + verified[verf]["class"] + '"></i>' + verified[verf]["name"] + "</div>";
    if (direnqImage(tmpId)) {
      if (verfexp === "1")
        html += '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' + verifiedexporter[verfexp]["class"] + '"></i>' + verifiedexporter[verfexp]["name"] + "</div>";
    }
    //   if(verfexp === "1")
    //     html +=
    //       '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' +
    //       verifiedexporter[verfexp]["class"] +
    //       '"></i>' +
    //       verifiedexporter[verfexp]["name"] +
    //       "</div>";

    html += "</div>";
    html += "</div>";
  }
  var isq_class = pdpenqImage(tmpId) ? "befs16 mt20 content-centre idsf epLf30" : "";
  html += returnContainer("t" + tmpId, "_isqdetails" + step, isq_class, "", "", "") + "</div>";
  return html;
}

function prodDetailsData(event) {
  var datavalue = {};
  datavalue["locality"] =
    isSet(ReqObj.Form[event.initialdata.tmpId].rcvLocality) &&
      ReqObj.Form[event.initialdata.tmpId].rcvLocality !== ""
      ? ReqObj.Form[event.initialdata.tmpId].rcvLocality
      : "";
  datavalue["city"] =
    isSet(ReqObj.Form[event.initialdata.tmpId].rcvCity) &&
      ReqObj.Form[event.initialdata.tmpId].rcvCity !== ""
      ? ReqObj.Form[event.initialdata.tmpId].rcvCity
      : "";
  datavalue["state"] =
    isSet(ReqObj.Form[event.initialdata.tmpId].rcvState) &&
      ReqObj.Form[event.initialdata.tmpId].rcvState !== ""
      ? ReqObj.Form[event.initialdata.tmpId].rcvState
      : "";
  datavalue["comp_name"] =
    isSet(ReqObj.Form[event.initialdata.tmpId].rcvName) &&
      ReqObj.Form[event.initialdata.tmpId].rcvName !== ""
      ? ReqObj.Form[event.initialdata.tmpId].rcvName
      : "";
  datavalue["prod_name"] =
    isSet(ReqObj.Form[event.initialdata.tmpId].prodDispName) &&
      ReqObj.Form[event.initialdata.tmpId].prodDispName !== ""
      ? ReqObj.Form[event.initialdata.tmpId].prodDispName
      : isSet(ReqObj.Form[event.initialdata.tmpId].prodName) &&
        ReqObj.Form[event.initialdata.tmpId].prodName !== ""
        ? ReqObj.Form[event.initialdata.tmpId].prodName
        : "";

  var price =
    isSet(ReqObj.Form[event.initialdata.tmpId].price) &&
      ReqObj.Form[event.initialdata.tmpId].price !== ""
      ? ReqObj.Form[event.initialdata.tmpId].price
      : "";
  var pr = "";
  var ut = "";
  if (isSet(price) && price !== "") {
    price = price.replace("₹", "");
    price = price.replace(/Approx(.*?)Rs/, "");
    price = price.replace(/Rs/, "");
    price = price.trim();
    //price = "Rs. " + price;
    pr = price.substring(0, price.indexOf("/")).trim();
    ut = price.substring(price.indexOf("/") + 1);
    if (pr !== "") {
      pr = "&#8377;" + " " + pr + "/"; // don't remove space or use char code
    } else {
      pr = "&#8377;" + ut;
      ut = "";
    }
  }
  //else price = price;

  datavalue["price"] = pr;
  datavalue["unit"] = ut;
  datavalue["modrefType"] = isSet(ReqObj.Form[event.initialdata.tmpId].modrefType) && ReqObj.Form[event.initialdata.tmpId].modrefType !== "" ? ReqObj.Form[event.initialdata.tmpId].modrefType : "";

  // datavalue["sellerIsq"] = (isSet(ReqObj.Form[event.initialdata.tmpId].sellerIsq) && ReqObj.Form[event.initialdata.tmpId].sellerIsq !== "") ? ReqObj.Form[event.initialdata.tmpId].sellerIsq : "";
  datavalue["plsqArr"] = isSet(ReqObj.Form[event.initialdata.tmpId].plsqArr) && ReqObj.Form[event.initialdata.tmpId].plsqArr !== "" ? ReqObj.Form[event.initialdata.tmpId].plsqArr : "";

  return datavalue;
}

function prodDetailsHtmlInsertion(event) {
  prodDetailsHtmlDefautls(event);
  prodNameHtmlInsertion(event);
  compNameHtmlInsertion(event);
  prodPriceHtmlInsertion(event);
  soldByHtmlInsertion(event);

  if (pdpenqImage(event.initialdata.tmpId) || (direnqImage(event.initialdata.tmpId))) {
    isqQuestionHtmlInsertion(event);
  } else if (event.initialdata.typeofform === "image" && isEcomProduct(event.initialdata.tmpId) && event.initialdata.step === "0R") {
  } else if ((event.initialdata.typeofform === "image" || event.initialdata.typeofform === "video") && event.initialdata.step === "0R") {
    if (imeshExist() !== "") {
      $("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).html(msg_firimgvid("Enquire now", event.initialdata.tmpId));

      if (ispdp(event.initialdata.tmpId) && isImageVidEnq(event.initialdata.tmpId) && isSet(ReqObj.Form[event.initialdata.tmpId].isNewImage) && ReqObj.Form[event.initialdata.tmpId].isNewImage === "1" && event.initialdata.step == "0R")
        $("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).append('<div id="t' + event.initialdata.tmpId + '_vcd" class="btmarg"></div>');
    }
  } else {
    isqQuestionHtmlInsertion(event);
  }
  if (ispdp(event.initialdata.tmpId) && isImageVidEnq(event.initialdata.tmpId) && isSet(ReqObj.Form[event.initialdata.tmpId].isNewImage) && ReqObj.Form[event.initialdata.tmpId].isNewImage === "1") {
    viewCompleteHtmlInsertion(event);
    $("#t" + event.initialdata.tmpId + "_vcd").on("click", function () {
      let sample = ReqObj.Form[event.initialdata.tmpId].noSampling;
      ReqObj.Form[event.initialdata.tmpId].noSampling = true;
      blenqGATracking("VCD_ImgForm", "Redirect:ProductUrl", getEventLabel(), 0, event.initialdata.tmpId);
      ReqObj.Form[event.initialdata.tmpId].noSampling = sample;
    });
  }
  prodDetailshandleCSS(event);
}

function viewCompleteHtmlInsertion(event) {
  if (isSet(ReqObj.Form[event.initialdata.tmpId].redirectUrl) && isSet(ReqObj.Form[event.initialdata.tmpId].redirectUrl["produrl"]) && ReqObj.Form[event.initialdata.tmpId].redirectUrl["produrl"] !== "") {

    let vcdfrm = ReqObj.Form[event.initialdata.tmpId].redirectUrl["produrl"].endsWith(".html") ? ReqObj.Form[event.initialdata.tmpId].redirectUrl["produrl"] + '?vcdimgform=1': ReqObj.Form[event.initialdata.tmpId].redirectUrl["produrl"] + '&vcdimgform=1' ; 

    let vcd = "<a target='_blank' href='" + vcdfrm + "' class='view-c-details'>View Complete Details</a>"
    $("#t" + event.initialdata.tmpId + "_vcd").html(vcd);
  }
}

function prodDetailsHtmlDefautls(event) {
  // $('#t' + event.initialdata.tmpId + '_isqdetails' + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_Prodname" + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_Compname" + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_price" + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_unit" + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step).html("");
  $("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).html("");
}

function enqImghandleBuutton(tmpId) {
  var x = returnEnquireNowHtml(tmpId);
  var html = x["OuterWrapper"] + x["Label"] + x["ClosingWrapper"];
  $("#t" + tmpId + "_submitdiv").removeClass("befstgo2 bearrowN");
  $("#t" + tmpId + "_submit").removeClass("form-btn").addClass("befstgo2 hovsub").val("Enquire Now");
  $("#t" + tmpId + "_bl_form").html(html);
}

function prodNameHtmlInsertion(event) {
  if (
    event.datavalue["modrefType"] !== "company" &&
    event.datavalue["prod_name"] !== ""
  ) {
    $("#t" + event.initialdata.tmpId + "_Prodname" + event.initialdata.step)
      .html(
        returnProdCnameUrlHtml(
          event.initialdata.tmpId,
          "produrl",
          event.datavalue["prod_name"],
          "_ie_prod_" + event.initialdata.step,
          "enqprd"
        ),
        "enqprd"
      )
      .removeClass("bedsnone")
      .addClass("be-pnm");
  }
}

function compNameHtmlInsertion(event) {
  if (
    event.datavalue["modrefType"] === "company" ||
    (event.datavalue["modrefType"] !== "company" &&
      event.datavalue["prod_name"] === "")
  ) {
    var class_name =
      event.datavalue["prod_name"] === "" ? "eprod be-pnm" : "be-pnm";
    $("#t" + event.initialdata.tmpId + "_Compname" + event.initialdata.step)
      .html(
        returnProdCnameUrlHtml(
          event.initialdata.tmpId,
          "produrl",
          event.datavalue["comp_name"]
        ),
        "_ie_prod_" + event.initialdata.step,
        "enqprd"
      )
      .removeClass("bedsnone befs14 be-inbl")
      .addClass(class_name);
  }
}

function prodPriceHtmlInsertion(event) {
  $("#t" + event.initialdata.tmpId + "_price" + event.initialdata.step).html(
    event.datavalue["price"]
  );
  $("#t" + event.initialdata.tmpId + "_unit" + event.initialdata.step).html(
    event.datavalue["unit"]
  );
}

function soldByHtmlInsertion(event) {
  // if (event.datavalue["modrefType"] !== "company" && event.datavalue["prod_name"] !== "") {
  if (
    event.datavalue["comp_name"] !== "" ||
    event.datavalue["city"] !== "" ||
    event.datavalue["state"] !== ""
  ) {
    $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).html(
      "Sold By - "
    );
    if (event.datavalue["comp_name"] !== "") {
      $("#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step).html(
        returnProdCnameUrlHtml(
          event.initialdata.tmpId,
          "cmpUrl",
          event.datavalue["comp_name"],
          "_ie_cmp_" + event.initialdata.step,
          "enqcmp"
        )
      );
    }
    if (event.datavalue["city"] !== "") {
      $(
        "#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step
      ).append(", " + event.datavalue["city"]);
    }
    if (event.datavalue["state"] !== "") {
      $(
        "#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step
      ).append(", " + event.datavalue["state"]);
    }
  } else
    $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).html(
      ""
    );

  // }
}

function returnProdCnameUrlHtml(tmpId, key, val, id, cls) {
  var svg = "";
  if (glmodid == "PRODDTL" && key == "produrl") {
    svg = `<svg fill="#2e3192" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -3 24 24" width="17px" height="17px"><path d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"/></svg>`;
  }
  if (isImageVidEnq(tmpId) && isSet(ReqObj.Form[tmpId].redirectUrl) && isSet(ReqObj.Form[tmpId].redirectUrl[key]) && ReqObj.Form[tmpId].redirectUrl[key] !== "") {

    let prdnmfrm = ReqObj.Form[tmpId].redirectUrl[key];
    if(key == 'produrl')
      prdnmfrm = ReqObj.Form[tmpId].redirectUrl[key].endsWith(".html") ? ReqObj.Form[tmpId].redirectUrl[key] + '?prdnmfrm=1': ReqObj.Form[tmpId].redirectUrl[key] + '&prdnmfrm=1' ; 

    return ("<a href = '" + prdnmfrm + "' target = '_blank' class='enqa " + cls + "'id = 't" + tmpId + id + "'>" + val + " " + svg + "</a>");
  } else {
    return val;
  }
}

function urlTrack(tmpId, msg) {
  if (glmodid == "PRODDTL" && msg == "Redirect:ProductUrl") {
    var sampling = ReqObj.Form[tmpId].noSampling;
    ReqObj.Form[tmpId].noSampling = true;
    blenqGATracking("Product_Name_Clicked", msg, getEventLabel(), 0, tmpId);
    ReqObj.Form[tmpId].noSampling = sampling;

    return true;
  }
  var formtype = isSet(ReqObj.Form[tmpId].formType) && ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ? "Post Buy Leads" : "Send Enquiry";
  blenqGATracking(formtype, msg, getEventLabel(), 1, tmpId);
  return true;
}

function addZoomImageEvent(event) {
  var tmpId = event.target.id.substring(1, 5);

  var magnifying_area = $("#t" + tmpId + "_prodimg");
  var magnifying_img = $("#t" + tmpId + "_zoomimage");

  var offsetCor = magnifying_area.position();

  if (!isSet(offsetCor) || !isSet(offsetCor.left) || !isSet(offsetCor.top)) {
    return;
  }

  clientX = event.clientX - offsetCor.left;
  clientY = event.clientY - offsetCor.top;

  mWidth = magnifying_area.outerWidth();
  mHeight = magnifying_area.outerHeight();

  clientX = (clientX / mWidth) * 100;
  clientY = (clientY / mHeight) * 100;

  magnifying_img.css(
    "transform",
    "translate(-" + clientX + "%, -" + clientY + "%) scale(2)"
  );
}

function removeZoomImageEvent(event) {
  var tmpId = event.target.id.substring(1, 5);

  var magnifying_img = $("#t" + tmpId + "_zoomimage");

  magnifying_img.css("transform", "translate(-50%, -50%) scale(1)");
}

function addEventZoom(tmpId) {
  ReqObj.Form[tmpId].clicked = true;
  var magnifying_area = $("#t" + tmpId + "_prodimg");
  var magnifying_img = $("#t" + tmpId + "_zoomimage");

  magnifying_area.css("cursor", "zoom-out");
  magnifying_img.css("transform", "translate(-50%, -50%) scale(2)");

  magnifying_area.on("mousemove", addZoomImageEvent);
  magnifying_area.on("mouseleave", removeZoomImageEvent);
}

function removeEventZoom(tmpId) {
  ReqObj.Form[tmpId].clicked = false;
  var magnifying_area = $("#t" + tmpId + "_prodimg");
  var magnifying_img = $("#t" + tmpId + "_zoomimage");

  magnifying_area.css("cursor", "zoom-in");
  magnifying_img.css("transform", "translate(-50%, -50%) scale(1)");

  magnifying_area.off("mousemove", addZoomImageEvent);
  magnifying_area.off("mouseleave", removeZoomImageEvent);
}

function attachEvents(event) {
  var step = event.initialdata.step;
  var tmpId = event.initialdata.tmpId;
  $("a#t" + tmpId + "_ie_prod_" + step).on("click", function () {
    urlTrack(tmpId, "Redirect:ProductUrl", step);
  });
  $("a#t" + tmpId + "_ie_cmp_" + step).on("click", function () {
    urlTrack(tmpId, "Redirect:CompanyUrl");
  });

  var magnifying_area = $("#t" + tmpId + "_prodimg");
  if (isSet(magnifying_area) && step[1] === "L" && (pdpenqImage(tmpId) || direnqImage(tmpId))) {
    magnifying_area.css("cursor", "zoom-in");
    ReqObj.Form[tmpId].clicked = false;

    magnifying_area.on("click", function (event) {
      if(isImageVidEnq(tmpId) && typeof ReqObj.Form[tmpId].zoomtrack === "undefined"){  //image track
        blenqGATracking("Send Enquiry","Zoom Clicked", getEventLabel(), 1, tmpId);
        ReqObj.Form[tmpId].zoomtrack = true;
      }
      if (
        event.target.id === "" ||
        event.target.id.substring(5) === "_beleft" ||
        event.target.id.substring(5) === "_beright"
      ) {
      } else if (!ReqObj.Form[tmpId].clicked) {
        addEventZoom(tmpId);
      } else {
        removeEventZoom(tmpId);
      }
    });
  }
}

//fsdgsdgsdhgs
function isqQuestionHtmlInsertion(event) {
  var plsqArr = decodeURIComponent(event.datavalue["plsqArr"]);
  if (isSet(plsqArr) && plsqArr !== "" ) {
    var count = 0;
    var keyVal = plsqArr.split("#");
    var len = keyVal.length;
    var total = 225;
    if (ispdp(event.initialdata.tmpId) && isImageVidEnq(event.initialdata.tmpId) && isSet(ReqObj.Form[event.initialdata.tmpId].isNewImage) && ReqObj.Form[event.initialdata.tmpId].isNewImage === "1" && event.initialdata.step == "0R") {
      $("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).append("<div id='enqImgIsq'></div>");
    }
    for (var i = 0; i < len; i++) {
      var selisq = keyVal[i].split(":");
      var ques = selisq[0];
      var varr = selisq[1];
      if (isSet(ques) && ques !== "" && isSet(varr) && varr !== "") {
        var ans = ques + "" + varr;
        var count_val = pdpenqImage(event.initialdata.tmpId) || direnqImage(event.initialdata.tmpId) ? 3 : 4;
        var col_cls1 = pdpenqImage(event.initialdata.tmpId) || direnqImage(event.initialdata.tmpId) ? "eqRC4" : "col111";
        var col_cls2 = pdpenqImage(event.initialdata.tmpId) || direnqImage(event.initialdata.tmpId) ? "eqRC3" : "col77";
        if (ans.length < total && count < count_val) {
          if (ispdp(event.initialdata.tmpId) && isImageVidEnq(event.initialdata.tmpId) && isSet(ReqObj.Form[event.initialdata.tmpId].isNewImage) && ReqObj.Form[event.initialdata.tmpId].isNewImage === "1" && event.initialdata.step == "0R") {
            $("#enqImgIsq").append("<p class='" + col_cls1 + "'>" + returnSpan("t" + event.initialdata.tmpId, "_isqkey" + i, ques + ": ", col_cls2, "") + varr + "</p>");
          } else {
            $("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).append("<p class='" + col_cls1 + "'>" + returnSpan("t" + event.initialdata.tmpId, "_isqkey" + i, ques + ": ", col_cls2, "") + varr + "</p>");
          }
          total = total - ans.length;
          count++;
        }
        else {
          break;
        }
      }
    }
  }
  if (ispdp(event.initialdata.tmpId) && isImageVidEnq(event.initialdata.tmpId) && isSet(ReqObj.Form[event.initialdata.tmpId].isNewImage) && ReqObj.Form[event.initialdata.tmpId].isNewImage === "1" && event.initialdata.step == "0R")
    $("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).append('<div id="t' + event.initialdata.tmpId + '_vcd" class="btmarg"></div>');
}

function prodDetailshandleCSS(event) {
  var cl = "eprod";
  var ppricecl = "eqprodpr";
  var pricecl = "eqpr";
  var unitcl = "";
  $("#t" + event.initialdata.tmpId + "_Prodname" + event.initialdata.step).addClass(cl);
  $("#t" + event.initialdata.tmpId + "_price" + event.initialdata.step).addClass(pricecl);
  $("#t" + event.initialdata.tmpId + "_unit" + event.initialdata.step).addClass(unitcl);
  $("#t" + event.initialdata.tmpId + "_ProdPrice" + event.initialdata.step).removeClass().addClass(ppricecl);
  $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).addClass("eqsold");
  $("#t" + event.initialdata.tmpId + "_soldBy" + event.initialdata.step).removeClass().addClass("eqsoldby");
  if (direnqImage(event.initialdata.tmpId)) {
    $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).removeClass().addClass("sldby");
    $("#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step).addClass("sldby");
  }
}

function LeftSide(tmpId, typeofform, step) {
  this.sectionName = [];
  if (!(step === 1 && pdpenqImage(tmpId)))
    this.defaultActions(tmpId, typeofform, step);
}

LeftSide.prototype.defaultActions = function (tmpId, typeofform, step) {
  this.initialiseLeftSection(tmpId, typeofform, step + "L"); // internal containers left section will be initialised
  this.insertIntoLeftSection({
    initialdata: {
      tmpId: tmpId,
      typeofform: typeofform,
      obj: this,
      step: step + "L",
    },
  });
  this.transition(tmpId, typeofform, step);
  if (isImageVidEnq(tmpId))
    attachEvents({
      initialdata: {
        tmpId: tmpId,
        step: step + "L",
      },
    });

  if (pdpenqImage(tmpId)) {
    var len = ReqObj.Form[tmpId].multipleImageVideo.length;
    if (len < 5) {
      var height = $("#t" + tmpId + "_imgslider").height();
      $("#t" + tmpId + "_slideout").height(height);
      $("#t" + tmpId + "_slide").height(height + 35);
    }
  }
};

LeftSide.prototype.initialiseLeftSection = function (tmpId, typeofform, step) {
  // internal of left side acc to typeofform - ONE TIME INITIALISATION
  var that = this;
  that.sectionName = [];
  var sectionnumber = section_number[typeofform]["left"];
  for (var i = 1; i <= sectionnumber; i++) {
    var section_name = section_class[typeofform]["left"][i];
    that.sectionName.push(section_name.name);
    if (step === "0L") that.getHtml(tmpId, typeofform, section_name.name, step);
  }
};

LeftSide.prototype.getHtml = function (tmpId, typeofform, section_name, step) {
  var that = this;
  switch (section_name) {
    case "prodmedia":
      $("#t" + tmpId + "_prodmedia").html(
        that.getProdMediaHtml(tmpId, typeofform, section_name, step)
      );
      break;
    case "proddetail":
      $("#t" + tmpId + "_proddetails").html(
        getProdDetailsHtml(tmpId, typeofform, step)
      );
      break;
    case "helpQuest":
      $("#t" + tmpId + "_helpQuest").html(
        that.gethelpQuestHtml(tmpId, typeofform, section_name)
      );
      break;
  }
};

LeftSide.prototype.getProdMediaHtml = function (
  tmpId,
  typeofform,
  section_name,
  step
) {
  var that = this;
  if (typeofform === "image" || typeofform === "video")
    // chanw to switch statement if needed
    return that.returnImageVideoHtml(tmpId, step);
  else if (typeofform === "enquiry" || typeofform === "bl")
    return that.returnNotImageNotVideoHtml(tmpId, step);
};

LeftSide.prototype.returnImageVideoHtml = function (tmpId, step) {
  var html = "";
  if (
    ReqObj.Form[tmpId].typeofform.toLowerCase() === "image" ||
    (ReqObj.Form[tmpId].typeofform.toLowerCase() === "video" && step === "0L")
  ) {
    if (
      isSet(ReqObj.Form[tmpId].multipleImageVideo) &&
      ReqObj.Form[tmpId].multipleImageVideo !== ""
    ) {
      html += returnContainer(
        "t" + tmpId,
        "_productimage",
        "imgslide",
        "",
        "",
        ""
      );
      html += returnContainer("t" + tmpId, "_slide", "igsm", "", "", "");
      html += returnSpan("t" + tmpId, "_beup", "", "eqUp bedsnone", "");
      html += returnContainer(
        "t" + tmpId,
        "_slideout",
        "slideouter",
        "",
        "",
        ""
      );
      html += returnSpan("t" + tmpId, "_imgslider", "", "imgslider", ""); // insertion inside this !
      html += returnSpan("t" + tmpId, "_bedown", "", "eqDwn", "");
      html += "</div></div>";
      html += returnContainer(
        "t" + tmpId,
        "parent_iframe",
        "bedsnone",
        "",
        "",
        ""
      );
      html += returnContainer(
        "t" + tmpId,
        "_prodVideo",
        "fL bepr bdr1 pdpHg",
        "",
        "",
        ""
      );
      html += "</div ></div >";
      html += returnContainer(
        "t" + tmpId,
        "_prodimg",
        "fL bepr bdr1 pdpHg",
        "",
        "",
        ""
      );
      html += "</div></div>";
    } else {
      html += returnContainer(
        "t" + tmpId,
        "_productimage",
        "imgslide",
        "",
        "",
        ""
      );
      html +=
        returnContainer(
          "t" + tmpId,
          "_imglodr",
          "belodrbg bedsnone",
          "",
          "",
          ""
        ) +
        returnContainer("", "", "blloader", "", "", "") +
        "</div></div>";
      html +=
        "<div class='bepr' id='t" +
        tmpId +
        "_nextprediv'><button id='t" +
        tmpId +
        "_prebtn' class='be-arLN eqNpTi'><span class='eqNpTin'>Previous Product</span></button><button id='t" +
        tmpId +
        "_nextbtn' class='be-arRN eqNpTi'><span class='eqNpTin'>Next Product</span></button></div>";
      html += returnContainer(
        "t" + tmpId,
        "parent_iframe",
        "bedsnone",
        "",
        "",
        ""
      );
      html += returnContainer(
        "t" + tmpId,
        "_prodVideo",
        "fL bepr bdr1 pdpHg",
        "",
        "",
        ""
      );
      html += "</div ></div >";
      html +=
        returnContainer(
          "t" + tmpId,
          "_prodimg",
          "fL bepr bdr1 pdpHg",
          "",
          "",
          ""
        ) + "</div></div>";
    }
  } else {
    html += returnContainer(
      "t" + tmpId,
      "_productimage",
      "imgslide",
      "",
      "",
      ""
    );
    html +=
      returnContainer(
        "t" + tmpId,
        "_imglodr",
        "belodrbg bedsnone",
        "",
        "",
        ""
      ) +
      returnContainer("", "", "blloader", "", "", "") +
      "</div></div>";
    html += returnContainer(
      "t" + tmpId,
      "parent_iframe",
      "bedsnone",
      "",
      "",
      ""
    );
    html += returnContainer(
      "t" + tmpId,
      "_prodVideo",
      "fL bepr bdr1 pdpHg",
      "",
      "",
      ""
    );
    html += "</div ></div >";
    html +=
      returnContainer(
        "t" + tmpId,
        "_prodimg",
        "fL bepr bdr1 pdpHg",
        "",
        "",
        ""
      ) + "</div></div>";
  }
  return html;
};

LeftSide.prototype.returnNotImageNotVideoHtml = function (tmpId, step) {
  var html = returnContainer(
    "t" + tmpId,
    "_productimage",
    "imgslide",
    "",
    "",
    ""
  );
  html += returnContainer(
    "t" + tmpId,
    "_imglodr",
    "belodrbg bedsnone",
    "",
    "",
    ""
  );
  html += returnContainer("", "", "blloader", "", "", "") + "</div></div>";
  html +=
    "<div class='bepr' id='t" +
    tmpId +
    "_nextprediv'><button id='t" +
    tmpId +
    "_prebtn' class='be-arLN eqNpTi'><span class='eqNpTin'>Previous Product</span></button><button id='t" +
    tmpId +
    "_nextbtn' class='be-arRN eqNpTi'><span class='eqNpTin'>Next Product</span></button></div>";
  html += returnContainer("t" + tmpId, "parent_iframe", "bedsnone", "", "", "");
  html += returnContainer(
    "t" + tmpId,
    "_prodVideo",
    "fL bepr bdr1 pdpHg",
    "",
    "",
    ""
  );
  html += "</div ></div >";
  html +=
    ReqObj.Form[tmpId].typeofform.toLowerCase() === "bl"
      ? returnContainer("t" + tmpId, "_prodimg", "be-prdimg", "", "", "")
      : returnContainer(
        "t" + tmpId,
        "_prodimg",
        "fL bepr bdr1 pdpHg",
        "",
        "",
        ""
      );
  html += "</div></div>";
  return html;
};

LeftSide.prototype.gethelpQuestHtml = function (
  tmpId,
  typeofform,
  section_name
) {
  var dashCls = currentISO() !== "IN" ? " h120" : "";
  var paywithcls = currentISO() !== "IN" ? " dn" : "";
  var blhiw = isInactiveBL(tmpId) ? " befs18 emgb6 color_000 befwt" : " befs20 bemgb15";

  var html =
    returnContainer(
      "",
      "",
      "beclrW betxtc" + blhiw,
      "",
      "How it Works",
      ""
    ) + "</div>";
  html += returnContainer("", "", "bepr belh18", "", "", "");

  if (isInactiveBL(tmpId)) {
    blhtml = `<div class="behlp1 bevT bemgb6"><div class="bedtc bed_icon"><svg width="17" height="18" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2208 12.3234L0.990359 12.3243V9.65808L17.2189 9.65714L10.0677 2.50593L11.9533 0.62031L22.3242 10.9912L11.9533 21.3621L10.0677 19.4765L17.2208 12.3234Z" fill="black"></path></svg></div>`;
    html +=
      blhtml +
      returnContainer(
        "",
        "",
        "bedtc bevT bed_cont",
        "",
        "Tell us what you need by filling the form",
        ""
      ) +
      "</div></div>";
    html +=
      blhtml +
      returnContainer(
        "",
        "",
        "bedtc bevT bed_cont",
        "",
        "Receive Verified supplier details",
        ""
      ) +
      "</div></div>";
    html +=
      blhtml +
      returnContainer(
        "",
        "",
        "bedtc bevT bed_cont",
        "",
        "Compare Quotations and seal the deal",
        ""
      ) +
      "</div></div>";
    html +=
      `<div class="behlp1 bevT bemgb6 ${paywithcls}"><div class="bedtc bed_icon"><svg width="17" height="18" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2208 12.3234L0.990359 12.3243V9.65808L17.2189 9.65714L10.0677 2.50593L11.9533 0.62031L22.3242 10.9912L11.9533 21.3621L10.0677 19.4765L17.2208 12.3234Z" fill="black"></path></svg></div>` +
      returnContainer(
        "",
        "",
        "bedtc bevT bed_cont",
        "",
        "Pay with IndiaMART & Get 100% Buyer Protection",
        ""
      ) +
      "</div></div>";
    html += "</div>";
  } else {
    blhtml = `<div class="behlp1 bevT bemgb15"><div class="bedtc"><i class="bedotW"></i></div>`;
    html += `<div class="be-hlpd belft ${dashCls}"></div>`;
    html +=
      blhtml +
      returnContainer(
        "",
        "",
        "bedtc bevT",
        "",
        "Tell us what you need by filling the form",
        ""
      ) +
      "</div></div>";
    html +=
      blhtml +
      returnContainer(
        "",
        "",
        "bedtc bevT",
        "",
        "Receive Verified supplier details",
        ""
      ) +
      "</div></div>";
    html +=
      blhtml +
      returnContainer(
        "",
        "",
        "bedtc bevT",
        "",
        "Compare Quotations and seal the deal",
        ""
      ) +
      "</div></div>";
    html +=
      `<div class="behlp1 bevT bemgb15 ${paywithcls}"><div class="bedtc"><i class="bedotW"></i></div>` +
      returnContainer(
        "",
        "",
        "bedtc bevT",
        "",
        "Pay with IndiaMART & Get 100% Buyer Protection",
        ""
      ) +
      "</div></div>";
    html += "</div>";
  }
  return html;
};

LeftSide.prototype.transition = function (tmpId, typeofform, step) {
  // screen wise transition
  var that = this;
  switch (typeofform) {
    case "image":
      that.imageTransition(tmpId, typeofform, step);
      break;
    case "video":
      that.videoTransition(tmpId, typeofform, step);
      break;
    case "enquiry":
      that.enquiryTransition(tmpId, typeofform, step);
      break;
    case "bl":
      that.blTransition(tmpId, typeofform, step);
      break;
  }
};

LeftSide.prototype.imageTransition = function (tmpId, typeofform, step) {
  $("#t" + tmpId + "_leftsection").removeClass("be-Lsc");
  $("#t" + tmpId + "_leftS")
    .removeClass()
    .addClass("be-Lsc enqPImg");
  if (!$("#t" + tmpId + "_mcont").hasClass("be-mcont"))
    $("#t" + tmpId + "_mcont").addClass("be-mcont bezid");
  $("#t" + tmpId + "_mcont").addClass("eqPdm");
  // drqmg
  if (direnqImage(tmpId)) {
    $("#t" + tmpId + "_mcont").addClass("drqmg");
  }

  if (pdpenqImage(tmpId)) {
    var windPer = (window.innerHeight / window.innerWidth) * 100;
    var cls = windPer > 58 ? "eqTst eqRes" : "eqTst";
    $("#t" + tmpId + "_questionouterwrapper").addClass("epLf30");
    $("#t" + tmpId + "_mcont").addClass(cls);
    $("#t" + tmpId + "_thankDiv").addClass(cls);
    $("#t" + tmpId + "_hdg").removeClass().addClass("bedsnone");
  }
  if (step === 1 && !pdpenqImage(tmpId)) {
    if (direnqImage(tmpId)) {
      // $("#t" + tmpId + "_mcont").addClass("enqnxt eqPdsec");
      // $("#t" + tmpId + "_slide").addClass("bedsnone");
      // $("#t" + tmpId + "_proddetails").removeClass("bedsnone").addClass("bepr lTxt");
      // $("#t" + tmpId + "_prodmedia").removeClass().addClass("be-pnmS");
      // $("#t" + tmpId + "_prodimg").removeClass().addClass("be-prdimg");
      // $("#t" + tmpId + "parent_iframe").html("").addClass("bedsnone");
      // $("#t" + tmpId + "_productimage").removeClass("imgslide");
      // $("#t" + tmpId + "_leftS").removeClass().addClass('nwInn');
      // $("#t" + tmpId + "_rightproddetails").addClass("bedsnone");
      // $("#t" + tmpId + "_questionouterwrapper").removeClass("eqBotm"); // to not eqBotm
      // $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
      // $("#t" + tmpId + "_mcont").removeClass("arrprdch");
      // var windPer = (window.innerHeight / window.innerWidth) * 100;
      // var cls = (windPer > 58) ? "eqTst eqRes" : "eqTst"
      // $("#t" + tmpId + "_questionouterwrapper").addClass("epLf30");
      $("#t" + tmpId + "_mcont").addClass(cls);
      $("#t" + tmpId + "_thankDiv").addClass(cls);
      $("#t" + tmpId + "_hdg").removeClass().addClass("bedsnone");
    }
    else {
      $("#t" + tmpId + "_mcont").addClass("enqnxt eqPdsec");
      $("#t" + tmpId + "_slide").addClass("bedsnone");
      $("#t" + tmpId + "_proddetails").removeClass("bedsnone").addClass("bepr lTxt");
      $("#t" + tmpId + "_prodmedia").removeClass().addClass("be-pnmS");
      $("#t" + tmpId + "_prodimg").removeClass().addClass("be-prdimg");
      $("#t" + tmpId + "parent_iframe").html("").addClass("bedsnone");
      $("#t" + tmpId + "_productimage").removeClass("imgslide");
      $("#t" + tmpId + "_leftS").removeClass().addClass("nwInn");
      $("#t" + tmpId + "_rightproddetails").addClass("bedsnone");
      $("#t" + tmpId + "_questionouterwrapper").removeClass("eqBotm"); // to not eqBotm
      $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
      $("#t" + tmpId + "_mcont").removeClass("arrprdch");
    }

  }
  if (step === 0) {
    $("#t" + tmpId + "_leftS").removeClass().addClass("be-Lsc enqPImg");
    $("#t" + tmpId + "_proddetails").addClass("bedsnone");
    $("#t" + tmpId + "_productimage").addClass("imgslide");
    $("#t" + tmpId + "_leftS").removeClass().addClass("be-Lsc enqPImg");
    $("#t" + tmpId + "_mcont").removeClass("eqPdsec");
    if ((isSet(ReqObj.Form[tmpId].nextProdArrow) &&ReqObj.Form[tmpId].nextProdArrow === true) ||(isSet(ReqObj.Form[tmpId].prevProdArrow) && ReqObj.Form[tmpId].prevProdArrow === true) ) { 
      $("#t" + tmpId + "_mcont").addClass("arrprdch").removeClass("eqarch");
    } else {
      $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
      $("#t" + tmpId + "_mcont").removeClass("arrprdch").removeClass("eqarch");
    }
  }
  if ( isSet(ReqObj.Form[tmpId].imgSlideHide) && ReqObj.Form[tmpId].imgSlideHide !== "" && ReqObj.Form[tmpId].imgSlideHide === true ) {
    $("#t" + tmpId + "_slide").addClass("bedsnone");
    $("#t" + tmpId + "_mcont").addClass("nImg");
    $("#t" + tmpId + "_thankDiv").addClass("nImg");
  } else {
    $("#t" + tmpId + "_mcont").removeClass("nImg");
    $("#t" + tmpId + "_thankDiv").removeClass("nImg");
  }
  if (pdpenqImage(tmpId) || direnqImage(tmpId)) {
    var resol = window.innerWidth;
    var img_height = $("#t" + tmpId + "_mcont").height();

    if (pdpenqImage(tmpId) && !direnqImage(tmpId)) {
      var addval = ReqObj.Form[tmpId].multipleImageVideo.length <= 1 ? 0 : resol <= 1515 ? 103 : 143;
      $("#t" + tmpId + "_zoomimage").css({ "max-width": img_height + "px" });
      $("#t" + tmpId + "parent_iframe").css({ width: img_height + "px" }).addClass("bepr eIfvm");
      $("#t" + tmpId + "_prodimg").width(img_height);
      $("#t" + tmpId + "_leftS").width(img_height + addval);
      $("#t" + tmpId + "_productimage").width(img_height + addval);
    }
  };
}

LeftSide.prototype.videoTransition = function (tmpId, typeofform, step) {
  $("#t" + tmpId + "_leftsection").removeClass("be-Lsc1");
  $("#t" + tmpId + "_leftS").addClass("enqPImg");
  $("#t" + tmpId + "_mcont").addClass("eqPdm");
  if (pdpenqImage(tmpId)) {
    var windPer = (window.innerHeight / window.innerWidth) * 100;
    var cls = windPer > 58 ? "eqTst eqRes" : "eqTst";
    $("#t" + tmpId + "_questionouterwrapper").addClass("epLf30");
    $("#t" + tmpId + "_mcont").addClass(cls);
    $("#t" + tmpId + "_thankDiv").addClass(cls);
    $("#t" + tmpId + "_hdg").removeClass().addClass("bedsnone");
  }
  if (step === 1 && !pdpenqImage(tmpId)) {
    if (direnqImage(tmpId)) {
      // $("#t" + tmpId + "_mcont").addClass("enqnxt eqPdsec");
      // $("#t" + tmpId + "_slide").addClass("bedsnone");
      // $("#t" + tmpId + "_proddetails").removeClass("bedsnone").addClass("bepr lTxt");
      // $("#t" + tmpId + "_prodmedia").removeClass().addClass("be-pnmS");
      // $("#t" + tmpId + "_prodimg").removeClass().addClass("be-prdimg");
      // $("#t" + tmpId + "parent_iframe").html("").addClass("bedsnone");
      // $("#t" + tmpId + "_productimage").removeClass("imgslide");
      // $("#t" + tmpId + "_leftS").removeClass().addClass('nwInn');
      // $("#t" + tmpId + "_rightproddetails").addClass("bedsnone");
      // $("#t" + tmpId + "_questionouterwrapper").removeClass("eqBotm"); // to not eqBotm
      // $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
      // $("#t" + tmpId + "_mcont").removeClass("arrprdch");
      // var windPer = (window.innerHeight / window.innerWidth) * 100;
      // var cls = (windPer > 58) ? "eqTst eqRes" : "eqTst"
      // $("#t" + tmpId + "_questionouterwrapper").addClass("epLf30");
      $("#t" + tmpId + "_mcont").addClass(cls);
      $("#t" + tmpId + "_thankDiv").addClass(cls);
      $("#t" + tmpId + "_hdg").removeClass().addClass("bedsnone");
    }
    else {
      $("#t" + tmpId + "_mcont").addClass("enqnxt eqPdsec");
      $("#t" + tmpId + "_slide").addClass("bedsnone");
      $("#t" + tmpId + "_proddetails").removeClass("bedsnone").addClass("bepr lTxt");
      $("#t" + tmpId + "_prodmedia").removeClass().addClass("be-pnmS");
      $("#t" + tmpId + "_prodimg").removeClass().addClass("be-prdimg");
      $("#t" + tmpId + "parent_iframe").html("").addClass("bedsnone");
      $("#t" + tmpId + "_productimage").removeClass("imgslide");
      $("#t" + tmpId + "_leftS").removeClass().addClass("nwInn");
      $("#t" + tmpId + "_rightproddetails").addClass("bedsnone");
      $("#t" + tmpId + "_questionouterwrapper").removeClass("eqBotm"); // to not eqBotm
      $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
      $("#t" + tmpId + "_mcont").removeClass("arrprdch");
    }

  }
  if (step === 0) {
    $("#t" + tmpId + "_leftS").removeClass().addClass("be-Lsc enqPImg");
    $("#t" + tmpId + "_proddetails").addClass("bedsnone");
    $("#t" + tmpId + "_productimage").addClass("imgslide");
    $("#t" + tmpId + "_mcont").removeClass("eqPdsec");
    if ($("#t" + tmpId + "_prodVideo").html() !== "")
      $("#t" + tmpId + "parent_iframe").removeClass("bedsnone");
    if ( (isSet(ReqObj.Form[tmpId].nextProdArrow) && ReqObj.Form[tmpId].nextProdArrow === true) || (isSet(ReqObj.Form[tmpId].prevProdArrow) && ReqObj.Form[tmpId].prevProdArrow === true)) {
      $("#t" + tmpId + "_mcont").addClass("arrprdch").removeClass("eqarch");
    } else {
      $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
      $("#t" + tmpId + "_mcont").removeClass("arrprdch").removeClass("eqarch");
    }
  }

  if (isSet(ReqObj.Form[tmpId].imgSlideHide) &&ReqObj.Form[tmpId].imgSlideHide !== "" &&ReqObj.Form[tmpId].imgSlideHide === true) {
    $("#t" + tmpId + "_slide").addClass("bedsnone");
    $("#t" + tmpId + "_mcont").addClass("nImg");
    $("#t" + tmpId + "_thankDiv").addClass("nImg");
  } else {
    $("#t" + tmpId + "_mcont").removeClass("nImg");
    $("#t" + tmpId + "_thankDiv").removeClass("nImg");
  }
  if (pdpenqImage(tmpId) || direnqImage(tmpId)) {
    var resol = window.innerWidth;
    var img_height = $("#t" + tmpId + "_mcont").height();
    if (pdpenqImage(tmpId) && !direnqImage(tmpId)) {
      var addval = ReqObj.Form[tmpId].multipleImageVideo.length <= 1 ? 0 : resol <= 1515 ? 103 : 143;
      $("#t" + tmpId + "_zoomimage").css({ "max-width": img_height + "px" });
      $("#t" + tmpId + "parent_iframe").css({ width: img_height + "px" }).addClass("bepr eIfvm");
      $("#t" + tmpId + "_prodimg").width(img_height);
      $("#t" + tmpId + "_leftS").width(img_height + addval);
      $("#t" + tmpId + "_productimage").width(img_height + addval);
    }
  };
}

LeftSide.prototype.enquiryTransition = function (tmpId, typeofform, step) {
  
  $("#t" + tmpId + "_mcont").addClass("be-mcont bezid eqPdsec");
  $("#t" + tmpId + "_questionouterwrapper").removeClass("epLf30");
  $("#t" + tmpId + "_mcont").removeClass("eqTst eqRes");
  $("#t" + tmpId + "_thankDiv").removeClass("eqTst eqRes");
  $("#t" + tmpId + "_mcont").addClass("eqPdsec");
  $("#t" + tmpId + "_questionouterwrapper").removeClass("eqBotm");
  $("#t" + tmpId + "_leftsection").removeClass("be-Lsc1");
  $("#t" + tmpId + "_leftS").removeClass("enqPImg").addClass("nwInn");
  $("#t" + tmpId + "_leftS").removeClass("boxsizeInact");
  $("#t" + tmpId + "_mcont").removeClass("eqPdm");
  $("#t" + tmpId + "_prodimg").removeClass().addClass("be-prdimg");

  $("#t" + tmpId + "_productimage").removeClass("imgslide");
  $("#t" + tmpId + "_mcont").removeClass("arrprdch");
  if (step === 1) {
    $("#t" + tmpId + "_mcont").addClass("enqnxt");
    $("#t" + tmpId + "_slide").addClass("bedsnone");
    $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
  }
  if (step === 0) {
    if ((isSet(ReqObj.Form[tmpId].nextProdArrow) &&ReqObj.Form[tmpId].nextProdArrow === true) ||(isSet(ReqObj.Form[tmpId].prevProdArrow) &&ReqObj.Form[tmpId].prevProdArrow === true)) {
      $("#t" + tmpId + "_mcont").addClass("eqarch").removeClass("arrprdch");
    } else {
      $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
      $("#t" + tmpId + "_mcont").removeClass("arrprdch").removeClass("eqarch");
    }
  }
};

LeftSide.prototype.blTransition = function (tmpId, typeofform, step) {
  $("#t" + tmpId + "_questionouterwrapper").removeClass();
  $("#t" + tmpId + "_mcont").removeClass("arrprdch");
  $("#t" + tmpId + "_leftS").removeClass("boxsizeInact");
  $("#t" + tmpId + "_leftsection").removeClass();
  let be_lsc = isInactiveBL(tmpId) ? "be-Lsc1 be-LscHeight boxsizeInact" : "be-Lsc1"; 
  $("#t" + tmpId + "_leftS").removeClass().addClass(be_lsc);
  $("#t" + tmpId + "_leftS").addClass("oef0");
  $("#t" + tmpId + "_mcont").removeClass().addClass("be-mcont bezid");
  if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&tmpId.substring(0, 2) === "09") {
    $("#t" + tmpId + "_mcont").addClass("blder");
  } else {
    $("#t" + tmpId + "_mcont").removeClass("blder");
  }
  $("#t" + tmpId + "_prodimg").removeClass().addClass("be-prdimg");
  $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
  $("#t" + tmpId + "_productimage").removeClass("imgslide");
  if (isInactiveBL(tmpId)) {
    $("#t" + tmpId + "_prodimg").addClass("cbl_br8");
    var brd_mcat_id= isSet(brd_mcat_id) ? brd_mcat_id : ReqObj.Form[tmpId].mcatId;  //inactive changes
    let forms_data = null;
    let feat_data = null;     //recoms
     try{
  forms_data = (ispdp(tmpId) || modIdf === "PDFIM") ? $.parseJSON(
    sessionStorage.getItem("formsPla" + brd_mcat_id)
  ) :  isLightbox(tmpId) ?  $.parseJSON(
    sessionStorage.getItem("poiCatData - " + brd_mcat_id)
  )  : $.parseJSON(
    sessionStorage.getItem("relCatData - " + brd_mcat_id)
  );
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

    if ((isSet(forms_data) && forms_data.length > 1) || (isSet(feat_data) && feat_data.length > 1)) {
      $("#t" + tmpId + "_helpQuest").css({
        display: "none",
      });
    }
    else {
      $("#t" + tmpId + "_helpQuest").css({
        display: "block",
      });
    }
    $("#t" + tmpId + "_mcont").addClass("cbl_br8 minH500");
  } else {
    $("#t" + tmpId + "_helpQuest").css({
      display: "block",
    });
  }
  if (step === 1) {
    $("#t" + tmpId + "_slide").addClass("bedsnone");
    $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
    $("#t" + tmpId + "_leftS").removeClass().addClass(be_lsc);
    $("#t" + tmpId + "_helpQuest").css({
      display: "block",
    });
    $("#t" + tmpId + "parent_iframe").html("").addClass("bedsnone");
    $("#t" + tmpId + "_prodimg").removeClass("bedsnone");
  }
  if (step === 0 && ReqObj.Form[tmpId].ctaName.toLowerCase() === "mcat video") {
    $("#t" + tmpId + "_leftS").removeClass().addClass("be-Lsc");
    $("#t" + tmpId + "_helpQuest").css({
      display: "none",
    });
  }
};

LeftSide.prototype.insertIntoLeftSection = function (event) {
  // value of internal left html
  event["datavalue"] = prodDetailsData(event); // overall data
  var len = event.initialdata.obj.sectionName.length;
  for (var i = 0; i < len; i++) {
    event.initialdata.todo = event.initialdata.obj.sectionName[i];
    event.initialdata.obj.handleDefaults(event); // to empty html value
    event.initialdata.obj.handleUI(event);
  }
};

LeftSide.prototype.handleDefaults = function (event) {
  // default before inserting
  switch (event.initialdata.todo) {
    case "prodmedia":
      event.initialdata.obj.prodMediaDefaults(event); // related to media
      break;
    case "proddetail":
      event.initialdata.obj.prodDetailsDefaults(event); // related to proddetails
      break;
  }
};

LeftSide.prototype.handleUI = function (event) {
  switch (event.initialdata.todo) {
    case "prodmedia":
      event.initialdata.obj.prodMediaUI(event);
      break;
    case "proddetail":
      prodDetailsHtmlInsertion(event); // common function leftright
      break;
  }
};

LeftSide.prototype.handleCSS = function (event, todo, onclickelement, type) {
  type = isSet(type) ? type : 0;
  switch (todo) {
    case "prodimage":
      event.initialdata.obj.handleProdImageCSS(event, onclickelement);
      break;
    case "slider":
      event.initialdata.obj.handleSliderCSS(event, onclickelement, type);
      break;
  }
};

LeftSide.prototype.handleSliderCSS = function (event, onclickelement, type) {
  if (event.mediakey.key.length === 1) {
    ReqObj.Form[event.initialdata.tmpId].imgSlideHide = true;
    hideAllArrows(event);
    return;
  } else {
    ReqObj.Form[event.initialdata.tmpId].imgSlideHide = false;
  }
  var index_number = onclickelement.split("_slider");
  index_number[1];
  event.mediakey.startingindex =
    event.mediakey.startingindex != parseInt(index_number[1])
      ? index_number[1]
      : event.mediakey.startingindex;
  event.initialdata.obj.prodMediaArrowUI(event);
  $("#t" + event.initialdata.tmpId + "_prodimg > img").removeClass("igTh");
  if ($("#t" + event.initialdata.tmpId + "_prodimg > img")) {
    leftSideLoadZoom(event.initialdata.tmpId);
  }
  if (isSet(onclickelement)) {
    $(onclickelement).addClass("active");
    $(onclickelement).siblings().removeClass("active");
    if (event.initialdata.typeofform === "video") {
      removeYTLoader(event.initialdata.tmpId);
      $("#t" + event.initialdata.tmpId + "parent_iframe").removeClass("cbl_vh");
    }
  }
  if (type !== 1) {
    moveSlider(event);
  }
};
LeftSide.prototype.handleProdImageCSS = function (event, onclickelement) {
  $("#t" + event.initialdata.tmpId + "_prodimg > img").removeClass("igTh");
  if ($("#t" + event.initialdata.tmpId + "_prodimg > img")) {
    leftSideLoadZoom(event.initialdata.tmpId);
  }
  if (isSet(onclickelement)) {
    $(onclickelement).addClass("active");
    $(onclickelement).siblings().removeClass("active");
  }
};
/*----------------------------------------------------------------PROD MEDIA DEFAULTS---------------------------------------------------- */

LeftSide.prototype.prodMediaDefaults = function (event) {
  $("#t" + event.initialdata.tmpId + "parent_iframe").html(
    "<div id='t" +
    event.initialdata.tmpId +
    "_prodVideo' class='fL bepr bdr1 pdpHg'></div>"
  );
  $("#t" + event.initialdata.tmpId + "_prodimg").html("");
  $("#t" + event.initialdata.tmpId + "_imgslider").html("");
};

LeftSide.prototype.prodDetailsDefaults = function (event) {
  $("#t" + event.initialdata.tmpId + "_Prodname").html("");
  $("#t" + event.initialdata.tmpId + "_Compname").html("");
  $("#t" + event.initialdata.tmpId + "_ProdPrice").html("");
  $("#t" + event.initialdata.tmpId + "_soldBy").html("");
};
/*----------------------------------------------------------------PROD MEDIA UI----------------------------------------------------------- */

LeftSide.prototype.imageData = function (event) {
  event["mediakey"] = event.initialdata.obj.manipulatingKeys(event); // this key to be used for insertion
  event.mediakey["startingindex"] =
    event.initialdata.obj.getStartingIndex(event); // if typeofform enq/bl - 0 always else calculate
  event.mediakey["togglearrow"] = event.initialdata.obj.toToggleArrow(event); // if typeofform enq/bl - false always else true
  return event;
};

LeftSide.prototype.prodMediaUI = function (event) {
  event = event.initialdata.obj.imageData(event); // get image data

  if (
    ReqObj.Form[event.initialdata.tmpId].typeofform.toLowerCase() === "image" ||
    ReqObj.Form[event.initialdata.tmpId].typeofform.toLowerCase() === "video"
  ) {
    event.initialdata.obj.insertIntoProdMediaHtml(
      event,
      "prodimage",
      "#t" +
      event.initialdata.tmpId +
      "_slider" +
      event.mediakey["startingindex"]
    );
    if (
      (isSet(event.initialdata.step) && event.initialdata.step === "0L") ||
      pdpenqImage(event.initialdata.tmpId)
    )
      event.initialdata.obj.insertIntoProdMediaSliderHtml(
        event,
        "#t" +
        event.initialdata.tmpId +
        "_slider" +
        event.mediakey["startingindex"]
      );
  } else event.initialdata.obj.insertIntoProdMediaHtml(event, "prodimage");

  if (
    isOtherEnq(event.initialdata.tmpId) &&
    isSet(event.initialdata.step) &&
    event.initialdata.step === "0L"
  )
    event.initialdata.obj.prodChangeArrowUI(event);
};
LeftSide.prototype.insertIntoProdMediaHtml = function (
  event,
  todo,
  onclickelement
) {
  var tmpId = event.initialdata.tmpId;
  if (
    event.mediakey.key[event.mediakey.startingindex].type.toLowerCase() ===
    "video" && isSet(event.mediakey.key[event.mediakey.startingindex].vidUrl) && event.mediakey.key[event.mediakey.startingindex].vidUrl !== '' &&
    (event.initialdata.step === "0L" || pdpenqImage(tmpId))
  ) {
    if (pdpenqImage(tmpId)) {
      $("#t" + tmpId + "parent_iframe").html(
        imageButtonUi(tmpId, "left", "video") +
        $("#t" + tmpId + "parent_iframe").html() +
        imageButtonUi(tmpId, "right", "video")
      );
      $("#t" + tmpId + "parent_iframe")
        .css({ width: img_height + "px" })
        .addClass("bepr eIfvm");
    }
    $("t" + event.initialdata.tmpId + "_prodVideo").on(
      "load",
      youtubeVideo({
        data: {
          tmpId: event.initialdata.tmpId,
          vidUrl: event.mediakey.key[event.mediakey.startingindex].vidUrl,
        },
      })
    );
    $("#t" + event.initialdata.tmpId + "_prodimg").addClass("bedsnone");
    $(onclickelement).addClass("active");
    $(onclickelement).siblings().removeClass("active");
    moveSlider(event);
    event.initialdata.obj.handleCSS(event, todo, onclickelement);
  } else {
    var tmpId = event.initialdata.tmpId;
    if (
      event.mediakey.key[event.mediakey.startingindex].type.toLowerCase() ===
      "video"
    ) {
      $("#t" + event.initialdata.tmpId + "_prodimg").html(
        imageButtonUi(tmpId, "left") +
        new ReqImage().displayHtml(
          event.initialdata.tmpId,
          [createImageObject(event)],
          0,
          true
        ) +
        imageButtonUi(tmpId, "right")
      );
    } else
      $("#t" + event.initialdata.tmpId + "_prodimg").html(
        imageButtonUi(tmpId, "left") +
        new ReqImage().displayHtml(
          event.initialdata.tmpId,
          event.mediakey.key,
          event.mediakey.startingindex,
          true
        ) +
        imageButtonUi(tmpId, "right")
      );
    event.initialdata.obj.handleCSS(event, todo, onclickelement);
    $("#t" + event.initialdata.tmpId + "parent_iframe")
      .html(
        "<div id='t" +
        event.initialdata.tmpId +
        "_prodVideo' class='fL bepr bdr1 pdpHg'></div>"
      )
      .addClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_prodimg").removeClass("bedsnone");
    if (pdpenqImage(tmpId) || direnqImage(tmpId)) {
      var img_height = $("#t" + tmpId + "_mcont").height();
      $("#t" + tmpId + "_zoomimage").css({ "max-width": img_height + "px" });
    }
  }
};
function moveSlider(event) {
  var len = event.mediakey.key.length - 1;
  var calno = len - event.mediakey.startingindex + 1;
  var loop = event.mediakey.startingindex;
  var resol = window.innerWidth;
  var maxImage = resol >= 1920 ? 6 : resol >= 1500 ? 5 : 4;
  if (pdpenqImage(event.initialdata.tmpId)) maxImage = 5;
  if (len >= maxImage && len - event.mediakey.startingindex + 1 < maxImage) {
    calno = maxImage - calno;
    loop = loop - calno;
  }
  var i = 0;
  if (len + 1 > maxImage) {
    for (i = 0; i < len + 1; i++) {
      if (i < loop || i > loop + maxImage - 1)
        $("#t" + event.initialdata.tmpId + "_slider" + i).addClass("bedsnone");
      else
        $("#t" + event.initialdata.tmpId + "_slider" + i).removeClass(
          "bedsnone"
        );
    }
  }
}


function imageButtonUi(tmpId, todo, type) {
  var append = type === "video" ? "Video" : "";
  return !pdpenqImage(tmpId)
    ? ""
    : todo === "left"
      ? returnButton(
        "t" + tmpId,
        "_beleft" + append,
        '<svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.41705 8.16111L3.0635 8.51467L3.41705 8.86822L9.6635 15.1147L8.48527 16.2929L0.707048 8.51467L8.48527 0.736439L9.6635 1.91466L3.41705 8.16111Z" fill="#707070" stroke="black"/></svg>',
        "eqleft"
      )
      : returnButton(
        "t" + tmpId,
        "_beright" + append,
        '<svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.58295 8.16111L7.9365 8.51467L7.58295 8.86822L1.3365 15.1147L2.51473 16.2929L10.293 8.51467L2.51473 0.736439L1.3365 1.91466L7.58295 8.16111Z" fill="#707070" stroke="black"/></svg>',
        "eqright"
      );
}


function createImageObject(event) {
  return {
    type: "image",
    displayImage: event.mediakey.directvalues.displayImage,
    zoomImage: event.mediakey.directvalues.zoomImage,
    vidUrl: "",
  };
}
/*-----------------------------------------------------------------SLIDER UI-------------------------------------------------------------- */

LeftSide.prototype.insertIntoProdMediaSliderHtml = function (
  event,
  onclickelement
) {
  var len = event.mediakey.key.length; // array length calculated
  var dispimage = "";
  for (var i = 0; i < len; i++) {
    $("#t" + event.initialdata.tmpId + "_imgslider").append(
      returnSpan("t" + event.initialdata.tmpId, "_slider" + i, "", "eqitem", "")
    );
    if (
      event.mediakey.key[i].type.toLowerCase() === "video" &&
      event.mediakey.key[i].vidUrl !== ""
    ) {
      if (
        event.mediakey.directvalues.type.toLowerCase() === "video" &&
        isSet(onclickelement) &&
        onclickelement !== ""
      )
        dispimage = new ReqImage().displayHtml(
          event.initialdata.tmpId,
          event.mediakey.key,
          i,
          false,
          "vidslider"
        );
      else
        dispimage = new ReqImage().displayHtml(
          event.initialdata.tmpId,
          event.mediakey.key,
          i,
          false
        );
      $("#t" + event.initialdata.tmpId + "_slider" + i).html(
        "<span class='yTub'><i class='yTubImg'></i></span>" + dispimage
      );
    } else {
      dispimage = new ReqImage().displayHtml(
        event.initialdata.tmpId,
        event.mediakey.key,
        i,
        false
      );
      $("#t" + event.initialdata.tmpId + "_slider" + i).html(dispimage);
    }
    var data = event;
    $("#t" + event.initialdata.tmpId + "_slider" + i).on(
      "click",
      {
        receivingData: data,
        which: i,
        tochangeelement: "#t" + data.initialdata.tmpId + "_prodimg",
        onclickelement: "#t" + event.initialdata.tmpId + "_slider" + i,
        cttype: event.mediakey.key[i].type,
        vidUrl: event.mediakey.key[i].vidUrl,
      },
      insertHtml
    );
    $("#t" + event.initialdata.tmpId + "_slider" + i).on(
      "hover",
      {
        receivingData: data,
        which: i,
        tochangeelement: "#t" + data.initialdata.tmpId + "_prodimg",
        onclickelement: "#t" + event.initialdata.tmpId + "_slider" + i,
        cttype: event.mediakey.key[i].type,
        vidUrl: event.mediakey.key[i].vidUrl,
      },
      insertHtml
    );
  }

  event.initialdata.obj.handleCSS(
    event,
    "slider",
    "#t" + event.initialdata.tmpId + "_slider" + event.mediakey.startingindex
  );
};

function insertHtml(event) {
  removeYTLoader(event.data.receivingData.initialdata.tmpId);
  if (event.data.cttype.toLowerCase() === "video") {
    if (
      isSet($(event.data.onclickelement)) &&
      !$(event.data.onclickelement).hasClass("active")
    ) {
      var tmpId = event.data.receivingData.initialdata.tmpId;
      if (pdpenqImage(tmpId)) {
        $("#t" + tmpId + "parent_iframe").html(
          imageButtonUi(tmpId, "left", "video") +
          $("#t0901parent_iframe").html() +
          imageButtonUi(tmpId, "right", "video")
        );
        $("#t" + tmpId + "parent_iframe")
          .css({ width: img_height + "px" })
          .addClass("bepr eIfvm");
      }
      youtubeVideo({
        data: {
          tmpId: event.data.receivingData.initialdata.tmpId,
          vidUrl: event.data.vidUrl,
        },
      });
    }
  } else {
    var tmpId = event.data.receivingData.initialdata.tmpId;
    $("#t" + event.data.receivingData.initialdata.tmpId + "parent_iframe")
      .html(
        "<div id='t" +
        event.data.receivingData.initialdata.tmpId +
        "_prodVideo' class='fL bepr bdr1 pdpHg'></div>"
      )
      .addClass("bedsnone");
    $(
      "#t" + event.data.receivingData.initialdata.tmpId + "_prodimg"
    ).removeClass("bedsnone");
    $(event.data.tochangeelement).html(
      imageButtonUi(tmpId, "left") +
      new ReqImage().displayHtml(
        event.data.receivingData.initialdata.tmpId,
        event.data.receivingData.mediakey.key,
        event.data.which,
        true
      ) +
      imageButtonUi(tmpId, "right")
    );
    if (pdpenqImage(tmpId) || direnqImage(tmpId)) {
      var img_height = $("#t" + tmpId + "_mcont").height();
      $("#t" + tmpId + "_zoomimage").css({ "max-width": img_height + "px" });
    }
    event.data.receivingData.mediakey.startingindex = event.data.which;
  }
  var type = event.type !== "click" ? 1 : 1;
  event.data.receivingData["cttype"] =
    event.data.receivingData.mediakey.key[event.data.which].type;
  event.data.receivingData.initialdata.obj.handleCSS(
    event.data.receivingData,
    "slider",
    event.data.onclickelement,
    type
  );
  if (event.type === "click") {
    tofireImgEnqTracking(
      event.data.receivingData.initialdata.tmpId,
      "slider_clicked"
    );
  }
  // on click change to handle arrows as well as css
}

/*-------------------------------------------------------------------KEYS------------------------------------------------------------------ */

LeftSide.prototype.manipulatingKeys = function (event) {
  var values = {
    // direct values
    type: ReqObj.Form[event.initialdata.tmpId].typeofform.toLowerCase(), // image/video else others - to change -  property end
    displayImage: isSet(ReqObj.Form[event.initialdata.tmpId].displayImage)
      ? ReqObj.Form[event.initialdata.tmpId].displayImage
      : "",
    zoomImage: isSet(ReqObj.Form[event.initialdata.tmpId].zoomImage)
      ? ReqObj.Form[event.initialdata.tmpId].zoomImage
      : "",
    vidUrl: isSet(ReqObj.Form[event.initialdata.tmpId].vidUrl)
      ? ReqObj.Form[event.initialdata.tmpId].vidUrl
      : "",
  };

  var multipleImageVideo =
    ReqObj.Form[event.initialdata.tmpId].multipleImageVideo; // the key passed to show multiple images
  var key =
    isSet(multipleImageVideo) && multipleImageVideo !== ""
      ? this.returnImageArray(multipleImageVideo)
      : []; // key is created in both cases
  // is key is empty , using values key would be formed !
  if (key.length === 0) {
    // array is empty !
    if (values.type === "video") {
      if (values.vidUrl !== "") key.push(values);
      else {
        var imageObj = this.createImageObject(
          "image",
          values.displayImage,
          values.zoomImage,
          ""
        );
        if (
          imageObj.type === "image" &&
          (imageObj.displayImage !== "" || imageObj.zoomImage !== "")
        )
          key.push(imageObj);
      }
    }
    if (
      values.type.toLowerCase() !== "video" &&
      (values.displayImage !== "" || values.zoomImage !== "")
    )
      key.push(values);
    if (key.length === 0) {
      var tmpObj = {
        type: values["type"],
        displayImage: "",
        zoomImage: "",
        vidUrl: "",
        defaultcase: true,
      };
      key.push(tmpObj);
    }
  }

  return {
    key: key,
    directvalues: values,
  }; // no need of ctaType we have typeofforms
};

LeftSide.prototype.returnImageArray = function (key) {
  if (key instanceof Array) {
    var len = key.length;
    var arr = [];
    for (var i = 0; i < len; i++) {
      // changing to len
      // for (var i = 0; i < 6; i++) { // changing to 6
      if (key[i] instanceof Object) {
        if (key[i].type.toLowerCase() === "video") {
          if (key[i].vidUrl !== "") arr.push(key[i]);
          else {
            var imageObj = this.createImageObject(
              "image",
              key[i].displayImage,
              key[i].zoomImage,
              ""
            );
            if (
              imageObj.type.toLowerCase() === "image" &&
              (imageObj.displayImage !== "" || imageObj.zoomImage !== "")
            )
              arr.push(imageObj);
          }
        }
        if (
          key[i].type.toLowerCase() !== "video" &&
          (key[i].displayImage !== "" || key[i].zoomImage !== "")
        ) {
          arr.push(key[i]);
        }
      }
    }
    return arr;
  } else {
    return [];
  }
};

LeftSide.prototype.createImageObject = function (
  type,
  displayImage,
  zoomImage,
  vidUrl
) {
  return {
    type: type.toLowerCase(),
    displayImage: displayImage,
    zoomImage: zoomImage,
    vidUrl: vidUrl,
  };
};

LeftSide.prototype.getStartingIndex = function (event) {
  if (
    event.initialdata["typeofform"] === "image" ||
    event.initialdata["typeofform"] === "video"
  ) {
    var len = event.mediakey.key.length;
    for (var i = 0; i < len; i++) {
      if (
        event.mediakey.key[i]["type"].toLowerCase() ===
        event.mediakey.directvalues["type"].toLowerCase()
      ) {
        if (
          (event.mediakey.key[i]["displayImage"] ===
            event.mediakey.directvalues["displayImage"] &&
            event.mediakey.key[i]["displayImage"] !== "" &&
            event.mediakey.directvalues["displayImage"] !== "") ||
          (event.mediakey.key[i]["zoomImage"] ===
            event.mediakey.directvalues["zoomImage"] &&
            event.mediakey.directvalues["zoomImage"] !== "" &&
            event.mediakey.key[i]["zoomImage"] !== "") ||
          (event.mediakey.key[i]["vidUrl"] ===
            event.mediakey.directvalues["vidUrl"] &&
            event.mediakey.key[i]["vidUrl"] !== "" &&
            event.mediakey.directvalues["vidUrl"] !== "")
        ) {
          return i;
        }
      }
    }
    return 0;
  }
  return 0;
};

/*-------------------------------------------------------------ARROWS------------------------------------------------------------------ */
LeftSide.prototype.prodMediaArrowUI = function (event) {
  if (event.mediakey["togglearrow"] === true) {
    var len = event.mediakey.key.length;
    var index = event.mediakey.startingindex;
    var resol = window.innerWidth;
    var maxImage = resol >= 1920 ? 6 : resol >= 1500 ? 5 : 4;
    event.cttype =
      isSet(index) && index != -1 && isSet(event.mediakey.key[index].type)
        ? event.mediakey.key[index].type
        : "";
    if (pdpenqImage(event.initialdata.tmpId)) maxImage = 5;
    if (
      len === 1 ||
      (!pdpenqImage(event.initialdata.tmpId) && len < maxImage + 1)
    )
      hideAllArrows(event);
    else if (len > maxImage || pdpenqImage(event.initialdata.tmpId)) {
      if (pdpenqImage(event.initialdata.tmpId) && len < 5) {
        var height = $("#t" + event.initialdata.tmpId + "_imgslider").height();
        $("#t" + event.initialdata.tmpId + "_slideout").height(height);
        $("#t" + event.initialdata.tmpId + "_slide").height(height + 35);
      }
      if (index === 0 || index == 0) {
        showHideArrow(event, "down");
      } else if (index === len - 1 || index == len - 1) {
        showHideArrow(event, "up");
      } else if (index > 0 && index < len - 1) {
        showHideArrow(event, "between");
      }
    }
  }
};

LeftSide.prototype.toToggleArrow = function (event) {
  return event.initialdata["typeofform"] === "image" ||
    event.initialdata["typeofform"] === "video"
    ? true
    : false;
};

LeftSide.prototype.prodChangeArrowUI = function (event) {
  var receivingData = event;
  if (
    isSet(ReqObj.Form[event.initialdata.tmpId].next) &&
    typeof ReqObj.Form[event.initialdata.tmpId].next === "function"
  ) {
    ReqObj.Form[event.initialdata.tmpId].nextProdArrow = true;
    $("#t" + event.initialdata.tmpId + "_nextbtn")
      .removeClass("bedsnone")
      .off("click")
      .on(
        "click",
        {
          tmpId: receivingData.initialdata.tmpId,
          todo: "next",
        },
        changeProd
      );
    $("#t" + event.initialdata.tmpId + "_prebtn").addClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_nextprediv").removeClass("bedsnone");
  }
  if (
    isSet(ReqObj.Form[event.initialdata.tmpId].prev) &&
    typeof ReqObj.Form[event.initialdata.tmpId].prev === "function"
  ) {
    ReqObj.Form[event.initialdata.tmpId].prevProdArrow = true;
    $("#t" + event.initialdata.tmpId + "_prebtn")
      .removeClass("bedsnone")
      .off("click")
      .on(
        "click",
        {
          tmpId: receivingData.initialdata.tmpId,
          todo: "prev",
        },
        changeProd
      );
    $("#t" + event.initialdata.tmpId + "_nextbtn").addClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_nextprediv").removeClass("bedsnone");
  }
  if (
    isSet(ReqObj.Form[event.initialdata.tmpId].next) &&
    typeof ReqObj.Form[event.initialdata.tmpId].prev === "function" &&
    isSet(ReqObj.Form[event.initialdata.tmpId].next) &&
    typeof ReqObj.Form[event.initialdata.tmpId].next === "function"
  ) {
    ReqObj.Form[event.initialdata.tmpId].nextProdArrow = true;
    ReqObj.Form[event.initialdata.tmpId].prevProdArrow = true;
    $("#t" + event.initialdata.tmpId + "_prebtn")
      .removeClass("bedsnone")
      .off("click")
      .on(
        "click",
        {
          tmpId: receivingData.initialdata.tmpId,
          todo: "prev",
        },
        changeProd
      );
    $("#t" + event.initialdata.tmpId + "_nextbtn")
      .removeClass("bedsnone")
      .off("click")
      .on(
        "click",
        {
          tmpId: receivingData.initialdata.tmpId,
          todo: "next",
        },
        changeProd
      );
    $("#t" + event.initialdata.tmpId + "_nextprediv").removeClass("bedsnone");
  }
};

/*--------------------------------------------------------------ARROW UI and EVENTS--------------------------------------------------------- */
function hideAllArrows(event, type) {
  var clickeve = event;
  var append =
    isSet(clickeve.cttype) && clickeve.cttype.toLowerCase() === "video"
      ? "Video"
      : "";
  $("#t" + event.initialdata.tmpId + "_bedown").addClass("bedsnone");
  $("#t" + event.initialdata.tmpId + "_beup").addClass("bedsnone");
  $("#t" + event.initialdata.tmpId + "_beright" + append).addClass("bedsnone");
  $("#t" + event.initialdata.tmpId + "_beleft" + append).addClass("bedsnone");
  $("#t" + event.initialdata.tmpId + "_berightVideo").addClass("bedsnone");
  $("#t" + event.initialdata.tmpId + "_beleftVideo").addClass("bedsnone");
}

function showHideArrow(clickeve, todo) {
  var append =
    isSet(clickeve.cttype) && clickeve.cttype.toLowerCase() === "video"
      ? "Video"
      : "";
  $("#t" + clickeve.initialdata.tmpId + "_beup").removeClass("bedsnone");
  $("#t" + clickeve.initialdata.tmpId + "_beleft" + append).removeClass(
    "bedsnone"
  );

  if (todo === "down") {
    $("#t" + clickeve.initialdata.tmpId + "_bedown")
      .removeClass("bedsnone")
      .off("click")
      .on(
        "click",
        {
          receivingData: clickeve,
        },
        moveDownImage
      );
    $("#t" + clickeve.initialdata.tmpId + "_beright" + append)
      .off("click")
      .on(
        "click",
        {
          receivingData: clickeve,
        },
        moveDownImage
      );
    $("#t" + clickeve.initialdata.tmpId + "_beup").addClass("bedsnone");
    $("#t" + clickeve.initialdata.tmpId + "_beleft" + append).addClass(
      "bedsnone"
    );
  } else if (todo === "up") {
    $("#t" + clickeve.initialdata.tmpId + "_beup")
      .removeClass("bedsnone")
      .off("click")
      .on(
        "click",
        {
          receivingData: clickeve,
        },
        moveUpImage
      );
    $("#t" + clickeve.initialdata.tmpId + "_beleft" + append)
      .off("click")
      .on(
        "click",
        {
          receivingData: clickeve,
        },
        moveUpImage
      );
    $("#t" + clickeve.initialdata.tmpId + "_bedown").addClass("bedsnone");
    $("#t" + clickeve.initialdata.tmpId + "_beright" + append).addClass(
      "bedsnone"
    );
  } else if (todo === "between") {
    $("#t" + clickeve.initialdata.tmpId + "_beright" + append)
      .off("click")
      .on(
        "click",
        {
          receivingData: clickeve,
        },
        moveDownImage
      );
    $("#t" + clickeve.initialdata.tmpId + "_bedown")
      .removeClass("bedsnone")
      .off("click")
      .on(
        "click",
        {
          receivingData: clickeve,
        },
        moveDownImage
      );
    $("#t" + clickeve.initialdata.tmpId + "_beleft" + append)
      .off("click")
      .on(
        "click",
        {
          receivingData: clickeve,
        },
        moveUpImage
      );
    $("#t" + clickeve.initialdata.tmpId + "_beup")
      .removeClass("bedsnone")
      .off("click")
      .on(
        "click",
        {
          receivingData: clickeve,
        },
        moveUpImage
      );
  }
}

function moveUpImage(event) {
  //var items = $("imgslider.item-im");
  var key = event.data.receivingData.mediakey.key;
  var index = event.data.receivingData.mediakey.startingindex;
  var formType =
    ReqObj.Form[
      event.data.receivingData.initialdata.tmpId
    ].formType.toLowerCase() === "enq"
      ? "Send Enquiry"
      : "Post Buy Leads";
  //var from = index + 1;
  index = index - 1;
  //blenqGATracking(formType, ReqObj.Form[event.data.receivingData.initialdata.tmpId].ctaName + "|next_" + from + "to" + index + "|total-" + event.data.receivingData.mediakey.key.length, getEventLabel(), 0, event.data.receivingData.initialdata.tmpId);
  var tmpObj = returnUpdatedData(index, event);
  tmpObj.index = index; //
  event.data.receivingData.mediakey.startingindex = index;
  if (tmpObj.type.toLowerCase() === "video") {
    event.data.receivingData["cttype"] = "video";
    event.data.receivingData["vidUrl"] = tmpObj["vidUrl"];
    $(
      "#t" + event.data.receivingData.initialdata.tmpId + "_imglodr"
    ).removeClass("bedsnone");
  } else {
    event.data.receivingData["cttype"] = "image";
    $("#t" + event.data.receivingData.initialdata.tmpId + "_imglodr").addClass(
      "bedsnone"
    );
  }
  event.data.receivingData.initialdata.obj.insertIntoProdMediaHtml(
    event.data.receivingData,
    "slider",
    "#t" + event.data.receivingData.initialdata.tmpId + "_slider" + index
  );
}

function moveDownImage(event) {
  //var items = $("imgslider.item-im");
  var key = event.data.receivingData.mediakey.key;
  var index = parseInt(event.data.receivingData.mediakey.startingindex);
  var formType =
    ReqObj.Form[event.data.receivingData.initialdata.tmpId].formType === "Enq"
      ? "Send Enquiry"
      : "Post Buy Leads";
  var len = event.data.receivingData.mediakey.key.length;
  index = index + 1;
  //blenqGATracking(formType, ReqObj.Form[event.data.receivingData.initialdata.tmpId].ctaName + "|prev_" + from + "to" + index + "|total-" + event.data.receivingData.mediakey.key.length, getEventLabel(), 0, event.data.receivingData.initialdata.tmpId);
  var tmpObj = returnUpdatedData(index, event);
  tmpObj.index = index;
  event.data.receivingData.mediakey.startingindex = index;
  if (tmpObj.type.toLowerCase() === "video") {
    event.data.receivingData["cttype"] = "video";
    event.data.receivingData["vidUrl"] = tmpObj["vidUrl"];
    $(
      "#t" + event.data.receivingData.initialdata.tmpId + "_imglodr"
    ).removeClass("bedsnone");
  } else {
    $("#t" + event.data.receivingData.initialdata.tmpId + "_imglodr").addClass(
      "bedsnone"
    );
    event.data.receivingData["cttype"] = "image";
  }
  event.data.receivingData.initialdata.obj.insertIntoProdMediaHtml(
    event.data.receivingData,
    "slider",
    "#t" + event.data.receivingData.initialdata.tmpId + "_slider" + index
  );
}

function returnUpdatedData(index, event) {
  return event.data.receivingData.mediakey.key[index];
}
FormSeq.prototype.Checkforparent = function (objectName) {
  if (isSet(objectName) && isSet(ReqObj.Form[tmpId].UiArray)) {
    for (var i = 0; i < ReqObj.Form[tmpId].UiArray.length; i++) {
      for (var j = 0; j < ReqObj.Form[tmpId].UiArray[i].length; j++) {
        if (
          ConstructorName(
            ReqObj.Form[tmpId].UiArray[i][j].Obj
          ).toLowerCase() === objectName
        )
          return [i, j];
      }
    }
  }

  return false;
};

function ValidateObj(array, counter, tmpId, event) {
  var isError = false;
  ReqObj.Form[tmpId].validateArray = [];
  if (isSet(array) && isSet(counter) && isSet(array[counter] && isSet(tmpId))) {
    if (isSSB(tmpId)) ReqObj.Form[tmpId].errorStatus = false;
    for (var i = 0; i < array[counter].length; i++) {
      if (typeof array[counter][i].Obj.validate === "function") {
        if (!array[counter][i].Obj.validate(tmpId, event)) {
          isError = true;
          if (isSSB(tmpId)) ReqObj.Form[tmpId].errorStatus = true;
        }
      } else {
        isError = false;
      }
    }
  }
  if (isSSB(tmpId)) isError = ReqObj.Form[tmpId].errorStatus;
  return isError;
}

function BackBtn(CurrentUiArray, tmpId) {
  if (isSet(CurrentUiArray)) {
    for (var i = 0; i < CurrentUiArray.length; i++) {
      if (isSet(CurrentUiArray[i].Obj)) {
        if (typeof CurrentUiArray[i].Obj.BackButton === "function") {
          CurrentUiArray[i].Obj.BackButton(tmpId);
        }
      }
    }
  }
}

FormSeq.prototype.Back = function (tmpId) {
  var that = this;
  ReqObj.Form[tmpId].IsbackClicked = true;

  // var backCounter = "";
  // questionTransition(ReqObj.Form[tmpId].formType, tmpId, 1);
  if (this.OnCloseCounter > -1) {
    // backCounter = this.OnCloseCounter + 1 + this.StepCounter + 1;

    if (this.OnCloseCounter > 0) {
      var CurrentUiArray = ReqObj.Form[tmpId].OnCloseArray;
      var counter = this.OnCloseCounter;
    } else {
      var CurrentUiArray = ReqObj.Form[tmpId].UiArray;
      var counter = this.StepCounter;
      ReqObj.Form[tmpId].OnCloseStep = false;
    }
    this.OnCloseCounter -= 1;
  } else {
    // backCounter = this.StepCounter + 1;
    this.StepCounter -= 1;
    var CurrentUiArray = ReqObj.Form[tmpId].UiArray;
    var counter = this.StepCounter;
  }
  BackBtn(CurrentUiArray[counter], tmpId);

  if (isSet(CurrentUiArray)) {
    if (counter < CurrentUiArray.length) {
      if (IsChatbl(tmpId))
        //setTimeout(function () {
        that.ShowStep(tmpId); // }, 350);
      else that.ShowStep(tmpId);
    }
  }
};

FormSeq.prototype.MoveToNext = function (tmpId) {
  if (isSet(tmpId)) {
    var array = [];
    var that = this;
    if (that.OnCloseCounter > -1)
      array = this.OnCloseServiceArray[this.OnCloseCounter];
    else array = this.FullServiceArray[this.StepCounter];

    var htmlRemoved = false;

    if (isSet(array)) {
      for (var i = 0; i < array.length; i++) {
        if (isSet(array[i].pre) && array[i].pre.length > 0 && !htmlRemoved) {
          htmlRemoved = true;
          if (isSet(array[i].pre)) {
            //ReqObj.Form[tmpId].LastPrePost = array[i].pre;
            for (var j = 0; j < array[i].pre.length; j++) {
              PrePostService(array[i].pre[j], tmpId);
            }
            array[i].pre = [];
          }
        }
      }
    }
    //if html is removed then don't show loader
    //else show loader
    return !htmlRemoved;
  }
  return false;
};

function CheckforUpdate(stepNumber, tmpId) {
  if (stepNumber === 0 && IsBlEnqProdNameChanged(tmpId)) {
    RefactorFormArrays(tmpId);
  } else {
  }
}
FormSeq.prototype.ClassForTracking = function (tmpId, event) {
  var CurrentArray = [];
  var counter = "";
  var stepNumber = 0;
  if (this.OnCloseCounter > -1) {
    counter = this.OnCloseCounter;
    CurrentArray = ReqObj.Form[tmpId].OnCloseArray;
    stepNumber = this.StepCounter + 1 + (this.OnCloseCounter + 1);
  } else {
    counter = this.StepCounter;
    CurrentArray = ReqObj.Form[tmpId].UiArray;
    stepNumber = this.StepCounter + 1;
  }

  var ClassesforSubmit = "SubmitStep|" + stepNumber + "|";
  if (
    isSet(event.toElement) &&
    event.toElement.id === "t" + tmpId + "_changeProduct"
  ) {
    ClassesforSubmit += "ProductNameQuestion";
  } else if (isSet(CurrentArray)) {
    if (isSet(CurrentArray[counter])) {
      for (var i = 0; i < CurrentArray[counter].length; i++) {
        if (i < CurrentArray[counter].length && i > 0) ClassesforSubmit += "-";
        ClassesforSubmit += ConstructorName(CurrentArray[counter][i].Obj);
      }
    }
  }
  return ClassesforSubmit;
};

FormSeq.prototype.FireTracking = function (tmpId, event) {
  if (parseInt(this.OnCloseCounter, 10) > -1)
    stepNumber =
      parseInt(this.StepCounter, 10) +
      1 +
      (parseInt(this.OnCloseCounter, 10) + 1);
  else stepNumber = parseInt(this.StepCounter, 10) + 1;

  if (
    binaryArraySearch(ReqObj.Form[tmpId].TrackedSubmitSteps, stepNumber) === -1
  ) {
    var ClassesforSubmitTracking = this.ClassForTracking(tmpId, event);
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    var toappend = "";
    if (IsChatbl(tmpId)) {
      var trimvalue =
        isSet(event.target) && isSet(event.target.textContent)
          ? event.target.textContent
          : "";
      if (trimVal(trimvalue.substring(0, 5)).toLowerCase() === "next") {
        /* Don't remove substring OPTMIZE THE CODE -- change the logic later*/
        toappend = trimvalue.substring(0, 5).trim();
      } else if (trimVal(trimvalue).toLowerCase() === "skip") {
        toappend = isSet(event.target) ? event.target.textContent.trim() : "";
      } else if (trimvalue.substring(0, 3).toLowerCase() === "yes") {
        /* use class instead of text */
        toappend = isSet(event.target) ? event.target.textContent.trim() : "";
      } else if (trimvalue.substring(0, 6).toLowerCase() === "change") {
        toappend = isSet(event.target) ? event.target.textContent.trim() : "";
      } else toappend = "";

      if (toappend !== "") {
        toappend = "|" + toappend;
      }
    }
    blenqGATracking(form_type, ClassesforSubmitTracking + toappend, getEventLabel(), 0, tmpId);
    ReqObj.Form[tmpId].TrackedSubmitSteps.push(stepNumber);
  }
};

FormSeq.prototype.FireQtUtTracking = function (tmpId, eventt) {
  var ftype = ReqObj.Form[tmpId].formType.toLowerCase();
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  if (
    ((IsChatbl(tmpId) && ReqObj.Form[tmpId].cName.qtracking) ||
      ((ftype === "bl" || ftype === "enq") &&
        $("#t" + tmpId + "qut_id").is(":visible"))) &&
    isSet(ReqObj.Form[tmpId].qtUtQuesPresent) &&
    ReqObj.Form[tmpId].qtUtQuesPresent === true
  ) {
    if (IsChatbl(tmpId)) ReqObj.Form[tmpId].cName.qtracking--;
    var quant = ReqObj.Form[tmpId].qtutchange.quantity;
    var unit = ReqObj.Form[tmpId].qtutchange.unit;
    var tracking = "quantity:" + quant + "|" + "unit:" + unit;
    ReqObj.Form[tmpId].noSampling = true;
    blenqGATracking(form_type, tracking, getEventLabel(), 0, tmpId);
  }
};
FormSeq.prototype.FormSubmit = function (tmpId, event) {
  ReqObj.Form[tmpId].currentclassCount = 0;
  ReqObj.Form[tmpId].toFireEscTracking = true;
  if (IsChatBLInline(tmpId)) {
    isChatBlSequenceUpdated = true;
  }
  $("#t" + tmpId + "spc_submit_button")
    .addClass("bedsnone")
    .html("");
  $("#t" + tmpId + "submit_wrapper").removeClass("bedsnone");
  $("#t" + tmpId + "_question").removeClass("mvta");
  removeYTLoader(tmpId);
  HideSuggester();
  if (isSet(tmpId)) {
    ReqObj.Form[tmpId].PrevAnsPrint = true;
    CheckforUpdate(this.StepCounter, tmpId);
    ReqObj.Form[tmpId].NotSure = false;
    ReqObj.Form[tmpId].IsbackClicked = false;
    var that = this;
    var CurrentArray = [];
    var counter = "";
    var ServiceArray = [];

    if (this.OnCloseCounter > -1) {
      counter = this.OnCloseCounter;
      CurrentArray = ReqObj.Form[tmpId].OnCloseArray;
      ServiceArray = this.OnCloseServiceArray[counter];
    } else {
      counter = this.StepCounter;
      CurrentArray = ReqObj.Form[tmpId].UiArray;
      ServiceArray = this.FullServiceArray[counter];
    }
    if (
      ReqObj.Form[tmpId].cName.fs === true &&
      typeof $("#t" + tmpId + "_cname").val() !== "undefined" &&
      $("#t" + tmpId + "_cname").val() !== ""
    ) {
      ReqObj.Form[tmpId].companyName = $("#t" + tmpId + "_cname").val();
      MoreDetailService(tmpId, "CompanyName");
    }
    if (
      isSSB(tmpId) &&
      ReqObj.Form[tmpId].url.html === true &&
      typeof $("#t" + tmpId + "_urlname").val() !== "undefined" &&
      $("#t" + tmpId + "_urlname").val() !== ""
    ) {
      var validate = validation.isURLValid(
        $("#t" + tmpId + "_urlname").val(),
        tmpId
      );
      ReqObj.Form[tmpId].url.name = $("#t" + tmpId + "_urlname").val();
      if (validate["type"] === true) MoreDetailService(tmpId, "URL");
      else {
        $("#t" + tmpId + "_urlname" + "_errmsg")
          .html(validate["error"])
          .removeClass("bedsnone");
        $("#t" + tmpId + "_mdtlerror").removeClass("bedsnone");
        $("#t" + tmpId + "_url").addClass("pr");
        $("#t" + tmpId + "_url_lbl").addClass("redc");
        isnewSSB(tmpId)
          ? $("#t" + tmpId + "_urlname").addClass("nb-erbrd")
          : $("#t" + tmpId + "_urlname").addClass("mb-erbrd");
        return;
      }
    }
    if (isEcomProduct(tmpId)) {
      blenqGATracking("Ecom", "Buy_Now", ReqObj.Form[tmpId].rcvGlid, 1, tmpId);
    }
    var validateResult = ValidateObj(CurrentArray, counter, tmpId, event);

    // view mob ab test submit tracking
    if (!validateResult)
    {
      pnsSubmitTrack(tmpId);        //inactive changes
      if(isInactiveBL(tmpId) && !ispdp(tmpId) && modIdf.toLowerCase() != "pdfim" ){ 
        inactiveblSubmitTrack(tmpId);
      }
    }

    if (!validateResult && tmpId.substring(0, 2) == "01")
    $("#t" + tmpId + "_enrichform_maindiv").addClass("srchms");

    //next->submit
    if (
      !validateResult &&
      EnqPopupDIR(tmpId) &&
      $("#yajaca").css("display") == "block" &&
      isSet(ReqObj.Form[tmpId].msgFromOtp) &&
      ReqObj.Form[tmpId].msgFromOtp != 1
    ) {
      $("#yajaca").hide();
      if (
        $(
          "#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input"
        ).hasClass("toConv")
      ) {
        $(
          "#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input"
        ).removeClass("toConv");
      }
    }

    if (
      !validateResult &&
      EnqPopupDIR(tmpId) &&
      $("#yajaca").css("display") == "block" &&
      ReqObj.Form[tmpId].isSkipOTPClicked === true &&
      ReqObj.Form[tmpId].msgFromOtp == 1
    ) {
      hideClickMsg(tmpId);
    }

    if (validateResult && isEcomProduct(tmpId)) {
      CloseForm(tmpId);
      window.open(ReqObj.Form[tmpId].ecomUrl, "_blank");
    } else if (
      (isSet(event.target) && event.target.id === "t" + tmpId + "_skipOTP") ||
      !validateResult
    ) {
      if (isSSB(tmpId) && callSSBnextStep(tmpId)) {
        FormSeq.prototype.BlSsbNext(tmpId);
        return;
      }
      // if (!ValidateObj(CurrentArray, counter, tmpId, event)) {

      if (IsChatbl(tmpId)) removechatblerror(tmpId);
      if (this.StepCounter === 0 && isImageVidEnq(tmpId))
        tofireImgEnqTracking(tmpId, "Submit_Step_1");
      this.FireTracking(tmpId, event);
      this.FireQtUtTracking(tmpId, event);
      // if (ReqObj.Form[tmpId].currentScreen=="UserLogin") {
      //     flagDropdTracking(tmpId);
      // }
      ReqObj.Form[tmpId].noSampling = false;
      // var ClassesforSubmitTracking = this.ClassForTracking();
      for (var i = 0; i < CurrentArray[counter].length; i++) {
        if (typeof CurrentArray[counter][i].Obj.SaveDetails === "function")
          CurrentArray[counter][i].Obj.SaveDetails(tmpId, event);
      }

      ReqObj.Form[tmpId].flags.ImEqgl = isSecondBlEnq(tmpId);
      var ScreenType = CounterScreenId(tmpId, 1);
      var elId = ScreenType.elid;

      if (
        tmpId.substring(0, 2) !== "09" &&
        !Bl01(tmpId) &&
        !Bl04(tmpId) &&
        ShowOtp() &&
        !ReqObj.Form[tmpId].flags.isOtpShown &&
        ReqObj.Form[tmpId].flags.ImEqgl &&
        that.StepCounter === 0
      ) {
        //get  array till val is not generation
        //remaining service should be in remaining service key
        this.MoveToNextPost(tmpId);
        ReqObj.Form[tmpId].RemainingService = ServiceArray;
      } else {
        formatServices(ServiceArray, tmpId);
      }
      if (!ElExists(elId)) {
        var isq_data = {
          modid: modIdf,
          ofr_id: ReqObj.Form[tmpId].generationId,
          b_response: ReqObj.Form[tmpId].optionsValue,
          q_desc: ReqObj.Form[tmpId].questionsDesc,
          UPDIP: "India",
          UPDURL: window.document.URL.toString().substr(0, 450),
          UPDIP_COUNTRY: "India",
          UPDATESCREEN: "DESKTOP ENQUIRY FORM",
          glusr_id: usercookie.getParameterValue(imeshExist(), "glid"),
          q_id: ReqObj.Form[tmpId].questionsId,
          b_id: ReqObj.Form[tmpId].optionsId,
        };
        if (
          isImageVidEnq(tmpId) &&
          ReqObj.ImageVideoIsqSeq === true &&
          ReqObj.Form[tmpId].FormSequence.StepCounter === 0
        )
          updateUserFilledIsq(tmpId, isq_data);

        if (imeshExist() && isEcomProduct(tmpId)) {
          CloseForm(tmpId);
          callToIdentifiedQ(tmpId, "");
          window.open(ReqObj.Form[tmpId].ecomUrl, "_blank");
        } else {
          var ShowLoader = this.MoveToNext(tmpId);
        }
      } else {
        var isOnCloseStep = false;
        if (ScreenType.type === "onCloseScreen") {
          isOnCloseStep = true;
        }
        this.getStep(tmpId, isOnCloseStep);
        RemovePost(ReqObj.Form[tmpId].ServiceSequence);
      }

      ServiceSequenceHit(tmpId, ShowLoader);
      isSet(event.target) && event.target.id === "t" + tmpId + "_skipOTP"
        ? this.MoveToNextPost(tmpId)
        : "";
    } else if (event.target === "google") {
      if (imeshExist() != "") callToIdentifiedQ(tmpId, "");
    } else {
      IsChatBLInline(tmpId)
        ? $("#t" + tmpId + "_submit").removeAttr("disabled")
        : "";
      if (isSSB(tmpId)) {
        var id = ReqObj.Form[tmpId].validateArray[0];
        var error_id = ReqObj.Form[tmpId].errorDivId;
        $("#" + id).focus();
        $("#" + id).addClass("nb-erbrd");
        $("#" + error_id).removeClass("bedsnone");
      }
      return false;
    }
  }

  return true;
};
function tofireImgEnqTracking(tmpId, msg) {
  var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  blenqGATracking(form_type, msg, getEventLabel(), 1, tmpId);
}

FormSeq.prototype.MoveToNextPost = function (tmpId) {
  if (isSet(tmpId)) {
    var array = [];
    var that = this;
    if (that.OnCloseCounter > -1)
      array = this.OnCloseServiceArray[this.OnCloseCounter];
    else array = this.FullServiceArray[this.StepCounter];

    var htmlRemoved = false;

    if (isSet(array)) {
      for (var i = 0; i < array.length; i++) {
        if (isSet(array[i].post) && array[i].post.length > 0 && !htmlRemoved) {
          htmlRemoved = true;
          if (isSet(array[i].post)) {
            //ReqObj.Form[tmpId].LastPrePost = array[i].pre;
            for (var j = 0; j < array[i].post.length; j++) {
              PrePostService(array[i].post[j], tmpId);
            }
            array[i].post = [];
          }
        }
      }
    }
    //if html is removed then don't show loader
    //else show loader
    return !htmlRemoved;
  }
  return false;
};

function RemovePost(array) {
  if (isSet(array)) {
    {
      for (var e = 0; e < array.length; e++) {
        if (isSet(array[e].post) && array[e].post.length > 0) {
          array[e].post = [];
          return;
        } else {
          RemovePost(array[e].cb);
        }
      }
    }
  }
}
var slotx="";
var renone;
function showAdInact(tmpId){
  imgtm.push({
    event: "IMEvent-NI",
    eventCategory: "Post Buy Leads",
    eventAction: "ad",
    eventLabel: getEventLabel()
  });
  renone=true;
  $("#t" + tmpId + "_mcont").css({
    display: "none",
  });
  $("#t" + tmpId + "_adinact").remove();
  $("#t" + tmpId + "_bewrapper").append("<div id=t" + tmpId + "_adinact class='adinactive bedsnone'>");
  if($("#t" + tmpId + "_clsx").length == 0 )
  $("#t" + tmpId + "_adinact").append("<div id=t" + tmpId + "_clsx class='be-cls'>");
  $("#t" + tmpId + "_clsx").html('X');
  $("#t" + tmpId + "_clsx").off("click").on("click", function (event) {
    $("#t" + tmpId + "_adinact").remove();
    $("#t" + tmpId + "_bewrapper").css({
      display: "none",
    });
    resumeBgScroll();
  });
  if($("#div-gpt-ad-1683872046457-0").length == 0 )
  $("#t" + tmpId + "_adinact").append("<div id='div-gpt-ad-1683872046457-0' style='padding: 25px;'>"); // style='min-width: 300px; min-height: 250px;'>");
  window.googletag = window.googletag || {
    cmd: [],
  };
  if (slotx === "") {
    slotx = googletag.defineSlot('/3047175/Inactive_BL_Interstitial',  [[320, 480], [400, 300], [480, 320], [580, 400], [750, 300]], 'div-gpt-ad-1683872046457-0');
  }
  slotx.addService(googletag.pubads());
  googletag.pubads().addEventListener("slotRenderEnded", (event) => {
    const slot = event.slot;
    var element =  document.getElementById('google_ads_iframe_/3047175/Inactive_BL_Interstitial_0');
    if(event.advertiserId && renone && typeof(element) != 'undefined' && element != null){
      $("#t" + tmpId + "_adinact").removeClass("bedsnone").css({
        display: "flex",
      });
      $("#t" + tmpId + "_bewrapper").removeClass("bedsnone").css({
        display: "block",
      });
      stopBgScroll();
      $(document).on('click', function (e) {
        if ($(e.target).closest("#t" + tmpId + "_adinact").length === 0) {
          $("#t" + tmpId + "_clsx").click();
        }
    });
      renone=false;
    }
  });
  googletag.pubads().refresh([slotx]);
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();
  googletag.display("div-gpt-ad-1683872046457-0");    
}
function ReqImage(key, index) {
  //POPUPCHATBL
  this.displayImage = "";
  this.zoomImage = "";
  this.defaultimg = "";
  this.vidUrl = "";
  this.ctaType = "";
  this.funcToCall = "";
  this.html = "";
  this.src = "";
  this.type = "";
  this.className = "ReqImage";
}
ReqImage.prototype.extractValues = function (key, index) {
  if (isSet(key) && isSet(index)) {
    this.displayImage =
      isSet(key[index].displayImage) && key[index].displayImage !== ""
        ? key[index].displayImage
        : "";
    this.zoomImage =
      isSet(key[index].zoomImage) && key[index].zoomImage !== ""
        ? key[index].zoomImage
        : "";
    this.vidUrl =
      isSet(key[index].vidUrl) && key[index].vidUrl !== ""
        ? key[index].vidUrl
        : "";
    this.ctaType =
      isSet(key[index].type) && key[index].type !== "" ? key[index].type : "";
  }
};
ReqImage.prototype.displayHtml = function (
  tmpId,
  key,
  index,
  zoomImageLoad,
  imgslider
) {
  this.extractValues(key, index, zoomImageLoad);
  this.defaultimg = getDefaultImage(tmpId);
  this.funcToCall =
    typeof ReqObj.Form[tmpId].formType !== "undefined"
      ? ReqObj.Form[tmpId].formType
      : "";
  this.RDatatype =
    typeof ReqObj.Form[tmpId].modrefType !== "undefined"
      ? ReqObj.Form[tmpId].modrefType
      : "";

  if (this.ctaType.toLowerCase() === "video") {
    /* video */ if (isSet(imgslider) && imgslider === "vidslider") {
    } else
      $("#t" + tmpId + "parent_iframe").html(
        "<div id='t" + tmpId + "_prodVideo' class='belft bepr pdpHg'></div>"
      );

    if (isIframeApiloaded === 0) loadScript();
    return this.showVideo(tmpId, zoomImageLoad);
  } else {
    return this.showImage(tmpId, zoomImageLoad);
  }
};
ReqImage.prototype.defaultEvents = function () {
  this.handleUI();
};
ReqImage.prototype.showImage = function (tmpId, zoomImageLoad) {
  if (this.funcToCall.toLowerCase() === "enq") {   //new gmp 

    if(getMorePh(tmpId) && !ispdp(tmpId) && modIdf.toLowerCase()!='fcp' && new RegExp("noimage").test(this.displayImage)){
      return getDefaultImage(tmpId);
    }

    else if (this.displayImage !== "") {
      if (
        isSet(ReqObj.Form[tmpId].multipleImageVideo) &&
        ReqObj.Form[tmpId].multipleImageVideo !== ""
      ) {
        this.html += this.getImage(
          "t" + tmpId + "_dispimage",
          "igTh",
          this.displayImage
        );
      } else {
        this.html += this.getImage(
          "t" + tmpId + "_dispimage",
          "",
          this.displayImage
        );
      }
      if (isSet(zoomImageLoad) && zoomImageLoad === true) {
        this.html +=
          this.zoomImage !== ""
            ? this.getImage("t" + tmpId + "_zoomimage", "", this.zoomImage)
            : "";
      }
    } else if (this.zoomImage !== "") {
      this.html += this.getImage(
        "t" + tmpId + "_zoomimage",
        "",
        this.zoomImage
      );
    } else {
      return getDefaultImage(tmpId);
    }

    //if (isSet(zoomImageLoad) && zoomImageLoad === true) this.html += "<span class='be-blrEnqimg'  style='background-image: url(" + this.src + ");'></span>";
  }
  if (this.funcToCall.toLowerCase() === "bl" || IsChatbl(tmpId)) {
    if (this.displayImage !== "") {
      this.html += this.getImage(
        "t" + tmpId + "_dispimage",
        "",
        this.displayImage
      );
    } else {
      return getDefaultImage(tmpId);
    }
    this.html +=
      "<span class='be-blrprdimg'  style='background-image: url(" +
      this.src +
      ");'></span>";
  }

  return this.html;
};

ReqImage.prototype.getImage = function (id, cls, src) {
  this.src = src;
  return "<img id='" + id + "' class='" + cls + "'  src='" + src + "'" + "/>";
};
ReqImage.prototype.showVideo = function (tmpId) {
  var that = this;
  if (
    isSet(ReqObj.Form[tmpId].multipleImageVideo) &&
    ReqObj.Form[tmpId].multipleImageVideo !== ""
  ) {
    that.html += '<span class="eqytubg"><i class="eqytub eqpsimg"></i></span>';
    that.html += that.getImage(
      "t" + tmpId + "_dispimage",
      "igTh",
      that.displayImage
    );
    return that.html;
  } else {
    if (that.vidUrl !== "undefined" && that.vidUrl !== "") {
      youtubeVideo({
        data: {
          tmpId: tmpId,
          vidUrl: that.vidUrl,
        },
      });
    } else {
      return that.showImage(tmpId);
    }
  }
};
function CheckForUpdate() {
  var imeshcookie = imeshExist();
  for (var key in ReqObj.UserDetail) {
    if (
      ReqObj.UserDetail[key] !== usercookie.getParameterValue(imeshcookie, key)
    )
      return true;
  }
  return false;
}

function RightSide(tmpId, typeofform, step) {
  this.defaultActions(tmpId, typeofform, step);
}

RightSide.prototype.defaultActions = function (tmpId, typeofform, step) {
  this.initialiseRightSection(tmpId, typeofform, step + "R");
  this.handleUI({
    initialdata: {
      step: step + "R",
      tmpId: tmpId,
      typeofform: typeofform,
    },
  });
  this.handleStructure({
    initialdata: {
      tmpId: tmpId,
      typeofform: typeofform,
      obj: this,
      step: step + "R",
    },
  });
  if (isImageVidEnq(tmpId))
    attachEvents({
      initialdata: {
        tmpId: tmpId,
        step: step + "R",
      },
    });
};

RightSide.prototype.handleStructure = function (event) {
  event["datavalue"] = prodDetailsData(event);
  prodDetailsHtmlInsertion(event);
};

RightSide.prototype.initialiseRightSection = function (
  tmpId,
  typeofform,
  step
) {
  var that = this;
  var sectionnumber = section_number[typeofform]["right"];
  for (var i = 1; i <= sectionnumber; i++) {
    var section_name = section_class[typeofform]["right"][i];
    that.getHtml(tmpId, typeofform, section_name.name, step);
  }
};

RightSide.prototype.getHtml = function (tmpId, typeofform, section_name, step) {
  var that = this;
  switch (section_name) {
    case "heading":
      $("#t" + tmpId + "_hdg").html("");
      break;
    case "rightproddetails":
      $("#t" + tmpId + "_rightproddetails").html(
        getProdDetailsHtml(tmpId, typeofform, step)
      );
      break;
    case "questionouterwrapper":
      $("#t" + tmpId + "_questionouterwrapper").html(
        that.getQuestionOuterWrapperHtml(tmpId)
      );
      break;
  }
};

RightSide.prototype.handleUI = function (event) {
  if ( (event.initialdata.typeofform === "image" || event.initialdata.typeofform === "video") && event.initialdata.step === "0R") {
    if (ReqObj.Form[event.initialdata.tmpId].formType.toLowerCase() !== "bl")
      $("#t" + event.initialdata.tmpId + "_cls").html("");
    else $("#t" + event.initialdata.tmpId + "_cls").html("X");
    $("#t" + event.initialdata.tmpId + "_hdg").addClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_rightproddetails").removeClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_tCond").addClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_byrinfo").addClass("bedsnone");
  } else {
    if (ReqObj.Form[event.initialdata.tmpId].formType.toLowerCase() !== "bl")
      $("#t" + event.initialdata.tmpId + "_cls").html("");
    else $("#t" + event.initialdata.tmpId + "_cls").html("X");
    if (imeshExist() !== "" && !isInactiveBL(event.initialdata.tmpId))
      $("#t" + event.initialdata.tmpId + "_leftR").removeClass("lftMgn");
    $("#t" + event.initialdata.tmpId + "_hdg").removeClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_rightproddetails").addClass("bedsnone");

    $("#t" + event.initialdata.tmpId + "_tCond").addClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_byrinfo").addClass("bedsnone");
  }
  $("#t" + event.initialdata.tmpId + "_question").removeClass("bedsnone");
  $("#t" + event.initialdata.tmpId + "_fBtn").removeClass("bedsnone");
  if (ReqObj.Form[event.initialdata.tmpId].formType.toLowerCase() === "bl")
    $("#t" + event.initialdata.tmpId + "_byrinfo").addClass("bleqb");
  else $("#t" + event.initialdata.tmpId + "_byrinfo").removeClass("bleqb");
  if ( !( pdpenqImage(event.initialdata.tmpId) ) ) {
    $("#t" + event.initialdata.tmpId + "_questionouterwrapper").removeClass().addClass("bemlsec");
    if ($("#t" + event.initialdata.tmpId + "_hdg").hasClass("e_hdg")) {
      // var hd = $("#t"+event.initialdata.tmpId+"_hdg").detach();
      //     $("#t"+event.initialdata.tmpId+"_rightsection").prepend(hd);
      //     $("#t"+event.initialdata.tmpId+"_hdg").removeClass().addClass("be-hdg");
      $("#t" + event.initialdata.tmpId + "_hdg").remove();
    }
  }
  if (isInactiveBL(event.initialdata.tmpId)) {
    $("#t" + event.initialdata.tmpId + "_hdg").removeClass().addClass("be-hdg be-hdg1");
    let bemlsec = (isInactiveBL(event.initialdata.tmpId) && ReqObj.Form[event.initialdata.tmpId].currentclassCount === 0) ? "mt0" : "bemlsec";
    $("#t" + event.initialdata.tmpId + "_questionouterwrapper").removeClass().addClass(bemlsec);
  }
};

RightSide.prototype.getQuestionOuterWrapperHtml = function (tmpId) {
  var html = "";
  //returnContainer("#t" + tmpId, "_question", containerclass, datarole, divtext, style)
  var qcls = (isInactiveBL(tmpId) && ReqObj.Form[tmpId].currentclassCount === 0)  ? "" : "bemlsec";
  html += returnContainer("t" + tmpId, "_question", qcls, "", "", "");
  html += "<form name='t" + tmpId + "_bl_form' onsubmit='return false' id='t" + tmpId + "_bl_form' method='post' class='bepr bemnh'>";
  html += "</div>";

  html += returnContainer("t" + tmpId, "_clear", "beclr", "", "", "");
  html += "</div>";

  html += returnContainer("t" + tmpId, "_tCond", "bedsnone", "", "", ""); //tcond clickable
  var vabaseline = direnqImage(tmpId) ? ' vabaseline bedblk ' : ' bevT bedblk';
  html += "<input type='checkbox' class='bemt2' id='t" + tmpId + "_tCondCheckBox'><span class= '" + vabaseline + "'><label class='t" + tmpId + "_test1'>I agree to the</label> <a href='https://www.indiamart.com/terms-of-use.html' target='_blank' class='betrmt'>terms</a> <label class='t" + tmpId + "_test1'>and</label> <a href='https://www.indiamart.com/privacy-policy.html' target='_blank' class='betrmt'>privacy policy</a></span>";
  html += "</div>";

  html += "<div id='t" + tmpId + "submit_wrapper'>";

  html += returnSubmitInnerHtml(tmpId);

  if (isEcomProduct(tmpId)) {
    html += "<span class='befs11'>* You will be redirected to 3rd party webstore<span>";
  }
  // if (isPnsEnq(tmpId))  // click away message on pns form
  //   html +=
  //     "<div id='yajaca' style='margin-top: 3px;font-size: 12px;color: #00a699;font-style: italic'>You are just a click away to get quotes</div>";

  if (EnqPopupDIR(tmpId)) {
    ReqObj.Form[tmpId].toShowMsg = 1; //next->submit
    html += "<div id='yajaca' style='display:none;'>You are just a click away to get quotes</div>";
  }
  html += "</div>";

  // html += returnContainer("t" + tmpId, "_byrinfo", "befs14 beinfo bedsnone", "", "", "");
  // html += "</div>";

  html += returnContainer( "t" + tmpId, "_belodr", "belodrbg bedsnone", "", "", "");
  html += "<div class='blloader'></div>";
  html += "</div>";

  return html;
};


function getYTVideo(VideObj) {
  if (
    YT.loading === 1 &&
    YT.loaded === 1 &&
    !(
      isSet($("#t" + VideObj.data.tmpId + "_prodVideo")[0].src) &&
      $("#t" + VideObj.data.tmpId + "_prodVideo")[0].src !== ""
    )
  ) {
    isIframeApiloaded = 2;
    new_player = new YT.Player("t" + VideObj.data.tmpId + "_prodVideo", {
      width: "500",
      height: "500",
      playerVars: {
        rel: 0,
        autoplay: 1,
      },
      videoId: VideObj.data.vidUrl,
      events: {
        onReady: function (event) {
          removeYTLoader(VideObj.data.tmpId);
          $("#t" + VideObj.data.tmpId + "parent_iframe").removeClass("cbl_vh");
        },
        onStateChange: function (event) {
          $("#t" + VideObj.data.tmpId + "_imglodr").addClass("bedsnone");

          if (
            isSet(new_player) &&
            typeof new_player.getPlayerState === "function" &&
            new_player.getPlayerState() === 0
          ) {
            new_player.seekTo(0);
            new_player.stopVideo();
          }
        },
      },
    });
    $("#t" + VideObj.data.tmpId + "parent_iframe")
      .removeClass("bedsnone")
      .addClass("cbl_vh");
    $("#t" + VideObj.data.tmpId + "_prodimg").addClass("bedsnone");
    // if(!pdpenqImage(VideObj.data.tmpId))ReqObj.Form[VideObj.data.tmpId].videoLoaded = true;
  }
}

function youtubeVideo(VideObj) {
  addYTLoader(VideObj.data["tmpId"], "left");

  if (typeof YT === "undefined" && isIframeApiloaded === 0) {
    loadScript();
    window.onYouTubeIframeAPIReady = function () {
      youtubeVideo(VideObj);
    };
  } else if (
    (typeof YT === "undefined" && isIframeApiloaded === 1) ||
    (YT.loading === 1 && YT.loaded === 0) ||
    isIframeApiloaded === 0
  ) {
    loadScript();
    window.onYouTubeIframeAPIReady = function () {
      youtubeVideo(VideObj);
    };
  } else if (YT.loading === 1 && YT.loaded === 1) {
    isIframeApiloaded = 2;
    getYTVideo(VideObj);
  }
}

/* Class End Here */
function IsBlEnqProdNameChanged(tmpId) {
  if (isSet(tmpId)) {
    if (
      $("#t" + tmpId + "prodtitle").length &&
      $("#t" + tmpId + "prodtitle").val() !== "" &&
      $("#t" + tmpId + "prodtitle").val() !== "Enter product/service name" &&
      ReqObj.Form[tmpId].prodName !== $("#t" + tmpId + "prodtitle").val()
    ) {
      ReqObj.Form[tmpId].populate = false;
      return true;
    } else {
      ReqObj.Form[tmpId].populate = true;
      return false;
    }
  }
}

function UserVerification() {
  this.otpCount = 0;
  this.imeshCookie = "";
  this.v4iilexCookie =
    ""; /* first otp request yahi bhejdo to avoid any delays */
  this.verifyhtml = "";
  this.className = "UserVerification";
  this.UserVerificationHtmlObj = {
    Label: "",
    UserInput: "",
    OuterWrapper: "",
    ClosingWrapper: "",
  };
  this.UserVerificationHtmlObjArray = [];
  this.otp = "";
  this.message = "";
}
UserVerification.prototype.displayAnswer = function (tmpId) {
  if (
    !(ShowEmail() && EmailAfterReqbox(tmpId)) &&
    (ReqObj.Form[tmpId].isSkipOTPClicked === true ||
      ReqObj.Form[tmpId].showotpstep === 1)
  )
    return;
  return !IsChatbl(tmpId)
    ? [
      ConversationCenterWrapper(
        tmpId,
        "Mobile No. Verified" + "<span class='chat-tickbx1'></span>"
      ),
    ]
    : [
      ConversationCenterWrapper(
        tmpId,
        "<div class = 'txt_area cbl_brd1 cbl_clr1'><svg class='cbl_ok cbl_field'><use xlink:href='#t" +
        tmpId +
        "cblcheck'></use></svg>" +
        "Thank You for confirming your requirement" +
        "</div>"
      ),
    ];
};
UserVerification.prototype.SaveDetails = function (tmpId) {
  if (IsChatbl(tmpId)) ReqObj.Form[tmpId].UserInputs["OTP"] = this.otp;
};

UserVerification.prototype.toUpdate = function (tmpId) {
  if (usercookie.getParameterValue(imeshExist(), "uv") === "V") return true;
  return false;
};

UserVerification.prototype.displayHtml = function (tmpId) {
  /* common for all classes , defaultEvents() common for all. */
  if (isSet(tmpId)) {
    $("#t" + tmpId + "_byrinfo").addClass("bedsnone");
    if (!IsChatbl(tmpId)) $("#t" + tmpId + "_hdg").addClass("bedsnone");
    ReqObj.Form[tmpId].flags.isOtpShown = true;
    if (IsChatbl(tmpId)) {
      return [this.verifyhtmlLabel, this.verifyhtmlInput];
    }
    if (isOtherEnq(tmpId)) {
      ReqObj.Form[tmpId].calledClassName[
        ReqObj.Form[tmpId].FormSequence.StepCounter
      ] = this.className;
    }
    return [this.verifyhtml];
  }
};

UserVerification.prototype.EventIfScreenPresent = function (tmpId) {
  /* common for all classes , defaultEvents() common for all. */
  if (isSet(tmpId)) {
    $("#t" + tmpId + "_byrinfo").addClass("bedsnone");
    if (!IsChatbl(tmpId)) $("#t" + tmpId + "_hdg").addClass("bedsnone");
    if (isOtherEnq(tmpId)) {
      this.handleHeading(tmpId);
      ButtonNameUI("isq", tmpId);
      ButtonNameUI("userverification", tmpId);
    }
  }
};

UserVerification.prototype.handleHeading = function (tmpId) {
  if (!isSSB(tmpId) && !isBl(tmpId))
    $("#t" + tmpId + "OtpMainHeading").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
};

UserVerification.prototype.handleButton = function (tmpId) {
  var data = { showBackBtn: 0 };
  ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId, data);
};

UserVerification.prototype.addHtmlObjToArray = function (htmlObj) {
  this.UserVerificationHtmlObjArray.push(htmlObj);
};

UserVerification.prototype.hasHtml = function (UserVerificationObject) {
  if (isSet(UserVerificationObject)) {
    var tmpId = UserVerificationObject.tmpId;
    var plapresent = null;
    try{
      plapresent = sessionStorage.getItem("plaWidget-" + ReqObj.Form[tmpId].mcatId);
    }
    catch(err){
      plapresent = null;
    }
    if (
      !isSSB(tmpId) &&
      currentISO() === "IN" && 
      !IsChatbl(tmpId) &&
      isSet(ReqObj.Form[tmpId].mcatId) &&
      parseInt(ReqObj.Form[tmpId].mcatId, 10) !== -1 &&
      ReqObj.Form[tmpId].mcatId != "" &&
      !isSet(plapresent)
    ) {
      plawidget(tmpId);
    }

    this.message =
      isEnq(tmpId) || isBl(tmpId)
        ? UserVerificationObject.message
        : isSet(UserVerificationObject.message)
          ? UserVerificationObject.message.message
          : "";
    this.cookies();
    if (!isSSB(tmpId))
      this.sendOtp({
        data: {
          type: 1,
          x: this,
          id: "",
          resend: 0,
          tmpId: tmpId,
        },
      });
    var change_iso = currentISO();

    if (change_iso === "IN") this.addHtmlObjToArray(this.getOTPHtml(tmpId));
    // var UserVerificationSuffixObj = {
    //   "suffix": "_otpbox",
    //   "class": ""
    // };
    if (!IsChatbl(tmpId)) {
      var UserVerificationSuffixOuterHtml = isSSB(tmpId)
        ? otpOuterHtml(tmpId)
        : "<div  id='t" + tmpId + "_otpbox'>";
      var UserVerificationSuffixClosingHtml = "</div>";
      var UserVerificationSuffixHtmlObj = {
        SuffixOuterHtml: UserVerificationSuffixOuterHtml,
        SuffixClosingHtml: UserVerificationSuffixClosingHtml,
        suffix: "_otpbox",
      };
      this.verifyhtml =
        change_iso === "IN"
          ? MakeWrapper(
            [this.UserVerificationHtmlObjArray],
            tmpId,
            UserVerificationSuffixHtmlObj,
            ""
          )
          : "";
    } else {
      this.verifyhtmlLabel =
        change_iso === "IN"
          ? MakeWrapper(
            [this.UserVerificationHtmlObjArray],
            tmpId,
            WrapperObj(
              "<div  id='t" + tmpId + "_otpbox' class = 'cbl_ques cbl_vh'>",
              "</div>",
              "_otpbox"
            ),
            "ques"
          )
          : "";
      this.verifyhtmlInput =
        change_iso === "IN"
          ? MakeWrapper(
            [this.UserVerificationHtmlObjArray],
            tmpId,
            WrapperObj(
              "<div  id='t" +
              tmpId +
              "_otpbox' class ='cbl_dtls cbl_otp cbl_df cbl_aic t" +
              tmpId +
              "_userInput cbl_br10 dn'>",
              "</div>",
              "_otpbox"
            ),
            "input"
          )
          : "";
      this.verifyhtml =
        change_iso === "IN" ? this.verifyhtmlLabel + this.verifyhtmlInput : "";
    }
    UserVerificationObject.that.NumberofClassCalled -= 1;
    if (this.verifyhtml !== "") {
      AttachObject(UserVerificationObject.object, tmpId);
      if (isSet(UserVerificationObject.AfterService)) {
        for (var i = 0; i < UserVerificationObject.AfterService.length; i++) {
          UserVerificationObject.that.MakeSeq(
            UserVerificationObject.AfterService[i],
            tmpId
          );
        }
      }
      if (UserVerificationObject.that.NumberofClassCalled === 0) {
        makeFinalSeq(UserVerificationObject, tmpId);
      }
    } else {
      if (UserVerificationObject.hasFallback) {
        CreateSeq(UserVerificationObject.FallbackObj);
      }
    }
    //next->submit
    if (
      $(
        "#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input"
      ).hasClass("toConv")
    ) {
      $(
        "#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input"
      ).addClass("subLeft");
    }

    if (this.verifyhtml !== "") return true;
    else return false;
  }
};
UserVerification.prototype.defaultEvents = function (tmpId) {
  // $("#yajaca").hide(); // click away message on pns form
  if (isSet(tmpId)) {
    //next->submit
    //hide pns unidentified user
    if (isPnsEnq(tmpId) ) $(".pnsEnq").show();
    if (EnqPopupDIR(tmpId) && ReqObj.Form[tmpId].toShowMsg) {
      $("#yajaca").show();
      $( "#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input" ).addClass("toConv subLeft");
      $("input.toConv").attr("value", "Submit");
      $("#noOtp").addClass("mrtCh");
      $("#yajaca").addClass("yaLeft");
      ReqObj.Form[tmpId].toShowMsg = 0;
      ReqObj.Form[tmpId].msgFromOtp = 1;
    }
    //mob track
    if(currentISO() === "IN"){
      if(isSet(ReqObj.Form[tmpId].mobEntered) && ReqObj.Form[tmpId].mobEntered==1){    
        mobEnteredTrack(tmpId,"OTP");       
      }
    }     

    if (IsChatbl(tmpId)) ChatblfooterAns(tmpId);
    this.handleEvents(this, tmpId);
    this.handleUI(tmpId, "focus", "", "");
    if (isOtherEnq(tmpId)) {
      this.handleHeading(tmpId);
    }
  }
};
UserVerification.prototype.validate = function (tmpId) {
  if (isSet(tmpId)) {
    $("#verifyerrotpdiv").addClass("bedsnone");
    if ((isSSB(tmpId) || isEnq(tmpId)) && ReqObj.Form[tmpId].isSkipOTPClicked) {
      return true;
    }
    var authkey = $("#t" + tmpId + "bl_enqOtp1").val() + $("#t" + tmpId + "bl_enqOtp2").val() + $("#t" + tmpId + "bl_enqOtp3").val() + $("#t" + tmpId + "bl_enqOtp4").val();
    this.otp = authkey;
    if ( !isOTPBoxHidden(tmpId) && ((isSet(authkey) && authkey === "") || authkey.length !== 4) ) {
      this.handleUI(tmpId, "verificationFailed", "beforeRequest", authkey);
      return false;
    }
    return true;
  }
};
UserVerification.prototype.onSubmit = function (tmpId, userVerificationObj) {
  var authkey =
    $("#t" + tmpId + "bl_enqOtp1").val() +
    $("#t" + tmpId + "bl_enqOtp2").val() +
    $("#t" + tmpId + "bl_enqOtp3").val() +
    $("#t" + tmpId + "bl_enqOtp4").val();
  if (
    ReqObj.Form[tmpId].isSkipOTPClicked === true &&
    !isSSB(tmpId) &&
    !isEnq(tmpId)
  ) {
    ReqObj.Form[tmpId].ServiceSequence.pop();
    return;
  }

  if (
    !(checkblockedUser() && imeshExist() === "") &&
    isSSB(tmpId) &&
    toRemoveOTP(tmpId)
  )
    return;

  this.otp = authkey;
  if (
    (IsChatbl(tmpId) && this.message !== "second") ||
    (isSet(authkey) && authkey.length === 4) ||
    (ReqObj.Form[tmpId].isSkipOTPClicked === true &&
      (isSSB(tmpId) || isEnq(tmpId)))
  ) {
    if (
      (isSet(authkey) && authkey.length === 4) ||
      (ReqObj.Form[tmpId].isSkipOTPClicked === true &&
        (isSSB(tmpId) || isEnq(tmpId)))
    ) {
      var verifyObject = new PreAjax("UserVerification", tmpId);
      this.validateOtp({
        data: {
          type: 2,
          userVerificationObject: this,
          obj: verifyObject,
          authKey: authkey,
          tmpId: tmpId,
        },
      });
    }
  }
};
UserVerification.prototype.cookies = function () {
  this.imeshCookie = imeshExist();
  this.v4iilexCookie = usercookie.getCookie("v4iilex");
};
UserVerification.prototype.returnOTPInputs = function (formType, tmpId) {
  var inputclass = IsChatbl(tmpId) || isSSB(tmpId) ? "" : "bloptin";
  var otphtml = "";
  otphtml += returnInput(
    "t" + tmpId,
    "bl_enqOtp1",
    "text",
    "",
    "",
    inputclass,
    "",
    "",
    "1"
  );
  otphtml += returnInput(
    "t" + tmpId,
    "bl_enqOtp2",
    "text",
    "",
    "",
    inputclass,
    "",
    "",
    "1"
  );
  otphtml += returnInput(
    "t" + tmpId,
    "bl_enqOtp3",
    "text",
    "",
    "",
    inputclass,
    "",
    "",
    "1"
  );
  otphtml += returnInput(
    "t" + tmpId,
    "bl_enqOtp4",
    "text",
    "",
    "",
    inputclass,
    "",
    "",
    "1"
  );

  return otphtml;
};
UserVerification.prototype.returnErrorDiv = function (tmpId, errorclass) {
  var otphtml = "";
  otphtml += returnContainer(
    "t" + tmpId,
    "verifyerrotpdiv",
    errorclass,
    "",
    ""
  );
  otphtml += returnSpan("t" + tmpId, "verify_err", "", "");
  otphtml += "</div>";
  return otphtml;
};
UserVerification.prototype.getOTPInput = function (tmpId, formType) {
  var that = this;
  var otphtml = "";
  if (IsChatbl(tmpId)) {
    otphtml += returnContainer("", "", "cbl_otpgrp cbl_w1", "", "");
    otphtml +=
      "<label>Enter One Time Password</label>" +
      that.returnOTPInputs(formType, tmpId) +
      "</div>";
    var otpclass = "bltperor bedsnone betxtc";
    otphtml += that.returnErrorDiv(tmpId, otpclass);
    var classtosend = "cbl_brd1 cbl_clr1 cbl_cp";
    otphtml += returnContainer("", "", "cbl_resend ", "", "");
    if (
      !ReqObj.Form[tmpId].isotpSkipped &&
      this.message.toLowerCase() !== "second" &&
      !checkblockedUser()
    ) {
      ReqObj.Form[tmpId].isotpSkipped = true;
      otphtml += returnButton("t" + tmpId, "_skipOTP", "Skip", classtosend);
    }
    classtosend += IsChatBLInline(tmpId) ? " rsndOtp cbl_pa" : "";
    otphtml += returnButton(
      "t" + tmpId,
      "resendOtp",
      "Resend OTP",
      classtosend
    );
    otphtml += "</div>";
  } else {
    //ReqObj.UserDetail["blusrdtl"] = {"blkUsr" : 1, "blk_mb" : event.data.obj.username, "blk_iso": "91"};
    var imeshcookie = imeshExist();
    var PhoneNumber =
      checkblockedUser() && im_issExist() === ""
        ? "+" +
        ReqObj.UserDetail.blusrdtl.blk_iso +
        "-" +
        ReqObj.UserDetail.blusrdtl.blk_mb
        : "+" +
        usercookie.getParameterValue(imeshcookie, "phcc") +
        "-" +
        usercookie.getParameterValue(imeshcookie, "mb1");
    if (isSSB(tmpId))
      otphtml = OTPuserInput(tmpId, formType, that, PhoneNumber);
    else {
      otphtml += returnContainer("", "", "m15 blml20 bepr beopt", "", "");
      if (!isOtherEnq(tmpId))
        otphtml += '<i class="blnewform_sprit blicotp beflt"></i>';
      if (isOtherEnq(tmpId))
        otphtml += returnContainer("", "", "bedblk  bevT", "", "");
      else
        otphtml += returnContainer("", "", "bedblk bemt15 beml10 bevT", "", "");
      otphtml += that.returnOTPInputs(formType, tmpId);
      var cls = "bltperor bedsnone";
      otphtml += that.returnErrorDiv(tmpId, cls);
      // if (isOtherEnq(tmpId)) { otphtml += returnContainer("t" + tmpId, "_helpmsg", "eqOtphlp", "", "Sent to mobile " + returnSpan("t" + tmpId, "_phone", PhoneNumber, "", "") + " via " + returnSpan("t" + tmpId, "_sms", "SMS", "", ""), ""); otphtml += "</div>"; }
      otphtml += '</div ></div ><div class="beclr"></div>';
      otphtml = isOtherEnq(tmpId) //next->submit
        ? otphtml +
        '<div id="noOtp" class="beotpSW betxtc">Did not receive  OTP?'
        : otphtml +
        '<div id="noOtp" class="beotpSW betxtc">Did not receive  OTP? ';
      var clsin = Enq04(tmpId) || isBl(tmpId) ? "beml10" : "";
      otphtml += returnButton(
        "t" + tmpId,
        "resendOtp",
        "Resend",
        "blSmst " + clsin
      );
      if (toAddSkipOtp(tmpId, this.message)) {
        otphtml += returnButton(
          "t" + tmpId,
          "_skipOTP",
          "Skip",
          clsin,
          "top: -98px;background-color: transparent;border: none;color: #999;cursor:pointer"
        );
      }
      var cls = "blgrcl1 disp-inl f_bold cbl_vh";
      otphtml += returnSpan("", "", "", cls);
      //otphtml += returnButton("t" + tmpId, "bl_enqMisscall", "Get OTP on Call", "blSmst");
      otphtml +=
        '</div><div class="blLdot blMt25 relt beotpSW" style="display: none"><span class="blgrcl disp - inl f_bold">OR</span></div> <div class="bloptS beotpSW" style="display: none"><span class="blotp">Give us a missed call on : <strong class="blMsN">098-9981-0984</strong></span></div></div >';
    }
  }
  that.UserVerificationHtmlObj["UserInput"] = otphtml;
};

UserVerification.prototype.getOTPLabel = function (tmpId, formType) {
  var that = this;
  var otphtml = "";
  var imeshcookie = imeshExist();
  var PhoneNumber = checkblockedUser()
    ? "+" +
    ReqObj.UserDetail.blusrdtl.blk_iso +
    "-" +
    ReqObj.UserDetail.blusrdtl.blk_mb
    : "+" +
    usercookie.getParameterValue(imeshcookie, "phcc") +
    "-" +
    usercookie.getParameterValue(imeshcookie, "mb1");
  if (IsChatbl(tmpId)) {
    if (this.message === "second") {
      otphtml +=
        "To post your requirement, please enter the One Time Password (OTP) sent on your mobile ";
      otphtml += returnSpan("", "", PhoneNumber, "befwt");
    } else {
      otphtml += "Enter the One Time Password (OTP) sent on  your mobile ";
      otphtml += returnSpan("", "", PhoneNumber, "befwt");
      otphtml += " to ";
      otphtml += returnSpan("", "", "confirm", "befwt");
      otphtml += " your requirement";
    }
  } else {
    var otpMsg = isBl(tmpId) ? "Verify your mobile number to receive quotes" : "Confirm your requirement";
    var cls =  isPnsEnq(tmpId) ? "otphdg epB10" : "otphdg";
    var otphed = returnContainer( "t" + tmpId, "OtpMainHeading", cls, "", otpMsg );
    otphed += "</div>";
    if(isPnsEnq(tmpId)){
      let pnsno = isSet(ReqObj.Form[tmpId].pnsNumber) ? ReqObj.Form[tmpId].pnsNumber : "09XXXXXXXX";
      let pns_extn='';
      if(isSet(ReqObj.Form[tmpId].pns_extn) && ReqObj.Form[tmpId].pns_extn!='')
        pns_extn = `<span class="befs13">, Dial Ext. ${ReqObj.Form[tmpId].pns_extn}</span>`;
      if (ispdp(tmpId) && currentISO() === "IN"){
        pnsno = pnsno.slice(4);
        pnsno = '0' + pnsno;
      }
      // otphed += "<div class='vmngrey'>" + `<span class='cbl_fs17'>You can contact supplier on </span><span class='befwt cbl_fs17'>${pnsno}</span>${pns_extn}` +"</div>";
    } 
    otphtml += otphed;
    otphtml += returnContainer( "", "", "befs16 blotp bemb20", "", "Enter the 4 digit One Time Password (OTP) sent to your Mobile Number " );
    otphtml += returnSpan("", "", PhoneNumber, "disp-inl befwt", "") + "</span>";
    otphtml += " via SMS</div>";
  }
  that.UserVerificationHtmlObj["Label"] = otphtml;
};

UserVerification.prototype.getOTPHtml = function (tmpId) {
  var that = this;
  var formType = ReqObj.Form[tmpId].formType.toLowerCase();

  if (!isSSB(tmpId)) that.getOTPLabel(tmpId, formType);
  that.getOTPInput(tmpId, formType);
  that.UserVerificationHtmlObj["OuterWrapper"] = "";
  that.UserVerificationHtmlObj["ClosingWrapper"] = "";

  return that.UserVerificationHtmlObj;
};
UserVerification.prototype.sendOtp = function (event) {
  var type = event.data.type;
  var that = event.data.x;
  var id = event.data.id;
  var resend = event.data.resend;
  var tmpId = event.data.tmpId;
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  if (isSSB(tmpId) &&ReqObj.Form[tmpId].isEnterclicked &&id.toLowerCase() === "resendotp") {
    ReqObj.Form[tmpId].isEnterclicked = false;
    return "";
  }
  if (ReqObj.Form[tmpId].OnCloseStep && isSet(ReqObj.Form[tmpId].FormSequence))
    var StepNumber = ReqObj.Form[tmpId].FormSequence.StepCounter + 1 + ReqObj.Form[tmpId].FormSequence.OnCloseCounter + 1;
  else var StepNumber = ReqObj.Form[tmpId].FormSequence.StepCounter + 1;

  if (resend === 1 && id === "resendOtp")
    blenqGATracking(form_type, "resendOTP|" + StepNumber + "|UserVerification", getEventLabel(), 0, tmpId);
  else if (resend === 0 && id === "bl_enqMisscall")
    blenqGATracking(form_type, "OncallOTP|" + StepNumber + "|UserVerification", getEventLabel(), 0, tmpId);
  // if(resend === 0){
  //   if(isSet(that.afterGen) && that.afterGen === true)
  //     blenqGATracking(form_type, 'OTP2Shown', getEventLabel(), 1, tmpId);
  //   else if(Enq09(tmpId))
  //     blenqGATracking(form_type, 'OTP1Shown', getEventLabel(), 1, tmpId);
  // }

  that.handleUI(tmpId, "refresh", "", "");

  if (that.otpCount === 3) {
    /* only 2 times */
    that.handleUI(tmpId, "otpCount3", "", "");
    return;
  } else if ( that.otpCount > 0 && that.otpCount <= 3 && ReqObj["OTPratelimitstatus"] !== "Access Denied" ) {
    that.handleUI(tmpId, "otpCount123", "", "");
  }

  var data = type === 3 ? that.getData(3, resend, tmpId, "") : type === 1 ? that.getData(1, resend, tmpId, "") : "";
  if (data !== "") that.sendRequest(ObjectTrim(data), type, "", that, tmpId);
};
UserVerification.prototype.validateOtp = function (event) {
  //
  var type = event.data.type;
  var that = event.data.userVerificationObject;
  var tmpId = event.data.tmpId;
  var verifyObject = event.data.obj;
  var authkey = event.data.authKey;
  that.sendRequest(
    ObjectTrim(that.getData(2, "", tmpId, authkey)),
    type,
    verifyObject,
    that,
    tmpId
  );
};
UserVerification.prototype.getData = function (flag, resend, tmpId, authkey) {
  var data = {
    s_mobile: usercookie.getParameterValue(this.imeshCookie, "mb1"),
    modid: modIdf,
    s_country_code: usercookie.getParameterValue(this.imeshCookie, "phcc"),
    s_country_iso: usercookie.getParameterValue(this.imeshCookie, "iso"),
    s_glusrid: usercookie.getParameterValue(this.imeshCookie, "glid"),
    flag: ReqObj.Form[tmpId].formType.toLowerCase(),
    OTPResend: resend,
    verify_screen: isSSB(tmpId) ? "ssb" : "default",
  };
  if (flag === 1) {
    /* for OTP sending*/ data["todoflag"] = "OTPGen";
    return data;
  } else if (flag === 2) {
    /* for OTP Validation */ data["todoflag"] = "OTPVer";
    data["s_authkey"] = authkey;
    return data;
  } else if (flag === 3) {
    /*for OTP through call */
    data["todoflag"] = "OTPGen";
    data["misscall"] = 1;
    return data;
  }
};

UserVerification.prototype.getAjaxData = function (data) {
  var _case = checkblockedUser() && im_issExist() === "" ? 2 : 1;
  var ajaxData = {
    token: "imobile@15061981",
    mobile_num:
      _case === 2
        ? ReturnCorrectVal(ReqObj.UserDetail["blusrdtl"]["blk_mb"], "")
        : ReturnCorrectVal(data["s_mobile"], ""),
    modid: ReturnCorrectVal(data["modid"], "DIR"),
    user_mobile_country_code:
      _case === 2
        ? ReturnCorrectVal(ReqObj.UserDetail["blusrdtl"]["blk_iso"], "91")
        : ReturnCorrectVal(data["s_country_code"], "91"),
    flag: ReturnCorrectVal(data["todoflag"], "OTPGen"),
    user_ip: ReturnCorrectVal(
      usercookie.getParameterValue(usercookie.getCookie("iploc"), "gip"),
      ReqObj.IPDetails["ipaddress"]
    ),
    user_country:
      _case === 2
        ? currentISO()
        : ReturnCorrectVal(
          data["s_country_iso"],
          ReqObj.IPDetails["countryiso"]
        ),
    glusrid:
      _case === 2 && isSet(ReqObj.UserDetail.blusrdtl.glid)
        ? ReturnCorrectVal(ReqObj.UserDetail.blusrdtl.glid, "")
        : ReturnCorrectVal(data["s_glusrid"], ""),
  };

  if (isSet(data["s_authkey"]) && data["s_authkey"] != "") {
    ajaxData["verify_process"] = "ONLINE";
    ajaxData["auth_key"] = ReturnCorrectVal(data["s_authkey"], "");
  } else {
    ajaxData["OTPResend"] = ReturnCorrectVal(data["OTPResend"], 1);
  }

  if (
    data["flag"] == "bl" ||
    data["flag"] == "BL" ||
    data["flag"] == "chatbl" ||
    data["flag"] == "CHATBL" ||
    data["flag"] === "chatbl-inline"
  ) {
    ajaxData["process"] = "OTP_PBRForm_Desktop";
    ajaxData["user_updatedusing"] = "PBRForm";
    if (isSet(data["s_authkey"])) {
      ajaxData["verify_screen"] =
        ReturnCorrectVal(data["verify_screen"], "default") === "ssb"
          ? "OTP_AdvancePBRForm_Desktop"
          : "DESKTOP PBR FORM";
    }
  } else {
    ajaxData["process"] = "OTP_CentralisedEnqForm_Desktop";
    ajaxData["user_updatedusing"] = "DESKTOP ENQUIRY FORM";
    if (isSet(data["s_authkey"])) {
      ajaxData["verify_screen"] = "DESKTOP ENQUIRY FORM";
    }
  }

  return ajaxData;
};

UserVerification.prototype.getOTPAjaxURL = function () {
  var url = "//login.indiamart.com/users/OTPverification/";
  if (
    appsServerName == "//dev-apps.imimg.com/" ||
    appsServerName == "//stg-apps.imimg.com/"
  ) {
    url = "//dev1-login.indiamart.com/users/OTPVerification/";
    // url = '//stg1-login.indiamart.com/users/OTPverification/';
  }
  return url;
};
UserVerification.prototype.sendRequest = function (data, type, verifyObject, userVerificationObject, tmpId) {
  var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var that = userVerificationObject;
  var ajaxData = that.getAjaxData(data);
  var ajaxURL = that.getOTPAjaxURL();
  if ((isSSB(tmpId) || isEnq(tmpId)) && ReqObj.Form[tmpId].isSkipOTPClicked) {
    PostAjax(verifyObject, tmpId);
    return;
  }
  $.ajax({
    cache: false,
    url: ajaxURL,
    type: "POST",
    crossOrigin: true,
    crossDomain: true,
    data: ajaxData,
    dataType: "json",
    success: function (res) {
      if (isSet(res)) {
        var imeshcookie = that.imeshCookie;
        ReqObj["OTPratelimitstatus"] = res.Response.Status;
        ReqObj["OTPratelimitmessage"] = res.Response.Message;

        if (that.otpCount !== 0 && ReqObj["OTPratelimitstatus"] !== "Access Denied") {
          that.handleUI(tmpId, "showmessage", "", "");
        }
        if (ReqObj["OTPratelimitstatus"] === "Access Denied") {
          that.handleUI(tmpId, "ratelimitmessage", "", "");
        }

        if (isSet(res.Response) && res.Response.Status === "Success") {
          var block_case = 1;

          //next->submit
          if (type == 2) {
            hideClickMsg(tmpId);
          }

          if (checkblockedUser() && im_issExist() === "") {
            block_case = 2;
            ReqObj.UserDetail["blusrdtl"]["glid"] = res.Response.Glusrid;
          }
          if (type === 1 || type === 3) {
            that.otpCount++;
          } else if (type === 2) {
            var imcookie;
            if (imeshcookie.indexOf("uv") === -1)
              imeshcookie += imeshcookie.charAt(imeshcookie.length - 1) === "|" ? "uv=V" : "|uv=V";
            imcookie = stringToObject(imeshcookie, "|");
            imcookie["uv"] = "V";
            imesh_obj.set(imcookie); /* once user is verified, imesh cookie is set. */
            if (block_case === 2 && isSet(res.Response.LOGIN_DATA) && isSet(res.Response.LOGIN_DATA.DataCookie)) {
              imesh_obj.set(res.Response.LOGIN_DATA.DataCookie);
              ReqObj.UserDetail.blusrdtl.blkUsr = res.Response.LOGIN_DATA.DataCookie["uv"] === "V" ? 0 : ReqObj.UserDetail.blusrdtl.blkUsr;
              UpdateUserDetailKey();
            }
            usercookie.deleteCookie("imEqGl"); /* since user is verified, we need to clear the imEqGl cookie */
            that.updateFulllogin(res);
            if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" || ReqObj.Form[tmpId].formType.toLowerCase() === "enq")
              ReqObj.Form[tmpId].toFireIsq = true; // check if any other issue
            if (typeof getLoginStringv1 === "function") getLoginStringv1(); // imlogin
            blenqGATracking(form_type, "confirmOTP", getEventLabel(), 1, tmpId);
            $("#t" + tmpId + "_byrinfo").removeClass("bedsnone");

            $("#t" + tmpId + "_hdg").removeClass("bedsnone"); /* */
            /* eto-glusr login is hit with loginflag */
            var userlogin = new UserLogin();
            userlogin.sendRequest({
              data: {
                logObject: "",
                tmpId: tmpId,
                userlogin: userlogin,
                blureve: false,
                todo: "verifyusr",
              },
            });
            if (isSet(ReqObj.Form[tmpId].RemainingService) && ReqObj.Form[tmpId].RemainingService.length > 0 && !ShowOtp() && ReqObj.Form[tmpId].flags.ImEqgl) {
              formatServices(ReqObj.Form[tmpId].RemainingService, tmpId);

              if (isSet(ReqObj.Form[tmpId].ServiceSequence)) {
                while (ReqObj.Form[tmpId].ServiceSequence.length > 0) {
                  if (isSet(ReqObj.Form[tmpId].ServiceSequence[0]) && isSet(ReqObj.Form[tmpId].ServiceSequence[0].fn) && typeof ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit === "function")
                    ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit(tmpId);
                  else {
                    if (IsProduction()) {
                      //this is done just not to impact user
                      ReqObj.Form[tmpId].ServiceSequence.pop();
                    }
                  }
                }
              }
            }
            PostAjax(verifyObject, tmpId);
          }
        } else {
          if (parseInt(res.Response.Code) === 204 && res.Response.Message === "OTP not Verified") {
            that.handleUI(tmpId, "verificationFailed", "afterRequest", "");
            RemoveObjFromHit(verifyObject, tmpId);
            return;
          }
        }
      } else {
        blenqGATracking(form_type, "service:OtpAuthentication:failure", "response undefined", 1, tmpId);
        RemoveObjFromHit(verifyObject, tmpId);
      }
    },
    error: function (res) {
      res = isSet(res) ? JSON.stringify(res) : "response undefined";
      blenqGATracking(form_type, "service:OtpAuthentication:failure", res, 1, tmpId);
      RemoveObjFromHit(verifyObject, tmpId);
    },
    complete: function (res) {
      if (isSSB(tmpId) && isOTPBoxHidden(tmpId)) {
        onCompleteStep(tmpId);
      }
      IsChatbl(tmpId) ? $("#t" + tmpId + "cbl_msg").parent().addClass("dn") : removeBLLoader(tmpId, "center");
    },
  });
};
UserVerification.prototype.updateFulllogin = function (res) {
  var logincookie = "";
  for (var key in res.Response.LOGIN_DATA.LoginCookie) {
    logincookie += key + "=" + res.Response.LOGIN_DATA.LoginCookie[key] + "|";
  }
  usercookie.setCookie("v4iilex", logincookie, 180);

  var imis = "";
  for (var key in res.Response.LOGIN_DATA.im_iss) {
    imis += key + "=" + res.Response.LOGIN_DATA.im_iss[key] + "|";
  }
  usercookie.setCookie("im_iss", imis, 180);
};

UserVerification.prototype.handleUIEmptyOtpBoxes = function (tmpId) {
  $("#t" + tmpId + "bl_enqOtp1").val("");
  $("#t" + tmpId + "bl_enqOtp2").val("");
  $("#t" + tmpId + "bl_enqOtp3").val("");
  $("#t" + tmpId + "bl_enqOtp4").val("");
};

UserVerification.prototype.handleUI = function (tmpId, todo, when, authkey) {
  var that = this;
  if (todo === "focus") {
    IsChatbl(tmpId)
      ? setTimeout(function () {
        $("#t" + tmpId + "bl_enqOtp1").focus();
      }, 1800)
      : isSSB(tmpId)
        ? ""
        : $("#t" + tmpId + "bl_enqOtp1").focus(); //
  }
  if (todo === "ratelimitmessage") {
    if (!IsChatbl(tmpId)) {
      var otpmessage = ReqObj["OTPratelimitmessage"];
      $("#t" + tmpId + "verifyerrotpdiv").removeClass("bedsnone");

      $("#t" + tmpId + "verify_err").html(otpmessage);

      if (otpcounter === 1) {
        clearTimeout(myTimeout);
      }

      $("#t" + tmpId + "resendOtp")
        .attr("disabled", "disabled")
        .css({
          opacity: "0.4",
          cursor: "default",
        });
      $("#t" + tmpId + "bl_enqMisscall")
        .attr("disabled", "disabled")
        .css({
          opacity: "0.4",
          cursor: "default",
        });
    } else {
      var otpmessage = ReqObj["OTPratelimitmessage"];
      var trimmedString = otpmessage.substring(57, otpmessage.length);
      otpmessage = "Excessive OTP requests, please try post " + trimmedString;
      $("#t" + tmpId + "verify_error")
        .parent()
        .removeClass("dn");
      addChatblError(tmpId, otpmessage);
      if (otpcounter === 1) {
        clearTimeout(myTimeout);
      }
      $("#t" + tmpId + "resendOtp")
        .attr("disabled", "disabled")
        .css({
          opacity: "0.4",
          cursor: "default",
        });
      $("#t" + tmpId + "bl_enqMisscall")
        .attr("disabled", "disabled")
        .css({
          opacity: "0.4",
          cursor: "default",
        });
    }
  }
  if (todo === "showmessage") {
    if (!IsChatbl(tmpId)) {
      $("#t" + tmpId + "verifyerrotpdiv").removeClass("bedsnone");
      $("#t" + tmpId + "verify_err").html("OTP sent on Your Mobile");
    } else {
      $("#t" + tmpId + "verify_error")
        .parent()
        .removeClass("dn");
      addChatblError(tmpId, "OTP sent on Your Mobile");
    }
  }
  if (todo === "refresh") {
    if (!IsChatbl(tmpId))
      $("#t" + tmpId + "verifyerrotpdiv").addClass("bedsnone");
    that.handleUIEmptyOtpBoxes(tmpId);
    if (!isSSB(tmpId)) $("#t" + tmpId + "bl_enqOtp1").focus();
  }
  if (todo === "otpCount1") {
    $("#t" + tmpId + "resendOtp").show(); /* check html ajax */
    $("#t" + tmpId + "verify_err").html("");
  }

  if (todo === "otpCount123") {
    $("#t" + tmpId + "bl_enqOtp1").focus();
    $("#t" + tmpId + "resendOtp")
      .attr("disabled", "disabled")
      .css({
        opacity: "0.4",
        cursor: "default",
      });
    $("#t" + tmpId + "bl_enqMisscall")
      .attr("disabled", "disabled")
      .css({
        opacity: "0.4",
        cursor: "default",
      });
    if (that.otpCount !== 3) {
      otpcounter += 1;
      myTimeout = setTimeout(function () {
        $("#t" + tmpId + "resendOtp")
          .removeAttr("disabled")
          .css({
            opacity: "1",
            cursor: "pointer",
          });
        $("#t" + tmpId + "bl_enqMisscall")
          .removeAttr("disabled")
          .css({
            opacity: "1",
            cursor: "pointer",
          });
      }, 20000);
    }
  }

  if (todo === "otpCount3") {
    if (IsChatbl(tmpId)) {
      addChatblError(tmpId, "You have exceeded allowed OTP request attempts");
    } else
      $("#t" + tmpId + "verify_err").html(
        "You have exceeded allowed OTP request attempts"
      );
    $("#t" + tmpId + "verifyerrotpdiv").removeClass("bedsnone");
    $("#t" + tmpId + "resendOtp")
      .attr("disabled", "disabled")
      .css({
        opacity: "0.4",
        cursor: "default",
      });
    $("#t" + tmpId + "bl_enqMisscall")
      .attr("disabled", "disabled")
      .css({
        opacity: "0.4",
        cursor: "default",
      });
  }
  if (todo === "verificationFailed" && when === "beforeRequest") {
    if (isSet(authkey) && authkey.length === 0) {
      if (IsChatbl(tmpId)) addChatblError(tmpId, "Please enter OTP");
      else $("#t" + tmpId + "verify_err").html("Please enter OTP");
    } else {
      if (IsChatbl(tmpId)) {
        addChatblError(tmpId, "Please enter correct OTP");
      } else $("#t" + tmpId + "verify_err").html("Please enter correct OTP");
    }

    if (isSSB(tmpId)) {
      otpErrorHandling(tmpId, "1");
    }
    $("#t" + tmpId + "verifyerrotpdiv").removeClass("bedsnone");
  }
  if (todo === "verificationFailed" && when === "afterRequest") {
    if (IsChatbl(tmpId)) {
      addChatblError(tmpId, "Please enter correct OTP");
      if (IsChatBLInline(tmpId))
        $("#t" + tmpId + "_submit").removeAttr("disabled");
    } else {
      $("#t" + tmpId + "verify_err").html("Please enter correct OTP");
    }
    if (isSSB(tmpId)) {
      otpErrorHandling(tmpId, "1");
    }
    $("#t" + tmpId + "verifyerrotpdiv").removeClass("bedsnone");
    that.handleUIEmptyOtpBoxes(tmpId);
    $("#t" + tmpId + "bl_enqOtp1").focus();
  }
  if (todo === "tryagain" && when === "afterRequest") {
    $("#t" + tmpId + "verify_err").html(
      "Something went Wrong. Please try Again"
    );
    $("#t" + tmpId + "verifyerrotpdiv").removeClass("bedsnone");
  }
};
UserVerification.prototype.handleEvents = function (
  userVerificationObject,
  tmpId
) {
  if (!isSet(validation)) createGlobalObject();
  var that = userVerificationObject;
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    $("#t" + tmpId + "bl_enqMisscall").on(
      "click",
      {
        type: 3,
        x: that,
        id: "bl_enqMisscall",
        resend: 0,
        tmpId: tmpId,
      },
      that.sendOtp
    );
    $("#t" + tmpId + "resendOtp").on(
      "click",
      {
        type: 1,
        x: that,
        id: "resendOtp",
        resend: 1,
        tmpId: tmpId,
      },
      that.sendOtp
    );

    $("#t" + tmpId + "bl_enqOtp1")
      .on("keypress", validation.isNumberKey)
      .on(
        "keyup",
        {
          param1: "bl_enqOtp1",
          param2: "bl_enqOtp2",
          tmpId: tmpId,
        },
        movetoNext
      );

    $("#t" + tmpId + "bl_enqOtp2")
      .on("keypress", validation.isNumberKey)
      .on(
        "keyup",
        {
          param1: "bl_enqOtp2",
          param2: "bl_enqOtp3",
          tmpId: tmpId,
        },
        movetoNext
      )
      .on(
        "keydown",
        {
          param1: "bl_enqOtp2",
          param2: "bl_enqOtp1",
          tmpId: tmpId,
        },
        movetoPrevious
      );

    $("#t" + tmpId + "bl_enqOtp3")
      .on("keypress", validation.isNumberKey)
      .on(
        "keyup",
        {
          param1: "bl_enqOtp3",
          param2: "bl_enqOtp4",
          tmpId: tmpId,
        },
        movetoNext
      )
      .on(
        "keydown",
        {
          param1: "bl_enqOtp3",
          param2: "bl_enqOtp2",
          tmpId: tmpId,
        },
        movetoPrevious
      );

    $("#t" + tmpId + "bl_enqOtp4")
      .on("keypress", validation.isNumberKey)
      .on(
        "keydown",
        {
          param1: "bl_enqOtp4",
          param2: "bl_enqOtp3",
          tmpId: tmpId,
        },
        movetoPrevious
      );
  }
};
Validation.prototype.isMobileValid = function (mobilenumber) {
  if (this.usercountry === "IN") {
    this.result = {
      type: true,
      error: "",
    };
    //agar true
    if (ValidNumber(mobilenumber)) {
      var mobilenumber = isSet(mobilenumber) ? mobilenumber.trim() : "";
      this.result["error"] =
        mobilenumber.length === 0
          ? "Please Enter Mobile Number"
          : mobilenumber.match(/^[0,2,3,4,5]/)
            ? "Mobile Number should start with 6,7,8,9"
            : mobilenumber.length < 10
              ? "Please Enter valid Mobile number"
              : mobilenumber.length > 10
                ? "Mobile number should contain 10 digits"
                : "";
    } else {
      this.result["error"] = "Please enter a valid Mobile number";
    }
    this.result["type"] = this.result["error"] !== "" ? false : true;
  }
  return this.result;
};
Validation.prototype.isMobileFValid = function (mobilenumber) {
  this.result = {
    type: true,
    error: "",
  };
  if (ValidNumber(mobilenumber)) {
    var mobilenumber = isSet(mobilenumber) ? mobilenumber.trim() : "";
    this.result["error"] =
      mobilenumber.length === 0 ? "Please Enter Mobile Number" : "";
  } else {
    this.result["error"] = "Please Enter valid Mobile number";
  }
  this.result["type"] = this.result["error"] !== "" ? false : true;
  return this.result;
};
Validation.prototype.isMobileChValid = function (mobilenumber) {
  this.result = {
    type: true,
    error: "",
  };
  var mobilenumber = isSet(mobilenumber) ? mobilenumber.trim() : "";
  if (mobilenumber.length > 0) {
    if (ValidNumber(mobilenumber)) {
      this.result["error"] = "";
    } else {
      this.result["error"] = "Phone Number should be numeric";
    }
  } else this.result["error"] = "";
  this.result["type"] = this.result["error"] !== "" ? false : true;
  return this.result;
};
Validation.prototype.isEmailValid = function (email) {
  this.result = {
    type: true,
    error: "",
  };
  var email = isSet(email) ? email : "";
  this.result["error"] =
    email.trim() === ""
      ? ""
      : isHindi(email)
        ? "Please do not use special symbols"
        : !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)
          ? "Please Enter Valid Email ID"
          : "";
  this.result["type"] = this.result["error"] !== "" ? false : true;
  this.result["specialcase"] =
    this.result["error"] === "Please do not use special symbols" ? true : false;
  return this.result;
};
Validation.prototype.isEmailFilled = function (email) {
  this.result = {
    type: true,
    error: "",
  };
  var email = isSet(email) ? email : "";
  this.result["error"] =
    email.trim() === ""
      ? "Please Enter your Email ID"
      : !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)
        ? "Please Enter Valid Email ID"
        : "";
  this.result["type"] = this.result["error"] !== "" ? false : true;
  return this.result;
};
Validation.prototype.isTitleValid = function (title) {
  this.result = {
    type: true,
    error: "",
  };
  var title = isSet(title) ? title : "";
  this.result["error"] =
    title.trim().length === 0
      ? "Please Enter Product / Service Name"
      : isHindi(title)
        ? "Please do not use special symbols"
        : "";
  this.result["type"] = this.result["error"] !== "" ? false : true;
  this.result["specialcase"] =
    this.result["error"] === "Please do not use special symbols" ? true : false;
  return this.result;
};

Validation.prototype.isDescriptionFilled = function (description) {
  this.result = {
    type: true,
    error: "",
  };
  var description = isSet(description) ? description.trim() : "";
  this.result["error"] =
    description.length === 0
      ? ""
      : isScriptTag(description)
        ? "Please do not use special symbols"
        : "";
  this.result["type"] = this.result["error"] !== "" ? false : true;
  this.result["specialcase"] =
    this.result["error"] === "Please do not use special symbols" ? true : false;
  return this.result;
};

Validation.prototype.isNameValid = function (name) {
  this.result = {
    type: true,
    error: "",
  };
  var name = isSet(name) ? name : "";
  this.result["error"] =
    name.trim().length === 0
      ? "Please Enter Your Name"
      : isHindi(name) || !isAllCharacters(name)
        ? "Please do not use special symbols"
        : isScriptTag(name)
          ? "Please enter valid name"
          : "";
  this.result["type"] = this.result["error"] !== "" ? false : true;
  this.result["specialcase"] =
    this.result["error"] === "Please do not use special symbols" ||
      this.result["error"] === "Please enter valid name"
      ? true
      : false;
  return this.result;
};

Validation.prototype.isCityValid = function (city) {
  this.result = {
    type: true,
    error: "",
  };
  this.result["error"] =
    city.trim().length === 0
      ? "Please Enter Your City"
      : isHindi(city)
        ? "Please do not use special symbols"
        : isScriptTag(city)
          ? "Please enter valid city name"
          : "";
  this.result["type"] = this.result["error"] !== "" ? false : true;
  this.result["specialcase"] =
    this.result["error"] === "Please do not use special symbols" ||
      this.result["error"] === "Please enter valid city name"
      ? true
      : false;
  return this.result;
};

Validation.prototype.isQtyUnitValid = function () {
  this.result = {
    type: true,
    error: "",
  };
  return this.result;
};

Validation.prototype.isNumberKey = function (event) {
  if (isSet(event)) {
    var charCode = event.which;
    if (charCode >= 48 && charCode <= 57) {
      // if (IsChatbl(event.data.tmpId)) {
      //   validation.toShowTick(event);
      // }
      true;
    }
    if (charCode === 118 && event.ctrlKey === true) {
      return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
  }
};

Validation.prototype.isProductNameValid = function (name) {
  this.result = {
    type: true,
    error: "",
  };
  var name = isSet(name) ? name.trim() : "";
  this.result["error"] =
    name.length === 0
      ? "Enter product/service name"
      : !isHindi(name) && !name.match(/[a-zA-Z]/g)
        ? "Please do not use special symbols"
        : isScriptTag(name)
          ? "Please do not use special symbols"
          : "";
  this.result["type"] = this.result["error"] !== "" ? false : true;
  this.result["specialcase"] =
    this.result["error"] === "Please do not use special symbols" ? true : false;

  return this.result;
};
Validation.prototype.isCountryValid = function (country, tmpId) {
  this.result = {
    type: true,
    error: "",
  };
  var name = isSet(country) ? country.trim() : "";
  this.result["error"] = name.length === 0 ? "Please Select Country" : "";
  if (
    ReqObj.Form[tmpId].UserInputs["CountryName"] === "" ||
    typeof ReqObj.Form[tmpId].UserInputs["CountryName"] === "undefined"
  ) {
    this.result["error"] = "Country must be chosen from suggestions";
  }
  this.result["type"] = this.result["error"] !== "" ? false : true;
  return this.result;
};

Validation.prototype.isGstValid = function (gnumber, tmpId) {
  this.result = {
    type: true,
    error: "",
  };
  var gname = isSet(gnumber) ? gnumber.trim() : "";
  this.result["error"] =
    gname == ""
      ? ""
      : gname.match(/^[0-9a-zA-Z]+$/)
        ? ""
        : "Please enter valid number";
  this.result["type"] = this.result["error"] !== "" ? false : true;
  return this.result;
};

Validation.prototype.isCnameValid = function (cname, tmpId) {
  this.result = {
    type: true,
    error: "",
    error_type: "",
  };
  var type = true,
    error = "",
    error_type = "";
  var re = /[a-zA-Z]/;
  if (cname !== "") {
    if (cname.length <= 2) {
      type = false;
      error = "Company name must be greater than 2 characters";
    } else if (isAllNumbers(cname)) {
      type = false;
      error = "Company name must be Alphanumeric";
    } else if (isAllSpecialChars(cname)) {
      type = false;
      error = "Company name must contain at least one alphabet";
    } else if (!re.test(cname)) {
      type = false;
      error = "Company name must contain at least one alphabet";
    } else if (checkJunkCname(cname)) {
      type = false;
      error = "Junk Values in Company name";
    }
    if (isScriptTag(cname)) {
      type = false;
      error = "Enter valid company name";
      error_type = "Script Tag";
    }
  }
  this.result["error_type"] = error_type;
  this.result["type"] = type;
  this.result["error"] = error;
  return this.result;
};

Validation.prototype.isURLValid = function (website, tmpId) {
  this.result = {
    type: true,
    error: "",
    error_type: "",
  };
  var sitename = "indiamart";
  var website = website.toLowerCase();
  var count = (website.match(/https:/g) || website.match(/http:/g) || [])
    .length;
  if (website.length != 0) {
    var m = website.split("http://");
    var validarr = website.split(".");
    var re =
      /^(http[s]?:\/\/){0,1}(www[0-9]?\.){0,1}[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-]{2,}([\.][a-zA-Z0-9\-]{2,})*(\/([a-zA-Z0-9]+[\-\_\.]?)*)*$/;
    var re2 = /[^a-zA-Z0-9]+$/;
    var re3 = /[^\/]$/;
    var re1 = /[^0-9a-zA-Z]{2,}/;
    var dotCount = isSet(website.match(/\./g))
      ? website.match(/\./g).length
      : 0;
    website = website.replace(/\/$/, "");
    if (sitename) {
      sitename = sitename.replace(/http:\/\//, "");
      sitename = sitename.replace(/https:\/\//, "");
      sitename = sitename.replace(/[\/]$/, "");
    }
    if (website.length > 100) {
      this.result["error"] =
        "Web Site Address (URL) should not exceed 100 characters";
    } else if (sitename && website.match(sitename)) {
      this.result["error"] = "Can't be same as IndiaMART url";
    } else if (website.match("indiamart.com")) {
      this.result["error"] = "Can't use IndiaMART url here";
    } else if (website.indexOf(" ") != -1) {
      this.result["error"] =
        "Please enter correct URL without any spaces in it.";
    } else if (/\"+/g.test(website)) {
      this.result["error"] =
        "Please do not use double quotes" /*'Please enter correct URL without any quotes in it.'*/;
    } else if (/\|+/g.test(website)) {
      this.result["error"] =
        "Please do not use Pipe sign" /*'Please enter correct URL without any Pipe Symbols in it.'*/;
    } else if (
      count > 1 ||
      website.indexOf("@") != -1 ||
      website.indexOf(".") == -1 ||
      validarr[0].length < 2 ||
      (dotCount == 2 && validarr[1].length <= 2) ||
      (dotCount == 1 && validarr[0].length <= 2) ||
      website.length < 2
    ) {
      this.result["error"] = "Invalid Website ! Please enter valid website.";
    } else if (
      (website.indexOf("http://") == 0 ||
        website.indexOf("https://") == 0 ||
        website.indexOf("www.") == 0) &&
      dotCount !== 2
    ) {
      this.result["error"] =
        "Website must start with http:// or https:// or www.";
    } else if (!re.test(website) || re1.test(m[1]) || re2.test(website)) {
      this.result["error"] = "Invalid Website ! Please enter valid website.";
    }
    if (isScriptTag(website)) {
      this.result["error"] = "Invalid Website ! Please enter valid website.";
      this.result["error_type"] = "Js error";
    }
  }
  this.result["type"] = this.result["error"] !== "" ? false : true;
  return this.result;
};
/*
 * @description this method is used to check if localstorage exists
 *
 *
 * @returns true if localStorage exists else false
 */

function getEventLabel(toappend) {
  var imeshcookie = imeshExist();
  var imeshiso = usercookie.getParameterValue(imeshcookie, "iso");
  var verify = usercookie.getParameterValue(imeshcookie, "uv");
  var iso = currentISO();
  var isidentified =
    imeshcookie === ""
      ? "Unidentified"
      : verify === "V"
        ? "Verified"
        : "Unverified";
  var label = iso.toLowerCase() === "in" ? "Indian" : "Foreign";
  label += "|" + isidentified + "|" + labelNEC(iso);

  if (isSet(toappend) && toappend !== "") {
    label = toappend + "|" + label;
  }
  return label;
}

function stopBgScroll() {
  $(".gl-wrapper").css("width", ReqObj[windowctrlscroll] + "px");
  $("html").addClass("scroll_layout");
}

function ValidGenId(id) {
  if (ValidNumber(id) && parseInt(id, 10) > 1) return true;
  else return false;
}

function ValidNumber(number) {
  if (isSet(number) && !!parseInt(number, 10) && Number(number)) return true;
  else return false;
}

function SanitizeId(id) {
  return isSet(id)
    ? !isNaN(id)
      ? !isNaN(parseInt(id, 10))
        ? parseInt(id, 10)
        : defaultGenerationId
      : defaultGenerationId
    : defaultGenerationId;
}

function callfunc(foundArray, ObjectToFind) {
  for (var y = 0; y < foundArray.length; y++) {
    if (
      ObjectToFind.toLowerCase() ===
      ConstructorName(foundArray[y].Obj).toLowerCase()
    ) {
      foundArray.splice(y, 1)[0];
    }
  }
}

function RefactorUiArray(tmpId) {
  //find objects for isq and rd box and all those things which changes with product
  for (var b = 0; b < PnameDependent.length; b++) {
    callfunc(
      ReqObj.Form[tmpId].UiArray[ReqObj.Form[tmpId].FormSequence.StepCounter],
      PnameDependent[b]
    );
    RemoveService(
      ReqObj.Form[tmpId].FormSequence.FullServiceArray[
      ReqObj.Form[tmpId].FormSequence.StepCounter
      ],
      PnameDependent[b]
    );
  }
}

function RemoveService(arr, ObjectToFind) {
  if (isSet(arr)) {
    for (var i = 0; i < arr.length; i++) {
      if (isSet(arr[i].fn) && ConstructorName(arr[i].fn).toLowerCase() === ObjectToFind.toLowerCase()) {
        arr.splice(i, 1);
        // delete arr[i];
        i -= 1;
        // arr[i].cb.push(PushObject);
        return true;
      } else {
        if (RemoveService(arr[i].cb, ObjectToFind) === true) {
          // arr[i].cb = [];
          return true;
        }
      }
      // }
    }
  }
}

/**
 * this function fires on enter press
 *
 * @param {*} tmpId
 */
function RefactorFormArrays(tmpId) {
  RefactorUiArray(tmpId);
}

/**
*@description
*@usage this function is used when user presses enter on product name field
* @param {*} tmpId
*/

function DirectSubmitWithoutBlur(tmpId) {
  SetFormHtmlDefaultValue(tmpId);
  if (parseInt(ReqObj.Form[tmpId].disableRd) === 1) {
    ReqObj.Form[tmpId].flags.isDescDivShown = true;
  } else {
    ReqObj.Form[tmpId].flags.isDescDivShown = false;
  }
  setTemplateDefaultValue(
    tmpId.substring(0, 2),
    tmpId.substring(2, 4),
    ReqObj.Form[tmpId],
    ReqObj.Form[tmpId].flags.isDescDivShown
  );

  ReqObj.Form[tmpId].mcatId !== "-1" || ReqObj.Form[tmpId].catId !== "-1"
    ? GetIsq(tmpId)
    : "";
  ReqObj.Form[tmpId].GlobalIsqObject = new Isq(tmpId);
  if (isSet(ReqObj.Form[tmpId].isBlQtutShown)) {
    ReqObj.Form[tmpId].isBlQtutShown = false;
  }
}



//test work done

function addYTLoader(tmpId, type) {
  var el = $("#t" + tmpId + "_belodrYT");
  if (el.hasClass("bedsnone")) {
    el.removeClass("bedsnone");
  }
}

function removeYTLoader(tmpId, type) {
  var el = $("#t" + tmpId + "_belodrYT");
  if (!el.hasClass("bedsnone")) {
    el.addClass("bedsnone");
  }
}

function appendChatLoader(tmpId, type, loaderclass) {
  if (isSet(type) && type.toLowerCase() === "left") {
    var ParentdivClass = IsChatbl(tmpId) ? "cbl_ques cbl_type " : "";
    var loaderColorClass = loaderclass;
  } else {
    var ParentdivClass = IsChatbl(tmpId)
      ? "txt-cnt bemb10 cbl_ques cbl_type"
      : "txt-cnt bemb10 ";
    var loaderColorClass = loaderclass;
  }
  if (IsChatbl(tmpId))
    return (
      "<div id='t" +
      tmpId +
      "_typing' class='" +
      ParentdivClass +
      "'><div class='" +
      loaderColorClass +
      "'><span></span><span></span><span></span></div></div>"
    );

  return (
    "<div id='t" +
    tmpId +
    "_typing' class='" +
    ParentdivClass +
    "'><div class='typtext'><span class='spinme-left'><div class='" +
    loaderColorClass +
    "'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div></div>"
  );
}

function ConversationCenterWrapper(tmpId, message) {
  /* add attributes at end  */
  if (isSet(message) && message !== "")
    if (!IsChatbl(tmpId))
      return '<div class="chat-mblV chat-blH">' + message + "</div>";
    else return '<div class ="cbl_verfy">' + message + "</div>";
}

function returnA(tmpId, element, href, target, aclass) {
  /* add attributes at end  */
  return (
    '<a href="' + href + '" target="' + target + '" class="' + aclass + '">'
  );
}

function skipDiv1(tmpId) {
  //chat bl bug
  var skiphtml1 = returnContainer("", "", "cbl_resend cbl_skip", "", "", "");
  skiphtml1 += returnButton(
    "t" + tmpId,
    "_submitNo1",
    "Skip",
    "cbl_brd1 cbl_clr1 cbl_cp"
  );
  skiphtml1 += "</div>";
  return skiphtml1;
}

function skipDiv2(tmpId) {
  //chat bl bug
  var skiphtml2 = returnContainer("", "", "cbl_resend cbl_skip", "", "", "");
  skiphtml2 += returnButton(
    "t" + tmpId,
    "_submitNo2",
    "Skip",
    "cbl_brd1 cbl_clr1 cbl_cp"
  );
  skiphtml2 += "</div>";
  return skiphtml2;
}

function newchatblScroll(id, tmpId) {
  $("#t" + tmpId + "_scroll").animate(
    {
      scrollTop: $("#t" + tmpId + "_scroll").prop("scrollHeight"),
    },
    1000
  );
  $("#t" + tmpId + "_scroll").on("mousewheel", function (e) {
    $("#t" + tmpId + "_scroll").stop(true, true);
    return true;
  });
}

function IsFormBL(tmpId) {
  var BLFormNames = ["bl", "chatbl", "chatbl-inline"];

  if (isSet(tmpId) && isSet(ReqObj.Form[tmpId])) {
    if (isSet(ReqObj.Form[tmpId].formType))
      var indexOfBl = $.inArray(
        ReqObj.Form[tmpId].formType.toLowerCase(),
        BLFormNames
      );
    if (indexOfBl !== -1) return true;
    else return false;
  }
}

function IsTNCChecked(tmpId, isMandatory, name) {
  var returnValidation = true;
  if (ReqObj.Form[tmpId].IsCheckboxChecked)
    /* If true return true; */
    returnValidation = true;
  else if (isMandatory) {
    if (currentISO() === "IN") returnValidation = true;
    else {
      if (isSet(name) && name !== "") {
        returnValidation = false;
      } else returnValidation = true;
    }
  } else returnValidation = true;
  if (returnValidation) {
    RemoveTncError(tmpId);
  } else {
    ShowTncError(tmpId);
  }
  return returnValidation;
}

function ShowTncError(tmpId) {
  //to make autofocus on tnc checked box
  // $("#t" + tmpId + "_tCondCheckBox").focus();
  $("#t" + tmpId + "_error_tCond")
    .text("Please agree to the terms and conditions")
    .removeClass("bedsnone");
}

function RemoveTncError(tmpId) {
  $("#t" + tmpId + "_error_tCond").addClass("bedsnone");
}

function isOTPBoxHidden(tmpId) {
  return $("#t" + tmpId + "_otpbox").length === 0 ||
    $("#t" + tmpId + "_otpbox").hasClass("bedsnone")
    ? true
    : false;
}

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) e.preventDefault();
  e.returnValue = false;
}

function keydown(e) {
  var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
  for (var i = keys.length; i--;) {
    if (!isSet(e.target.id)) {
      if (e.keyCode === keys[i]) {
        preventDefault(e);
        return;
      }
    }
  }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
    window.addEventListener("onmousewheel", wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
  if (window.removeEventListener) {
    window.removeEventListener("onmousewheel", wheel, false);
  }
  window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}

function chatBlClass(tmpId, todo) {
  // POPUPCHATBL
  if (todo === "left") {
    return "message-text2";
  } else if (todo === "right") {
    // later change to 08 ---POPUPCHATBL
    return "message-text3";
  } else if (todo === "yes") {
    return "blchat-btn2";
  } else if (todo === "change") {
    return "blchat-btn1";
  }
}

function OpenChatBLPopup(tmpId) {
  isBLFormOpen = true;
  if (IsChatBLInline(tmpId)) chatwidgetTransitions(tmpId);
  chatblTransition(tmpId);
  updateChatBlProdName(tmpId);
  chatblFirstMsg(tmpId);
  if (!IsChatBLInline(tmpId)) {
    stopBgScroll();
    $(".t" + tmpId + "blk_scrn").removeClass("dn");
  }
}

function chatblFirstMsg(tmpId) {
  setTimeout(function () {
    $("#t" + tmpId + "hi").removeClass("dn"); //
    UpdateChatName(tmpId);
    if (imeshExist() !== "") {
      if (
        usercookie.getParameterValue(imeshExist(), "uv") !== "V" &&
        isSecondBl()
      ) {
      } else {
        var name = $("#t" + tmpId + "_hiid")
          .text()
          .substr(8);
        $("#t" + tmpId + "_hiid").html(
          "Welcome <span class='cbl_fwb'>" +
          name +
          "</span>, provide below details to get quick quotes from sellers"
        );
      }
    }
  }, 300);
}

function chatwidgetTransitions(tmpId) {
  $("#t" + tmpId + "_chatBL").addClass("cbl_smwrap");
  $("#t" + tmpId + "_bl_form_wrapper_cta").toggleClass("bedsnone");
  $("#t" + tmpId + "message_indicator").addClass("dn");
  $("#t" + tmpId + "_msgDiv").addClass("bedsnone");
  $($("#t" + tmpId + "_blchatfooter").children()[0])
    .removeClass("cbl_bg1")
    .addClass("cbl_bgf1");
  if (
    !(
      isSet($("#t" + tmpId + "_submitNo2")) &&
      $("#t" + tmpId + "_submitNo2").length > 0
    )
  ) {
    $("#t" + tmpId + "_blchatfooter").append(skipDiv2(tmpId)); //chat bl bug
    $("#t" + tmpId + "_submitNo2")
      .parent()
      .addClass("dn");
  }

  $($("#scrollTop").children()[0]).removeClass("tpbCbl"); //for dir
}

function chatblTransition(tmpId) {
  $("#t" + tmpId + "_chatBL").removeClass("cbl_adjust");
  $("#t" + tmpId + "_blchatfooter").removeClass("focus");
  $("#t" + tmpId + "_blchatbody").removeClass("cbl_htgrow");
  IsChatBLInline(tmpId)
    ? $("#t" + tmpId + "_newblchatReply")
      .html("")
      .addClass("cbl_br10 cbl_bgf1")
      .removeClass("cbl_bg1")
    : $("#t" + tmpId + "_newblchatReply").html("");
  IsChatBLInline(tmpId)
    ? $("#t" + tmpId + "_chatBL")
      .removeClass("bedsnone cbl_vh")
      .addClass("cbl_vv")
    : $("#t" + tmpId + "_chatBL")
      .removeClass("bedsnone")
      .css({
        display: "flex",
      });
  chatblHideTransition(tmpId);
  $("#t" + tmpId + "chngPrdDiv").removeClass("dn");
  $("#t" + tmpId + "_blchatfooter").focus();
  IsChatBLInline(tmpId) ? updateChatWidgetGlobalVar(tmpId) : "";
}

function updateChatBlProdName(tmpId) {
  //$(".productname").text(ReqObj.Form[tmpId].mcatName);
  $("#t" + tmpId + "_productname").html("");

  if (
    ShowProdName(tmpId) ||
    (ReqObj.Form[tmpId].mcatName === "" && ReqObj.Form[tmpId].prodName === "")
  ) {
    var html = " <span>Tell us what you need to Get Best Price</span>";
    if (IsChatBLOverlay(tmpId))
      html +=
        "<div class='cbl_msg'>Provide below details to get quick quotes from sellers</div>";
    $("#t" + tmpId + "_productname").append(html);
    return;
  }
  var html = " <span>Get Best Price </span> ";
  var productname =
    ReqObj.Form[tmpId].mcatName !== ""
      ? ReqObj.Form[tmpId].mcatName
      : ReqObj.Form[tmpId].prodName;
  if (productname !== "") {
    html +=
      "for <span class = 'cbl_fwb productname'>" + productname + "</span>";
  }
  if (IsChatBLOverlay(tmpId)) {
    var imeshcookie = imeshExist();
    if (imeshcookie !== "") {
      if (
        usercookie.getParameterValue(imeshcookie, "uv") !== "V" &&
        isSecondBl()
      ) {
        html +=
          "<div class='cbl_msg'>Provide below details to get quick quotes from sellers</div>";
      }
    } else
      html +=
        "<div class='cbl_msg'>Provide below details to get quick quotes from sellers</div>";
  }
  $("#t" + tmpId + "_productname").append(html);
}


function chatblHideTransition(tmpId) {
  $("#t" + tmpId + "_typhere").removeClass("dn");
  $("#t" + tmpId + "_newblchatReply").addClass("cbl_vh");
}

/*
*
* YANDEX TRACKING
*
*/
function yandex_impression_track(userType, formType, modId, data_arr) {
  // Yandex
  if (typeof ym !== "function") {
    (function (b, o, j, n, h, g, f) {
      b[h] =
        b[h] ||
        function () {
          (b[h].a = b[h].a || []).push(arguments);
        };
      b[h].l = 1 * new Date();
      (g = o.createElement(j)),
        (f = o.getElementsByTagName(j)[0]),
        (g.async = 1),
        (g.src = n),
        f.parentNode.insertBefore(g, f);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(51115208, "init", {
      id: 51115208,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  }
  window.yaParams = {
    formType: formType, // "MODID-FromScroll"
    //"userType": [userType, { "formType": [formType, { "modId": [modId, data_arr] }] }]
    //"A": [userType, formType, modId, data_arr]
  };
  //userType: userType [ formType: formType { modId: data_arr } }
  ym(51115208, "params", window.yaParams || {});
}
/*
 *
 * YANDEX Parameter
 *
 */
function getyandexParameter(tmpId) {
  // Yandex

  var data = {};
  data["userType"] = imeshExist() ? "Identified" : "UnIdentified";
  //var append = (isSet(ReqObj.Form[tmpId].source) && ReqObj.Form[tmpId].source !== "")
  if (isSet(ReqObj.Form[tmpId].source) && ReqObj.Form[tmpId].source !== "")
    data["formType"] =
      ReqObj.Form[tmpId].formType + "-" + ReqObj.Form[tmpId].source;
  else data["formType"] = ReqObj.Form[tmpId].formType;
  data["modId"] = modIdf;
  data["data_arr"] = [];

  if (IsChatbl(tmpId)) data["data_arr"].push(ReqObj.Form[tmpId].afflId);
  else {
    data["data_arr"].push(ReqObj.Form[tmpId].ctaName);
    data["data_arr"].push(ReqObj.Form[tmpId].section);
  }

  return data;
}

/*
 *
 * FIRE YANDEX
 *
 */

function fireYandex(tmpId) {
  // Yandex
  var trackdata = getyandexParameter(tmpId);
  yandex_impression_track(
    trackdata.userType,
    trackdata.formType,
    trackdata.modId,
    trackdata.data_arr
  );
}
function isHindi(str) {
  var split = str.split("");
  for (i = 0; i < split.length; i++) {
    var code = split[i].charCodeAt();
    if (code >= 2309 && code <= 2361) return true;
  }
  return false;
}

function isAllCharacters(str) {
  var exp = /^[a-zA-Z ]+$/;
  return exp.test(str);
}

function isAllSpecialChars(str) {
  var exp = /^[^a-zA-Z0-9]+$/;
  return exp.test(str);
}

function initGeolocationenq(tmpId) {
  if (navigator && navigator.geolocation) {
    var x_navigator = navigator.geolocation.getCurrentPosition(
      successCallbackenq,
      function () {
        console.log("error");
      },
      {
        timeout: 10000,
      }
    );
  }
}

function successCallbackenq(position) {
  lt = position.coords.latitude;
  lt = lt.toFixed(5);
  lg = position.coords.longitude;
  lg = lg.toFixed(5);
  accu = position.coords.accuracy;
  accu = accu.toFixed(5);
  if (isSet(lt) && isSet(lg) && lt !== "" && lg !== "") {
    gloc_city = "";
    gloc_cityid = "";
    var data = {
      token: "imartenquiryprovider",
      S_lat: lt,
      S_long: lg,
      GET_CITY: "Y",
      modid: modid,
    };
    var url = appsServerName + "index.php?r=Newreqform/GeoLocation";
    $.ajax({
      url: url,
      data: data,
      type: "POST",
      dataType: "json",
      success: function (res) {
        if (isSet(res) && parseInt(res.CODE) === 200) {
          loc_cityid = res["cityid"];
          loc_iso = res["countryiso"];
          gloc_city = res["cityname"];
          gloc_cityid = res["cityid"];
          newVal =
            "GeoLoc=lt%3D" +
            lt +
            "%7Clg%3D" +
            lg +
            "%7Caccu%3D" +
            accu +
            "%7Clg_ct%3D" +
            gloc_city +
            "%7Clg_ctid%3D" +
            gloc_cityid;
          var geolocdecode =
            "GeoLoc_lt=" +
            lt +
            "|lg=" +
            lg +
            "|accu=" +
            accu +
            "|lg_ct=" +
            gloc_city +
            "|lg_ctid=" +
            gloc_cityid;
          ReqObj.UserDetail["ipcityname"] = gloc_city;
          ReqObj.UserDetail["ipctid"] = gloc_cityid;
          var ipLoc = readCookie("iploc");
          if (ipLoc.includes("|GeoLoc_lt"))
            ipLoc = ipLoc.substr(0, ipLoc.indexOf("|GeoLoc_lt"));
          ipLoc += "|" + geolocdecode;
          var d = new Date();
          d.setTime(d.getTime() + 3 * 60 * 60 * 1000);
          var expires = "expires=" + d.toUTCString();
          document.cookie =
            "iploc=" +
            ipLoc +
            ";" +
            expires +
            "; domain=.indiamart.com; path=/";
          if (isSet(ReqObj.cityId) && isSet(ReqObj.cityId[0])) {
            ReqObj.UserDetail.ipcitid = gloc_cityid;
            ReqObj.UserDetail.ipcityname = gloc_city;
            $(ReqObj.cityId[0]).val(gloc_city);
            $(ReqObj.cityId[0]).focus();
            $(ReqObj.cityId[0]).parent().addClass("eqfcsed");
            if (isSet(ReqObj.cityId[1])) $(ReqObj.cityId[1]).val(gloc_cityid);
            ReqObj.Form[ReqObj.cityId[0].substr(2, 4)].cityTracking = 4;
          }
        } else {
          blenqGATracking("geoloc", "service:GeoLocation:failure", res, 1, ReqObj.cityId[0].substr(2, 4));
        }
      },
      error: function (res) {
        res = isSet(res) ? res : "response undefined";
        blenqGATracking("geoloc", "service:GeoLocation:failure", JSON.stringify(res), 1, ReqObj.cityId[0].substr(2, 4));
      },
    });
  }
}

/*--------------------------------------------update disp zoom key-------------------------------------------------*/
function updateDispZoomImage(tmpId, formType, step, fromwhere) {
  var mcatimage = getImage(ReqObj.Form[tmpId].mcatId);

  if (formType === "bl" || IsChatbl(tmpId)) {
    if (typeof mcatimage === "undefined" || mcatimage === "") {
      ReqObj.Form[tmpId].displayImage = "";
      ReqObj.Form[tmpId].zoomImage = "";
    } else if (isSet(mcatimage) && mcatimage !== "") {
      ReqObj.Form[tmpId].displayImage = mcatimage;
      ReqObj.Form[tmpId].zoomImage = mcatimage;
    }
  }

  if (formType === "bl" || IsChatbl(tmpId)) {
    if (
      (ReqObj.Form[tmpId].displayImage === "" &&
        ReqObj.Form[tmpId].zoomImage === "" &&
        $("#t" + tmpId + "defaultimage").length === 0) ||
      typeof mcatimage === "undefined" ||
      mcatimage === ""
    ) {
      getMcatImage(tmpId, {
        hasCallback: true,
        cbfunc: update_image,
      });

      addImage(tmpId, step, fromwhere);
    } else {
      addImage(tmpId, step, fromwhere);
    }
  }
}

function addImage(tmpId, step, fromwhere) {
  var type =
    step === 1 || fromwhere === "fromservice"
      ? "image"
      : ReqObj.Form[tmpId].ctaType.toLowerCase();
  var key = [
    {
      type: type,
      displayImage: isSet(ReqObj.Form[tmpId].displayImage)
        ? ReqObj.Form[tmpId].displayImage
        : "",
      zoomImage: isSet(ReqObj.Form[tmpId].zoomImage)
        ? ReqObj.Form[tmpId].zoomImage
        : "",
      vidUrl: isSet(ReqObj.Form[tmpId].vidUrl) ? ReqObj.Form[tmpId].vidUrl : "",
    },
  ];
  $("#t" + tmpId + "_prodimg").html(new ReqImage().displayHtml(tmpId, key, 0));
  if (type !== "video") $("#t" + tmpId + "_prodimg").removeClass("bedsnone");
}

/*---------------------------------------------------- update_Image---------------------------------------------------------- */
function update_image(tmpId) {
  if (isSet(tmpId)) {
    if (ReqObj.Form[tmpId].displayImage !== "") {
      $("#t" + tmpId + "_prodimg").html(
        new ReqImage().getImage(
          tmpId + "_dispimage",
          "",
          ReqObj.Form[tmpId].displayImage
        ) +
        '<span class="be-blrprdimg"  style="background-image: url(' +
        ReqObj.Form[tmpId].displayImage +
        ');"></span>'
      );
    } else {
      $("#t" + tmpId + "_prodimg").html(getDefaultImage(tmpId));
    }
  }
}

function getDefaultImage(tmpId) {
  if(getMorePh(tmpId) && !ispdp(tmpId) && modIdf.toLowerCase()!='fcp'){  //new gmp
    return (
      "<div id='t" +
      tmpId +
      "defaultimage' class='gmp-nobgimg'><div class='blnewform_sprit gmp-noimg'></div><span class='gmpImg'>Request Seller For More Images By Filling This Form</span></div>"
    );

  }
  else{
    return (
      "<div id='t" +
      tmpId +
      "defaultimage' class='be-nobgimg'><div class='blnewform_sprit be-noimg'></div></div>"
    );
  }  
}

/*--------------------------------------------------MAIN LEFT SIDE FUNCTION CALLED------------------------------------------------ */

function leftSideTransition(step, tmpId, fromwhere) {
  var formType = ReqObj.Form[tmpId].formType.toLowerCase();
  updateDispZoomImage(tmpId, formType, step, fromwhere);
}

/*--------------------------------------------left Side load zoom ---------------------------------------------------------------- */
function leftSideLoadZoom(tmpId) {
  $("#t" + tmpId + "_zoomimage").on("load", function () {
    if ($("#t" + tmpId + "_prodimg > img")) {
      $("#t" + tmpId + "_prodimg > #t" + tmpId + "_dispimage").remove();
      $("#t" + tmpId + "_prodimg > #t" + tmpId + "_zoomimage").show();
    }
  });
}

function funcOth(id) {
  if ($("#" + id + " option:selected").val() === "Other") {
    $("#other_" + id + "_1").css("display", "block");
    $("#other_" + id + "_1").focus();
  } else {
    $("#other_" + id + "_1").css("display", "none");
  }
}

function funcClick(event, tmpId, count) {
  if (
    !$("#t" + tmpId + "_selectDD" + count).prop("readonly") &&
    event.id !== ""
  )
    return;
  removechatblerror(tmpId);
  $("#t" + tmpId + "select_name" + count).removeClass("dn");
  $(".cbl_sclBr").removeClass("dn");
  var list = $("#t" + tmpId + "select_name" + count);
  var link = $("#t" + tmpId + "_selectDD" + count);
  var firstchild = list[0].firstChild;
  list.find("li").click(function (e) {
    if (e.currentTarget === firstchild) {
      e.preventDefault();
      return;
    }
    var text = $(this).html();
    $(this).siblings().removeClass("cbl_selected");
    $(this).addClass("cbl_selected");
    $("._ul_select").addClass("dn");
    $(".cbl_sclBr").addClass("dn");
    if (text.toLowerCase() === "other") {
      $(link).removeAttr("readonly");
      $(link).prop("placeholder", "enter the unit");
      $(link).focus();
      text = "";
    } else {
      $(link).attr("readonly", "true");
    }
    link.val(text);
    $(".cbl_skip").addClass("dn");
    tov1(tmpId, text);
  });
}

function updateToAsk(tmpId) {
  ReqObj.Form[tmpId].cName.toask =
    imeshExist() !== "" &&
      (typeof ReqObj.UserDetail.cName === "undefined" ||
        (isSet(ReqObj.UserDetail.cName) && ReqObj.UserDetail.cName === ""))
      ? true
      : false;
}

function cNameIsq(tmpId) {
  return ReqObj.Form[tmpId].cName.rb === true ||
    ReqObj.Form[tmpId].cName.qtut === false ||
    ReqObj.Form[tmpId].cName.tov === false ||
    ReqObj.Form[tmpId].cName.tov1 === true ||
    ReqObj.Form[tmpId].cName.isq === false
    ? true
    : false;
}

function cNameConditions(tmpId) {
  var isoCurrent = currentISO();
  var isqc = cNameIsq(tmpId);
  ReqObj.Form[tmpId].cName.toask =
    imeshExist() !== "" &&
      ReqObj.Form[tmpId].cName.isShown === false &&
      (typeof ReqObj.UserDetail.cName === "undefined" ||
        (isSet(ReqObj.UserDetail.cName) && ReqObj.UserDetail.cName === ""))
      ? true
      : false;
  if (currentISO() !== "IN" && ReqObj.Form[tmpId].cName.toask === true)
    return true;
  ReqObj.Form[tmpId].cName.toask =
    ReqObj.Form[tmpId].cName.toask === true &&
      ReqObj.Form[tmpId].cName.cdiv === false
      ? true
      : false;
  if (
    ReqObj.Form[tmpId].cName.toask === true &&
    ReqObj.Form[tmpId].cName.prodServ === "P" &&
    isoCurrent === "IN"
  ) {
    return isqc;
  }
  return false;
}

function gstConditions(tmpId) {
  return currentISO() === "IN" &&
    ReqObj.UserDetail.cName !== "" &&
    ReqObj.Form[tmpId].gst.html === false &&
    ReqObj.gst.toask === true
    ? true
    : false;
}
function gstConditionsSSB(tmpId) {
  return currentISO() === "IN" &&
    ReqObj.UserDetail.cName !== "" &&
    ReqObj.gst.toask === true
    ? true
    : false;
}
function urlConditions(tmpId) {
  return currentISO() !== "IN" &&
    ReqObj.Form[tmpId].url.html === false &&
    ReqObj.url.toask === true
    ? { ask: true, what: "Website Url", key: 2 }
    : { ask: false, what: "", key: -1 };
}

function isRadioOtherClicked(revent) {
  var RadioBoxEl = $(revent);
  RadioBoxEl.children("input").prop("checked", false);
  RadioBoxEl.children("input").removeClass("waschecked");
  RadioBoxEl.removeClass("sl-box chksl");
  RadioBoxEl.children().children(".bechk-in").children().hide();
}

function radCheck(el) {
  if (isSet(el)) {
    var id = $(el).children("span").attr("id");
    var str = id;
    var templateId = str.slice(0, 5);
    pfArr = ["", "", ""];
    if (isSet(ReqObj.Form[str.slice(1, 5)].staticPrefilledCity))
      enrichCityhtml(
        id,
        templateId,
        0,
        ReqObj.Form[str.slice(1, 5)].staticPrefilledCity
      );
    else enrichCityhtml(id, templateId, 0, pfArr);
  }
}

function enrichCityhtml(id, templateId, type, pfArr) {
  var ctid = templateId + "_enrich_city";
  var html_city = "";
  var err_id = templateId + "_error_city_locpref";
  if (
    $("#" + id).html() === "Anywhere in India" ||
    $("#" + id).html() === "Local Only" ||
    $("#" + id).text() === "Specific City"
  )
    $("#spcity").html("");
  if ($("#" + id).text() === "Specific City") {
    var cityId = "";
    let beWbl = isInactiveBL(templateId.substr(1, 5)) ? "beW10bl" : "beW15";
    for (i = 1; i < 4; i++) {
      cityId = "";
      cityId = ctid + i;
      if (templateId.substr(1, 2) === "06") {
        html_city +=
          "<div class='" +
          ssbClass("speccity", templateId.substr(1, 5)) +
          "'><label class=''>City " +
          i +
          "</label><input type='text' id=" +
          cityId +
          " name=" +
          cityId +
          " autocomplete='off'  class='' onblur='chckval(" +
          cityId +
          ",this.value);'><input type='hidden' id='" +
          cityId +
          "specificcity_hidden'></div>";
      } else {
        html_city +=
          "<div class='bepr " + beWbl + " belft text_bx'><label class='be-lbl'>City " +
          i +
          "</label><input type='text' value = '" +
          pfArr[i - 1] +
          "' id=" +
          cityId +
          " name=" +
          cityId +
          " autocomplete='off'  class='be-slbox' onblur='chckval(" +
          cityId +
          ",this.value);'><input type='hidden' id='" +
          cityId +
          "specificcity_hidden'></div>";
      }
    }
    let bemt = isInactiveBL(templateId.substr(1, 5)) ? " bemt15" : " bemt5";
    if (!($("#spcity").length > 0))
      var citydiv =
        templateId.substr(1, 2) === "06" ? isnewSSB(templateId.substr(1, 5))
          ? "<div id='spcity' class='nb-flex nb-mt10' ></div>"
          : "<div id='spcity' class='mb-flex mb-mt10' style='height:54px;'></div>"
          : "<div id='spcity' class='be-row " + bemt + "' style='height:54px;'></div>";
    $("#" + id)
      .parent()
      .parent()
      .parent()
      .append(citydiv);
    $("#spcity").html(html_city);
  }
  if (
    $("#" + id).text() === "Local Only" ||
    $("#" + id).text() === "Anywhere in India"
  ) {
    $("#spcity").remove();
    if ($("#" + ctid + "_err").length)
      $("#" + ctid + "_err").addClass("bedsnone");
  } else if ($("#" + id).text() === "Specific City" && type !== 1) {
    var isSelected = $("#" + id)
      .parent()
      .siblings("input")
      .hasClass("waschecked");
    if (isSelected) $("#spcity").remove();
  }
  enrichCityMultiple(templateId);
}
function chckval(cityid, val) {
  // if (val == '') {
  //   $('#' + cityid).val('');
  // }
}
function enrichCityMultiple(templateId) {
  var autosuggcls =
    templateId.substr(1, 2) === "06"
      ? isnewSSB(templateId.substr(1, 5))
        ? "be-sugg nb-spctysugg"
        : "be-sugg mb-spctysugg"
      : "be-sugg";
  for (var i = 1; i <= 3; i++) {
    if (document.getElementById(templateId + "_enrich_city" + i) !== null) {
      if (typeof Suggester !== "undefined") {
        window[templateId + "city_sugg_" + i] = new Suggester({
          element: templateId + "_enrich_city" + i,
          onSelect: selecttext_city_enrich,
          type: "city",
          fields: "std,state,id,stateid",
          placeholder: "",
          minStringLengthToDisplaySuggestion: 1,
          autocompleteClass: autosuggcls,
          displayFields: "value,state",
          displaySeparator: " >> ",
          filters: "iso:IN",
          recentData: false,
        });
      }
    }
  }
}

function selecttext_city_enrich(event, ui) {
  if (isSet(ui)) {
    this.value = ui.item.value;
    // $("#" + this.id + "specificcity_hidden").val(ui.item.value);
    $("#" + this.id + "specificcity_hidden").val(ui.item.data.id);

    // var cityid = this.id;
    //$("#")
    // document.getElementById(cityid).value = ui.item.data.id;
  }
}

function thankYouTrack(tmpId, msg, sellerId) {
  var formtype =
    isSet(ReqObj.Form[tmpId].formType) &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ? "Post Buy Leads" : "Send Enquiry";
  if (isSet(sellerId)) blenqGATracking(formtype, msg, sellerId, 1, tmpId);
  else blenqGATracking(formtype, msg, getEventLabel(), 1, tmpId);
  return true;
}

// get more photos form changes
function saveEnr(tmpId){

  if (isSet(tmpId)) {

      // if(ReqObj.Form[tmpId].ReqDtlBox === "")
      var data = RequirementDtl.prototype.getData(tmpId);

      var PreRdObj =
        PreAjax("RequirementDtl", tmpId);

      var hitfinserv = "";
  
      // $("#yajaca").hide(); // click away message on pns form
      if(ValidGenId(ReqObj.Form[tmpId].generationId)){
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
                  obj: PreRdObj,
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
                hitfinserv: hitfinserv,
                type: 1,
              },
            });
      }
      else{
          PostAjax(PreRdObj, tmpId);
      }
        
  } 
}

// ends here

function ThankYou(tmpId) {
  this.payxImgUrl = "https://paywith.indiamart.com?bannerid=EN_Form";
  this.payxAdvUrl = "https://paywith.indiamart.com?bannerid=EN_Form_ADV_";
  this.ThankYouHtml = "";
  this.AfterThankYouHtml = "";
  this.className = "ThankYou";
  this.idToHide = "";
  this.idToAppend = "";
  ReqObj.Form[tmpId].addid = IsChatbl(tmpId)
    ? IsChatBLInline(tmpId)
      ? "div-gpt-ad-1583149499454-0"
      : "div-gpt-ad-1626259853445-0"
    : "div-gpt-ad-1576734581911-0";
  this.addUnitDiv = IsChatbl(tmpId)
    ? IsChatBLInline(tmpId)
      ? "<div id='div-gpt-ad-1583149499454-0' style='width: 320px; height: 50px;'></div>"
      // : "<div id='headerChatBLAd' style='width: 728px; height: 90px;'><pubguru data-pg-ad='Indiamart_header_chatBL'></pubguru></div>"
      : "<div id='div-gpt-ad-1626259853445-0' style='width: 728px; height: 90px;'></div>"
    : // : "<div id='thankyouAd1' style='width: 728px; height: 90px;margin: 10px auto;'><pubguru data-pg-ad='Indiamart_PBRENQ_1'></pubguru></div>";
       "<div id='div-gpt-ad-1576734581911-0' style='width: 728px; height: 90px;margin: 10px auto;'></div>";
  this.adsMcat = ["148850", "12728", "142719", "178788", "184859"];
  this.initialisation(tmpId);
}

ThankYou.prototype.initialisation = function (tmpId) {
  if (!IsChatbl(tmpId)) {
    this.idToAppend = "#t" + tmpId + "_thankDiv";
    this.idToHide = "#t" + tmpId + "_mcont";
    if (pdpenqImage(tmpId)) $("#t" + tmpId + "parent_iframe").html("");
  }
};

ThankYou.prototype.displayHtml = function (tmpId) {
  if (isSet(tmpId)) {
    this.fireServices(tmpId);
    //this.showThankYou(tmpId);
    return [this.ThankYouHtml];
  }
};

ThankYou.prototype.hasHtml = function (ThankYouObj) {
  if (isSet(ThankYouObj)) {
    this.showThankYou(ThankYouObj.tmpId);
    ThankYouObj.that.NumberofClassCalled -= 1;
    if (this.ThankYouHtml !== "") this.isHtmlPresent(ThankYouObj);
    else this.isHtmlNotPresent(ThankYouObj);
  }
};

ThankYou.prototype.isHtmlPresent = function (ThankYouObj) {
  AttachObject(ThankYouObj.object, ThankYouObj.tmpId);
  if (isSet(ThankYouObj.AfterService)) {
    for (var i = 0; i < ThankYouObj.AfterService.length; i++) {
      ThankYouObj.that.MakeSeq(ThankYouObj.AfterService[i], ThankYouObj.tmpId);
    }
  }
  if (ThankYouObj.that.NumberofClassCalled === 0)
    makeFinalSeq(ThankYouObj, ThankYouObj.tmpId);
};

ThankYou.prototype.isHtmlNotPresent = function (ThankYouObj) {
  if (ThankYouObj.hasFallback) CreateSeq(ThankYouObj.FallbackObj);
};

/* -------------------------------------------------------------Save Details/Other Functions----------------------------------------------- */
// ThankYou.prototype.SaveDetails = function (tmpId) { };
// ThankYou.prototype.handleHeading = function (tmpId) { };
/*-------------------------------------------------------------get html--------------------------------------------------------------- */
ThankYou.prototype.getThankYouData = function (tmpId) {
  var imeshcookie = usercookie.getCookie("ImeshVisitor");
  var data = {};
  data["imeshcookie"] = imeshcookie;
  data["em"] = ReturnCorrectVal(
    usercookie.getParameterValue(imeshcookie, "em"),
    ""
  );
  data["ev"] = ReturnCorrectVal(
    usercookie.getParameterValue(imeshcookie, "ev"),
    ""
  );
  data["utyp"] = ReturnCorrectVal(
    usercookie.getParameterValue(imeshcookie, "utyp"),
    ""
  );
  data["cntry_iso"] = ReturnCorrectVal(
    usercookie.getParameterValue(imeshcookie, "iso"),
    ""
  );
  data["formType"] = isSet(ReqObj.Form[tmpId].formType)
    ? ReqObj.Form[tmpId].formType.toLowerCase()
    : "";
  data["manageSname"] = webAddressLocation.match(/^dev/)
    ? "https://dev-"
    : webAddressLocation.match(/^stg/)
      ? "https://stg-"
      : "https://";
  data["rglusr"] = isSet(ReqObj.Form[tmpId].R_glusr_id)
    ? ReqObj.Form[tmpId].R_glusr_id
    : "";
  data["pname"] = isSet(ReqObj.Form[tmpId].R_title)
    ? ReqObj.Form[tmpId].R_title
    : "";
  data["comp"] = isSet(ReqObj.Form[tmpId].company)
    ? ReqObj.Form[tmpId].company
    : "";
  return data;
};

ThankYou.prototype.showThankYou = function (tmpId) {
  var data = this.getThankYouData(tmpId);
  /* Don't change the sequence ! */
  data["tmpId"] = tmpId;
  data["manageBL"] = this.manageBL(data);
  data["grBoxhtml"] = this.grBoxhtml(data);
  //data["payxHtml"] = this.payxHtml(data);
  //data["paybannerHtml"] = this.paybannerHtml(data);
  data["payNumber"] = this.payNumber(data);
  data["thankmess"] = this.thankmess(data);
  data["knowMore"] = this.knowMore(data);
  this.setPayxUrl(data);
  this.payxImgUrl =
    data["formType"] === "enq" ? this.payxImgUrl + "1" : this.payxImgUrl + "2";
  this.payxAdvUrl =
    data["formType"] === "enq" ? this.payxAdvUrl + "1" : this.payxAdvUrl + "2";

  //data["payxBsec"] = this.payxBsec(data);

  this.getHtml(data);
};
ThankYou.prototype.setPayxUrl = function (data) {
  if (data["formType"] === "enq") {
    var glid = data["rglusr"] === "" ? btoa(-1) : btoa(data["rglusr"]);
    var cmp = data["comp"] === "" ? btoa(-1) : btoa(data["comp"]);
    var pn = data["pname"] === "" ? btoa(-1) : btoa(data["pname"]);
    this.payxImgUrl =
      this.payxImgUrl + "&S_name=" + cmp + "&s_glid=" + glid + "&p_name=" + pn;
    this.payxAdvUrl =
      this.payxAdvUrl + "&S_name=" + cmp + "&s_glid=" + glid + "&p_name=" + pn;
  }
};

ThankYou.prototype.manageBL = function (data) {
  return data["utyp"].toUpperCase() === "P" ||
    (data["utyp"].toUpperCase() !== "P" &&
      window.location.href.match(/seller.indiamart.com/))
    ? "" +
    data["manageSname"] +
    "seller.indiamart.com/blgen/postbl#tab=managebl/"
    : "" + data["manageSname"] + "my.indiamart.com/buyertools/managebl/";
};

ThankYou.prototype.grBoxhtml = function (data) {
  var cls = isSSB(data["tmpId"]) ? "mb-fs14 mb-mt15 mb-lh16" : "be-grbg";
  return data["imeshcookie"].indexOf("ev") >= 0 &&
    data["ev"] !== "V" &&
    data["em"] !== ""
    ? returnContainer(
      "",
      "",
      cls,
      "",
      "Verify your email <b>" +
      data["em"] +
      "</b> as suppliers are more likely to contact verified buyers.",
      ""
    ) + "</div>"
    : data["em"] !== ""
      ? ""
      : "<div id = 't" + data["tmpId"] + "_thnkemdiv' class = 'cbl_vh'></div>";
};

ThankYou.prototype.thankmess = function (data) {
  if (isSSB(data["tmpId"])) {
    return thankmessSSB(data);
  }

  var msg =
    data["formType"] === "bl"
      ? "IndiaMART has received your requirement"
      : "Your requirement has been sent to " +
      "<span class='befwt'>" +
      ReqObj.Form[data["tmpId"]].rcvName +
      "</span>";

  var s_glid = btoa(ReqObj.Form[data["tmpId"]].rcvGlid); //BMC href
  sup_glid =
    s_glid.indexOf("=") == -1
      ? s_glid
      : s_glid.substring(0, s_glid.indexOf("="));
  var bmcURL = isSet(ReqObj.Form[data["tmpId"]].rcvGlid)
    ? "https://my.indiamart.com/enquiry/messagecentre/?sup_glid=" + sup_glid
    : "https://my.indiamart.com/enquiry/messagecentre/";

  var html = "";
  // $("#t" + data["tmpId"] + "_thankDiv").addClass("futhk");
  // 
  $("#t" + data["tmpId"] + "_thankDiv").addClass("futhk frmscroll");
  // 
  if (data["cntry_iso"] !== "IN")
    $("#t" + data["tmpId"] + "_thankDiv").addClass("nfusr");
  var _cls =
    data["cntry_iso"] === "IN"
      ? "bethhdg befwt bemb5 idsf id_aic jst_con bemt30"
      : "bethhdg befwt bemb5 mgtp";
  html += '<div class="' + _cls + '"><i class="cHkIcon"></i>Thank You!</div>';

  //html += returnContainer("", "'", "txt-cnt befs16", "", "", "") + returnContainer("", "'", "bethhdg befwt bemt30 bemb5", "", "Thank You!", "") + "</div>";
  var addCls = pdpenqImage(data["tmpId"]) ? " eqbgC3 eqp10" : "";
  html +=
    returnContainer("", "'", "txt16 txt33 xMt10" + addCls, "", msg, "") +
    "</div>";
  html += data["grBoxhtml"];
  //var targetval = (ReqObj.Form[data["tmpId"]].target_self === "true") ? "_self" : "_blank";
  var targetval = "_blank";
  html +=
    data["formType"] === "bl"
      ? ""
      : returnContainer("", "", "clr-b", "", "", "") + "</div >";
  var br =
    data["cntry_iso"] === "IN" &&
      !pdpenqImage(data["tmpId"])
      ? "<br>"
      : "";
  var cls_mng =
    currentISO() === "IN"
      ? "bedblk txt16 thbtmn ew50"
      : "bedblk txt16 thbtmn";
  var cta_cls = data["cntry_iso"] === "IN" ? "tvwBtn" : "tvwBtn ml5";
  var mng_req_msg =
    data["formType"] === "bl"
      ? returnContainer("", "manage_rqt", cls_mng, "", "", "") +
      "<span class='befwt'>Want to add/edit your details to your " +
      br +
      "requirement? Do it here:</span>" +
      returnA("", "", data["manageBL"], targetval, "tvwBtn ml5") +
      "Manage Your Requirement" +
      "</a></div>"
      : "<div id='manage_msg' class='" +
      cls_mng +
      " befwt'>To check further replies from the " + //BMC href
      br +
      "supplier  <a href=" +
      bmcURL +
      " target = '_blank' class='" +
      cta_cls +
      " wd235' id='t" +
      data["tmpId"] +
      "msglink' onclick = 'return thankYouTrack(\"" +
      data["tmpId"] +
      '","ThankYou_message")\'> view Messages</a ></div>';
  var br = "<br>";
  var cls = "txt16 thbtmn ew50";
  var seller_obj = get_message();
  var sellerLink =
    "<div id='manage_seller' class='" +
    cls +
    "'><span class='befwt'>" +
    seller_obj["msg"] +
    "</span><a href='https://seller.indiamart.com/' target = '_blank' class='tsnBtn wd235' id='t" +
    data["tmpId"] +
    "sellink' onclick = 'return thankYouTrack(\"" +
    data["tmpId"] +
    '","Seller Click")\'>' +
    seller_obj["cta_msg"] +
    "</a ></div>";
  mng_req_msg +=
    currentISO() === "IN" && !toAskCname(data["tmpId"]) ? sellerLink : "";
  paren_mng =
    currentISO() === "IN"
      ? pdpenqImage(data["tmpId"])
        ? "idsf eptb10 ejcsv bemt5 bemb5"
        : "idsf ebrtc eptb10 ejcsv bemt5 bemb5"
      : "eptb10 ejcsv bemt5 bemb5";
  html = html + "<div class='" + paren_mng + "'>" + mng_req_msg;
  return html;
};

ThankYou.prototype.knowMore = function (data) {
  var aclass = data["formType"] === "bl" ? "" : "be_payXurlADV";
  return (
    returnA("", "", this.payxAdvUrl, "_blank", aclass) +
    returnSpan("", "payxknowmore", "Know More", "kMr") +
    "</a>"
  );
};

function getHtmlPlaWidget(res, val) {
  var pwhtml =
    "<div id = 'plawid' class='ebrtbc idsf pJc ebgF3 eptb10'><div><div class='eqs16 befwt beclr3 bemb10'>Shop Similar Products Now</div>";
  var noproduct = res.length;
  var prolist = "<ul class='idsf eqEcmp bemt5'>";
  var list = "";
  var obj = res;
  var pimage = "",
    pri_uni = "",
    pdpurl = "";
  for (var i = 0; i < noproduct; i++) {
    pimage =
      isSet(obj[i]["IMAGE_250X250"]) && obj[i]["IMAGE_250X250"] != ""
        ? obj[i]["IMAGE_250X250"]
        : obj[i]["IMAGE_125X125"];

    pri_uni =
      obj[i]["PRICE_F"] != "" && obj[i]["PRICE_F"] != null
        ? obj[i]["PRICE_F"]
        : "";

    pdpurl = obj[i]["PDP_URL"].split("?");

    if (obj[i]["ITEM_NAME"].includes('"')) {
      var itn = obj[i]["ITEM_NAME"].split('"');
      obj[i]["ITEM_NAME"] = itn[1];
    } {                        //landing url change
      var url_to_land= isSet(obj[i]["ECOM_CART_URL"]) && obj[i]["ECOM_CART_URL"] !== "" ? obj[i]["ECOM_CART_URL"] : obj[i]["ECOM_ITEM_LANDING_URL"];
      if(isSet(url_to_land) && url_to_land !== ""){
      list +=
      "<li><div><div class='ecmpImg'><a href=" +
      pdpurl[0] +
      "?ecom  class='idsf pJc id_aic'><img alt=" +
      obj[i]["ITEM_NAME"] +
      " src=" +
      pimage +
      "></a><div class='eplf6 txtElp epmt7'><a href=" +
      pdpurl[0] +
      "?ecom class='eComtxt epf12 eplh16'>" +
      obj[i]["ITEM_NAME"] +
      "</a></div></div><div class='eplf6 bemt5 eplh16 easFd'><div class='befs13 befwt beclr3'>" +
      pri_uni +
      "</div><div class='txtElp txtElp1'><a href=" +
      obj[i]["COMPANY_URL"] +
      "?ecom class='befs11 ectxt63'>" +
      obj[i]["COMPANYNAME"] +
      "</a></div><a href=" +
      url_to_land +
      " class='emBynw' onclick=\"return thankYouTrack('" +
      val +
      "','Buy_now_ecom'," +
      obj[i]["GLUSR_ID"] +
      ")\" target='_blank'>Buy Now</a></div></div></li>";}
    }
  }
  prolist += list + "<ul>";
  pwhtml += prolist + "</div></div>";
  return pwhtml;
}

ThankYou.prototype.payNumber = function (data) {
  // return (data["formType"] === "bl") ? returnContainer("", "", "befs16 txt-cnt", "", "Have an urgent requirement ?" + returnSpan("", "", "Call us at 81-8181-8181", "befwt"), "margin-top:50px;") + '</div>' : "";

  return data["formType"] === "bl" ? "" : "";
};

ThankYou.prototype.getHtml = function (data) {
  if (IsChatbl(data["tmpId"])) {
    this.getChatBlThankYouHtml(data);
  } else {
    this.getBlEnqThankYouHtml(data);
  }
};

ThankYou.prototype.getChatBlThankYouHtml = function (data) {
  ReqObj.Form[data["tmpId"]].toCloseChatBL = true;
  var classtotest = chatBlClass(data["tmpId"], "left");
  var leftright = IsChatbl(data["tmpId"]) ? "<div class = 'cbl_verfy'>" : "";
  var message = IsChatbl(data["tmpId"])
    ? '<div class="txt_area cbl_brd1 cbl_clr1"><svg class="cbl_ok cbl_field"><use xlink:href="#t' +
    data["tmpId"] +
    'cblcheck"></use></svg><span class="befwt">We have received your requirement</span>. We will soon connect you with relevant suppliers. </div>'
    : '<span class="chat-tickbx"></span><span class="befwt">We have received your requirement</span>. We will soon connect you with relevant suppliers.';
  var thankyou_html = ConversationLeftWrapper(data["tmpId"], message, {
    classtotest: classtotest,
    leftright: leftright,
  });
  //this.AfterThankYouHtml = "<div class='chat-thak'>Connected Suppliers will appear in your  <a href='" + MesssageRedirectUrl + "' target='_blank'><span class='chat-blH'>Messages</span></a></div>";
  this.ThankYouHtml =
    thankyou_html +
    "<div class = 'cbl_advpos'><span id = 't" +
    data["tmpId"] +
    "add_helper_text' class='cbl_vrfy cbl_adv'>ADVERTISEMENT</span>" +
    this.addUnitDiv +
    "</div>";
};

ThankYou.prototype.getBlEnqThankYouHtml = function (data) {
  var thankyou_html = "";
  ReqObj.Form[data["tmpId"]].flags["isThankYouCalled"] = true;
  if (data["cntry_iso"] === "IN") {
    thankyou_html = ""; //+ data["payxBsec"];
    //thankyou_html += "<div class='bevT be-w710 bedtc'>";
    var close = "";
    thankyou_html += "<div class=''>"; //fgsdghdh
    thankyou_html =
      ReqObj.Form[data["tmpId"]].typeofform.toLowerCase() === "bl"
        ? thankyou_html +
        "<div class='be-cls' id=t" +
        data["tmpId"] +
        "_cls >X</div >"
        : thankyou_html +
        "<div class='be-cls' id=t" +
        data["tmpId"] +
        "_cls >" +
        close +
        "</div>"; // cross
    thankyou_html += "<div class='txt-cnt befs16'>" + data["thankmess"];
    if (!isSSB(data["tmpId"])) {
      thankyou_html += data["payNumber"];
      thankyou_html += "</div></div>";
      var plaWidgetObj = null;
      try{
      plaWidgetObj = JSON.parse(sessionStorage.getItem("plaWidget-" + ReqObj.Form[data["tmpId"]].mcatId));
      }
      catch(err){
        plaWidgetObj = null;
      }
      if (
        isSet(plaWidgetObj) &&
        !(isInactiveBL(data["tmpId"]) && ispdp(data["tmpId"])) && //inactive changes
        plaWidgetObj.length >= 2
      ) {
        thankyou_html += getHtmlPlaWidget(plaWidgetObj, data["tmpId"]);
      }


      if (!isSet(plaWidgetObj) || plaWidgetObj.length < 2) {   
          this.addUnitDiv2 ="<div id='div-gpt-ad-1664287620614-0' style='width: 728px; height: 90px;margin: 10px auto;'></div>"; 
           thankyou_html += this.addUnitDiv2;
           addslot2 = 1;        
      }

      thankyou_html += this.addUnitDiv;
    }
  } else {
    var thnkcls = isnewSSB(data["tmpId"])
      ? "beauto dtc bevT"
      : "beauto dtc bevT";
    var cross = isImageVidEnq(data["tmpId"])
      ? thankyou_html +
      "<div class='be-cls' id=t" +
      data["tmpId"] +
      "_cls ></div >"
      : "<div class='be-cross' id=t" + data["tmpId"] + "_cls>X</div>";

    thankyou_html =
      "<div class='" +
      thnkcls +
      "'>" +
      cross +
      "<div class='txt-cnt befs16'>" +
      data["thankmess"];
    //thankyou_html = ($.inArray(ReqObj.Form[data["tmpId"]].mcatId, this.adsMcat) === -1) ? thankyou_html + "" : thankyou_html + this.addUnitDiv;
    if (!isSSB(data["tmpId"])) {
      thankyou_html = thankyou_html + "</div></div>";     
        this.addUnitDiv2 ="<div id='div-gpt-ad-1664287620614-0' style='width: 728px; height: 90px;margin: 10px auto;'></div>";   
      thankyou_html += this.addUnitDiv2;
      addslot2 = 1;    

      thankyou_html += this.addUnitDiv;
    }
  }
  this.ThankYouHtml = thankyou_html;
};

/*-------------------------------------------------------------EVENTS--------------------------------------------------------------- */

ThankYou.prototype.defaultEvents = function (tmpId, type) {
  this.handleEvents(tmpId, type);
  this.fireTracking(tmpId);
  IsChatBLInline(tmpId)
    ? setTimeout(function () {
      isSet(ReqObj.Form[tmpId].toCloseChatBL) &&
        ReqObj.Form[tmpId].toCloseChatBL &&
        $("#t" + tmpId + "_chatBL").hasClass("cbl_vv")
        ? CloseForm(tmpId)
        : "";
    }, 10000)
    : "";    
  this.googleAddEvents(tmpId);
  this.handleUI(tmpId);

  if (isSSB(tmpId)) {
    ReqObj.Form[tmpId].flags.toCallUpdateSeq = false;
    if (isnewSSB(tmpId) && !ReqObj.Form[tmpId].flags["toCallUpdateSeq"])
      document.documentElement.scrollTop = 0;
  }
  if (
    isSet($("#t" + tmpId + "_thankDiv")) &&
    isSet($("#t" + tmpId + "_thankDiv").children()) &&
    isSet($("#t" + tmpId + "_thankDiv").children()[0])
  )
    $("#t" + tmpId + "_thankDiv")
      .children()[0]
      .setAttribute("class", "ths_w");
};

ThankYou.prototype.handleUI = function (tmpId) {
  if (IsChatbl(tmpId)) {
    $("#t" + tmpId + "_chatBL").addClass("cbl_adjust");
    $("#t" + tmpId + "_blchatbody").addClass("cbl_htgrow");
  }
  if (isSSB(tmpId) && !isnewSSB(tmpId)) {
    $("#t" + tmpId + "_q_send_req_button").addClass("dn");
  }
  if (currentISO() !== "IN" && isEnq(tmpId))
    $("#t" + tmpId + "_thankDiv").addClass("fnUser");
};
//fwetgweyerhrej
/* DON'T TOUCH THIS CODE !!!!!!!! */

ThankYou.prototype.googleAddEvents = function (tmpId) {
  if (window.googletag && googletag.apiReady && typeof (googletag.defineSlot) === "function")
    IsChatbl(tmpId)
      ? IsChatBLInline(tmpId)
        ? this.chatblAdd(tmpId)
        : this.chatLikeblAdd(tmpId)
      : this.BlEnqAdd(tmpId);
  else {
    $("#t" + tmpId + "add_helper_text").addClass("dn");
  }
};

var slot2 = "";
var addslot2 = 0;
var slot = "";
var slotChat = "";
var slotChatLike = "";
 

ThankYou.prototype.BlEnqAdd = function (tmpId) {
  var that = this;
  var adsMcat = that.adsMcat;
  var adult =
    isSet(ReqObj.Form[tmpId].isAdult) && ReqObj.Form[tmpId].isAdult !== ""
      ? ReqObj.Form[tmpId].isAdult
      : 2;
  // for (var i = 0; i < adsMcat.length; i++) {
  if (
    (ReqObj.Form[tmpId].mcatId !== "" || ReqObj.Form[tmpId].catId !== "") &&
    (parseInt(adult) === 2 || parseInt(adult) === 0)
  ) {
    if(typeof(googletag)!=="undefined"){
    window.googletag = window.googletag || {
      cmd: [],
    };
    if(window.googletag && googletag.apiReady && googletag.pubadsReady && typeof (googletag.defineSlot) === "function"){
    googletag
      .pubads()
      .setTargeting("mcatid", ReqObj.Form[tmpId].mcatId)
      .setTargeting("catid", ReqObj.Form[tmpId].catId);


    if (slot2 === "" && addslot2 === 1) {
      slot2 = googletag
        .defineSlot(
          "/3047175/Desktop_PBRENQ_Adunit_2",
          [728, 90],
          "div-gpt-ad-1664287620614-0"
        )
        .addService(googletag.pubads());
      ReqObj.isAddSlot = 1;
    }

    if (slot === "") {
      slot = googletag.defineSlot(
        "/3047175/Desktop_PBRENQ_Adunit",
        [728, 90],
        "div-gpt-ad-1576734581911-0"
      );
      ReqObj.isAddSlot = 1;
    }
    slot.addService(googletag.pubads());

    if (addslot2 === 1) {
      googletag.pubads().refresh([slot2]);
    }
    googletag.pubads().refresh([slot]);
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();

    if (addslot2 === 1) {
      googletag.display("div-gpt-ad-1664287620614-0");
      addslot2 = 0;
    }
    googletag.display("div-gpt-ad-1576734581911-0");


  }
  }
}

  if (
    !IsChatbl(tmpId) &&
    $.inArray(ReqObj.Form[tmpId].mcatId, adsMcat) === -1
  ) {
    // nhi hai
    $("#t" + tmpId + "_mcont").addClass("oEq");
  } else {
    $("#t" + tmpId + "_mcont").removeClass("oEq");
  }
}; 

ThankYou.prototype.chatblAdd = function (tmpId) {
  var adult =
    isSet(ReqObj.Form[tmpId].isAdult) && ReqObj.Form[tmpId].isAdult !== ""
      ? ReqObj.Form[tmpId].isAdult
      : 2;
  if (
    (ReqObj.Form[tmpId].mcatId !== "" || ReqObj.Form[tmpId].catId !== "") &&
    (parseInt(adult) === 2 || parseInt(adult) === 0)
  ) {
    if(typeof(googletag)!=="undefined"){
    window.googletag = window.googletag || {
      cmd: [],
    };
    if(window.googletag && googletag.apiReady && googletag.pubadsReady && typeof (googletag.defineSlot) === "function"){
    googletag
      .pubads()
      .setTargeting("mcatid", ReqObj.Form[tmpId].mcatId)
      .setTargeting("catid", ReqObj.Form[tmpId].catId);
    if (slotChat === "") {
      slotChat = googletag.defineSlot(
        "/3047175/Desktop_PBRENQFORMS_ChatAdunit",
        [320, 50],
        "div-gpt-ad-1583149499454-0"
      );
    }
    slotChat.addService(googletag.pubads());
    googletag.pubads().refresh([slotChat]);
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
    googletag.display("div-gpt-ad-1583149499454-0");
  }
  } 
} else {
    $("#t" + tmpId + "add_helper_text").addClass("dn");
  }
};



ThankYou.prototype.chatLikeblAdd = function (tmpId) {
  var adult =
    isSet(ReqObj.Form[tmpId].isAdult) && ReqObj.Form[tmpId].isAdult !== ""
      ? ReqObj.Form[tmpId].isAdult
      : 2;
  if (
    (ReqObj.Form[tmpId].mcatId !== "" || ReqObj.Form[tmpId].catId !== "") &&
    (parseInt(adult) === 2 || parseInt(adult) === 0)
  ) {
    if(typeof(googletag)!=="undefined"){
    window.googletag = window.googletag || {
      cmd: [],
    };
    if(window.googletag && googletag.apiReady && googletag.pubadsReady && typeof (googletag.defineSlot) === "function"){
    googletag
      .pubads()
      .setTargeting("mcatid", ReqObj.Form[tmpId].mcatId)
      .setTargeting("catid", ReqObj.Form[tmpId].catId);
    if (slotChatLike === "") {
      slotChatLike = googletag.defineSlot(
        "/3047175/Pbrenq_header_chatBL",
        [728, 90],
        "div-gpt-ad-1626259853445-0"
      );
    }
    slotChatLike.addService(googletag.pubads());
    googletag.pubads().refresh([slotChatLike]);
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
    googletag.display("div-gpt-ad-1626259853445-0");
    $("#t" + tmpId + "_blchatbody").addClass("cbl_adj_add");
  }}} else {
    $("#t" + tmpId + "add_helper_text").addClass("dn");
  }
};

/* DON'T TOUCH CODE! */

ThankYou.prototype.handleEvents = function (tmpId, type) {
  $("#t" + tmpId + "_cls").off("click").on("click", function (event) {
    if (closeFormCond(tmpId)) FormCloseEnqBL(tmpId, event);
    else FormCloseStep(tmpId, event);
  });

  $("#t" + tmpId + "_thankDiv").addClass("BL_Thnky");
  if (isInactiveBL(tmpId)) {
    $("#t" + tmpId + "_thankDiv").addClass("cbl_br8");
  }
  if (ReqObj.Form[tmpId].formType === "BL")
    $("#t" + tmpId + "_thankDiv").addClass("tmnw");
  else $("#t" + tmpId + "_thankDiv").removeClass("tmnw");
  if (isnewSSB(tmpId)) {
    $("#t" + tmpId + "_thankDiv").addClass("nb-blthnk");
    $("#t" + tmpId + "_thankDiv").parent().removeClass("bedsnone");
  }
  if (isSet(type) && type !== "" && type.type.toLowerCase() === "onclosescreen") {
    $("#" + type.elid).addClass("BL_Thnky_1");
  } else $("#" + type.elid).removeClass("BL_Thnky_1");
};
/*-------------------------------------------------------------TRACKING/SERVICES--------------------------------------------------------------- */
ThankYou.prototype.fireTracking = function (tmpId) {
  var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var StepNumber = isSet(ReqObj.Form[tmpId].FormSequence) ? ReqObj.Form[tmpId].FormSequence.StepCounter + 1 + ReqObj.Form[tmpId].FormSequence.OnCloseCounter + 1
    : 1 + 1;
  $("#payxbanner").on("click", function () {
    blenqGATracking(form_type, "PayX_Banner|" + StepNumber + "|Thank You", getEventLabel(), 0, tmpId);
  });
  $("#payxknowmore").on("click", function () {
    blenqGATracking(form_type, "PayX_KnowMore|" + StepNumber + "|Thank You", getEventLabel(), 0, tmpId);
  });
  $("#manage_rqt").on("click", function () {
    blenqGATracking(form_type, "Manage Your Requirement|" + StepNumber + "|Thank You", getEventLabel(), 1, tmpId);
  });
};


ThankYou.prototype.fireServices = function (tmpId) {
  var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var StepNumber = isSet(ReqObj.Form[tmpId].FormSequence) ? ReqObj.Form[tmpId].FormSequence.StepCounter + 1 + ReqObj.Form[tmpId].FormSequence.OnCloseCounter + 1
    : 1 + 1;
  var iso = currentISO();
  if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
  //   ValidGenId(ReqObj.Form[tmpId].generationId) &&
  //     ReqObj.Form[tmpId].waitFinServ === 0 ? FinishEnquiryService(tmpId) : "";
      // savenr/finish changes
      if(ValidGenId(ReqObj.Form[tmpId].generationId) &&  ReqObj.Form[tmpId].waitFinServ === 0){
        if(getMorePh(tmpId)){
          if(savenrflag){
            FinishEnquiryService(tmpId);
            savenrflag = 0;
          }
          else{
            setTimeout(() => {
              // console.log("finishenq called after 3 second.");
              FinishEnquiryService(tmpId);
            }, "3000");
          }
          
        }
        else{
          FinishEnquiryService(tmpId);
        }
      }
      else{
        "";
      }
      // ends here
  }
  if (iso === "IN" && !IsChatbl(tmpId) && !isSSB(tmpId)) {
    blenqGATracking(form_type, "Displayed_PayX|" + StepNumber + "|Thank You", getEventLabel(), 0, tmpId);
  }
};

PostBlEnqUpdate.prototype.onSubmit = function (tmpId) {
  if (isSet(tmpId)) {
    var postblenq = PreAjax("PostBlEnqUpdate", tmpId);
    this.sendRequest(postblenq, tmpId);
  }
};
//PostBlEnqUpdate.prototype.defaultEvents = function () {};
PostBlEnqUpdate.prototype.getData = function (tmpId) {
  var data = {};
  var imeshcookie = imeshExist();
  var iploccookie = usercookie.getCookie("iploc");

  data["modId"] = modIdf;
  data["s_ip"] = usercookie.getParameterValue(iploccookie, "gip");
  data["s_ip_country"] = usercookie.getParameterValue(iploccookie, "gcnnm");
  data["s_ip_country_iso"] = usercookie.getParameterValue(
    iploccookie,
    "gcniso"
  );
  var temp = usercookie.getParameterValue(imeshcookie, "fn");
  if (temp === "") {
    var name = ReqObj.UserDetail["fn"];
    if (name) {
      if (name.indexOf(" ") !== -1) {
        var fn = name.substr(0, name.indexOf(" "));
        var ln = name.substr(name.indexOf(" ") + 1);
      }
    }
    data["s_first_name"] = fn !== "" && typeof fn !== "undefined" ? fn : name;
    data["s_last_name"] = ln !== "" && typeof ln !== "undefined" ? ln : "";
  } else data["s_first_name"] = temp;

  temp = usercookie.getParameterValue(imeshcookie, "em");
  data["s_email"] = temp === "" ? ReqObj.UserDetail["em"] : temp;

  temp = usercookie.getParameterValue(imeshcookie, "mb1");
  data["s_mobile"] = temp === "" ? ReqObj.UserDetail["mb1"] : temp;

  data["s_city_name"] = ReqObj.UserDetail["cityname"];
  data["s_glusrid"] = usercookie.getParameterValue(imeshcookie, "glid");

  data["s_country_name"] = usercookie.getParameterValue(iploccookie, "gcnnm");
  data["generationId"] = ReqObj.Form[tmpId].generationId;
  data["s_city_id"] = ReqObj.UserDetail["ctid"];
  data["flag"] = IsChatbl(tmpId) ? "BL" : ReqObj.Form[tmpId].formType;

  if (currentISO() === "IN") {
    data["s_state_name"] =
      isSet(ReqObj.UserDetail["statename"]) &&
        ReqObj.UserDetail["statename"] !== ""
        ? ReqObj.UserDetail["statename"]
        : "";
  }
  if (ReqObj.Form[tmpId].formType === "Enq") {
    data["r_glusrid"] = ReqObj.Form[tmpId].rcvGlid;
    data["rfq_queryDestination"] = ReqObj.Form[tmpId].query_destination;
  }

  return ObjectTrim(data);
};
PostBlEnqUpdate.prototype.sendRequest = function (postblenq, tmpId) {
  var data = this.getData(tmpId);
  if (ValidGenId(ReqObj.Form[tmpId].generationId))
    fireAjaxRequest({
      data: {
        ga: {
          gatype: "PostBlenqUpdate",
          source: "",
          s: true,
          f: true,
        },
        tmpId: tmpId,
        ajaxObj: {
          obj: postblenq,
          s: {
            ss: 1,
            sf: {
              af: 0,
              pa: 1,
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
        type: 2,
      },
    });
  else PostAjax(postblenq, tmpId);
};