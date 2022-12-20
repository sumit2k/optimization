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
function FinishEnquiryService(tmpId, data_arr) {
  if (
    isSet(ReqObj.Form[tmpId].flags) &&
    ReqObj.Form[tmpId].flags.isFinishEnquiryHit
  )
    return;
  if (isSet(data_arr) && data_arr.sr === "gen") {
    var data = data_arr.data_res;
  } else {
    var ofr_id = ReqObj.Form[tmpId].generationId;
    var rfq_queryDestination = ReqObj.Form[tmpId].query_destination;
    var modId = ReqObj.Form[tmpId].modId;
    var data = {
      ofr_id: ofr_id,
      rfq_queryDestination: rfq_queryDestination,
      modId: modId,
    };
  }
  if (!(isSet(data_arr) && data_arr.sr === "gen"))
    ReqObj.Form[tmpId].flags.isFinishEnquiryHit = true;
  fireAjaxRequest({
    data: {
      ga: {
        s: true,
        f: true,
        gatype: "FinishEnqService",
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
      type: 5,
      hitfinserv: "",
    },
  });
}
function ValidNumber(number) {
  if (isSet(number) && !!parseInt(number, 10) && Number(number)) return true;
  else return false;
}
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
function ValidGenId(id) {
  if (ValidNumber(id) && parseInt(id, 10) > 1) return true;
  else return false;
}
function blenqGATracking(eventCategory,eventAction,eventLabel,isinteraactive,tmpId) {
  if (isSet(ReqObj.Form[tmpId]) &&(ReqObj.Form[tmpId].toFireGaTracking === true || ReqObj.Form[tmpId].noSampling === true || isinteraactive === 1 || ReqObj.Form[tmpId].inactiveBL)) {
    var event_type = isinteraactive === 0 ? "IMEvent" : "IMEvent-NI";
    if (glmodid == "PRODDTL" && eventAction == "Redirect:ProductUrl") {
      event_type = "IMEvent";
    }
    var modid = eventCategory === "iploc" ? glmodid : ReqObj.Form[tmpId].modId;
    var CD_Additional_Data =
      tmpId === 0 ? modid : modid + "-" + ReqObj.Form[tmpId].refText;
    eventLabel =
      ReqObj.seller_cta && (ReqObj.su_cta == 0 || ReqObj.su_cta == 1)
        ? eventLabel + " |SA"
        : eventLabel;

    //_gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel, 0, true]);
    imgtm.push({
      event: event_type,
      eventCategory: eventCategory,
      eventAction: eventAction,
      eventLabel: eventLabel,
      CD_Additional_Data: CD_Additional_Data,
    });
  }
}

function blenqGATrackingMisc(eventCategory,eventAction,eventLabel,isinteraactive,tmpId,refText) {
  // ReqObj.Form[tmpId].modId,  ReqObj.Form[tmpId].form_type
  var event_type = isinteraactive === 0 ? "IMEvent" : "IMEvent-NI";
  var modid = glmodid;
  var CD_Additional_Data = modid + "-" + refText;
  //_gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel, 0, true]);
  imgtm.push({
    event: event_type,
    eventCategory: eventCategory,
    eventAction: eventAction,
    eventLabel: eventLabel,
    CD_Additional_Data: CD_Additional_Data,
  });
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

  // LeftSide
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
    var blhiw = pdpInactiveBL(tmpId) ? " color_000 befwt" : "";
  
    var html =
      returnContainer(
        "",
        "",
        "befs20 beclrW bemgb15 betxtc" + blhiw,
        "",
        "How it Works",
        ""
      ) + "</div>";
    html += returnContainer("", "", "bepr belh18", "", "", "");
  
    if (pdpInactiveBL(tmpId)) {
      blhtml = `<div class="behlp1 bevT bemgb15"><div class="bedtc bed_icon"><svg width="17" height="18" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2208 12.3234L0.990359 12.3243V9.65808L17.2189 9.65714L10.0677 2.50593L11.9533 0.62031L22.3242 10.9912L11.9533 21.3621L10.0677 19.4765L17.2208 12.3234Z" fill="black"></path></svg></div>`;
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
        `<div class="behlp1 bevT bemgb15 ${paywithcls}"><div class="bedtc bed_icon"><svg width="17" height="18" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2208 12.3234L0.990359 12.3243V9.65808L17.2189 9.65714L10.0677 2.50593L11.9533 0.62031L22.3242 10.9912L11.9533 21.3621L10.0677 19.4765L17.2208 12.3234Z" fill="black"></path></svg></div>` +
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
    if (!isMoglixUi(tmpId) && !$("#t" + tmpId + "_mcont").hasClass("be-mcont"))
      $("#t" + tmpId + "_mcont").addClass("be-mcont bezid");
    $("#t" + tmpId + "_mcont").addClass("eqPdm");
    // drqmg
    if(direnqImage(tmpId)){
        $("#t" + tmpId + "_mcont").addClass("drqmg");
    }
    
    if (pdpenqImage(tmpId)) {
      var windPer = (window.innerHeight / window.innerWidth) * 100;
      var cls = windPer > 58 ? "eqTst eqRes" : "eqTst";
      $("#t" + tmpId + "_questionouterwrapper").addClass("epLf30");
      $("#t" + tmpId + "_mcont").addClass(cls);
      $("#t" + tmpId + "_thankDiv").addClass(cls);
      $("#t" + tmpId + "_hdg")
        .removeClass()
        .addClass("bedsnone");
    }
    if (step === 1 && !pdpenqImage(tmpId)) {
      if(direnqImage(tmpId)){
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
        $("#t" + tmpId + "_hdg")
          .removeClass()
          .addClass("bedsnone");
      }
      else{
        $("#t" + tmpId + "_mcont").addClass("enqnxt eqPdsec");
        $("#t" + tmpId + "_slide").addClass("bedsnone");
        $("#t" + tmpId + "_proddetails")
        .removeClass("bedsnone")
        .addClass("bepr lTxt");
        $("#t" + tmpId + "_prodmedia")
        .removeClass()
        .addClass("be-pnmS");
        $("#t" + tmpId + "_prodimg")
        .removeClass()
        .addClass("be-prdimg");
        $("#t" + tmpId + "parent_iframe")
        .html("")
        .addClass("bedsnone");
        $("#t" + tmpId + "_productimage").removeClass("imgslide");
        $("#t" + tmpId + "_leftS")
        .removeClass()
        .addClass("nwInn");
        $("#t" + tmpId + "_rightproddetails").addClass("bedsnone");
        $("#t" + tmpId + "_questionouterwrapper").removeClass("eqBotm"); // to not eqBotm
        $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
        $("#t" + tmpId + "_mcont").removeClass("arrprdch");
      }
      
    }
    if (step === 0) {
      $("#t" + tmpId + "_leftS")
        .removeClass()
        .addClass("be-Lsc enqPImg");
      $("#t" + tmpId + "_proddetails").addClass("bedsnone");
      $("#t" + tmpId + "_productimage").addClass("imgslide");
      $("#t" + tmpId + "_leftS")
        .removeClass()
        .addClass("be-Lsc enqPImg");
      $("#t" + tmpId + "_mcont").removeClass("eqPdsec");
      if (
        (isSet(ReqObj.Form[tmpId].nextProdArrow) &&
          ReqObj.Form[tmpId].nextProdArrow === true) ||
        (isSet(ReqObj.Form[tmpId].prevProdArrow) &&
          ReqObj.Form[tmpId].prevProdArrow === true)
      ) {
        $("#t" + tmpId + "_mcont")
          .addClass("arrprdch")
          .removeClass("eqarch");
      } else {
        $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
        $("#t" + tmpId + "_mcont")
          .removeClass("arrprdch")
          .removeClass("eqarch");
      }
    }
    if (
      isSet(ReqObj.Form[tmpId].imgSlideHide) &&
      ReqObj.Form[tmpId].imgSlideHide !== "" &&
      ReqObj.Form[tmpId].imgSlideHide === true
    ) {
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
      
      if(pdpenqImage(tmpId) && !direnqImage(tmpId)){
        var addval =
        ReqObj.Form[tmpId].multipleImageVideo.length <= 1
          ? 0
          : resol <= 1515
          ? 103
          : 143;
      $("#t" + tmpId + "_zoomimage").css({ "max-width": img_height + "px" });
      $("#t" + tmpId + "parent_iframe")
        .css({ width: img_height + "px" })
        .addClass("bepr eIfvm");
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
      $("#t" + tmpId + "_hdg")
        .removeClass()
        .addClass("bedsnone");
    }
    if (step === 1 && !pdpenqImage(tmpId)) {
      if(direnqImage(tmpId)){
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
        $("#t" + tmpId + "_hdg")
          .removeClass()
          .addClass("bedsnone");
      }
      else{
        $("#t" + tmpId + "_mcont").addClass("enqnxt eqPdsec");
        $("#t" + tmpId + "_slide").addClass("bedsnone");
        $("#t" + tmpId + "_proddetails")
          .removeClass("bedsnone")
          .addClass("bepr lTxt");
        $("#t" + tmpId + "_prodmedia")
          .removeClass()
          .addClass("be-pnmS");
        $("#t" + tmpId + "_prodimg")
          .removeClass()
          .addClass("be-prdimg");
        $("#t" + tmpId + "parent_iframe")
          .html("")
          .addClass("bedsnone");
        $("#t" + tmpId + "_productimage").removeClass("imgslide");
        $("#t" + tmpId + "_leftS")
          .removeClass()
          .addClass("nwInn");
        $("#t" + tmpId + "_rightproddetails").addClass("bedsnone");
        $("#t" + tmpId + "_questionouterwrapper").removeClass("eqBotm"); // to not eqBotm
        $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
        $("#t" + tmpId + "_mcont").removeClass("arrprdch");
      }
      
    }
    if (step === 0) {
      $("#t" + tmpId + "_leftS")
        .removeClass()
        .addClass("be-Lsc enqPImg");
      $("#t" + tmpId + "_proddetails").addClass("bedsnone");
      $("#t" + tmpId + "_productimage").addClass("imgslide");
      $("#t" + tmpId + "_mcont").removeClass("eqPdsec");
      if ($("#t" + tmpId + "_prodVideo").html() !== "")
        $("#t" + tmpId + "parent_iframe").removeClass("bedsnone");
      if (
        (isSet(ReqObj.Form[tmpId].nextProdArrow) &&
          ReqObj.Form[tmpId].nextProdArrow === true) ||
        (isSet(ReqObj.Form[tmpId].prevProdArrow) &&
          ReqObj.Form[tmpId].prevProdArrow === true)
      ) {
        $("#t" + tmpId + "_mcont")
          .addClass("arrprdch")
          .removeClass("eqarch");
      } else {
        $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
        $("#t" + tmpId + "_mcont")
          .removeClass("arrprdch")
          .removeClass("eqarch");
      }
    }
  
    if (
      isSet(ReqObj.Form[tmpId].imgSlideHide) &&
      ReqObj.Form[tmpId].imgSlideHide !== "" &&
      ReqObj.Form[tmpId].imgSlideHide === true
    ) {
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
      if(pdpenqImage(tmpId) && !direnqImage(tmpId)){
        var addval =
        ReqObj.Form[tmpId].multipleImageVideo.length <= 1
          ? 0
          : resol <= 1515
          ? 103
          : 143;
      $("#t" + tmpId + "_zoomimage").css({ "max-width": img_height + "px" });
      $("#t" + tmpId + "parent_iframe")
        .css({ width: img_height + "px" })
        .addClass("bepr eIfvm");
      $("#t" + tmpId + "_prodimg").width(img_height);
      $("#t" + tmpId + "_leftS").width(img_height + addval);
      $("#t" + tmpId + "_productimage").width(img_height + addval);
    }
  };
  }
  
  LeftSide.prototype.enquiryTransition = function (tmpId, typeofform, step) {
    if (!isMoglixUi(tmpId)) {
      $("#t" + tmpId + "_mcont").addClass("be-mcont bezid eqPdsec");
    }
    $("#t" + tmpId + "_questionouterwrapper").removeClass("epLf30");
    $("#t" + tmpId + "_mcont").removeClass("eqTst eqRes");
    $("#t" + tmpId + "_thankDiv").removeClass("eqTst eqRes");
    $("#t" + tmpId + "_mcont").addClass("eqPdsec");
    $("#t" + tmpId + "_questionouterwrapper").removeClass("eqBotm");
    $("#t" + tmpId + "_leftsection").removeClass("be-Lsc1");
    $("#t" + tmpId + "_leftS")
      .removeClass("enqPImg")
      .addClass("nwInn");
    $("#t" + tmpId + "_mcont").removeClass("eqPdm");
    $("#t" + tmpId + "_prodimg")
      .removeClass()
      .addClass("be-prdimg");
    if (isMoglixUi(tmpId)) {
      $("#t" + tmpId + "_leftsection")
        .removeClass()
        .addClass("e_prDtl e_p1_2 idsf");
      $("#t" + tmpId + "_leftS").removeClass();
      $("#t" + tmpId + "_zoomimage").addClass("bedsnone");
      $("#t" + tmpId + "_prodimg")
        .removeClass()
        .addClass("idsf pJc id_aic e_prImg");
      $("#t" + tmpId + "_proddetails")
        .removeClass()
        .addClass("pflx1");
    }
    $("#t" + tmpId + "_productimage").removeClass("imgslide");
    $("#t" + tmpId + "_mcont").removeClass("arrprdch");
    if (step === 1) {
      $("#t" + tmpId + "_mcont").addClass("enqnxt");
      $("#t" + tmpId + "_slide").addClass("bedsnone");
      $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
    }
    if (step === 0) {
      if (
        (isSet(ReqObj.Form[tmpId].nextProdArrow) &&
          ReqObj.Form[tmpId].nextProdArrow === true) ||
        (isSet(ReqObj.Form[tmpId].prevProdArrow) &&
          ReqObj.Form[tmpId].prevProdArrow === true)
      ) {
        $("#t" + tmpId + "_mcont")
          .addClass("eqarch")
          .removeClass("arrprdch");
      } else {
        $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
        $("#t" + tmpId + "_mcont")
          .removeClass("arrprdch")
          .removeClass("eqarch");
      }
    }
  };
  
  LeftSide.prototype.blTransition = function (tmpId, typeofform, step) {
    $("#t" + tmpId + "_questionouterwrapper").removeClass();
    $("#t" + tmpId + "_mcont").removeClass("arrprdch");
    $("#t" + tmpId + "_leftsection").removeClass();
    let be_lsc = pdpInactiveBL(tmpId) ? "be-Lsc1 be-LscHeight" : "be-Lsc1";
    $("#t" + tmpId + "_leftS")
      .removeClass()
      .addClass(be_lsc);
    $("#t" + tmpId + "_mcont")
      .removeClass()
      .addClass("be-mcont bezid");
    if (
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
      tmpId.substring(0, 2) === "09"
    ) {
      $("#t" + tmpId + "_mcont").addClass("blder");
    } else {
      $("#t" + tmpId + "_mcont").removeClass("blder");
    }
    $("#t" + tmpId + "_prodimg")
      .removeClass()
      .addClass("be-prdimg");
    $("#t" + tmpId + "_nextprediv").addClass("bedsnone");
    $("#t" + tmpId + "_productimage").removeClass("imgslide");
    if (pdpInactiveBL(tmpId)) {
      $("#t" + tmpId + "_prodimg").addClass("cbl_br8");
      let forms_data = $.parseJSON(
          sessionStorage.getItem("formsPla" + brd_mcat_id)
      );
      if(isSet(forms_data) && forms_data.length>1){
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
      $("#t" + tmpId + "_leftS")
        .removeClass()
        .addClass(be_lsc);
      $("#t" + tmpId + "_helpQuest").css({
        display: "block",
      });
      $("#t" + tmpId + "parent_iframe")
        .html("")
        .addClass("bedsnone");
      $("#t" + tmpId + "_prodimg").removeClass("bedsnone");
    }
    if (step === 0 && ReqObj.Form[tmpId].ctaName.toLowerCase() === "mcat video") {
      $("#t" + tmpId + "_leftS")
        .removeClass()
        .addClass("be-Lsc");
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
  LeftSide.prototype.insertIntoProdMediaHtml = function (
    event,
    todo,
    onclickelement
  ) {
    var tmpId = event.initialdata.tmpId;
    if (
      event.mediakey.key[event.mediakey.startingindex].type.toLowerCase() ===
        "video" &&
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
  
  // LeftSide

  // RightSide
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
    if (
      (event.initialdata.typeofform === "image" ||
        event.initialdata.typeofform === "video") &&
      event.initialdata.step === "0R"
    ) {
      if (ReqObj.Form[event.initialdata.tmpId].formType.toLowerCase() !== "bl")
        $("#t" + event.initialdata.tmpId + "_cls").html("");
      else $("#t" + event.initialdata.tmpId + "_cls").html("X");
      $("#t" + event.initialdata.tmpId + "_hdg").addClass("bedsnone");
      $("#t" + event.initialdata.tmpId + "_rightproddetails").removeClass(
        "bedsnone"
      );
      $("#t" + event.initialdata.tmpId + "_tCond").addClass("bedsnone");
      $("#t" + event.initialdata.tmpId + "_byrinfo").addClass("bedsnone");
    } else {
      if (ReqObj.Form[event.initialdata.tmpId].formType.toLowerCase() !== "bl")
        $("#t" + event.initialdata.tmpId + "_cls").html("");
      else $("#t" + event.initialdata.tmpId + "_cls").html("X");
      if (imeshExist() !== "" && !pdpInactiveBL(event.initialdata.tmpId))
        $("#t" + event.initialdata.tmpId + "_leftR").removeClass("lftMgn");
      $("#t" + event.initialdata.tmpId + "_hdg").removeClass("bedsnone");
      $("#t" + event.initialdata.tmpId + "_rightproddetails").addClass(
        "bedsnone"
      );
      if (isMoglixUi(event.initialdata.tmpId)) {
        $("#t" + event.initialdata.tmpId + "_questionouterwrapper").removeClass();
        $("#t" + event.initialdata.tmpId + "_cls").html("X");
        if (!$("#t" + event.initialdata.tmpId + "_hdg").hasClass("e_hdg")) {
          var hd = $("#t" + event.initialdata.tmpId + "_hdg").detach();
          $("#t" + event.initialdata.tmpId + "_leftS").before(hd);
          $("#t" + event.initialdata.tmpId + "_hdg")
            .removeClass()
            .addClass("e_hdg");
        }
      }
      $("#t" + event.initialdata.tmpId + "_tCond").addClass("bedsnone");
      $("#t" + event.initialdata.tmpId + "_byrinfo").addClass("bedsnone");
    }
    $("#t" + event.initialdata.tmpId + "_question").removeClass("bedsnone");
    $("#t" + event.initialdata.tmpId + "_fBtn").removeClass("bedsnone");
    if (ReqObj.Form[event.initialdata.tmpId].formType.toLowerCase() === "bl")
      $("#t" + event.initialdata.tmpId + "_byrinfo").addClass("bleqb");
    else $("#t" + event.initialdata.tmpId + "_byrinfo").removeClass("bleqb");
    if (
      !(
        isMoglixUi(event.initialdata.tmpId) ||
        pdpenqImage(event.initialdata.tmpId)
      )
    ) {
      $("#t" + event.initialdata.tmpId + "_questionouterwrapper")
        .removeClass()
        .addClass("bemlsec");
      if ($("#t" + event.initialdata.tmpId + "_hdg").hasClass("e_hdg")) {
        // var hd = $("#t"+event.initialdata.tmpId+"_hdg").detach();
        //     $("#t"+event.initialdata.tmpId+"_rightsection").prepend(hd);
        //     $("#t"+event.initialdata.tmpId+"_hdg").removeClass().addClass("be-hdg");
        $("#t" + event.initialdata.tmpId + "_hdg").remove();
      }
    }
    if (pdpInactiveBL(event.initialdata.tmpId)) {
      $("#t" + event.initialdata.tmpId + "_hdg")
        .removeClass()
        .addClass("be-hdg be-hdg1");
      $("#t" + event.initialdata.tmpId + "_questionouterwrapper")
        .removeClass()
        .addClass("bemlsec bemlsec2");
    }
  };
  
  RightSide.prototype.getQuestionOuterWrapperHtml = function (tmpId) {
    var html = "";
    //returnContainer("#t" + tmpId, "_question", containerclass, datarole, divtext, style)
    var qcls = isMoglixUi(tmpId) ? "" : "bemlsec";
    if (pdpInactiveBL(tmpId)) qcls = "bemlsec bemlsec2";
    html += returnContainer("t" + tmpId, "_question", qcls, "", "", "");
    html +=
      "<form name='t" +
      tmpId +
      "_bl_form' onsubmit='return false' id='t" +
      tmpId +
      "_bl_form' method='post' class='bepr bemnh'>";
    html += "</div>";
  
    html += returnContainer("t" + tmpId, "_clear", "beclr", "", "", "");
    html += "</div>";
  
    html += returnContainer("t" + tmpId, "_tCond", "bedsnone", "", "", ""); //tcond clickable
    var vabaseline = direnqImage(tmpId) ? ' vabaseline bedblk ' : ' bevT bedblk';
    html +=
      "<input type='checkbox' class='bemt2' id='t" +
      tmpId +
      "_tCondCheckBox'><span class= '"+ vabaseline +"'><label class='t" +
      tmpId +
      "_test1'>I agree to the</label> <a href='https://www.indiamart.com/terms-of-use.html' target='_blank' class='betrmt'>terms</a> <label class='t" +
      tmpId +
      "_test1'>and</label> <a href='https://www.indiamart.com/privacy-policy.html' target='_blank' class='betrmt'>privacy policy</a></span>";
    html += "</div>";
  
    html += "<div id='t" + tmpId + "submit_wrapper'>";
  
    html += returnSubmitInnerHtml(tmpId);
  
    if (isEcomProduct(tmpId)) {
      html +=
        "<span class='befs11'>* You will be redirected to 3rd party webstore<span>";
    }
    if (isPnsEnq(tmpId))
      html +=
        "<div id='yajaca' style='margin-top: 3px;font-size: 12px;color: #00a699;font-style: italic'>You are just a click away to get quotes</div>";
    html += "</div>";
  
    // html += returnContainer("t" + tmpId, "_byrinfo", "befs14 beinfo bedsnone", "", "", "");
    // html += "</div>";
  
    html += returnContainer(
      "t" + tmpId,
      "_belodr",
      "belodrbg bedsnone",
      "",
      "",
      ""
    );
    html += "<div class='blloader'></div>";
    html += "</div>";
  
    return html;
  };
  
  // RightSide

  // FormSeq Post
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
      blenqGATracking(form_type,ClassesforSubmitTracking + toappend,getEventLabel(),0,tmpId);
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
            modid: ReqObj.Form[tmpId].modId,
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
    if ( notEmpty(usercookie.getParameterValue(imeshcookie, "fn")) || (isSet(ReqObj.UserDetail) && notEmpty(ReqObj.UserDetail.fn) && isSet(ReqObj.UserDetail.fn))) {
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
    if (imeshExist() !== "") $("#t" + tmpId + "mflag").css("display", "none");
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
      this.BLChatLogin(tmpId);
    }
  };
  
  FormSeq.prototype.BLChatProdName = function (tmpId) {
    var that = this;
    this.NumberofClassCalled = 1;
    ReqObj.Form[tmpId].isProdNameShown = true;
    var hooks = {
      pre: [],
      post: [this.BLChatLogin],
      current: [this.BLChatProdName],
    };
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
  
    if (!imeshExist()) {
      if (ShowProdName(tmpId)) {
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
    var that = this;
    this.NumberofClassCalled = 1;
    if (!(checkblockedUser() && im_issExist() === "") && !( notEmpty(usercookie.getParameterValue(imeshExist(), "fn")) || (isSet(ReqObj.UserDetail) && notEmpty(ReqObj.UserDetail.fn && isSet(ReqObj.UserDetail.fn))))) {
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
  
      var PostBlEnqUpdateObj = returnPostBlEnqObject(tmpId,array,hooks,that,"");
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
    if ( !usercookie.getParameterValue(imeshExist(), "ctid") && currentISO() === "IN") {
      //if offer id generated
      var PostBlEnqUpdateObj = returnPostBlEnqObject( tmpId, array, hooks, that, "");
  
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
    if (ShowEmail()) {
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
    } else {
      this.BLChatRd(tmpId);
    }
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
    } else {
      this.BLChatRd(tmpId);
    }
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
  // FormSeq Post