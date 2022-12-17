//functions
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
function BLEnqPopUpDefault(tmpId) {
  ReqObj.updateImage = 0;
  OpenBLEnqPopup(tmpId);
}
//functions

// screen2-7
//please correct this code for ecom product
FormSeq.prototype._screen2 = function (tmpId, typeOfForm) {
  dirimgscreencount = 2;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
  };
  var _classObj = null;
  var _case = data.imeshcookie && isSet(data.iso) && _contactScreen(data.iso) && (data.iso === "IN" || (data.iso !== "IN" && (ReqObj.Form[tmpId].FormSequence._stepCounter < 0 || (Enq04(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter < 1)))) ? 0 : -1;

  if ( !Bl09(tmpId) && ((!isImageVidEnq(tmpId) && _that._stepCounter === -1) || ((isImageVidEnq(tmpId) || Enq04(tmpId) || Bl01(tmpId) || Bl04(tmpId)) && _that._stepCounter === 0)) && isSet(data.iso) && data.iso === "IN" && _mandatDetailsFilled() && ((isEnq(tmpId) && isSecondEnq(tmpId)) || ((Bl01(tmpId) || Bl04(tmpId)) && isSecondBl())) && ReqObj.UserDetail.uv === "" )
    _case = -1;
  if ( (Enq04(tmpId) || Bl04(tmpId)) && isSet(data.iso) && data.iso !== "IN" && isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "")
    _case = -1;
  if (currentISO() !== "IN" && ReqObj.UserDetail.mb1 === "") _case = 0;
  if ( !(checkblockedUser() && im_issExist() === "") && _case !== -1 && ReqObj.Form[tmpId].flags.isNECShown === false) {
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
    if (typeOfForm === "bl" &&!Bl04(tmpId) &&data.imeshcookie !== "" &&ReqObj.Form[tmpId].FormSequence._stepCounter < 0 ) {
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
  dirimgscreencount = 3;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
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
  
  dirimgscreencount = 4;
  if(direnqImage(tmpId)){
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
  dirimgscreencount = 5;
  var _that = this;
  typeOfForm = returnTypeForSeq(tmpId).toLowerCase();
  var data = {
    iso: currentISO(),
    imeshcookie: imeshExist(),
    array: { UiArray: [], ServiceArray: [] },
  };

  var totalisqlength = ReqObj.Form[tmpId].IsqLength;

  if (
    showQuantityUnit((tmpId, ReqObj.Form[tmpId].IsqArray, 2) || displayedisq) &&
    isNewInlineBl(tmpId)
  ) {
    totalisqlength -= 1;
  }

  if (
    !pdpenq(tmpId) &&
    !(isBl(tmpId) && ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown) &&
    parseInt(ReqObj.Form[tmpId].disableIsq) !== 1 &&
    isSet(data.iso) && data.iso === "IN" &&
    ReqObj.Form[tmpId].IsqArray !== null &&
    ReqObj.Form[tmpId].prevCount < totalisqlength
  )
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
  dirimgscreencount = 6;
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
  if ( toAskCname(tmpId) && (typeof ReqObj.Form[tmpId].companyName === "undefined" || (isSet(ReqObj.Form[tmpId].companyName) && ReqObj.Form[tmpId].companyName === "")) ) {
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
  if ( LastScreen === "ContactDetail" && contactScreen === true && _classObj.numberOfClassCalled === 1)
    _classObj.numberOfClassCalled = 0;
  if (_classObj.numberOfClassCalled !== 0) {
    _that.updateNumberOfClassCalled(_classObj.numberOfClassCalled);
    _that._objectSequence(tmpId, _classObj);
  } else _that._switchNext(tmpId, typeOfForm);
};

FormSeq.prototype._screen7 = function (tmpId, typeOfForm) {
  dirimgscreencount = 7;
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

// screen2-7


function get_message() {
    return {
      msg: "Become a verified free seller in 2 min & <br>Connect with 100+ Buyers from your city",
      cta_msg: "Start Selling for Free",
    };
  }
// mdscreen
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
    var append =
      that.mdObj.md.key === 0
        ? "companyname"
        : that.mdObj.md.key === 1
        ? "gst"
        : "url";
    var call =
      ReqObj.Form[tmpId].currentScreen.toLowerCase() === "moredetails" &&
      !isEnq(tmpId)
        ? ReqObj.Form[tmpId].currentScreen + append
        : "default";
    $("#t" + tmpId + "_hdg")
      .removeClass("bedsnone")
      .html(getFormHeading(tmpId, call));
  };
  MoreDetails.prototype.EventIfScreenPresent = function (tmpId) {
    this.handleHeading(tmpId);
    ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
  };
  MoreDetails.prototype.displayAnswer = function (tmpId) {
    var classtotest = chatBlClass(tmpId, "right");
    var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
    var that = this;
    var md =
      that.mdObj.md.key === 0
        ? returnAnswer(tmpId, "CompanyName")
        : that.mdObj.md.key === 1
        ? returnAnswer(tmpId, "GST")
        : returnAnswer(tmpId, "URL");
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
//   mdscreen

//   tqscreen
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
      : isMoglixUi(tmpId)
      ? "div-gpt-ad-1646030795751-0"
      : "div-gpt-ad-1576734581911-0"; 
      this.addUnitDiv = IsChatbl(tmpId)          //M2
      ? IsChatBLInline(tmpId)              
        ? "<div id='div-gpt-ad-1583149499454-0' style='width: 320px; height: 50px;'></div>"
        : "<div id='headerChatBLAd' style='width: 728px; height: 90px;'><pubguru data-pg-ad='Indiamart_header_chatBL'></pubguru></div>"
      : isMoglixUi(tmpId)
      ? "<div id='div-gpt-ad-1646030795751-0' style='min-width: 220px; min-height: 30px; text-align: center; margin-top: 30px;'></div>"
  : "<div id='thankyouAd1' style='width: 728px; height: 90px;margin: 10px auto;'><pubguru data-pg-ad='Indiamart_PBRENQ_1'></pubguru></div>";
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
  
  // ThankYou.prototype.payxHtml = function (data) {
  
  //   var aclass = (data["formType"] === "bl") ? "" : "be_payXurl";
  //   return returnA("", "", this.payxImgUrl, "_blank", aclass) + returnImg("", "payxbanner", data["manageSname"] + "apps.imimg.com/gifs/paywith-bannerLeft2.jpg", "be-db") + "</a>";
  // };
  
  // ThankYou.prototype.paybannerHtml = function (data) {
  //     if (isSSB(data["tmpId"])) return "";
  //     var br = isMoglixUi(data["tmpId"])?"":"<br>";
  //     var cls = isMoglixUi(data["tmpId"])?"BL_Fm4 txt-cnt br4 ths_mb":"BL_Fm4 txt-cnt br4 ths_mb ew33";
  //     var clss = isMoglixUi(data["tmpId"])?"cbl_df iJSpb id_aic pd":"";
  //     var chcls = isMoglixUi(data["tmpId"])?"BL_Ff3 BL_Fc1 ecl5c befs14 pflx1 txtl":"BL_Ff3 BL_Fc1 ecl5c befs14";
  //     var chcls2 = isMoglixUi(data["tmpId"])?"BL_Ficn1 oef0":"BL_Ficn1";
  //     var bannerhtml =
  //         '<div class="'+cls+'"><a target ="_blank" class="'+clss+'" href="https://paywith.indiamart.com/" onclick = \'return thankYouTrack("' +
  //         data["tmpId"] +
  //         '","ThankYou_PWIM")\'><div class="'+chcls+'">Protect your payments for <span class="BL_Fwb">FREE,</span> Pay '+br+' sellers online via <span class="BL_Fwb">Pay with IndiaMART</span></div><span class="'+chcls2+'"></span></a></div>';
  
  //     return bannerhtml;
  // };
  
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
  
    var html = "";
    $("#t" + data["tmpId"] + "_thankDiv").addClass("futhk");
    if (data["cntry_iso"] !== "IN")
      $("#t" + data["tmpId"] + "_thankDiv").addClass("nfusr");
    var _cls =
      data["cntry_iso"] === "IN"
        ? "bethhdg befwt bemb5 idsf id_aic jst_con"
        : "bethhdg befwt bemb5";
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
      !isMoglixUi(data["tmpId"]) &&
      !pdpenqImage(data["tmpId"])
        ? "<br>"
        : "";
    var cls_mng =
      currentISO() === "IN"
        ? isMoglixUi(data["tmpId"])
          ? "bedblk txt16 thbtmn"
          : "bedblk txt16 thbtmn ew50"
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
          " befwt'>To check further replies from the " +
          br +
          "supplier  <a href='https://my.indiamart.com/enquiry/messagecentre/' target = '_blank' class='" +
          cta_cls +
          " wd235' id='t" +
          data["tmpId"] +
          "msglink' onclick = 'return thankYouTrack(\"" +
          data["tmpId"] +
          '","ThankYou_message")\'> view Messages</a ></div>';
    var br = isMoglixUi(data["tmpId"]) ? "" : "<br>";
    var cls = isMoglixUi(data["tmpId"]) ? "txt16 thbtmn" : "txt16 thbtmn ew50";
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
          : isMoglixUi(data["tmpId"])
          ? "ebrtc e_p30 ejcsv bemt5 bemb5"
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
      }
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
        obj[i]["ECOM_ITEM_LANDING_URL"] +
        " class='emBynw' onclick=\"return thankYouTrack('" +
        val +
        "','Buy_now_ecom'," +
        obj[i]["GLUSR_ID"] +
        ")\" target='_blank'>Buy Now</a></div></div></li>";
    }
    prolist += list + "<ul>";
    pwhtml += prolist + "</div></div>";
    return pwhtml;
  }
  
  function plawidget(val) {
    $.ajax({
      cache: true,
      url: "//apps.imimg.com/" + "index.php?r=Newreqform/WidgetData",
      // url: appsServerName + 'index.php?r=Newreqform/WidgetData',
      type: "GET",
      crossOrigin: true,
      crossDomain: true,
      data: {
        modid: ReqObj.Form[val].modId,
        mcatid: ReqObj.Form[val].mcatId,
      },
      dataType: "json",
      timeout: 3000,
      success: function (res) {
        if (
          isSet(res) &&
          res["Status"] == 200 &&
          isSet(res["RECOMMENDED DATA"])
        ) {
          // sessionStorage.setItem("plaWidget-" + ReqObj.Form[val].mcatId, JSON.stringify(res["RECOMMENDED DATA"]));
          try {
            sessionStorage.setItem(
              "plaWidget-" + ReqObj.Form[val].mcatId,
              JSON.stringify(res["RECOMMENDED DATA"])
            );
          } catch (err) {
            // quota_exceeded_error
          }
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest + textStatus + errorThrown);
      },
    });
  }
  
  ThankYou.prototype.payNumber = function (data) {
    // return (data["formType"] === "bl") ? returnContainer("", "", "befs16 txt-cnt", "", "Have an urgent requirement ?" + returnSpan("", "", "Call us at 81-8181-8181", "befwt"), "margin-top:50px;") + '</div>' : "";
  
    return data["formType"] === "bl" ? "" : "";
  };
  
  // ThankYou.prototype.payxBsec = function (data) {
  //   return returnContainer("", "", "be-w237 bevT bedtc", "", data["payxHtml"], "") + "</div >";
  // };
  
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
  
        var plaWidgetObj = JSON.parse(
          sessionStorage.getItem("plaWidget-" + ReqObj.Form[data["tmpId"]].mcatId)
        );
        if (
          isSet(plaWidgetObj) &&
          !pdpInactiveBL(data["tmpId"]) &&
          plaWidgetObj.length >= 2
        ) {
          thankyou_html += getHtmlPlaWidget(plaWidgetObj, data["tmpId"]);
        }
  
        //M2
        if (!isSet(plaWidgetObj) || plaWidgetObj.length < 2) {
          this.addUnitDiv2 = "<div id='thankyouAd2' style='width: 728px; height: 90px; margin: 10px auto;'><pubguru data-pg-ad='Indiamart_PBRENQ_2' style='width: 728px; height: 90px; margin: 10px auto;'></pubguru></div>";
         
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
        //M2
        this.addUnitDiv2 = "<div id='thankyouAd2' style='width: 728px; height: 90px; margin: 10px auto;'><pubguru data-pg-ad='Indiamart_PBRENQ_2' style='width: 728px; height: 90px; margin: 10px auto;'></pubguru></div>";
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
    if(IsChatBLInline(tmpId)){            //M2
      this.googleAddEvents(tmpId);
    }
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
    if (window.googletag && googletag.apiReady)
      IsChatbl(tmpId)
        ? IsChatBLInline(tmpId)
          ? this.chatblAdd(tmpId)
          : this.chatLikeblAdd(tmpId)
        : isMoglixUi(tmpId)
        ? this.EnqMoglixAdd(tmpId)
        : this.BlEnqAdd(tmpId);
    else {
      $("#t" + tmpId + "add_helper_text").addClass("dn");
    }
  };
  //ad_ch
  var slot2 = "";
  var addslot2 = 0;
  var slot = "";
  var slotChat = "";
  var slotChatLike = "";
  var slotMoglix = "";
  
  //NOT IN USE CURRENTLY
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
      window.googletag = window.googletag || {
        cmd: [],
      };
      googletag
        .pubads()
        .setTargeting("mcatid", ReqObj.Form[tmpId].mcatId)
        .setTargeting("catid", ReqObj.Form[tmpId].catId);
  
      //ad_ch
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
  
  //NOT IN USE CURRENTLY
  ThankYou.prototype.EnqMoglixAdd = function (tmpId) {
    var that = this;
    var adsMcat = that.adsMcat;
    var adult =
      isSet(ReqObj.Form[tmpId].isAdult) && ReqObj.Form[tmpId].isAdult !== ""
        ? ReqObj.Form[tmpId].isAdult
        : 2;
    if (
      (ReqObj.Form[tmpId].mcatId !== "" || ReqObj.Form[tmpId].catId !== "") &&
      (parseInt(adult) === 2 || parseInt(adult) === 0)
    ) {
      window.googletag = window.googletag || {
        cmd: [],
      };
      googletag
        .pubads()
        .setTargeting("mcatid", ReqObj.Form[tmpId].mcatId)
        .setTargeting("catid", ReqObj.Form[tmpId].catId);
      if (slotMoglix === "") {
        slotMoglix = googletag.defineSlot(
          "/3047175/Desktop_PBRENQ_MoglixUI_Adunit",
          [
            [520, 90],
            [234, 60],
            [220, 90],
            [300, 75],
            [468, 60],
            [320, 50],
            [292, 30],
          ],
          "div-gpt-ad-1646030795751-0"
        );
        //ReqObj.isAddSlot = 1;
      }
      slotMoglix.addService(googletag.pubads());
      googletag.pubads().refresh([slotMoglix]);
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
      googletag.display("div-gpt-ad-1646030795751-0");
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
  
  // slotChat = "";
  
  ThankYou.prototype.chatblAdd = function (tmpId) {
    var adult =
      isSet(ReqObj.Form[tmpId].isAdult) && ReqObj.Form[tmpId].isAdult !== ""
        ? ReqObj.Form[tmpId].isAdult
        : 2;
    if (
      (ReqObj.Form[tmpId].mcatId !== "" || ReqObj.Form[tmpId].catId !== "") &&
      (parseInt(adult) === 2 || parseInt(adult) === 0)
    ) {
      window.googletag = window.googletag || {
        cmd: [],
      };
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
    } else {
      $("#t" + tmpId + "add_helper_text").addClass("dn");
    }
  };
  
  
  //NOT IN USE CURRENTLY
  ThankYou.prototype.chatLikeblAdd = function (tmpId) {
    var adult =
      isSet(ReqObj.Form[tmpId].isAdult) && ReqObj.Form[tmpId].isAdult !== ""
        ? ReqObj.Form[tmpId].isAdult
        : 2;
    if (
      (ReqObj.Form[tmpId].mcatId !== "" || ReqObj.Form[tmpId].catId !== "") &&
      (parseInt(adult) === 2 || parseInt(adult) === 0)
    ) {
      window.googletag = window.googletag || {
        cmd: [],
      };
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
    } else {
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
    if (pdpInactiveBL(tmpId)) {
      $("#t" + tmpId + "_thankDiv").addClass("cbl_br8");
    }
    if (ReqObj.Form[tmpId].formType === "BL")
      $("#t" + tmpId + "_thankDiv").addClass("tmnw");
    else $("#t" + tmpId + "_thankDiv").removeClass("tmnw");
    if (isnewSSB(tmpId)) {
      $("#t" + tmpId + "_thankDiv").addClass("nb-blthnk");
      $("#t" + tmpId + "_thankDiv").parent().removeClass("bedsnone");
    }
    if ( isSet(type) && type !== "" && type.type.toLowerCase() === "onclosescreen") {
      $("#" + type.elid).addClass("BL_Thnky_1");
    } else $("#" + type.elid).removeClass("BL_Thnky_1");
  };
  /*-------------------------------------------------------------TRACKING/SERVICES--------------------------------------------------------------- */
  ThankYou.prototype.fireTracking = function (tmpId) {
    var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    var StepNumber = isSet(ReqObj.Form[tmpId].FormSequence) ? ReqObj.Form[tmpId].FormSequence.StepCounter + 1 + ReqObj.Form[tmpId].FormSequence.OnCloseCounter + 1
      : 1 + 1;
    $("#payxbanner").on("click", function () {
      blenqGATracking(form_type,"PayX_Banner|" + StepNumber + "|Thank You",getEventLabel(),0,tmpId);
    });
    $("#payxknowmore").on("click", function () {
      blenqGATracking(form_type,"PayX_KnowMore|" + StepNumber + "|Thank You",getEventLabel(),0,tmpId);
    });
    $("#manage_rqt").on("click", function () {
      blenqGATracking(form_type,"Manage Your Requirement|" + StepNumber + "|Thank You",getEventLabel(),1,tmpId);
    });
  };
  
  ThankYou.prototype.fireServices = function (tmpId) {
    var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    var StepNumber = isSet(ReqObj.Form[tmpId].FormSequence) ? ReqObj.Form[tmpId].FormSequence.StepCounter + 1 + ReqObj.Form[tmpId].FormSequence.OnCloseCounter + 1 
    : 1 + 1;
    var iso = currentISO();
    if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
      ValidGenId(ReqObj.Form[tmpId].generationId) &&
      ReqObj.Form[tmpId].waitFinServ === 0 ? FinishEnquiryService(tmpId) : "";
    }
    if (iso === "IN" && !IsChatbl(tmpId) && !isSSB(tmpId)) {
      blenqGATracking(form_type,"Displayed_PayX|" + StepNumber + "|Thank You",getEventLabel(),0,tmpId);
    }
  };
//   tqscreen

//Generation
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
  function Generation(arg, blIntent) {
    this.v4iilexCookie = "";
    this.imeshCookie = "";
    this.iplocCookie = "";
    this.imEqGlCookie = "";
    this.siteEntryPage = "";
    this.adcampCookie = "";
    this.emktgCookie = ""; /* */
    this.geoLocCookie = "";
    this.iso = "";
    this.arg = arg;
    this.className = "Generation";
    this.blIntent = blIntent;
  }
  Generation.prototype.defaultEvents = function () {};
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
    data["modid"] = ReqObj.Form[tmpId].modId;
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
  //Generation