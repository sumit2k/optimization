function makeObj(Obj, hooks) {
  if (ConstructorName(Obj) !== "") {
    var returnObj = {};
    var KeysArray = GetObjectKeys(hooks);
    if (isSet(Obj)) returnObj["fn"] = Obj;
    for (var i in KeysArray) {
      if (isSet(hooks[KeysArray[i]]))
        returnObj[KeysArray[i]] = hooks[KeysArray[i]];
      else returnObj[KeysArray[i]] = [];
    }
    returnObj["cb"] = [];
    return returnObj;
  } else {
    return {};
    // debugger;
  }
}

function ReplaceObject(Objconfig, tmpId, that) {
  if (!Objconfig.isService) {
    if (Objconfig.toReplace && !(that.GetExistingObject(ConstructorName(Objconfig.obj), tmpId) === false)) {
      Objconfig.obj = Objconfig.arrays.UiArray[i][j].Obj;
    }
  }
}
function FindObject(arr, name, obj) {
  if (isSet(arr) && isSet(name)) {
    for (var i = 0; i < arr.length; i++) {
      if (isSet(arr[i]) && isSet(arr[i].fn) && ConstructorName(arr[i].fn).toLowerCase() === name.toLowerCase()) {
        if (obj.toReplace) {
          arr[i] = obj.ReplaceObj;
        }
        return false;
      } else {
        if (isSet(arr[i]) && FindObject(arr[i].cb, name, obj) === false) {
          return false;
        }
      }
      // }
    }
  }
}
//upto here

function FindCorrectSpot(arr, PushObject, parent) {
  if (isSet(arr)) {
    for (var i = 0; i < arr.length; i++) {
      if (isSet(arr[i].fn) && ConstructorName(arr[i].fn).toLowerCase() === parent.toLowerCase()) {
        arr[i].cb.push(PushObject);
        return true;
      } else {
        if (FindCorrectSpot(arr[i].cb, PushObject, parent) === true) {
          return true;
        }
      }
      // }
    }
  }
}

function ExistsInArray(arr, parent) {
  if (isSet(arr)) {
    for (var i = 0; i < arr.length; i++) {
      if (isSet(arr[i].fn) && ConstructorName(arr[i].fn).toLowerCase() === parent.toLowerCase()) {
        return true;
      } else {
        if (ExistsInArray(arr[i].cb, parent) === true) {
          return true;
        }
      }
      // }
    }
  }
}

function findParent(name) {
  var parent = "";
  for (var key in TreeConfig) {
    if (key.toLowerCase() === name.toLowerCase()) {
      parent = TreeConfig[key];
      break;
    }
  }
  return parent;
}

function AttachObject(Objconfig) {
  // console.log("Attach obj " + Objconfig);
  if (isSet(Objconfig)) {
    if (!Objconfig.isService)
      Objconfig.array.UiArray.push({
        id: Objconfig.objHtmlId,
        Obj: Objconfig.obj,
      });

    if (
      FindObject( Objconfig.array.ServiceArray, ConstructorName(Objconfig.obj), Objconfig ) === false ) {
      // console.log("duplicate", Objconfig.obj);
    } else {
      var parent = findParent(ConstructorName(Objconfig.obj));
      parent = isSet(parent) ? parent : [];

      Objconfig.obj = makeObj(Objconfig.obj, Objconfig.hooks);
      var ObjInsertedOnce = false;

      if (parent.length > 0) {
        for (var i = 0; i < parent.length; i++) {
          if ( FindCorrectSpot( Objconfig.array.ServiceArray, Objconfig.obj, parent[i] ) === true )
            ObjInsertedOnce = true;
          else if (i === parent.length - 1 && !ObjInsertedOnce)
            Objconfig.array.ServiceArray.push(Objconfig.obj);
        }
      } else Objconfig.array.ServiceArray.push(Objconfig.obj);
    }
  }
}

function SetBLEnqDefaultFlags(tempId, instId) {
  if (isSet(tempId) && isSet(instId))
    ReqObj.Form[tempId + instId].flags = CopyObject(Templateconfig[tempId]);
  else ReqObj.Form[tempId + instId].flags = {};
}

function GenOnClick(tmpId) {
  if (GenerationOnClick(tmpId) && UserFilledIsq(tmpId)) {
    if ( isSecondBlEnq(tmpId) && usercookie.getParameterValue(imeshExist(), "uv") !== "V" ) {
      return false;
    }
    return true;
  } else return false;
}

function GenerationOnClick(tmpId) {
  if ( isSet(tmpId) && isSet(ReqObj.Form[tmpId].genOnClick) && ReqObj.Form[tmpId].genOnClick.toLowerCase() === "yes" && tmpId.substring(0, 2) === "09" && isSet(ReqObj.Form[tmpId].formType) && (ReqObj.Form[tmpId].formType.toLowerCase() === "enq" || ReqObj.Form[tmpId].formType.toLowerCase() === "bl") && !isImageVidEnq(tmpId) && usercookie.getParameterValue(imeshExist(), "iso") === "IN" )
    return true;
  else return false;
}

function CallIntentGen(tmpId) {
  if ( isSet(tmpId) && (tmpId.substring(0, 2) === "09" || isIntentBlForm(tmpId)) ) {
    if ( isSet(ReqObj.Form[tmpId].reqSent) && isSet(ReqObj.Form[tmpId].formType) && ReqObj.Form[tmpId].formType.toLowerCase() !== "bl" && !IsChatbl(tmpId) ) {
      if (trimVal(ReqObj.Form[tmpId].reqSent.toLowerCase()) !== "no")
        new Generation(1).onSubmit(tmpId);
    } else {
      if ( isSet(ReqObj.Form[tmpId].formType) && isIntentBlForm(tmpId) && isSet(ReqObj.Form[tmpId].BLIntent) && trimVal(ReqObj.Form[tmpId].BLIntent.toLowerCase()) === "yes" )
        toFireBLIntent(tmpId, "i");
    }
  }
}

function SetDefaultUserInputKeys(tmpId) {
  ReqObj.Form[tmpId].UserInputs = {
    CountryName: "",
    IsCountry: "",
    IsProduct: "",
    ProductName: "",
    PrimaryInfo: "",
    Name: "",
    Mobile: "",
    Email: "",
    City: "",
    CityId: "",
    Requirement: "",
    OTP: "",
    ChangeCountry: "",
    toChange: "",
  };
}

function SetBLEnqDefaultKeys(tmpId) {
  ReqObj.Form[tmpId].cityOth = "";
  ReqObj.Form[tmpId].generationCalled = false;
  ReqObj.userType = "";
  SetDefaultUserInputKeys(tmpId);

  ReqObj.Form[tmpId].generationId = isSet(ReqObj.Form[tmpId].generationId) && ReqObj.Form[tmpId].generationId !== "" && (ReqObj.Form[tmpId].insert === "R" || ReqObj.Form[tmpId].insert === "U") ? parseInt(ReqObj.Form[tmpId].generationId) : defaultGenerationId;
  ReqObj.Form[tmpId].query_destination = -1;
  ReqObj.Form[tmpId].TrackedDisplaySteps = [];
  ReqObj.Form[tmpId].TrackedSubmitSteps = [];
  ReqObj.Form[tmpId].BackwardDisplaySteps = [];
  ReqObj.Form[tmpId].IsbackClicked = false;
  ReqObj.Form[tmpId].IsqUnitArray = [];
  ReqObj.Form[tmpId].IsProdNameChanged = false;
}

function CreateFormObject(tmpId, ReceivedReqObj) {
  ReqObj.Form[tmpId] = CopyObject(ReceivedReqObj);
  ReqObj.Original[tmpId] = CopyObject(ReceivedReqObj);
  if (isSSB(tmpId) && isSet(ReqObj.Original[tmpId]["loginv"]))
    ReqObj.Form[tmpId]["savevalue"] = ReqObj.Original[tmpId]["loginv"];
}

function FormDefaultsFromProperty(LocalReqObj) {
  var tmpId = LocalReqObj.tempId + LocalReqObj.instId;
  if(isSet(ReqObj)) ReqObj.su_cta = 0;
  CreateFormObject(tmpId, LocalReqObj);
  setIplocCookie(tmpId);
  addTemplates(tmpId, template_array);
  updateKeyTypeOfForm(tmpId);
  SetBLEnqDefaultFlags(ReqObj.Form[tmpId].tempId, ReqObj.Form[tmpId].instId);
  PropertyDefault(tmpId, ReqObj.Form[tmpId]);
  SetBLEnqDefaultKeys(tmpId);

  MakeRefText(tmpId);
  if (!GenOnClick(tmpId) && !isEcomProduct(tmpId)) {
    CallIntentGen(tmpId);
  }
  if ( (ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" && Bl04(tmpId)) || (isSet(ReqObj.Form[tmpId].isFrInline) && ReqObj.Form[tmpId].isFrInline === "1") ) {
    blinlineDefaults(tmpId);
  }
  if (tmpId.substring(0, 2) === "09") {
    BLEnqPopUpDefault(tmpId);
  }
  if (IsChatbl(tmpId)) {
    OpenChatBLPopup(tmpId);
  }

  return ReqObj.Form[tmpId];
}
function blinlineDefaults(tmpId) {
  if ( isSet(ReqObj.Form[tmpId].isFrInline) && ReqObj.Form[tmpId].isFrInline === "1") {
    html = "<div class='df'><div class='w50 fpr30' id='t" + tmpId + "_partition1'></div><div class='w50 fpr10' id='t" + tmpId + "_partition2'></div></div>";
    $("#t" + tmpId + "_bl_form").html(html);
    $("#t" + tmpId + "_inlineBL").addClass("be-mdleWrap");
  } else {
    $("#t" + tmpId + "_hdg").html( "<div class='beclrW be-bgb cbl_p10 txt-cnt' style='font-size: 18px;'>Tell us what you need</div>" );
    $("#t" + tmpId + "_hdg").removeClass("bedsnone");
  }
}
function blInlineTransition(tmpId) {

  if (isBlInlineFr(tmpId)) {
    var pgtp = "Exporters";
    if ( typeof ims !== "undefined" && isSet(ims) && isSet(ims.pageType) && ims.pageType !== "" ) {
      pgtp = ims.pageType === "Service" ? "Service Providers" : "Exporters";
    }

    $("#t" + tmpId + "_sidePanel").html('<p class="fs18">Looking to source <span id="t' +tmpId +'_mcatNameAdw" class="bo fstit">' +ReqObj.Form[tmpId].mcatName +'</span> from India?</p><p class="fs16 fmt15">Verified ' +pgtp +' are just a click away <span>→</span></p><hr class="spt"> <p class="fs13 bo">IndiaMART is India\'s largest online B2B marketplace<br>Connecting Global Buyers with Indian Exporters</p>').removeClass().addClass("fAdl fs0 wf");

    $("#t" + tmpId + "_contactdiv").remove();
    $("#t" + tmpId + "_wrpDiv").removeClass().addClass("fAdm df");
    $("#t" + tmpId + "_sidePanel").siblings().removeClass().addClass("fAdr flx1");
    $("#t" + tmpId + "_hdg").html("");
    $("#t" + tmpId + "_inlineBL").removeClass();
    return;
  }
  if (isGlIdEven(tmpId)) {
    var contact_html = "";
    if (imeshExist() != "") {
      var name = isSet(ReqObj.UserDetail["fn"]) && ReqObj.UserDetail !== "" ? ReqObj.UserDetail["fn"].length <= 15 ? ReqObj.UserDetail["fn"] : ReqObj.UserDetail["fn"].substr(0, 12) + "..." : "";
      var gdClass = ReqObj.UserDetail["fn"] !== "" ? "inCrl pdinb ml5 gd" : "inCrl pdinb ml5 gd dn";
      var primary_info = currentISO() !== "IN" ? ReqObj.UserDetail["em"] : "+91-" + ReqObj.UserDetail["mb1"];
      var secondary_info = currentISO() !== "IN" ? ReqObj.UserDetail["mb1"] : ReqObj.UserDetail["em"];
      contact_html = '<div class="be-fhdg clr_blue" id="t' + tmpId + '_hdg1">' + getBLHeading(tmpId, "") + '</div><div class="idsf id_aic inUsrh icrP pr ipb10 ml5 bemt5"><span class="' + gdClass + '"></span> <span class="pdinb ml5 befs14">' + name + '</span> <span class="pdinb ml5 inAr"></span><div class="inUsrM p15"><div><b>Your Contact Information</b></div><span class="idb">' + ReqObj.UserDetail["fn"] + '</span> <span class="idb">' + primary_info + '</span> <span class="idb">' + secondary_info + "</span></div></div>";
    } else {
      contact_html = '<div class="be-fhdg clr_blue" id="t' + tmpId + '_hdg1">' + getBLHeading(tmpId, "") + "</div>";
    }
    $("#t" + tmpId + "_sidePanel").addClass("bedsnone");
    $("#t" + tmpId + "_inlineBL").removeClass().addClass("inEql mr20 ibgc p15_25 bdr5 inBxSh iwd100 pr");
    $("#t" + tmpId + "_contactdiv").html(contact_html);
    $("#t" + tmpId + "_wrpDiv").removeClass("betbl");
    ReqObj.Form[tmpId].screenNumber < 0? $("#t" + tmpId + "_hdg").addClass("bedsnone"): ReqObj.Form[tmpId].currentScreen.toLowerCase() !== "userverification"? $("#t" + tmpId + "_hdg").removeClass("bedsnone"): "";
    $("#t" + tmpId + "_belodr").css("width", "100%");
  } else  {
    $("#t" + tmpId + "_sidePanel").removeClass("bedsnone");
    $("#t" + tmpId + "_inlineBL").removeClass().addClass("be-mdleWrap belft betbl bebxs bebdr1");
    $("#t" + tmpId + "_contactdiv").html("");
    $("#t" + tmpId + "_belodr").removeAttr("style");
    $("#t" + tmpId + "_hdg").removeClass("bedsnone");
  }
}
function InitiateSequence(tmpId, where) {
  GetIsqFromService(tmpId);
  if(featOnInctive(tmpId)){      //recoms
    setTimeout(function() {
      GetFeaturedData(tmpId);
    }, 5000);   
  }  
  ReqObj.Form[tmpId].FormSequence = new FormSeq();
  ReqObj.Form[tmpId].FormSequence.FirstStepSequence(tmpId, where);
  FormCloseButtons(tmpId);
}

function OpenBLEnqPopup(tmpId) {
  isBLFormOpen = true;
  var imeshcookie = imeshExist();
  $("#t" + tmpId + "_leftS").removeAttr("style");
  if (!pdpenqImage(tmpId)) {
    $("#t" + tmpId + "_thankDiv").removeClass("eqTst eqRes");
    $("#t" + tmpId + "_mcont").removeClass("eqTst eqRes");
  }
  $("#t" + tmpId + "_bewrapper").removeClass("lightboxwrap");
  if(isLightbox(tmpId)){
    $("#t" + tmpId + "_bewrapper").addClass("lightboxwrap");
  }
  if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
    if (imeshcookie === "") $("#t" + tmpId + "_leftR").addClass("lftMgn");
    else if (!isInactiveBL(tmpId))
      $("#t" + tmpId + "_leftR").removeClass("lftMgn");
    $("#t" + tmpId + "_thankDiv").addClass("oEq");
    $("#t" + tmpId + "_mcont").addClass("oEq");
    $("#t" + tmpId + "_mcont").removeClass("eqImSec");
    $("#t" + tmpId + "_thankDiv").removeClass("eqImSec");
    if (currentISO() !== "IN") $("#t" + tmpId + "_thankDiv").addClass("fnUser");
  } else {
    if ( ReqObj.Form[tmpId].formType.toLowerCase() === "bl" && tmpId.substring(0, 2) === "09" ) {
      $("#t" + tmpId + "_thankDiv").removeClass("eqImSec");
      $("#t" + tmpId + "_mcont").addClass("blder");
    } else {
      $("#t" + tmpId + "_mcont").removeClass("blder");
    }
    $("#t" + tmpId + "_mcont").removeClass("oEq");
    $("#t" + tmpId + "_thankDiv").removeClass("oEq");
    if (currentISO() !== "IN")
      $("#t" + tmpId + "_thankDiv").removeClass("fnUser");
    if (imeshcookie === "") $("#t" + tmpId + "_leftR").removeClass("lftMgn");
    else $("#t" + tmpId + "_leftR").removeClass("lftMgn");
  } // resizing
  if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" && tmpId.substring(0, 2) === "01") {
    $("#t" + tmpId + "_thankDiv").removeClass("eqImSec");
  }
  if (currentISO() === "IN") $("#t" + tmpId + "_thankDiv").removeClass("nfusr");
  $("#t" + tmpId + "_thankDiv").removeClass("BL_Thnky");
  $("#t" + tmpId + "_bewrapper").removeClass("bedsnone").css({
      display: "block",
    });

    $("#t" + tmpId + "_blkwrap").removeClass("e_bgc");
    $("#t" + tmpId + "_bewrapper").removeClass("e_opn");
    if ($("#t" + tmpId + "OtpMainHeading").hasClass("e_hdg"))
      $("#t" + tmpId + "OtpMainHeading").remove();
    if ($("#t" + tmpId + "_mcont").parent().hasClass("e_whm"))
      $("#t" + tmpId + "_mcont").parent().removeClass().addClass("be-frmcont");
    if (!recomOnInactive(tmpId)) {    //inactive changes 
      $("#t" + tmpId + "_mcont").removeClass("bedsnone").css({
        display: "flex",
      });
    } else {
      $("#t" + tmpId + "_mcont").css({
        display: "block",
      });
    }
    $("#t" + tmpId + "_leftsection").removeClass();
    if ($("#t" + tmpId + "_leftR").hasClass("e_p20")) {
      $("#t" + tmpId + "_leftR").removeClass().addClass("be-Rsc be-frmpop");
    }
    if (isInactiveBL(tmpId)) {
      $("#t" + tmpId + "_leftR").removeClass().addClass("be-Rsc be-frmpop lftMgn be-Rsc2 cbl_br8");
    }


  updateKeyTypeOfForm(tmpId);
  initialiseOuterSection(tmpId); // left and right sections initialisation
  sectionInitialisationStepWise(tmpId, 0); // step wise intialisation
  if ( !( isSet(ReqObj.Form[tmpId].zoomImage) && ReqObj.Form[tmpId].zoomImage !== "" ) && ReqObj.mcatdtl.ping === true && ReqObj.mcatdtl.response === false )
    $("#t" + tmpId + "_imglodr").removeClass("bedsnone");
  else $("#t" + tmpId + "_imglodr").addClass("bedsnone");
  $("#search_string").blur();
  if(isInactiveBL(tmpId)){
    $("#t" + tmpId + "_leftsection").prepend('<div id="blheading" class="txt-cnt mt6 fs16 mb8"></div>');
  }
  stopBgScroll();
}

function BLEnqPopUpDefault(tmpId) {
  ReqObj.updateImage = 0;
  window.googletag = window.googletag || {
      cmd: [],
    };
    var conv = usercookie.getCookie("conv");
    var adult = isSet(ReqObj.Form[tmpId].isAdult) && ReqObj.Form[tmpId].isAdult !== "" ? ReqObj.Form[tmpId].isAdult: 2;
    var gtag = window.googletag && googletag.apiReady && googletag.pubadsReady && typeof (googletag.defineSlot) === "function";
    if(isInactiveBL(tmpId) && conv === "true"  &&
    (parseInt(adult) === 2 || parseInt(adult) === 0) && ReqObj.Form[tmpId].ctaName.toLowerCase() !== "lightbox" && document.visibilityState !== "hidden" && gtag){
    showAdInact(tmpId);
    }
    else
  OpenBLEnqPopup(tmpId);
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

function ClearBLEnqFormUI(tmpId) {
  if (tmpId.substring(0, 2) === "09") ClearBLEnqPopUpUI(tmpId);
  else ClearBLEnqInlineUI(tmpId);
}

function AfterFormDefaults(tmpId, flagsugg) {
  ClearSeqArrays(tmpId);
  SetUIElKeys(tmpId, flagsugg);
  ClearBLEnqFormUI(tmpId);
  ReqObj.Form[tmpId].currentclassCount = 0;
  // if ((tmpId.substring(0, 2) === "09" && ReqObj.Form[tmpId].formType.toLowerCase() === "bl" && ReqObj.Form[tmpId].IsProdNameChanged === false) || IsChatbl(tmpId)) {
  if ( (tmpId.substring(0, 2) === "09" && ReqObj.Form[tmpId].formType.toLowerCase() === "bl") || IsChatbl(tmpId) ) {
    leftSideTransition(0, tmpId);
  }
  if (typeof flagsugg === "undefined") {
    ReqObj.changeFlag = false;
  } else ReqObj.changeFlag = true;
  InitiateSequence(tmpId, flagsugg);
}

function UserFilledIsq(tmpId) {
  if ( isSet(ReqObj.Form[tmpId].userFilledIsq) && ReqObj.Form[tmpId].userFilledIsq instanceof Array ) {
    var userFilledIsq = ReqObj.Form[tmpId].userFilledIsq;
    var flag = true;
    if (userFilledIsq.length === 2) {
      for (var j = 0; j < userFilledIsq.length; j++) {
        if ( notEmpty(userFilledIsq[j].questionsId) && notEmpty(userFilledIsq[j].questionsDesc) && notEmpty(userFilledIsq[j].optionsId) && notEmpty(userFilledIsq[j].optionsValue) ) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
    } else flag = false;

    return flag;
  } else return false;
}

function callGlobalFunction() {
  if ( typeof ims !== "undefined" && isSet(ims) && isSet(ims.dirTypeFull) && ims.dirTypeFull !== "" ) {
    var dirTypeFull = ims.dirTypeFull.toLowerCase();
    if ( dirTypeFull === "impcat" || dirTypeFull === "city" || dirTypeFull === "search" ) {
      if (typeof block_softask === "function") block_softask();
    }
  }
}

function paywithHideShow(tmpId) {
  if (currentISO() !== "IN") {
    $("#t" + tmpId + "_paywithdiv").addClass("dn");
    $(".be-hlpd").addClass("h120");
    $("#t" + tmpId + "_paywithcon").addClass("dn");
  } else {
    $(".be-hlpd").removeClass("h120");
    $("#t" + tmpId + "_paywithcon").removeClass("dn");
    $("#t" + tmpId + "_paywithdiv").removeClass("dn");
  }
}

function checktoCall(tmpId) {
  var imesh = imeshExist();
  var glid = usercookie.getParameterValue(imesh, "glid");
  if (
    (glid !== "" && typeof ReqObj.CNSerCalled === "undefined") ||
    (typeof ReqObj.CNSerCalled !== "undefined" && ReqObj.CNSerCalled === false)
  ) {
    toCallMiniDetails(tmpId);
    ReqObj.CNSerCalled = true;
  }
}

function isEcomProduct(tmpId) {
  return isSet(ReqObj.Form[tmpId].isEcom) && ReqObj.Form[tmpId].isEcom === 1
    ? true
    : false;
}

function OpenForm(LocalReqObj, flagsugg) {
  // don't change the sequence of functions

  if(isSet(ReqObj)){
  var UpdatedReceivedReqObj = FormDefaultsFromProperty(LocalReqObj);
  var tmpId = UpdatedReceivedReqObj.tempId + UpdatedReceivedReqObj.instId;
  paywithHideShow(tmpId);
  checktoCall(tmpId);
  addDetachedFlag(tmpId);
  var imEqGl = usercookie.getCookie("imEqGl");
  ReqObj.Form[tmpId].toShowOtpStepenq = imEqGl !== "" && imEqGl.substring(0, 1).toLowerCase() === "d" ? true : false;
  ReqObj.Form[tmpId].toShowOtpStepbl = imEqGl !== "" && imEqGl.substring(0, 1).toLowerCase() === "b" ? true : false;
  ReqObj.Form[tmpId].toFireGaTracking = isSSB(tmpId) ? true : getTimeStamp();
  updateReceivedImage(UpdatedReceivedReqObj);
  if (isSSB(tmpId) && isSet(flagsugg) && flagsugg === "changeflag")
    ReqObj.Form[tmpId].flags.prodSecNochange = true;
  ReqObj.Form[tmpId].cName.prodServ = isSet(ReqObj.Form[tmpId].cName.prodServ) && ReqObj.Form[tmpId].cName.prodServ !== "" ? ReqObj.Form[tmpId].cName.prodServ : ReqObj.Form[tmpId].prodServ;
  //ReqObj.Form[tmpId].cName.prodServ = ReqObj.Form[tmpId].prodServ
  AfterFormDefaults(tmpId, flagsugg);
  callGlobalFunction();
  CallGenService(tmpId);
  HideSuggester();
  }
}

function updateKeyTypeOfForm(tmpId) {
  if (
    !(
      isSet(ReqObj.Form[tmpId].typeofform) &&
      ReqObj.Form[tmpId].typeofform !== ""
    )
  ) {
    if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
      if (ReqObj.Form[tmpId].ctaType.toLowerCase() === "image")
        ReqObj.Form[tmpId].typeofform = "image";
      if (ReqObj.Form[tmpId].ctaType.toLowerCase() === "video")
        ReqObj.Form[tmpId].typeofform = "video";
      if (
        ReqObj.Form[tmpId].ctaType.toLowerCase() !== "image" &&
        ReqObj.Form[tmpId].ctaType.toLowerCase() !== "video"
      )
        ReqObj.Form[tmpId].typeofform = "enquiry";
    } else if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl") {
      ReqObj.Form[tmpId].typeofform = "bl";
    } else if (IsChatbl(tmpId)) {
      ReqObj.Form[tmpId].typeofform = "popupchatbl";
    }
  }
}

function checkblockedUser() {
  return usercookie.getParameterValue(imeshExist(), "usts") === "2"
    ? true
    : isSet(ReqObj.UserDetail["blusrdtl"]) &&
      isSet(ReqObj.UserDetail["blusrdtl"]["blkUsr"]) &&
      ReqObj.UserDetail["blusrdtl"]["blkUsr"] === 1 &&
      ReqObj.UserDetail["uv"] !== "V"
      ? true
      : false;
}

function returnTypeForSeq(tmpId) {
  // inline enq changes
  if (
    tmpId.substring(0, 2) === "04" &&
    ReqObj.Form[tmpId].typeofform === "enquiry"
  )
    return "inenquiry";
  if (Bl04(tmpId)) return "blfirstfold";
  return ReqObj.Form[tmpId].typeofform === "image" ||
    ReqObj.Form[tmpId].typeofform === "video"
    ? "imenquiry"
    : isSet(ReqObj.Form[tmpId].typeofform)
      ? ReqObj.Form[tmpId].typeofform
      : "";
}

function updateReceivedImage(UpdatedReceivedReqObj) {
  var mcatimage = getImage(UpdatedReceivedReqObj.mcatId);
  if (UpdatedReceivedReqObj.formType.toLowerCase() === "bl") {
    if (UpdatedReceivedReqObj.displayImage !== "") {
      pushImage(
        UpdatedReceivedReqObj.mcatId,
        UpdatedReceivedReqObj.displayImage,
        UpdatedReceivedReqObj.zoomImage
      );
    } else if (mcatimage === "" || typeof mcatimage === "undefined")
      pushImage(
        UpdatedReceivedReqObj.mcatId,
        UpdatedReceivedReqObj.displayImage,
        UpdatedReceivedReqObj.zoomImage
      );
  }
}

function CallGenService(tmpId) {
  if (GenOnClick(tmpId)) {
    var that = ReqObj.Form[tmpId].FormSequence;
    var array = {
      UiArray: [],
      ServiceArray: [],
    };
    hooks = {
      pre: [],
      post: [],
    };
    var GenObject = returnGenObject(tmpId, array, hooks, that, 0);
    that.MakeSeq(GenObject);
    var IsqObject = {
      object: {
        obj: ReqObj.Form[tmpId].GlobalIsqObject,
        array: array,
        hooks: hooks,
        isService: true,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: false,
      FallbackObj: null,
    };
    that.MakeSeq(IsqObject);

    SavePropIsq(tmpId);

    formatServices(array.ServiceArray, tmpId);
    ServiceSequenceHit(tmpId, false);
  }
}

function notEmpty(val) {
  if (isSet(val) && val !== "") {
    return true;
  } else return false;
}

function SavePropIsq(tmpId) {
  if (
    isSet(ReqObj.Form[tmpId].userFilledIsq) &&
    ReqObj.Form[tmpId].userFilledIsq instanceof Array
  ) {
    var userFilledIsq = ReqObj.Form[tmpId].userFilledIsq;

    for (var j = 0; j < userFilledIsq.length; j++) {
      ReqObj.Form[tmpId].questionsId.push(userFilledIsq[j].questionsId);
      ReqObj.Form[tmpId].questionsDesc.push(userFilledIsq[j].questionsDesc);
      ReqObj.Form[tmpId].optionsId.push(userFilledIsq[j].optionsId);
      ReqObj.Form[tmpId].optionsValue.push(userFilledIsq[j].optionsValue);
    }
  }
}
function SetUIElKeys(tmpId, where) {
  IsqKeys(tmpId);
  RdBoxKeys(tmpId);
  if (where !== "from-Form") EnrichKeys(tmpId);
  StaticIsqKeys(tmpId);
  ContactDetailKeys(tmpId);
  ReqObj.Form[tmpId].calledClassName = {};
}

function GetIsqFromService(tmpId) {
  ReqObj.Form[tmpId].mcatId !== "-1" || ReqObj.Form[tmpId].catId !== "-1"
    ? GetIsq(tmpId)
    : "";
  ReqObj.Form[tmpId].GlobalIsqObject = new Isq(tmpId);
  ReqObj.Form[tmpId].GlobalRdObj = new RequirementDtl(tmpId); // check
}

function GetFeaturedData(tmpId){   //recoms
  var recompresent=null;
  var f_data=null;
  var g_data=null;
  try{
    recompresent = sessionStorage.getItem("featCats");
  }
  catch(err){
    recompresent = null;
  }
  if(!isSet(recompresent) || typeof(recompresent) == 'undefined' || recompresent == ''){
    if (typeof(sugg) != 'undefined' && sugg != '' && typeof(sugg.recent) != 'undefined' && typeof(sugg.recent) == "function") {
      if (IMStore.localStorageLoaded == true) {
        f_data = sugg.recent('keyw_data');
        g_data = sugg.recent('mcat_data');
      } 
      else {
          var handler = setInterval(function() {
            if (IMStore.localStorageLoaded == true) {
              f_data = sugg.recent('keyw_data');
              g_data = sugg.recent('mcat_data'); 
              clearInterval(handler);                        
            }
          }, 1000);
      }
            
      var mcatsArr=[];  
      var mcats = ''; 
      if(isSet(f_data) && f_data !== null && f_data.length >= 1){ 
        var mcat_len= f_data.length >= 5 ? 5 : f_data.length;        
        for (j = 0; j < mcat_len; j++) {
          if (f_data[j].mcatid == -1)
          continue;
          mcats += f_data[j].mcatid + ',';
        }          
      }
      else{
        if(isSet(g_data) && g_data !== null && g_data.length >= 1){
          var mcat_len= g_data.length >= 5 ? 5 : g_data.length;
          for (j = 0; j < mcat_len; j++) {
            if (g_data[j].id == -1)
            continue;
            mcats += g_data[j].id + ',';
          }
        }     
      }
      if (mcats != '') {
        mcats = mcats.replace(/,\s*$/, "");
         mcatsArr = mcats.split(",");
      }  
      // console.log(f_data);
      // console.log(g_data);
      // console.log(mcatsArr);     //hhhh 
      if(mcatsArr.length>0){
        getDataServHit(mcatsArr);    
      }    
    }
    else{
      setTimeout(function() {
        GetFeaturedData(tmpId);
      }, 250);
    }    
  }
}

function getDataServHit(mcats){    //recoms
  var url = "https://recommend.imutils.com/Related/GetData/?token=imobile@15061981&MCAT_ID1=" + mcats[0] + "&MCAT_ID2=" + mcats[1] + "&MCAT_ID3=" + mcats[2] + "&count=" + 15 + "&Modid=" + modIdf + "&TYPE=M"    
  var result = '';    
  $.ajax({
      type: "GET",
      url: url,
      async: false,
      success: function(rel) {
          result=JSON.parse(rel)                                   
          if (
            isSet(rel) &&
            result["Status"] == 200 &&
            isSet(result["RECOMMENDED MCAT DATA"]) &&
            result["RECOMMENDED MCAT DATA"].length > 1
          ) {      
            featSessionSave(result["RECOMMENDED MCAT DATA"]);  
          }       
          
      },
      timeout: 3000,
      error: function(rel) {
        res = isSet(rel) ? JSON.stringify(rel) : "response undefined";
        // console.log(res);
      }
  })        
}

function featSessionSave(featArr){      //recoms
  // console.log(featArr);
  var dataFinal=[];
  var cntdt=0;
  //gggg
  for (j=0; j<featArr.length && cntdt<6; j++){
    var catName=isSet(featArr[j]['GLCAT_MCAT_NAME']) ? featArr[j]['GLCAT_MCAT_NAME']: "";
    var catImg=isSet(featArr[j]['GLCAT_MCAT_IMG1_125X125']) ? featArr[j]['GLCAT_MCAT_IMG1_125X125'] : isSet(featArr[j]['GLCAT_MCAT_IMG1_250X250']) ? featArr[j]['GLCAT_MCAT_IMG1_250X250'] : "";
    var catUrl=isSet(featArr[j]['URL']) ? featArr[j]['URL']: "";
    if(catName!="" && catImg!="" && catUrl!=""){  
      var arr={'catName':catName,'catImg':catImg,'catUrl':catUrl};       
      dataFinal.push(arr);
      cntdt=cntdt+1;
    }        
  }
  // console.log(dataFinal);
  try {
    sessionStorage.setItem(
      "featCats",
      JSON.stringify(dataFinal)
    );
  } catch (err) {
      // quota_exceeded_error
    } 
}


function CloseForm(tmpId) {
  if (
    (tmpId.substring(0, 2) === "09" &&
      $("#t" + tmpId + "_bewrapper").css("display") === "block") ||
    (tmpId.substring(0, 2) !== "09" &&
      $("#t" + tmpId + "_enrichform_maindiv").css("display") !== "none")
  ) {
    if (
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
      !ValidGenId(ReqObj.Form[tmpId].generationId)
    ) {
      ReqObj.finEnq = tmpId;
    } else
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
        ValidGenId(ReqObj.Form[tmpId].generationId) &&
        !ReqObj.Form[tmpId].flags["isThankYouCalled"]
        ? FinishEnquiryService(tmpId)
        : "";
    // (ReqObj.Form[tmpId].formType.toLowerCase() === "enq" && ((ValidGenId(ReqObj.Form[tmpId].generationId) && !ReqObj.Form[tmpId].flags["isThankYouCalled"]) || ReqObj.Form[tmpId].hitFinishEnquiryService)) ? FinishEnquiryService(tmpId): "";
    if (!isEcomProduct(tmpId)) ServiceSequenceHit(tmpId, false);
    ReqObj.TempMobile = "";
    ReqObj.Form[tmpId].pvTrackingFired = false;
    ReqObj.TempEmail = "";
    ReqObj.ImageVideoIsqSeq = false;
    closeVideo(tmpId);
    SetUserDetails();
    updateToAsk(tmpId);
    addDetachedFlag();
    //detachFlag2(tmpId);
    if (tmpId.substring(0, 2) === "09") {
      if (recomOnInactive(tmpId)) {       //inactive changes
        $("#recommendProd").css({
          display: "none",
        });
      }
      $("#t" + tmpId + "_bewrapper").css({
        display: "none",
      });
      ClearBLEnqPopUpUI(tmpId);
    } else if (tmpId.substring(0, 2) === "08") {
      if (IsChatBLInline(tmpId)) {
        $("#t" + tmpId + "_chatBL")
          .addClass("cbl_vh")
          .removeClass("cbl_vv");
        updateChatWidgetGlobalVar(tmpId);
        chatwidgetTransitions(tmpId);
      } else {
        $("#t" + tmpId + "_chatBL").css({
          display: "none",
        });
      }
      ClearBLEnqPopUpUI(tmpId);
      $(".t" + tmpId + "blk_scrn").addClass("dn");
    } else {
      $("#t" + tmpId + "_enrichform_maindiv")
        .html("")
        .css({
          display: "none",
        });
      $("#t" + tmpId + "_q_send_req_button").html(ReqObj.Form[tmpId].btn);
      isSet(ReqObj.Form[tmpId].InlineformParentEl)
        ? ReqObj.Form[tmpId].InlineformParentEl.html(
          ReqObj.Form[tmpId].InlineformHtml
        )
        : "";
      $("#t" + tmpId + "_q_send_req_button")
        .parent()
        .removeClass("bedsnone");
      ReqObj.Form[tmpId].btn = "";
    }

    if (!IsChatbl(tmpId)) {
      HideSuggester();
      var HitArray = ReqObj.Form[tmpId].HitArray;
      var enqclose = ReqObj.Form[tmpId].enqSentCallBack;
      if (!(tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId)))
        ReqObj.Form[tmpId] = CopyObject(ReqObj.Original[tmpId]);
      ReqObj.Form[tmpId].HitArray = HitArray;
      ReqObj.Form[tmpId].enqSentCallBack = enqclose;
    }
    ReqObj.ipLoc.onClose = true;
    UpdateSeq();
    ReqObj.loginMode = 0;
    ReqObj.userType = "";
    resumeBgScroll();
    SetUserDetails();
    isBLFormOpen = false;
    $(document).trigger(FormCloseEvent, [ReqObj.Form[tmpId].ordr_qnty_index]);
    $(document).trigger(OnBlEnqClose);
    if (checkblockedUser()) ReqObj.UserDetail.blusrdtl = {};
  }
}

function closeVideo(tmpId) {
  if ($("#t" + tmpId + "_prodVideo").is("iframe"))
    $("#t" + tmpId + "_prodVideo")[0].contentWindow.postMessage(
      '{"event":"command","func":"' + "stopVideo" + '","args":""}',
      "*"
    );
}

function SetFormHtmlDefaultValue(tmpId) {
  isnewSSB(tmpId)
    ? ""
    : $("#t" + tmpId + "_thankDiv")
      .html("")
      .addClass("bedsnone");
  // $("#t" + tmpId + "_beprevious").addClass("bedsnone");
  // $("#t" + tmpId + "_qnextbtn").addClass("bedsnone");
}

function leftSideEmpty(tmpId) {
  $("#t" + tmpId + "_Prodname").html("");
  $("#t" + tmpId + "_Compname").html("");
  $("#t" + tmpId + "_ProdPrice").html("");
  $("#t" + tmpId + "_state").html("");
  $("#t" + tmpId + "_locality").html("");
  $("#t" + tmpId + "_city").html("");
  $("#t" + tmpId + "parent_iframe").html(
    "<div id='t" + tmpId + "_prodVideo' class='belft bepr pdpHg'></div>"
  );
  $(".proctname").html("");
}

function ClearBLEnqPopUpUI(tmpId) {
  //leftSideEmpty(tmpId);
  if (IsChatbl(tmpId)) {
    $("#t" + tmpId + "_new_chatbl").html("");
    IsChatBLInline(tmpId)
      ? $("#t" + tmpId + "_newblchatReply")
        .html("")
        .addClass("cbl_br10 cbl_bgf1")
        .removeClass("cbl_bg1")
      : $("#t" + tmpId + "_newblchatReply").html("");
    chatblHideTransition(tmpId);
    $("#t" + tmpId + "_blchatfooter").removeClass("focus");
    $("#t" + tmpId + "_changeProduct")
      .removeAttr("disabled")
      .css({
        opacity: "1",
        cursor: "pointer",
      });
    removechatblerror(tmpId);
    //$("#t" + tmpId + "_helptext").addClass("dn");
    // $("#t" + tmpId +"hi").html("");
    $("#t" + tmpId + "hi").addClass("dn");
  }
  $("#t" + tmpId + "_bl_form").html("");
  $("#t" + tmpId + "_byrinfo")
    .addClass("bedsnone")
    .html("");
  $("#t" + tmpId + "_tCond").addClass("bedsnone");
  SetFormHtmlDefaultValue(tmpId);
}

function ClearBLEnqInlineUI(tmpId) {
  if (isSSB(tmpId)) $("#t" + tmpId + "_thankDiv").html("");
  if (isnewSSB(tmpId))
    $("#t" + tmpId + "_thankDiv")
      .parent()
      .addClass("bedsnone");
  if (IsChatbl(tmpId)) {
    $("#t" + tmpId + "_new_chatbl").html("");
    //$("#t" + tmpId + "_newblchatReply").html("");
  }
  if (!isSSB(tmpId) && !(tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId)))
    $("#t" + tmpId + "_bl_form").html("");

  $("#t" + tmpId + "_byrinfoIn")
    .html("")
    .addClass("bedsnone");

  $("#t" + tmpId + "_tCond").addClass("bedsnone");
  if (!IsChatbl(tmpId) && !isSSB(tmpId))
    var clr =
      isGlIdEven(tmpId) && tmpId.substr(0, 2) === "01"
        ? ""
        : "background-color : rgb(0, 166, 153)";
  $("#t" + tmpId + "_submit")
    .removeAttr("disabled")
    .attr("style", clr);
  $("#t" + tmpId + "_submit")
    .removeAttr("disabled")
    .attr("style", clr);
  $("#t" + tmpId + "_submitdiv").attr("class", "befstgo1");
}

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

function ShowOtp(tmpId) {
  var imeshcookie = imeshExist();
  if (
    imeshcookie &&
    usercookie.getParameterValue(imeshcookie, "uv") !== "V" &&
    usercookie.getParameterValue(imeshcookie, "iso") === "IN"
  )
    return true;
  else return false;
}

function ShowEmail() {
  return !usercookie.getParameterValue(imeshExist(), "em") &&
    currentISO() === "IN"
    ? true
    : false;
}
function ShowMobile() {
  return !usercookie.getParameterValue(imeshExist(), "mb1") &&
    currentISO() != "IN"
    ? true
    : false;
}

function EmailAfterReqbox(tmpId) {
  return isSet(ReqObj.Form[tmpId].emailAfterReqbox) &&
    ReqObj.Form[tmpId].emailAfterReqbox
    ? true
    : false;
}

if (typeof isIframeApiloaded === "undefined") window["isIframeApiloaded"] = 0;

var new_player = "";

function loadScript() {
  if (isIframeApiloaded === 0) {
    /* global ReqObj.video_url agr enquiry pr aaya then. */ isIframeApiloaded = 1;
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
}
//loadScript();
function onPlayerStateChange(event) {
  if (event.data !== 1) blStop = 0;
  else blStop = 1;
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

function CreateSeq(NewObjConf) {
  if (isSet(NewObjConf)) {
    ReplaceObject(NewObjConf.object, NewObjConf.tmpId, NewObjConf.that);
    if (typeof NewObjConf.object.obj.hasHtml === "function")
      NewObjConf.object.obj.hasHtml(NewObjConf);
  }
}

function getFormIdMisc(element, tmpId) {
  var array2 = ["requirementdtl", "isq"];
  if (imeshExist() === "") array2 = ["userlogin", "contactdetail"];

  if ($.inArray(element, array2) !== -1) return "t" + tmpId + "_partition2";
  else return "t" + tmpId + "_partition1";
}

function RenderHtmlMisc(array, tmpId, htmlArray, counter) {
  var FormIdSel = $("#t" + tmpId + "_partition1");
  RenderHtml(FormIdSel, htmlArray[0], tmpId, counter);
  FormIdSel = $("#t" + tmpId + "_partition2");
  RenderHtml(FormIdSel, htmlArray[1], tmpId, counter);
}

function RenderHtml(FormIdSel, HtmlArray, tmpId, screenNumber) {
  if (!isSet(HtmlArray)) HtmlArray = [];
  var DisplayHtml = "";
  for (var u = 0; u < HtmlArray.length; ++u) {
    for (var i = 0; i < HtmlArray[u].length; i++) {
      DisplayHtml += HtmlArray[u][i];
    }
  }
  if (DisplayHtml !== "") {
    var html = "";
    if (IsPrevBtnImplemented(tmpId)) {
      html += "<div id='" + CounterScreenId(tmpId, 0).elid + "'>";
      html += DisplayHtml;
      html += "</div>";
    } else {
      html += DisplayHtml;
    }
    isBlInline(tmpId) ? FormIdSel.html(html) : FormIdSel.append(html);
  }
  if (
    isInactiveBL(tmpId) &&
    ReqObj.Form[tmpId].FormSequence._screenCounter === 1
  ) {
    if (
      document.getElementById("t0901_contactinfo1") &&
      currentISO() !== "IN"
    ) {
      $("#t0901_contactinfo1").remove();
      $("#name_email").append(ReqObj.Form[tmpId].ContactDetail["1"]);
      $("#name_email").addClass("NameEmail");
      $("#name_email").css({
        width: "600px",
      });
    }
  }
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

function questionTransition(formType, tmpId) {
  if (
    isSet(formType) &&
    $.inArray(formType.toLowerCase(), showElemonForm) === -1
  ) {
    if (IsPrevBtnImplemented(tmpId)) {
      $($("#t" + tmpId + "_bl_form").children()).each(function () {
        $(this).css("display", "none");
      });
    } else {
      if (!isSSB(tmpId) && !isBlInline(tmpId))
        $("#t" + tmpId + "_bl_form").html("");
    }
  } else if (
    isSet(formType) &&
    $.inArray(formType.toLowerCase(), showElemonForm) !== -1
  ) {
    $(".t" + tmpId + "_userInput").each(function () {
      $(this).remove();
      chatblHideTransition(tmpId);
    });
    if (!ReqObj.Form[tmpId].NotSure) ShowUserAns(tmpId);
    else {
      var classtotest = chatBlClass(tmpId, "right");
      var leftright = IsChatbl(tmpId) ? "message-right1" : "";
      $("#t" + tmpId + "_bl_form").append(
        ConversationRightWrapper(tmpId, NotFilled, {
          classtotest: classtotest,
          leftright: leftright,
        })
      );
    }
  }
}

function IsPrevBtnImplemented(tmpId) {
  if (notEmpty(tmpId)) {
    var tmpIdArr = ["09"];
    var tmpId = tmpId.substring(0, 2);
    if ($.inArray(tmpId, tmpIdArr) !== -1) return true;
    return false;
  }
  return false;
}

function makeFinalSeq(AttachingObj, tmpId) {
  if (
    isSet(AttachingObj) &&
    isSet(AttachingObj.that) &&
    isSet(AttachingObj.that.FullServiceArray) &&
    isSet(ReqObj.Form[tmpId].UiArray)
  ) {
    AttachingObj.that.FullServiceArray.push(
      AttachingObj.object.array.ServiceArray
    );
    ReqObj.Form[tmpId].UiArray.push(AttachingObj.object.array.UiArray);
    AttachingObj.that.getStep(tmpId);
  }
}

function formatServices(arr, tmpId) {
  if (isSet(ReqObj.Form[tmpId].ServiceSequence) && isSet(ReqObj.Form[tmpId].HitArray) && isSet(arr)) {
    for (var i = 0; i < arr.length; i++) {
      var parent = findParent(ConstructorName(arr[i].fn));
      parent = isSet(parent) ? parent : [];
      var ObjAttached = false;
      if (parent.length > 0) {
        for (var j = 0; j < parent.length; j++) {
          if (FindCorrectSpot(ReqObj.Form[tmpId].ServiceSequence, arr[i], parent[j])) {
            ObjAttached = true;
          } else if (
            FindCorrectSpot(ReqObj.Form[tmpId].HitArray, arr[i], parent[j])
          ) {
            ObjAttached = true;
          } else if (j === parent.length - 1 && !ObjAttached)
            ReqObj.Form[tmpId].ServiceSequence.push(arr[i]);
        }
      } else {
        ReqObj.Form[tmpId].ServiceSequence.push(arr[i]);
      }
    }
  }
}

function ServiceSequenceHit(tmpId, showLoader) {
  if (isSet(tmpId) && isSet(ReqObj.Form[tmpId]) && isSet(ReqObj.Form[tmpId].ServiceSequence)) {
    if (isSet(showLoader) && showLoader) IsChatbl(tmpId) && ReqObj.Form[tmpId].currentScreen.toLowerCase() === "userverification" ? ReqObj.Form[tmpId].isSkipOTPClicked ? "" : $("#t" + tmpId + "cbl_msg").parent().removeClass("dn") : addBlLoader(tmpId, "right");

    while (ReqObj.Form[tmpId].ServiceSequence.length > 0) {
      if (isSet(ReqObj.Form[tmpId].ServiceSequence[0]) && isSet(ReqObj.Form[tmpId].ServiceSequence[0].fn) && typeof ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit === "function")
        ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit(tmpId);
      else {
        if (IsProduction()) {
          ReqObj.Form[tmpId].ServiceSequence.pop();
        } else if (IsProduction()) console.err("something is wrong");
      }
    }
  }
}

function ServiceSeqGeneration(tmpId) {
  if (isSet(tmpId) && isSet(ReqObj.Form[tmpId]) && isSet(ReqObj.Form[tmpId].ServiceSequence)) {
    while (ReqObj.Form[tmpId].ServiceSequence.length > 0) {
      if (isSet(ReqObj.Form[tmpId].ServiceSequence[0]) && isSet(ReqObj.Form[tmpId].ServiceSequence[0].fn) && typeof ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit === "function" && isSet(ConstructorName(ReqObj.Form[tmpId].ServiceSequence[0].fn)) && ConstructorName(ReqObj.Form[tmpId].ServiceSequence[0].fn).toLowerCase() === "generation")
        ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit(tmpId);
      else {
        ReqObj.Form[tmpId].ServiceSequence.pop();
      }
    }
  }
}

function subsequentKeyUI(tmpId) {
  var imeshcookie = imeshExist();
  ReqObj.Form[tmpId].flags["IsFirstStep"] = false;
  ReqObj.Form[tmpId].isQuantIsq = false;
  sectionInitialisationStepWise(tmpId, 1);
  if (!pdpenqImage(tmpId))
    new LeftSide(tmpId, ReqObj.Form[tmpId].typeofform, 1);
  if (ReqObj.Form[tmpId].ctaType.toLowerCase() !== "image" && ReqObj.Form[tmpId].ctaType.toLowerCase() !== "video" && ReqObj.Form[tmpId].formType.toLowerCase() === "enq" && imeshcookie !== "" && !isInactiveBL(tmpId)) {
    $("#t" + tmpId + "_leftR").removeClass("lftMgn");
    if (currentISO() !== "IN") $("#t" + tmpId + "_thankDiv").addClass("fnUser");
  }
  if (ReqObj.Form[tmpId].ctaType.toLowerCase() !== "image" && ReqObj.Form[tmpId].ctaType.toLowerCase() !== "video" && ReqObj.Form[tmpId].formType.toLowerCase() === "enq" && imeshcookie === "")
    $("#t" + tmpId + "_leftR").addClass("lftMgn");
  else if (!isInactiveBL(tmpId))
    $("#t" + tmpId + "_leftR").removeClass("lftMgn");
  if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl") {
    ReqObj.updateImage = 0;
    leftSideTransition(1, tmpId);
  }
  if (parseInt(ReqObj.Form[tmpId].disableRd) === 1) {
    ReqObj.Form[tmpId].flags.isDescDivShown = !ReqObj.Form[tmpId].flags.isDescDivShown;
  }
  $("#t" + tmpId + "_byrinfo").html(get_buyer_info(tmpId)).removeClass("bedsnone");
  $("#t" + tmpId + "_hdg").removeClass("bedsnone");
  $("#t" + tmpId + "_login").addClass("bedsnone");
}

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

if (typeof blpage === "undefined" || blpage === null) {
  var blpage = {};
  blpage.toIdentifiedQ = new Array();
  blpage.toIdentified = function () {
    if (isSet(blpage.toIdentifiedQ)) {
      for (var j = 0; j < blpage.toIdentifiedQ.length; j++) {
        if (
          isSet(blpage.toIdentifiedQ[j]) &&
          typeof blpage.toIdentifiedQ[j] === "function"
        )
          blpage.toIdentifiedQ[j].apply();
      }
    }
  };
}

function UpdateSeq(tmpId, where) {
  for (var key in ReqObj.Form) {
    if (key !== tmpId) {
      formToUpdate(key, where);
    }
  }
}

function formToUpdate(key, flagsugg) {
  if (IsChatbl(key)) {
    if (IsChatBLInline(key)) ReqObj.Form[key].fromUpdate = true;
    UpdateCurrentStep(key, flagsugg);
  } else {
    if (flagsugg == "changeflag" && isSSB(key))
      ReqObj.Original[key]["loginv"] = ReqObj.Form[key]["savevalue"];
    CallFormFunc(key, flagsugg);
  }
}

function CallFormFunc(key, flagsugg) {
  if (isSSB(key) && !isnewSSB(key) && !ReqObj.Form[key].flags.toCallUpdateSeq) {
    return;
  } else if (isGlIdEven(key) && key.substr(0, 2) === "01") {
    OpenForm(ReqObj.Form[key], flagsugg);
  } else if (IsChatbl(key)) {
    OpenForm(ReqObj.Original[key], flagsugg);
  } else if ($.inArray(key.substring(0, 2), BlPopup) === -1) {
    if (Bl04(key)) OpenForm(ReqObj.Form[key], flagsugg);
    else OpenForm(ReqObj.Original[key], flagsugg);
  } else if ($.inArray(key.substring(0, 2), EnqPopup) === -1) {
    OpenForm(ReqObj.Original[key], flagsugg);
  }
}

function callToIdentifiedQ(tmpId, fromwhere, update) {
  // if (typeof fromwhere === "undefined") {
  //   update = 1; // to update from header
  // }
  if (typeof fromwhere === "undefined") {
    // which means login from header
    UpdateUserDetailKey();
    ReqObj.CNSerCalled = false;
  }
  if (update !== 0) UpdateSeq(tmpId, fromwhere);
  if (isSet(blpage)) {
    if (isSet(blpage.toIdentified)) {
      if (typeof blpage.toIdentified === "function") blpage.toIdentified();
    }
  } else if (isSet(window.parent.blpage)) {
    if (isSet(window.parent.blpage.toIdentified)) {
      if (typeof window.parent.blpage.toIdentified === "function")
        window.parent.blpage.toIdentified();
    }
  }
  if (typeof page !== "undefined") {
    if (isSet(page.Identified)) {
      if (typeof page.Identified === "function") page.Identified();
    }
  } else if (isSet(window.parent.page)) {
    if (isSet(window.parent.page.Identified)) {
      if (typeof window.parent.page.Identified === "function")
        window.parent.page.Identified();
    }
  }
}

function ResetClass(ClassRemoved, tmpId) {
  if (isSet(ClassRemoved)) {
    for (var i = 0; i < ClassRemoved.length; i++) {
      if (isSet(ClassRemoved[i].Obj)) {
        if (typeof ClassRemoved[i].Obj.resetClass === "function") {
          ClassRemoved[i].Obj.resetClass(tmpId);
        }
      }
    }
  }
}

function UpdateCurrentStep(tmpId, flagsugg) {
  if (isSet(tmpId)) {
    if(!IsChatBLInline(tmpId)) // new chat bl unidentified
    ShowHideTNC(tmpId);
    var that = ReqObj.Form[tmpId].FormSequence;
    if (that.OnCloseCounter > -1) {
      that.OnCloseCounter -= 1;
      var serviceSplittedArray = that.OnCloseServiceArray.splice(
        that.OnCloseCounter,
        1
      );
      ReqObj.Form[tmpId].OnCloseArray =
        ReqObj.Form[tmpId].OnCloseArray[this.OnCloseCounter];
    } else {
      var ClassRemoved = ReqObj.Form[tmpId].UiArray[that.StepCounter];
      if (BlReloadRequired(ClassRemoved, tmpId)) {
        if (RemoveLastQuestion(tmpId)) {
          ReqObj.Form[tmpId].PrevAnsPrint = false;
          ResetClass(ClassRemoved, tmpId);
          var serviceSplittedArray = that.FullServiceArray.splice(
            that.StepCounter,
            1
          )[0];
          Getprepost(serviceSplittedArray, tmpId);

          //if generating generation id if user signs in from some other place
          //SubmitCallback(serviceSplittedArray, tmpId);
          //

          var count = that.StepCounter;
          that.StepCounter -= 1;
          if (that.StepCounter > -1) {
            ReqObj.Form[tmpId].UiArray.splice(count, 1);
          } else {
            ReqObj.Form[tmpId].UiArray = [];
          }
          if (
            isSet(ReqObj.Form[tmpId].LastPrePost) &&
            ReqObj.Form[tmpId].LastPrePost instanceof Array
          ) {
            for (var t = 0; t < ReqObj.Form[tmpId].LastPrePost.length; ++t) {
              PrePostService(ReqObj.Form[tmpId].LastPrePost[t], tmpId);
            }
            ReqObj.Form[tmpId].LastPrePost = [];
          }
        }
      } else if (
        flagsugg !== "changeflag" &&
        imeshExist() === "" &&
        $("#t" + tmpId + "_chatBL").hasClass("cbl_vv") &&
        $("#t" + tmpId + "_flagC").html() === ""
      ) {
        var ele = $("#t" + tmpId + "country_dropd").detach();
        $("#t" + tmpId + "country").prepend(ele);
      }
    }
  }
}

function RemoveLastQuestion(tmpId) {
  if (IsChatbl(tmpId)) {
    return RemoveLastPopupQuestion(tmpId);
  }
}

function RemoveLastInlineQuestion() {
  var lastQuestion = $(".message-left").last();
  // if (lastQuestion.length > 0 && lastQuestion.next().length > 0 && !lastQuestion.next().hasClass("message-right")) {
  if (!lastQuestion.next().hasClass("message-right")) {
    lastQuestion.remove();
    return true;
  } else return false;
}

function RemoveLastPopupQuestion(tmpId) {
  if (IsChatBLInline(tmpId)) {
    var lastQuestion = $(".cbl_ques").last();
    var questionCount = lastQuestion.siblings;
    var isStatic = $(".cbl_ques").last().attr("isStatic");
    if (
      isSet(ReqObj.closebtnclicked) &&
      ReqObj.closebtnclicked &&
      questionCount <= 2
    ) {
      ReqObj.closebtnclicked = false;
      return false;
    }
    if (!lastQuestion.next().hasClass("cbl_ansr") && isStatic !== "yes") {
      lastQuestion.remove();
      IsChatBLInline(tmpId)
        ? $("#t" + tmpId + "_newblchatReply")
          .html("")
          .addClass("cbl_br10 cbl_bgf1")
          .removeClass("cbl_bg1")
        : $("#t" + tmpId + "_newblchatReply").html("");
      removechatblerror(tmpId);
      return true;
    } else return false;
  } else return false;
}

function BlReloadRequired(ClassRemoved, tmpId) {
  if (isSet(ClassRemoved)) {
    if (ClassRemoved instanceof Array) {
      {
        for (var h = 0; h < ClassRemoved.length; ++h) {
          if (typeof ClassRemoved[h].Obj.toUpdate === "function") {
            return ClassRemoved[h].Obj.toUpdate(tmpId);
          }
        }
        return false;
      }
    } else {
      if ($.inArray(ConstructorName(ClassRemoved.Obj), ReloadReqClass) !== -1) {
        return true;
      } else return false;
    }
  }
  return false;
}

function Getprepost(serviceSplittedArray, tmpId) {
  if (isSet(serviceSplittedArray)) {
    for (var y = 0; y < serviceSplittedArray.length; ++y) {
      if (
        !isSet(ReqObj.Form[tmpId].LastPrePost) ||
        (isSet(ReqObj.Form[tmpId].LastPrePost) &&
          ReqObj.Form[tmpId].LastPrePost.length === 0)
      ) {
        var PrepostVal = CheckPrepost(serviceSplittedArray[y]);
        if (PrepostVal !== "") ReqObj.Form[tmpId].LastPrePost = PrepostVal;
      }
    }
  }
}

function CheckPrepost(CurrentRemovedClassHooks) {
  if (isSet(CurrentRemovedClassHooks)) {
    if (
      isSet(CurrentRemovedClassHooks.current) &&
      CurrentRemovedClassHooks.current.length > 0
    ) {
      return CurrentRemovedClassHooks.current;
    } else if (
      isSet(CurrentRemovedClassHooks.pre) &&
      CurrentRemovedClassHooks.pre.length > 0
    ) {
      return CurrentRemovedClassHooks.pre;
    } else if (
      isSet(CurrentRemovedClassHooks.post) &&
      CurrentRemovedClassHooks.post.length > 0
    ) {
      return CurrentRemovedClassHooks.post;
    }
    return "";
  }
  return "";
}

function UpdateUserDetailKey() {
  // Imesh must be considered when user logs in from header not Key.
  var imeshCookie = imeshExist();
  var iploc = iplocExist();
  ReqObj.UserDetail["fn"] = usercookie.getParameterValue(imeshCookie, "fn");
  ReqObj.UserDetail["em"] = usercookie.getParameterValue(imeshCookie, "em");
  ReqObj.UserDetail["mb1"] = usercookie.getParameterValue(imeshCookie, "mb1");
  ReqObj.UserDetail["ctid"] = usercookie.getParameterValue(imeshCookie, "ctid");
  ReqObj.UserDetail["uv"] = usercookie.getParameterValue(imeshCookie, "uv");
  ReqObj.UserDetail["glid"] = usercookie.getParameterValue(imeshCookie, "glid");
  ReqObj.UserDetail["statename"] = "";
  ReqObj.UserDetail["stateid"] = "";
  ReqObj.UserDetail["cityname"] = "";
  ReqObj.UserDetail["ctoth"] = "";
  ReqObj.UserDetail["suggesCity"] = {
    geoloc: [
      usercookie.getParameterValue(iploc, "lg_ct"),
      usercookie.getParameterValue(iploc, "lg_ctid"),
    ],
    hdcity: [
      usercookie.getParameterValue(usercookie.getCookie("xnHist"), "city"),
      "",
    ],
    iploc: [
      usercookie.getParameterValue(iploc, "gctnm"),
      usercookie.getParameterValue(iploc, "gctid"),
    ],
  };
}

function ModifyUserDetail(arr, todo) {
  var toret = 0;
  var len = isSet(arr) ? arr.length : -1; // js error undefined is not an object, reading e.length
  var valtoupdate = isSet(todo) && todo === "empty" ? "" : "";
  for (var i = 0; i < len; i++) {
    ReqObj.UserDetail[arr[i]] = valtoupdate;
    if (arr[i] === "ctid") toret = 1;
  }

  return toret;
}

function flagDropdTracking(tmpId) {
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  if (isSet(ReqObj.Form[tmpId].flag_track)) {
    if (ReqObj.Form[tmpId].flag_track === 1)
      blenqGATracking(form_type, "Flag|First", getEventLabel(), 1, tmpId);
    else if (ReqObj.Form[tmpId].flag_track === 2)
      blenqGATracking(form_type, "Flag|Second", getEventLabel(), 1, tmpId);
  } else blenqGATracking(form_type, "Flag|Nochange", getEventLabel(), 1, tmpId);
}

function UserCookie() { }
UserCookie.prototype.getCookie = function (cookie_Name) {
  var documentCookie = document.cookie;
  var search = cookie_Name + "=";
  if (isSet(documentCookie) && documentCookie.length > 0) {
    var offset = documentCookie.indexOf(search);
    if (offset !== -1) offset += search.length;
    else return "";

    var end = documentCookie.indexOf(";", offset);
    if (end === -1) end = documentCookie.length;

    //return unescape(documentCookie.substring(offset, end));
    try {
      return decodeURIComponent(documentCookie.substring(offset, end));
    } catch (err) {
      return unescape(documentCookie.substring(offset, end));
    }
  }
  return "";
};

UserCookie.prototype.getParameterValue = function (cookie, key) {
  if (isSet(cookie) && cookie !== "") {
    var cookie_arr = cookie.split("|");
    var len = isSet(cookie_arr) ? cookie_arr.length : 0;
    for (var i = 0; i < len; i++) {
      var sub_cookie_arr = cookie_arr[i].split("=");
      if (sub_cookie_arr[0] === key)
        return isSet(sub_cookie_arr[1]) && sub_cookie_arr[1] !== ""
          ? sub_cookie_arr[1]
          : "";
    }
    return ""; /* will return null if key doesn't exists */
  }
  return "";
};

UserCookie.prototype.setCookie = function (name, value, days, modId) {
  /* modID iploc */

  var expires = "";
  var loc = window.location.href;
  if (days && value) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  }
  if (isSet(modId) && modId === "TDW") {
    var dom = document.location.hostname;

    document.cookie =
      name + "=" + value + expires + "; domain=" + dom + ";path=/";
  } else {
    if (loc.match("hellotrade.com")) {
      document.cookie =
        name +
        "=" +
        escape(value) +
        expires +
        "; domain=.hellotrade.com;path=/";
    } else if (loc.match("indianindustry.com")) {
      document.cookie =
        name +
        "=" +
        escape(value) +
        expires +
        "; domain=.indianindustry.com;path=/";
    } else if (name == "ImeshVisitor") {
      document.cookie =
        name +
        "=" +
        encodeURIComponent(value) +
        expires +
        "; domain=.indiamart.com;path=/";
    } else {
      document.cookie =
        name + "=" + escape(value) + expires + "; domain=.indiamart.com;path=/";
    }
  }
};
UserCookie.prototype.deleteCookie = function (cookie_Name) {
  document.cookie = cookie_Name + "=;expires=;domain=.indiamart.com;path=/";
};

var usercookie = new UserCookie();

function UserLogin(what) {
  this.tmpId = "";
  this.imeshCookie = "";
  this.iplocCookie = "";
  this.userCountry = "";
  this.loginhtml = "";
  this.tid = "";
  this.username = "";
  this.blurcalled = false;

  this.className = "UserLogin";
  this.what = what;
  this.UserLoginCssObj = {};
  this.UserloginHtmlObj = {
    Label: "",
    UserInput: "",
    OuterWrapper: "",
    ClosingWrapper: "",
  };
  this.UserloginHtmlObjArray = [];
  this.toChange = false;
  this.isNotCalled = false;

  this.cookies();
  this.classCount = 0;
}
UserLogin.prototype.toUpdate = function (tmpId) {
  if (imeshExist()) return true;
  else if (this.isNotCalled === true) return true;
  return false;
};
UserLogin.prototype.cookies = function () {
  this.imeshCookie = imeshExist();
  this.iplocCookie = usercookie.getCookie("iploc");
  this.userCountry = usercookie.getParameterValue(this.iplocCookie, "gcniso");
  ReqObj.changeUserCountry =
    isSet(ReqObj.changeUserCountry) && ReqObj.changeUserCountry !== ""
      ? ReqObj.changeUserCountry
      : usercookie.getParameterValue(this.iplocCookie, "gcnnm");
};

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

UserLogin.prototype.defaultEvents = function (tmpId) {
  if (isSet(tmpId)) {

    //next->submit
    //hide pns unidentified user
    var pnsno = ReqObj.Form[tmpId].pnsNumber;
    if (isPnsEnq(tmpId) ) {
      if(isSet(ReqObj.Form[tmpId].ctaName) && ReqObj.Form[tmpId].ctaName.toLowerCase() == "view mob e"){
      
      if(pnsno[0]!='+'){
      pnsno = pnsno.substring(0,4) + "xxxxxxx ";
      }
      else
      pnsno = pnsno.substring(0,7) + "xxxxxxx ";
      $("#pnsnoenq").html(pnsno);
    }
    else{
    $(".pnsEnq").hide();
    }
    
    }
    if (currentISO() !== "IN") {
      if (EnqPopupDIR(tmpId) && $("#yajaca").css("display") != "block") {
        $("#yajaca").show();
        $("#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input").addClass("toConv");
        $("input.toConv").attr("value", "Submit");
        ReqObj.Form[tmpId].toShowMsg = 0;
        ReqObj.Form[tmpId].msgFromOtp = 0;
      }
    }
    else {
      if ($("#yajaca").css("display") == "block") {
        hideClickMsg(tmpId);
        ReqObj.Form[tmpId].toShowMsg = 1;
      }
    }



    ReqObj.Form[tmpId].flags.isFlagSuggSet = false;
    if (IsChatbl(tmpId)) {
      this.handleUI({
        data: {
          todo: "default",
          obj: this,
          tmpId: tmpId,
        },
      });
      this.handleUI({
        data: {
          todo: "transition",
          obj: this,
          tmpId: tmpId,
        },
      });
    } // PBRENQFORM - 3620
    if (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09")
      this.handleUI({
        data: {
          todo: "focus",
          obj: this,
          tmpId: tmpId,
        },
      });
    this.handleEvents(this, tmpId);
    this.handleUI({
      data: {
        todo: "isoFlag",
        obj: this,
        tmpId: tmpId,
      },
    });
    //   this.handleUI({
    //     data: {
    //       todo: "chatblFlag",
    //       obj: this,
    //       tmpId: tmpId
    //     }
    //   });
    get_buyer_info(tmpId);
    if (imeshExist() === "") $("#t" + tmpId + "_leftR").addClass("lftMgn");
  }

  if (
    !(isSSB(tmpId) || Bl01(tmpId) || Bl04(tmpId) || IsChatbl(tmpId)) &&
    currentISO() !== "IN" &&
    $("#t" + tmpId + "_gSignInWrapper").length === 0
  ) {
    var stylo =
      Bl04(tmpId) && ReqObj.Form[tmpId].ctaName.toLowerCase() === "inline-bl"
        ? "4px;"
        : "10px;";
    var styl =
      Bl04(tmpId) && ReqObj.Form[tmpId].ctaName.toLowerCase() === "inline-bl"
        ? "0;"
        : "10px 0px 15px 0px;";
    var cls =
      Bl04(tmpId) && ReqObj.Form[tmpId].ctaName.toLowerCase() === "inline-bl"
        ? "pdlr10"
        : "";
    var orline = (isInactiveBL(tmpId)) ? "orline" : "";
    var customG = (isInactiveBL(tmpId)) ? "customG2" : "customG";
    var ghtml =
      '<div id = "t' +
      tmpId +
      '_gwrap"> <p style="font-size:14px;font-weight:600;text-align: center;margin-top: ' +
      stylo +
      '" class=' + orline + '>OR</p> <div id="t' +
      tmpId +
      '_gSignInWrapper" style="text-align:center; margin: ' +
      styl +
      '" > <div id="t' +
      tmpId +
      'signinBtnFr" class="' + customG + '"> <span class="Gicon"> </span> <span class="buttonTextfr ' +
      cls +
      '"> Login with Google </span><input type="hidden" value="0" style="display:none;" id="LWG"> </div></div></div>';
    var ele = $("#t" + tmpId + "_submit");
    if (isSet(ele)) $("#" + ele.parent()[0].id).append(ghtml);
    this.registerForm(tmpId);
  }
  if (IsChatbl(tmpId) && currentISO() != "IN") this.registerForm(tmpId);
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

UserLogin.prototype.handleHeading = function (tmpId) {
  if (ReqObj.Form[tmpId].formType.toLowerCase() !== "enq"){
    if(isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0){
      $("#blheading").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    }
    else{
      $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    }
  }
  else if (isImageVidEnq(tmpId) &&ReqObj.Form[tmpId].FormSequence.StepCounter === 0)
    $("#t" + tmpId + "_hdg").addClass("bedsnone").html("");
  else
    $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
};

UserLogin.prototype.handleButton = function (tmpId) {
  ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
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

UserLogin.prototype.SaveDetails = function (tmpId, event) {
  if (IsChatbl(tmpId)) {
    ReqObj.Form[tmpId].UserInputs["PrimaryInfo"] = $(
      "#t" + tmpId + "_login_field"
    ).val(); /* change using event target Id */
    if (isSet(event.target.textContent) && event.target.textContent !== "")
      ReqObj.Form[tmpId].UserInputs["toChange"] = event.target.textContent;
  }
};

UserLogin.prototype.addHtmlObjToArray = function (htmlObj) {
  this.UserloginHtmlObjArray.push(htmlObj);
};

UserLogin.prototype.displayHtml = function (tmpId) {
  /* common for all classes */
  if (isSet(tmpId)) {
    $("#t" + tmpId + "_byrinfo").removeClass("bedsnone");
    $("#t" + tmpId + "_hdg").removeClass("bedsnone");
    $("#t" + tmpId + "_login").removeClass("bedsnone");
    var chathelpmsg = "";
    if (IsChatbl(tmpId)) {
      var helpiso = currentISO() === "IN" ? "number" : "email";
      chathelpmsg = "<div class='t" + tmpId + "_userInput cbl_br10 dn'><div class='befs11 beclr'><i class='chat-elip'>i</i>Seller Details are sent on this " + helpiso + "</div></div>";
      return [this.loginhtmlQues, this.loginhtmlInput];
    }
    if (isOtherEnq(tmpId)) {
      ReqObj.Form[tmpId].calledClassName[
        ReqObj.Form[tmpId].FormSequence.StepCounter
      ] = this.className;
    }
    return [this.loginhtml, chathelpmsg];
  }
};

UserLogin.prototype.hasHtml = function (UserloginObj) {
  if (isSet(UserloginObj)) {
    this.classCount = returnObjectSize(
      ReqObj.Form[UserloginObj.tmpId].ContactDetail
    );
    ReqObj.Form[UserloginObj.tmpId].nec.classCount = this.classCount;
    this.addHtmlObjToArray(this.getLoginHTML(UserloginObj.tmpId));
    var UserLoginSuffixHtmlObj = {};
    if (!IsChatbl(UserloginObj.tmpId)) {
      var tmpId = UserloginObj.tmpId;
      var sticky = isSticky(UserloginObj.tmpId) ? "FM_bedvh" : Bl04(tmpId) && currentISO() !== "IN" ? "bedvh fruflg" : "bedvh";
      if (ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" && Bl04(tmpId) && ReqObj.Form[tmpId].FormSequence._screenCounter === 0)
        sticky = "bedvh nflgm";
      var UserLoginSuffixOuterHtml = isSSB(UserloginObj.tmpId) ? "<div><div  id='t" + UserloginObj.tmpId + "_login' class='" + ssbClass("wrprClass", UserloginObj.tmpId) + "'>" : "<div  id='t" + UserloginObj.tmpId + "_login' class='" + sticky + "'>";
      var countryDiv = this.countryDiv(UserloginObj.tmpId);
      var cntflg = flagd(countryDiv, UserloginObj.tmpId);
      var UserLoginSuffixClosingHtml = isSSB(UserloginObj.tmpId)
        ? "</div>" : Enq04(UserloginObj.tmpId) || (Bl04(tmpId) && !(ReqObj["Form"][UserloginObj.tmpId].modId === "DIR" && !isNotfoundBl(UserloginObj.tmpId)))
          ? "</div>" + cntflg : "</div>";
      UserLoginSuffixHtmlObj = {
        SuffixOuterHtml: UserLoginSuffixOuterHtml,
        SuffixClosingHtml: UserLoginSuffixClosingHtml,
        suffix: "_login",
      };
      this.loginhtml = MakeWrapper([this.UserloginHtmlObjArray], UserloginObj.tmpId, UserLoginSuffixHtmlObj, "");
    } else {
      var countryDiv = this.countryDiv(UserloginObj.tmpId);
      var world_img = '<i class="oeWicn"></i>';
      var cls = "bepr oeCnty";
      ReqObj.Form[UserloginObj.tmpId].ctn = ReqObj.IPDetails["countryname"] == "" ? "India" : ReqObj.IPDetails["countryname"];
      var html = "<div id='t" + UserloginObj.tmpId + "mflag'class='oeChng'>" + world_img + "<div class='oef0'>Your Country is </div><div id='t" + UserloginObj.tmpId + "country' class='" + cls + "'>" + ReqObj.Form[UserloginObj.tmpId].ctn + countryDiv + "</div></div>";
      this.loginhtmlQues = MakeWrapper([this.UserloginHtmlObjArray], UserloginObj.tmpId, WrapperObj("<div id='t" + UserloginObj.tmpId + "_login' class = 'cbl_ques cbl_vh'>", "</div>", "_login"), "ques");
      this.loginhtmlInput = MakeWrapper([this.UserloginHtmlObjArray], UserloginObj.tmpId, WrapperObj("<div id = 't" + UserloginObj.tmpId + "_login_input' class ='cbl_dtls cbl_mobile cbl_df cbl_aic t" + UserloginObj.tmpId + "_userInput cbl_br10 dn'>", "</div>", "_login"), "input");
      this.loginhtml = this.loginhtmlQues + this.loginhtmlInput;
      if ($("#t" + UserloginObj.tmpId + "mflag").length == 0) {
        $("#t" + UserloginObj.tmpId + "_tCond").before(html);
        ReqObj.Form[UserloginObj.tmpId]["flagcalling"] = 0;
      }
    }

    UserloginObj.that.NumberofClassCalled -= 1;
    if (this.loginhtml !== "") {
      ReqObj.Form[UserloginObj.tmpId].currentclassCount++;
      this.ifHtmlPresent(UserloginObj);
    } else {
      this.ifHtmlNotPresent(UserloginObj);
    }
    if (this.loginhtml !== "") return true;
    else return false;
  }
};

UserLogin.prototype.ifHtmlPresent = function (UserloginObj) {
  AttachObject(UserloginObj.object, UserloginObj.tmpId);
  if (isSet(UserloginObj.AfterService)) {
    for (var i = 0; i < UserloginObj.AfterService.length; i++) {
      UserloginObj.that.MakeSeq(
        UserloginObj.AfterService[i],
        UserloginObj.tmpId
      );
    }
  }
  if (UserloginObj.that.NumberofClassCalled === 0) {
    makeFinalSeq(UserloginObj, UserloginObj.tmpId);
  }
};

UserLogin.prototype.ifHtmlNotPresent = function (UserloginObj) {
  if (UserloginObj.hasFallback) {
    CreateSeq(UserloginObj.FallbackObj);
  }
};

UserLogin.prototype.validate = function (tmpId, event) {
  /* terms and condition if required */
  if (isSet(tmpId)) {
    var that = this;
    if (isSet(event.target.textContent) && event.target.textContent !== "") {
      ReqObj.Form[tmpId].UserInputs["toChange"] = event.target.textContent; //  to test
      that.toChange = true;
    } else that.toChange = false;
    if (that.toChange === false) {
      var iso_change = currentISO();
      that.captureDetails(iso_change, tmpId);
      if (!isSet(validation)) createGlobalObject();
      that.username = $("#t" + tmpId + "_login_field").val();
      var validlogin =
        iso_change === "IN"
          ? validation.isMobileValid(that.username)
          : validation.isEmailFilled(that.username);
      // remove if error already present
      if (
        !$("#t" + tmpId + "_msg_primary_info_err_login").hasClass("bedsnone")
      ) {
        that.handleUI({
          data: {
            tmpId: tmpId,
            todo: "removeError",
            obj: that,
          },
        });
      }
      if (
        $("#t" + tmpId + "_login").html() !== "" &&
        validlogin["type"] === false
      ) {
        if (
          !(ReqObj.Form[tmpId].typeofform === "image" && isEcomProduct(tmpId))
        ) {
          that.handleUI({
            data: {
              tmpId: tmpId,
              errormsg: validlogin["error"],
              todo: "validationError",
              obj: that,
            },
          });
        }
        ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
        return false;
      } else if (isGDPRCountry() && imeshExist() === "") {
        if (isSet(event.data) && event.data.todo.toLowerCase() === "blurlogin")
          return true;
        if (
          isSet(ReqObj.Form[tmpId].IsCheckboxChecked) &&
          ReqObj.Form[tmpId].IsCheckboxChecked !== ""
        ) {
          if (ReqObj.Form[tmpId].IsCheckboxChecked === false) {
            ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
            return false;
          } else {
            return true;
          }
        } else return false;
      }
      return true;
    } else return true;
  }
};

UserLogin.prototype.captureDetails = function (iso_change, tmpId) {
  if (iso_change === "IN") {
    ReqObj.UserDetail["mb1"] = $("#t" + tmpId + "_login_field").val();
    ReqObj.TempMobile = ReqObj.UserDetail["mb1"];
  } else {
    ReqObj.UserDetail["em"] = $("#t" + tmpId + "_login_field").val();
    ReqObj.TempEmail = ReqObj.UserDetail["em"];
  }
};
UserLogin.prototype.returnText = function (iso_change, tmpId) {
  // if (isOtherEnq(tmpId) && isImageVidEnq(tmpId) && imeshExist() === "") {
  //   return (iso_change === "IN") ? "Enter your mobile" : "For example abc@gmail.com";
  // }

  return iplocExist() === "" &&
    ReqObj.ipLoc.zoneISO === "OTHER" &&
    ReqObj.ipLoc.onClose === false
    ? ""
    : iso_change === "IN"
      ? "Enter your mobile"
      : "Enter your email";
};

UserLogin.prototype.returnLoginFieldClass = function (iso_change, tmpId) {
  var sticky = isSticky(tmpId) ? "FM_benords" : "benords";
  var mob_html = isInactiveBL(tmpId) ? "mob-input" : "";
  var inputCls = IsChatbl(this.what)
    ? ""
    : isSSB(this.what)
      ? "mb-mNm"
      : iso_change === "IN"
        ? "be-input " + sticky + " beW3 beh32 " + mob_html
        : "be-input " + sticky + " beW3 beh32 beemail " + mob_html;
  inputCls = isBlInline(this.what)
    ? iso_change === "IN"
      ? "be-input beW3 beh32"
      : "be-input beW3 beh32 beemail"
    : inputCls;
  return inputCls;
};

UserLogin.prototype.returnLoginValue = function (iso_change, tmpId) {
  return rvalue(tmpId, "flogin");
};

UserLogin.prototype.returnErrorDiv = function (tmpId, formType) {
  if (isSSB(tmpId)) return loginErrorDivSSB(tmpId);
  var html = "";
  var sticky = isSticky(tmpId) ? "FM_beerrp" : "beerrp";
  var errorclass = IsChatbl(tmpId)
    ? "bltperor bedsnone"
    : "be-erbx " + sticky + " bedsnone";
  html += returnContainer(
    "t" + tmpId,
    "_msg_primary_info_err_login",
    errorclass,
    "",
    "",
    ""
  );
  html += returnContainer(
    "t" + tmpId,
    "_primary_info_errmsg_login",
    "",
    "content",
    "",
    ""
  );
  if (IsChatbl(tmpId)) html += "</div></div>";
  else {
    if (
      !isOtherEnq(tmpId) ||
      (isOtherEnq(tmpId) && tmpId.substring(0, 2) !== "09")
    )
      html += '</div><a class="be-erarw" data-role="arrow"></a></div>';
    else if (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09")
      html += "</div></div>";
  }
  return html;
};

UserLogin.prototype.getLabel = function (tmpId, formType, iso_change) {
  var that = this;
  var label = pdpenqImage(tmpId) ? "" : isEcomProduct(tmpId) ? iso_change === "IN" ? "Mobile Number" : "Email ID" : isFirstImgVidCTA(tmpId)
    ? "Get customised quotes from seller" : iso_change === "IN" ? "Mobile Number" : "Email ID";
  if (isInactiveBL(tmpId)) {
    label = (currentISO() == 'IN') ? "Mobile Number <span class='redc'>*</span>" : "Email ID <span class='redc'>*</span>";
  }
  if (isBlInlineFr(tmpId)) label += "*";
  label = iplocExist() === "" && ReqObj.ipLoc.zoneISO === "OTHER" && ReqObj.ipLoc.onClose === false ? "" : label;
  var sticky = isSticky(tmpId) ? "FM_be-lbl" : "be-lbl";
  var frcls = isBlInlineFr(tmpId) ? " fadLbl" : "";
  var boldcls = pdpenqImage(tmpId) ? "" : "befwt ";
  var labelclass = isFirstImgVidCTA(tmpId) ? boldcls + sticky + " beml-50 fsciv eqmb20" : isSSB(tmpId) ? ssbClass("label", tmpId) : isBlInline(tmpId) ? "fs15 cl11 wf" + frcls : sticky + " beml-50";
  if (ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" && Bl04(tmpId) && ReqObj.Form[tmpId].FormSequence._screenCounter === 0)
    labelclass += " nflblm";
  var text = label;
  var html = ""; /* Do not change the html sequence */
  if (IsChatbl(tmpId)) {
    html += "Please share your ";
    html += returnSpan("t" + tmpId, "login_span_bold", label, "befwt");
    html += " to receive quotes from sellers";
    html += iso_change === "IN" ? "" : '<div id = "t' + tmpId + '_gwrap"> <p style="font-size:14px;font-weight:600;text-align: center;margin-top: 10px; ">OR</p> <div id="t' + tmpId + '_gSignInWrapper" style="text-align:center; margin: 10px 0px 15px 0px;" > <div id="t' + tmpId + 'signinBtnFr" class="customG"> <span class="Gicon"> </span> <span class="buttonTextfr "> Login with Google </span><input type="hidden" value="0" style="display:none;" id="LWG"> </div></div></div>';
  } else {
    if ((!isBlInline(tmpId) && !isSSB(tmpId) && !isOtherEnq(tmpId)) || (isOtherEnq(tmpId) && tmpId.substring(0, 2) !== "09"))
      html += that.returnErrorDiv(tmpId, formType);

    html += returnLabel("t" + tmpId, text, "_label-l", labelclass);

    if (!(isEcomProduct(tmpId) || pdpenqImage(tmpId)) && isFirstImgVidCTA(tmpId)) {
      text = "Contact seller";
      html = msg_firimgvid(text, tmpId);
    }
  }
  that.UserloginHtmlObj["Label"] = html;
};
UserLogin.prototype.flagDiv = function (tmpId) {
  var cls = IsChatbl(tmpId) ? "dropdown" : "dropdown bebdr be-flg";
  return $("#t" + tmpId + "flag").length > 0
    ? ""
    : "<dl id='t" + tmpId + "flag' class='" + cls + "'></dl>";
};
UserLogin.prototype.countryDiv = function (tmpId) {
  return $("#t" + tmpId + "flagdiv2").length > 0 && !IsChatBLInline(tmpId)  // new chat bl unidentified
    ? ""
    : "<dl id='t" +
    tmpId +
    "country_dropd' class='dropdown bebdr be-flg'></dl>";
};

ContactDetail.prototype.countryDiv = function (tmpId) {
  return $("#t" + tmpId + "flagdiv2").length > 0
    ? ""
    : "<dl id='t" +
    tmpId +
    "country_dropd' class='dropdown bebdr be-flg'></dl>";
};
UserLogin.prototype.getInput = function (tmpId, formType, iso_change) {
  var iploccookie = usercookie.getCookie("iploc");
  ReqObj.IPDetails["countryname"] = usercookie.getParameterValue(
    iploccookie,
    "gcnnm"
  );
  this.UserloginHtmlObj["UserInput"] = IsChatbl(tmpId)
    ? this.getmobhtml(tmpId, formType, iso_change)
    : this.getBlEnqInput(tmpId, formType, iso_change);
};
UserLogin.prototype.getNewSSbInput = function (
  tmpId,
  formType,
  iso_change,
  inputLogin
) {
  var that = this;
  var flagDiv = "";
  var html = '<div class="nb-flex">';
  html += isnewSSB(tmpId)
    ? currentISO() === "IN"
      ? "<div class='nb-w80 nb-lgn'>"
      : "<div class='nb-w80 nb-lgn nb-lgnf'>"
    : "";
  html += "<div id='t" + tmpId + "jsflagdiv'>" + flagDiv + "</div>";
  html += "<div id='t" + tmpId + "_dliso' class='mb-mIso'>";
  if (iso_change === "IN")
    html += isSSB(tmpId)
      ? isnewSSB(tmpId)
        ? returnIsoHtml(tmpId, "") + "</div></div>"
        : returnIsoHtml(tmpId, "") + "</div>"
      : returnIsoHtml(tmpId, "be-flisq iso") + "</div>";
  else html += "</div></div>";
  html += "<div class='nb-frm nb-ml5 nb-flx1'>" + inputLogin + "</div>";
  //that.UserloginHtmlObj["Label"] = "";
  return html;
};
function flagd(countryDiv, tmpId) {
  ReqObj.Form[tmpId].ctn =
    ReqObj.IPDetails["countryname"] == ""
      ? "India"
      : ReqObj.IPDetails["countryname"];
  if ((Enq04(tmpId)) && $("#t" + tmpId + "flag").length)
    $("#t" + tmpId + "flag").removeClass();
  var world_img = '<i class="oeWicn"></i>';
  var cls = isFirstImgVidCTA(tmpId) ? "oeCnty oeCdrp" : "bepr oeCnty";
  var fcls = isNotfoundBl(tmpId) ? "oeChng fmcnf" : "oeChng";
  var cntflg =
    "<div id='t" +
    tmpId +
    "mflag' class='" +
    fcls +
    "'>" +
    world_img +
    "<div class='oef0'>Your Country is </div><div id='t" +
    tmpId +
    "country' class='" +
    cls +
    "'>" +
    ReqObj.Form[tmpId].ctn +
    countryDiv +
    "</div></div>";
  return cntflg;
}
UserLogin.prototype.getBlEnqInput = function (tmpId, formType, iso_change) {
  var html = isBlInline(tmpId)
    ? iso_change === "IN"
      ? "<div class='pflx1 pr'><div id='t" +
      tmpId +
      "_blin' class='idsf ilgn inW240'>"
      : "<div class='pflx1 pr'><div id='t" +
      tmpId +
      "_blin' class='idsf ilgn inW240 flgn'>"
    : "";
  if (isSSB(tmpId)) html = ssbLoginHtml(tmpId, "startDiv", iso_change);
  var style =
    iso_change !== "IN" && tmpId.substring(0, 2) === "09"
      ? "width : 282px"
      : "";

  var eqcntyClass = isSSB(tmpId) ? "mb-mIso"
    : Bl09(tmpId) && iso_change !== "IN" ? isInactiveBL(tmpId) ? "eqCnty be-flg bebdr brdlft8" : "eqCnty be-flg bebdr"
      : isNotfoundBl(tmpId) && iso_change !== "IN" ? "eqCnty pr nfblf" : "eqCnty pr";

  var flagDiv = "";
  var brdlft = (isInactiveBL(tmpId)) ? "be-flisq iso brdlft8" : "be-flisq iso";
  if (formType.toLowerCase() === "bl") {
    //html += "<div id='t" + tmpId + "jsflagdiv'>" + flagDiv + "</div>";
    html += "<div id='t" + tmpId + "_dliso' class='" + eqcntyClass + "'>";
    if (iso_change === "IN")
      html += isSSB(tmpId)
        ? returnIsoHtml(tmpId, "") + "</div>"
        : returnIsoHtml(tmpId, brdlft) + "</div>";
    else html += "</div>";
  } else {

    html += "<div id='t" + tmpId + "_dliso' class='" + eqcntyClass + "'>";
    html += "<div id='t" + tmpId + "jsflagdiv'>" + flagDiv + "</div>";

    if (iso_change === "IN")
      html += returnIsoHtml(tmpId, brdlft) + "</div>";
    else html += "</div>";
  }
  //html = "<div id='t" + tmpId + "_dliso' class='" + eqcntyClass + "'>";
  //html += returnDl("t" + tmpId, "_Country_dropdown", "dropdown bebdr be-flg", "");/* Pass nothing if field to be enabled */

  var maxlength = iso_change === "IN" ? "10" : "";

  if (isOtherEnq(tmpId)) {
    html += returnInput(
      "t" + tmpId,
      "_login_field",
      "text",
      "login_field",
      this.returnText(iso_change, tmpId),
      this.returnLoginFieldClass(iso_change, tmpId) + " inPlace",
      this.returnLoginValue(iso_change, tmpId),
      "",
      maxlength,
      "request"
    );
    if (tmpId.substring(0, 2) === "09")
      html += this.returnErrorDiv(tmpId, formType);
  } else {
    var inputLogin = returnInput(
      "t" + tmpId,
      "_login_field",
      "text",
      "login_field",
      this.returnText(iso_change, tmpId),
      this.returnLoginFieldClass(iso_change, tmpId),
      this.returnLoginValue(iso_change, tmpId),
      style,
      maxlength,
      "request"
    );
    html += inputLogin;
  }
  var countryDiv = this.countryDiv(tmpId);
  var cntflg = flagd(countryDiv, tmpId);
  html += !isBlInline(tmpId) && !Enq04(tmpId) && !Bl04(tmpId) ? cntflg : "";
  ReqObj.Form[tmpId].flag = Enq04(tmpId) || Bl04(tmpId) ? 1 : 0;
  html = isnewSSB(tmpId)
    ? this.getNewSSbInput(tmpId, formType, iso_change, inputLogin)
    : html;
  var helpmsg = iso_change === "IN" ? "number" : "email";
  var helptextclass = isSSB(tmpId) ? "mb-mbuTxt mb-mt10 " : "be-msghlp";
  if (isSSB(tmpId) || isBlInline(tmpId))
    html += "</div>" + this.returnErrorDiv(tmpId, formType);

  var helpmsgDiv = returnContainer(
    "t" + tmpId,
    "_helpmsg",
    helptextclass,
    "",
    "Seller will contact you on this " + helpmsg,
    ""
  );
  html +=
    isBlInline(tmpId) && !ReqObj.Form[tmpId].isFrInline
      ? helpmsgDiv + "</div>"
      : "";
  html += isBlInline(tmpId) ? cntflg : "";

  if (isSSB(tmpId)) html += ssbLoginHtml(tmpId, "loader", iso_change);

  html += "</div>";
  html += isnewSSB(tmpId) ? cntflg : "";
  if (isFirstImgVidCTA(tmpId)) html = "<div class='enumpr'>" + html + "</div>";
  return html;
};
UserLogin.prototype.getmobhtml = function (tmpId, formType, iso_change) {
  var html = "";
  var style = iso_change !== "IN" && !IsChatbl(tmpId) ? "width :282px" : "";
  var classTobeAdded = iso_change === "IN" ? "bedsnone" : "cbl_flag";
  html = returnContainer("t" + tmpId, "_flagC", classTobeAdded, "", html, "");
  html += "</div>";
  var brdlft = (isInactiveBL(tmpId)) ? "be-flisq iso brdlft8" : "be-flisq iso";
  if (iso_change === "IN") {
    html +=
      returnContainer(
        "t" + tmpId,
        "_isoC",
        "cbl_iso",
        "",
        returnIsoHtml(tmpId, brdlft),
        ""
      ) + "</div>";
  }

  var maxlength = iso_change === "IN" ? "10" : "";
  html += returnInput(
    "t" + tmpId,
    "_login_field",
    "text",
    "login_field",
    this.returnText(iso_change, tmpId),
    this.returnLoginFieldClass(iso_change, tmpId),
    this.returnLoginValue(iso_change, tmpId),
    style,
    maxlength,
    "request"
  );
  if (IsChatbl(tmpId)) ReqObj.Form[tmpId].flags.isCountryFlagSuggSet = true;
  return html;
};
UserLogin.prototype.getLoginHTML = function (tmpId) {
  /* Do not change the html sequence */
  if (isSet(tmpId)) {
    var that = this;
    var formType = ReqObj.Form[tmpId].formType.toLowerCase();
    var iso_change =
      IsChatbl(tmpId) &&
        ReqObj.Form[tmpId].UserInputs["Country"] === "Change my Country".trim()
        ? ""
        : currentISO(); /* check if iploc not indian and user says yes */
    that.getLabel(tmpId, formType, iso_change);
    that.getInput(tmpId, formType, iso_change);
    if (isOtherEnq(tmpId)) {
      var clsnm = "";
      if (isImageVidEnq(tmpId) && imeshExist() === "") {
        clsnm = currentISO(tmpId) !== "IN" ? "enqLogInp eqFnu imgfv" : "enqLogInp imgfv";
        $("#t" + tmpId + "_question").addClass("mvta");
      } else {
        clsnm = "enqLogInp";
        if (iso_change !== "IN") clsnm += " eqFrUs";
        $("#t" + tmpId + "_question").removeClass("mvta");
      }
      if (tmpId.substring(0, 2) !== "09") clsnm = clsnm + " inllog";
      if (isFirstImgVidCTA(tmpId)) clsnm = clsnm + " eqimgvidm";
      that.UserloginHtmlObj["OuterWrapper"] = IsChatbl(tmpId) ? "" : "<div id='t" + tmpId + "clslog' class='" + clsnm + "'>";
      that.UserloginHtmlObj["ClosingWrapper"] = IsChatbl(tmpId) ? "" : "</div>";
    } else {
      var frcls = Bl04(tmpId) && ReqObj.Form[tmpId].ctaName.toLowerCase() === "inline-bl" && currentISO() != "IN" ? "mb10imp" : Bl09(tmpId) && !isInactiveBL(tmpId) && currentISO() !== "IN" && imeshExist() === "" ? "blfr" : "";
      var clss = isBlInlineFr(tmpId) ? "fmb15" : "idsf pfstrt mb20";
      that.UserloginHtmlObj["OuterWrapper"] = IsChatbl(tmpId) || isSSB(tmpId) ? "" : isBlInline(tmpId) ? '<div class="' + clss + '">' : isInactiveBL(tmpId) ? "<div class='idsf' id='name_email'><div class='belft bepr bT1-st3 " + frcls + "'>" : "<div class='belft bepr bemgb15 bT1-st3 " + frcls + "'>";

      that.UserloginHtmlObj["ClosingWrapper"] = IsChatbl(tmpId) || isSSB(tmpId) ? "" : isInactiveBL(tmpId) ? "</div></div>" : "</div>";
    }
    return that.UserloginHtmlObj;
  }
};
UserLogin.prototype.getData = function (tmpId, userlogin, todo) {
  var what = isSet(todo) ? todo : "";
  var iso = currentISO();
  var loginflag = new LoginFlag().returnLoginFlag(what);

  if (typeof imesh_obj === "undefined" && typeof userDataCookie === "function")
    /*  imesh_obj global var of header.js */
    imesh_obj = new userDataCookie();

  var data = {
    s_country_iso: iso,
    modid: modIdf,
    curr_page_url: window.location.href,
    s_ip_address: usercookie.getParameterValue(userlogin.iplocCookie, "gip"),
    s_ip_country: usercookie.getParameterValue(userlogin.iplocCookie, "gcnnm"),
    s_ip_country_iso: usercookie.getParameterValue(
      userlogin.iplocCookie,
      "gcniso"
    ),
    loginflag: loginflag,
  };

  data["flag"] = ReqObj.Form[tmpId].formType;
  if (IsChatbl(tmpId)) data["flag"] = "BL";

  if (typeof userlogin.username === "undefined" || userlogin.username === "") {
    data["username"] =
      iso === "IN"
        ? usercookie.getParameterValue(userlogin.imeshCookie, "mb1")
        : usercookie.getParameterValue(userlogin.imeshCookie, "em");
  } else data["username"] = userlogin.username;

  return ObjectTrim(data);
};
UserLogin.prototype.getLoginAjaxURL = function () {
  var url = "";
  if (
    appsServerName == "//dev-apps.imimg.com/" ||
    appsServerName == "//stg-apps.imimg.com/"
  )
    url = "//dev1-login.indiamart.com/user/identify/";
  else url = "//login.indiamart.com/user/identify/";
  return url;
};

UserLogin.prototype.getGoogleLoginAjaxURL = function () {
  var url = "";
  if (
    appsServerName == "//dev-apps.imimg.com/" ||
    appsServerName == "//stg-apps.imimg.com/"
  )
    url = "//dev1-login.indiamart.com/user/loginwithgoogle_first/";
  else url = "//login.indiamart.com/user/loginwithgoogle_first/";
  return url;
};

UserLogin.prototype.getajaxData = function (data) {
  var ajaxData = {
    username: ReturnCorrectVal(data["username"], ""),
    iso: ReturnCorrectVal(data["s_country_iso"], ""),
    identified: 1,
    modid: ReturnCorrectVal(data["modid"], ""),
    token: "imobile@15061981",
    format: "JSON",
    screen_name:
      ReturnCorrectVal(data["flag"], "") +
      " Form on " +
      ReturnCorrectVal(data["modid"], ""),
    IP: ReturnCorrectVal(data["s_ip_address"], ReqObj.IPDetails["ipaddress"]),
    USER_IP: ReturnCorrectVal(
      data["s_ip_address"],
      ReqObj.IPDetails["ipaddress"]
    ),
    ip: ReturnCorrectVal(data["s_ip_address"], ReqObj.IPDetails["ipaddress"]),
    USER_IP_COUNTRY: ReturnCorrectVal(
      data["s_ip_country"],
      ReqObj.IPDetails["countryname"]
    ),
    GEOIP_COUNTRY_ISO: ReturnCorrectVal(
      data["s_ip_country_iso"],
      ReqObj.IPDetails["countryiso"]
    ),
    IPADDRESS: ReturnCorrectVal(
      data["s_ip_country"],
      ReqObj.IPDetails["countryname"]
    ),
  };

  if (
    data["loginflag"] === 1 ||
    data["loginflag"] === 4 ||
    data["loginflag"] === 5
  ) {
    ajaxData["originalreferer"] = ReturnCorrectVal(data["curr_page_url"], "");
    ajaxData["create_user"] = 1;
  }
  return ajaxData;
};
UserLogin.prototype.returnBool = function (event) {
  var tmpId = event.data.tmpId;
  var userlogin = event.data.userlogin;
  var blureve = event.data.blureve;
  if (isSet(event.data.iso)) var iso = event.data.iso;
  var bool = blureve === true && (isEnq(tmpId) || Bl09(tmpId)) && iso === "IN" ? false : isSet(blureve) && blureve === true ? userlogin.validate(tmpId, event) : true;
  return bool;
};

UserLogin.prototype.beforHitDefaults = function (logObject, todo, tmpId, userlogin) {
  if ((isSet(logObject) && logObject !== "") || (logObject === "" && todo === "blurlogin")) {
    if (IsChatbl(tmpId)) {
      userlogin.handleUI({
        data: {
          tmpId: tmpId,
          todo: "chatblur",
          fromwhere: "beforehit",
          obj: userlogin,
        },
      });
    } else {
      userlogin.handleUI({
        data: {
          tmpId: tmpId,
          todo: "disableNameField",
          fromwhere: "beforehit",
          obj: userlogin,
        },
      });
      isSSB(tmpId) ? addBlLoaderSSB(tmpId, "ssblogin") : addBlLoader(tmpId, "left");
    }
  }
};
UserLogin.prototype.reAuthenticate = function (event) {
  var tmpId = event.data.tmpId;
  var userlogin = event.data.userlogin;
  var imesh = imeshExist();
  var iploc = iplocExist();
  var data = {
    imesh: imesh,
    im_iss: im_issExist(),
    v4iilex: v4iilexExist(),
    s_glusrid: usercookie.getParameterValue(imesh, "glid"),
    username:
      currentISO() === "IN"
        ? ReqObj.UserDetail["mb1"]
        : ReqObj.UserDetail["em"],
    country: usercookie.getParameterValue(iploc, "gcnm"),
    IP: usercookie.getParameterValue(iploc, "gip"),
    loginmode:
      ReqObj.loginMode !== 0
        ? ReqObj.loginMode
        : new LoginMode().getLoginMode(),
    ph_country: usercookie.getParameterValue(imesh, "phcc"),
    iso: currentISO(),
    modid: modIdf,
  };
  $.ajax({
    cache: false,
    url: appsServerName + "index.php?r=Newreqform/Reauthenticate",
    type: "GET",
    crossOrigin: true,
    crossDomain: true,
    data: data,
    dataType: "json",
    success: function (res) {
      userlogin.updateUserDetails(data.loginmode, res, "reauth");
      userlogin.updateFlagDetails(data.loginmode, res);
      callToIdentifiedQ(tmpId, "from-Form", 0);
    },
  });
};

UserLogin.prototype.sendRequest = function (event) {
  var that = this;
  var logObject = event.data.logObject;
  var tmpId = event.data.tmpId;
  var userlogin = event.data.userlogin;
  var todo = event.data.todo;
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var bool = userlogin.returnBool(event);
  that.userBlocked = 0;
  if (
    isSSB(tmpId) &&
    !isSet(event.data.source) &&
    $.inArray(ConstructorName(this), ReqObj.Form[tmpId].servicecalled) !== -1
  ) {
    PostAjax(logObject, tmpId);
    return;
  }
  if (bool === true) {
    if (isSet(ReqObj.Form[tmpId].defSubmit))
      ReqObj.Form[tmpId].defSubmit.blurfired =
        todo === "blurlogin" ? true : false;
    if (todo === "blurlogin" && isSet(ReqObj.Form[tmpId].defSubmit))
      ReqObj.Form[tmpId].defSubmit.loginfval = $(
        "#t" + tmpId + "_login_field"
      ).val();
    userlogin.classCount = returnObjectSize(ReqObj.Form[tmpId].ContactDetail);
    userlogin.beforHitDefaults(logObject, todo, tmpId, userlogin);
    var data = userlogin.getData(tmpId, userlogin, todo);
    var ajaxdata = userlogin.getajaxData(data);
    var ajaxURL = userlogin.getLoginAjaxURL();
    $.ajax({
      cache: false,
      url: ajaxURL,
      type: "POST",
      crossOrigin: true,
      crossDomain: true,
      data: ajaxdata,
      dataType: "json",
      success: function (res) {
        // if(data.username == "manisince1999@gmail.com"){
        //     res = {"message":"ISO MisMatch","access":"0","code":"204","msg":"You seem to be from India. Select India as Country"};
        // }
        // res={"DataCookie":{"fn":"","em":"","phcc":"","iso":"IN","mb1":"","ctid":"","glid":"","cd":"","cmid":"","utyp":"","ev":"","uv":"","usts":"2","admln":"","admsales":""},"access":"0","code":"204","msg":"User blocked for Identification"}
        if (isSet(res)) {
          /* ::If response set ::*/
          if (data.loginflag === 3) {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                todo: "defaultFlag3",
                obj: userlogin,
              },
            });
          }
          if (
            (isSet(logObject) && logObject !== "") ||
            (logObject === "" && todo === "blurlogin")
          ) {
            /* logObject not empty - Login Hit :: blurlogin - blur Hit */
            IsChatbl(tmpId)
              ? removeBLLoader(tmpId, "left")
              : isSSB(tmpId)
                ? removeBLLoaderSSB(tmpId, "ssblogin")
                : removeBLLoader(tmpId, "center");
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                todo: "enableNameField",
                obj: userlogin,
              },
            });
          }

          // ecom, first we have to save details and then redirect, before handling ui part
          if (
            ReqObj.Form[tmpId].typeofform === "image" &&
            isEcomProduct(tmpId)
          ) {
            if (isSet(res.code) && parseInt(res.code) === 200) {
              userlogin.updateUserDetails(data.loginflag, res);
              userlogin.updateFlagDetails(data.loginflag, res);

              if (isSet(logObject) && isSet(tmpId) && logObject !== "") {
                callToIdentifiedQ(tmpId, "from-Form");
              } else {
                callToIdentifiedQ(tmpId, "from-Form", 0); /* Blur Hit */
              }
            }
            var isUserBlocked = 0;
            if (
              isSet(res.msg) &&
              res.msg.toLowerCase().trim() ===
              "user blocked for identification" &&
              res.DataCookie["iso"] === "IN"
            ) {
              isUserBlocked = 1;
            }
            var isIsoMismatch = 0;
            if (
              isSet(res.message) &&
              res.message.toLowerCase().trim() === "iso mismatch"
            ) {
              isIsoMismatch = 1;
            }
            if (
              imeshExist() !== "" ||
              isUserBlocked === 1 ||
              isIsoMismatch === 1
            ) {
              CloseForm(tmpId);
              window.open(ReqObj.Form[tmpId].ecomUrl, "_blank");
            }
          }
          userlogin.afterLoginHit({
            data: {
              tmpId: tmpId,
              res: res,
              obj: userlogin,
            },
          }); /* The Ui part is handled in afterLoginHit for 200/204 with saving necessary details  */
          if (
            (isSet(res.code) && parseInt(res.code) === 200) ||
            (isSet(that.userBlocked) && that.userBlocked === 1)
          ) {
            userlogin.updateUserDetails(data.loginflag, res);
            userlogin.updateFlagDetails(data.loginflag, res);

            if (isSet(logObject) && isSet(tmpId) && logObject !== "") {
              /* Post Ajax */
              if (isSSB(tmpId)) afterLoginSSBstep(tmpId, todo, that);
              PostAjax(logObject, tmpId);
              callToIdentifiedQ(tmpId, "from-Form");
            } else {
              callToIdentifiedQ(tmpId, "from-Form", 0); /* Blur Hit */
            }
          } else if (isSet(res.code) && parseInt(res.code) === 204) {
            blenqGATracking(form_type, "service:EtoGlusrLogin:" + res.message, res, 1, tmpId);
            userlogin.logObjectNoPostAjax(logObject, tmpId); /* no blur hit*/
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                todo: "showemail",
                obj: userlogin,
              },
            });
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                todo: "showcity",
                obj: userlogin,
              },
            });
          } else {
            /* Track Error if code not 200/204 */
            blenqGATracking(form_type, "service:EtoGlusrLogin:failure", res, 1, tmpId);
            userlogin.logObjectNoPostAjax(logObject, tmpId); /* no blur hit*/
          }
        } else {
          /* If response not set :: empty/null/undefined */
          blenqGATracking(form_type, "service:EtoGlusrLogin:failure", "response undefined", 1, tmpId);
          userlogin.logObjectNoPostAjax(logObject, tmpId); /* no blur hit*/
        }
      },
      error: function (res) {
        if (ReqObj.Form[tmpId].typeofform === "image" && isEcomProduct(tmpId)) {
          CloseForm(tmpId);
          window.open(ReqObj.Form[tmpId].ecomUrl, "_blank");
        }
        userlogin.handleUI({
          data: {
            tmpId: tmpId,
            todo: "tryagain",
            obj: userlogin,
            msg: "",
          },
        });
        res = isSet(res) ? JSON.stringify(res) : "response undefined";
        blenqGATracking(form_type, "service:EtoGlusrLogin:failure", res, 1, tmpId);
        userlogin.logObjectNoPostAjax(logObject, tmpId); /* no blur hit */
        if (logObject === "" && todo === "blurlogin") {
          // removeBLLoader(tmpId, "center");
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              todo: "enableNameField",
              obj: userlogin,
            },
          });
        }
      },
      complete: function (res) {
        if (IsChatbl(tmpId))
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              todo: "chatblur",
              fromwhere: "aftercomplete",
              obj: userlogin,
            },
          });
        if (logObject === "" && todo === "blurlogin") {
          removeBLLoader(tmpId, "center");
        }
      },
    });
  } else {
    if (
      $("#t" + tmpId + "_tCondCheckBox").length > 0 &&
      isSet(ReqObj.Form[tmpId].defSubmit)
    ) {
      ReqObj.Form[tmpId].defSubmit.blurfired = true;
      ReqObj.Form[tmpId].defSubmit.loginfval = $(
        "#t" + tmpId + "_login_field"
      ).val();
    }
  }
};
UserLogin.prototype.logObjectNoPostAjax = function (logObject, tmpId) {
  if (isSet(logObject) && isSet(tmpId) && logObject !== "") {
    /* Not Blur Hit. */
    removeBLLoader(tmpId, "center");
    RemoveObjFromHit(logObject, tmpId);
  }
};
//fdsfgsf
UserLogin.prototype.afterLoginHit = function (event) {
  var tmpId = event.data.tmpId;
  var userlogin = event.data.obj;
  var res = event.data.res;

  if (parseInt(res.code) === 200) {
    if (isSet(res.DataCookie) && Object.keys(res.DataCookie).length > 0) {
      if ($("#t" + tmpId + "_q_first_nm" + userlogin.classCount).length > 0) {
        if (isSet(res.DataCookie["fn"]) && res.DataCookie["fn"] !== "") {
          if (IsChatbl(tmpId))
            ReqObj.Form[tmpId].UserInputs["Name"] = res.DataCookie["fn"];
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              value: res.DataCookie["fn"],
              todo: "disableNameField",
              fromwhere: "afterhit",
              obj: userlogin,
            },
          });
          if (
            ReqObj.Form[tmpId].defSubmit.todo === false &&
            ReqObj.Form[tmpId].defSubmit.subfired === false
          ) {
            ReqObj.Form[tmpId].defSubmit.subfired = true;
            ReqObj.Form[tmpId].FormSequence.FormSubmit(
              tmpId,
              ReqObj.Form[tmpId].defSubmit.eve
            );
          }
        } else if (isSet(res.DataCookie["fn"]) && res.DataCookie["fn"] === "") {
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              todo: "enableNameField",
              fromwhere: "emptyTempName",
              obj: userlogin,
            },
          });
          if (
            ReqObj.Form[tmpId].defSubmit.todo === false &&
            ReqObj.Form[tmpId].defSubmit.subfired === false
          ) {
            ReqObj.Form[tmpId].defSubmit.subfired = true;
            ReqObj.Form[tmpId].FormSequence.FormSubmit(
              tmpId,
              ReqObj.Form[tmpId].defSubmit.eve
            );
          }
        } else if (Object.keys(res.DataCookie).length === 0) {
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              todo: "enableNameField",
              fromwhere: "code",
              obj: userlogin,
            },
          });
        }
      }
      if ($("#t" + tmpId + "_q_email_in" + userlogin.classCount).length > 0) {
        if (isSet(res.DataCookie["em"]) && res.DataCookie["em"] !== "") {
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              value: res.DataCookie["em"],
              todo: "hideemail",
              fromwhere: "afterhit",
              obj: userlogin,
            },
          });
        } else if (isSet(res.DataCookie["em"]) && res.DataCookie["em"] === "") {
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              value: res.DataCookie["em"],
              todo: "showemail",
              fromwhere: "afterhit",
              obj: userlogin,
            },
          });
        }
      }
      if ($("#t" + tmpId + "_q_city_oth" + userlogin.classCount).length > 0) {
        if (isSet(res.DataCookie["ctid"]) && res.DataCookie["ctid"] !== "") {
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              value: res.DataCookie["ctid"],
              todo: "hidecity",
              fromwhere: "afterhit",
              obj: userlogin,
            },
          });
        } else if (
          isSet(res.DataCookie["ctid"]) &&
          res.DataCookie["ctid"] === ""
        ) {
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              value: res.DataCookie["ctid"],
              todo: "showcity",
              fromwhere: "afterhit",
              obj: userlogin,
            },
          });
        }
      }
      if ($("#t" + tmpId + "_q_mobile_f" + userlogin.classCount).length > 0) {
        if (isSet(res.DataCookie["mb1"]) && res.DataCookie["mb1"] !== "") {
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              value: res.DataCookie["mb1"],
              todo: "hidemobile",
              fromwhere: "afterhit",
              obj: userlogin,
            },
          });
        } else if (
          isSet(res.DataCookie["ctid"]) &&
          res.DataCookie["ctid"] === ""
        ) {
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              value: res.DataCookie["ctid"],
              todo: "showmobile",
              fromwhere: "afterhit",
              obj: userlogin,
            },
          });
        }
      }
    } else
      userlogin.handleUI({
        data: {
          tmpId: tmpId,
          todo: "tryagain",
          obj: userlogin,
          msg: "Something went wrong.Please try again.",
        },
      });

    if (isSet(res.DataCookie["glid"]) && res.DataCookie["glid"] !== "") {
      ReqObj.glid = res.DataCookie["glid"];
      !isSet(ReqObj.CNSerCalled) || !ReqObj.CNSerCalled
        ? toCallMiniDetails(tmpId)
        : "";
    }
  } else if (parseInt(res.code) === 204) {
    $("#t" + tmpId + "_q_first_nm" + userlogin.classCount).val("");
    $("#t" + tmpId + "_q_mobile_f" + userlogin.classCount).val("");
    if (
      isSet(res.msg) &&
      (res.msg.trim() === "Email is not registered with Indiamart." ||
        res.msg.trim() === "Mobile Number is not registered with Indiamart.") &&
      isSet(ReqObj.Form[tmpId].defSubmit.todo) &&
      ReqObj.Form[tmpId].defSubmit.todo === false &&
      ReqObj.Form[tmpId].defSubmit.subfired === false
    ) {
      ReqObj.Form[tmpId].defSubmit.subfired = true;
      ReqObj.Form[tmpId].FormSequence.FormSubmit(
        tmpId,
        ReqObj.Form[tmpId].defSubmit.eve
      );
    }
    userlogin.handleUI({
      data: {
        tmpId: tmpId,
        todo: "enableNameField",
        fromwhere: "emptyTempName",
        obj: userlogin,
      },
    });
    userlogin.handleUI({
      data: {
        tmpId: tmpId,
        value: "",
        todo: "showcity",
        fromwhere: "afterhit",
        obj: userlogin,
      },
    });
    userlogin.handleUI({
      data: {
        tmpId: tmpId,
        value: "",
        todo: "showemail",
        fromwhere: "afterhit",
        obj: userlogin,
      },
    });
    if (
      isSet(res.msg) &&
      ((isSet(res.message) && res.message.trim() === "ISO MisMatch".trim()) ||
        res.msg.trim() === "Unable to Create User".trim() ||
        res.msg.trim() ===
        "Please use your registered Mobile Number to Login".trim() ||
        res.msg.trim() === "Invalid mobile Number".trim() ||
        res.msg.trim() === "GLUSER creation service unavailable".trim())
    ) {
      if (
        !(ReqObj.Form[tmpId].typeofform === "image" && isEcomProduct(tmpId))
      ) {
        userlogin.handleUI({
          data: {
            tmpId: tmpId,
            todo: "tryagain",
            obj: userlogin,
            msg: res.msg,
          },
        });
      }
    }
    if (
      isSet(res.msg) &&
      res.msg.toLowerCase().trim() === "user blocked for identification" &&
      res.DataCookie["iso"] === "IN"
    ) {
      this.userBlocked = 1;
      ReqObj.UserDetail["blusrdtl"] = {
        blkUsr: 1,
        blk_mb: event.data.obj.username,
        blk_iso: "91",
      };
    }
  }
};

UserLogin.prototype.updateUserDetails = function (loginflag, res, mode) {
  if (loginflag !== 3 && isSet(res.DataCookie) && res.DataCookie !== "") {
    if (
      mode === "reauth" ||
      !(isSet(res.DataCookie["usts"]) && res.DataCookie["usts"] === "2")
    ) {
      if (typeof imesh_obj !== "undefined")
        imesh_obj.set(res.DataCookie); /* to set imesh cookie */
    }
  }
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
};

UserLogin.prototype.updateFlagDetails = function (loginflag, res) {
  if (loginflag === 3 || loginflag === 1) {
    ReqObj.userType = "UnIdentified";
    if (isSet(res.msg) && res.msg !== "") {
      ReqObj.loginMode =
        res.msg.trim() === "Mobile Number found in Primary Mobile".trim() ||
          res.msg.trim() === "Email found in Primary Email".trim()
          ? 4
          : res.msg.trim() ===
            "New User created via User creation service".trim()
            ? 3
            : 0;
    }
  } else if (isSet(loginflag) && loginflag !== 3 && loginflag !== 1) {
    ReqObj.userType = "Identified";
    ReqObj.loginMode = 2;
  }
};
UserLogin.prototype.handleEvents = function (obj, tmpId) {
  var addEvents = setInterval(function () {
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      $("#t" + tmpId + "_login_field").attr("request", 0);
      if (!isSet(validation)) createGlobalObject();
      var iso_change = currentISO();
      if (iso_change !== "IN") {
        $("#t" + tmpId + "_submit").hover(
          function () {
            ReqObj.Form[tmpId].subhover = true;
          },
          function () {
            ReqObj.Form[tmpId].subhover = false;
          }
        );
      }
      $("#t" + tmpId + "flag")
        .off("click.Validation")
        .on(
          "click.Validation",
          {
            todo: "show",
            obj: obj,
            tmpId: tmpId,
          },
          obj.handleUI
        );

      isSSB(tmpId)
        ? $("#t" + tmpId + "_login_field")
          .off("keyup.Validation")
          .on(
            "keyup.Validation",
            {
              todo: "removeError",
              obj: obj,
              tmpId: tmpId,
            },
            obj.handleUI
          )
        : $("#t" + tmpId + "_login_field")
          .off("focus.Validation keypress.Validation")
          .on(
            "focus.Validation keypress.Validation",
            {
              todo: "removeError",
              obj: obj,
              tmpId: tmpId,
            },
            obj.handleUI
          );

      if (iso_change === "IN")
        $("#t" + tmpId + "_login_field")
          .off("keypress.Validation")
          .on("keypress.Validation", validation.isNumberKey);

      if (tmpId.substring(0, 2) === "09")
        obj.handleUI({
          data: {
            tmpId: tmpId,
            todo: "09defaultcss",
            obj: obj,
          },
        });

      //var prev_key = -1;
      if (!IsChatbl(tmpId)) {
        $("#t" + tmpId + "_login_field").on("keydown", function (event) {
          if (
            event.ctrlKey === true &&
            (event.keyCode === 67 ||
              event.keyCode === 65 ||
              event.keyCode === 90)
          ) {
          } else if (
            event.keyCode === 8 ||
            (event.keyCode >= 96 && event.keyCode <= 105) ||
            (event.keyCode >= 48 && event.keyCode <= 57) ||
            (event.keyCode >= 65 && event.keyCode <= 90)
          ) {
            if (obj.classCount == 0) {
              obj.classCount = 1;
              $("#t" + tmpId + "_q_first_nm" + obj.classCount).attr(
                "readonly",
                false
              );
            }
            $("#t" + tmpId + "_q_first_nm" + obj.classCount).val("");
            ReqObj.CNSerCalled = false;
            obj.handleUI({
              data: {
                tmpId: tmpId,
                todo: "enableNameField",
                obj: obj,
              },
            });
            obj.handleUI({
              data: {
                tmpId: tmpId,
                value: "",
                todo: "showemail",
                obj: obj,
                task: "toempty",
              },
            });
            obj.handleUI({
              data: {
                tmpId: tmpId,
                value: "",
                todo: "showmobile",
                obj: obj,
                task: "toempty",
              },
            });
            obj.handleUI({
              data: {
                tmpId: tmpId,
                value: "",
                todo: "showcity",
                obj: obj,
              },
            });
          }
          //prev_key = event.keyCode;
        });
        $("#t" + tmpId + "_login_field").on(
          "change",
          {
            logObject: "",
            tmpId: tmpId,
            userlogin: obj,
            blureve: true,
            todo: "blurlogin",
            iso: iso_change,
          },
          obj.sendRequest
        );
      }
      clearInterval(addEvents);
    }
  }, 200);
};
UserLogin.prototype.handleUI = function (event) {
  if (isSet(event)) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode !== 13) {
      var todo = event.data.todo;
      var tmpId = event.data.tmpId;
      var obj = event.data.obj;
      if (todo === "transition") {
        if (isSet($("#t" + tmpId + "_login"))) {
          ChatblfooterAns(tmpId);
        }
      }
      if (todo === "focus") {
        $("#t" + tmpId + "_login_field").focus();
      }
      if (todo === "default") {
        IsChatbl(tmpId)
          ? setTimeout(function () {
            $("#t" + tmpId + "_login_field").focus();
          }, 1800)
          : $("#t" + tmpId + "_login_field").focus();
      }
      if (todo === "isoFlag") {
        var iso_change = currentISO();
        var toAppend = IsChatbl(tmpId) ? "_flagC" : "jsflagdiv";
        $("#t" + tmpId + "flag").removeAttr("disabled");
        var ele = $("#t" + tmpId + "flag").detach();
        $("#t" + tmpId + toAppend).prepend(ele);
        var elel = $("#t" + tmpId + "country_dropd").detach();
        $("#t" + tmpId + "country").prepend(elel);

        if (IsChatbl(tmpId) && $("#t" + tmpId + "_chatBL").hasClass("cbl_vh")) {
          $("#t" + tmpId + "flagdiv")
            .prepend(ele)
            .addClass("bedsnone");
        }
        if (ReqObj.isoFlag !== "" && iso_change === "IN") {
          $("#t" + tmpId + "_iso").attr("value", ReqObj.isoFlag);
        }
      } else if (todo === "removeError") {
        $("#t" + tmpId + "_msg_primary_info_err_login").addClass("bedsnone");
        $("#t" + tmpId + "_login_field").removeClass("highlight-err");
        $("#t" + tmpId + "_label-l").removeClass("redc");
        removechatblerror(tmpId);
        $(".cbl_error").removeClass("cbl_frnerr");
        if (IsChatBLInline(tmpId)) {
          $("#t" + tmpId + "mflag").removeClass("mb25");
          if (toShowTnc(tmpId)) $("#t" + tmpId + "_tCond").removeClass("bt142");
        }
        if (isSSB(tmpId)) $("#t" + tmpId + "_helpmsg").removeClass("bedsnone");
      } else if (todo === "tryagain") {
        if (isSet(event.data.msg) && event.data.msg !== "") {
          $("#t" + tmpId + "_primary_info_errmsg_login").html(event.data.msg);
          $("#t" + tmpId + "_msg_primary_info_err_login").removeClass(
            "bedsnone"
          );
          if (IsChatbl(tmpId)) {
            $(".cbl_error").addClass("cbl_frnerr");
            if (IsChatBLInline(tmpId)) {
              $("#t" + tmpId + "mflag").addClass("mb25");
              if (toShowTnc(tmpId))
                $("#t" + tmpId + "_tCond").addClass("bt142");
            }
            addChatblError(tmpId, event.data.msg);
          }
          if (isSSB(tmpId)) $("#t" + tmpId + "_helpmsg").addClass("bedsnone");
        }
      } else if (todo === "defaultFlag3") {
        $("#t" + tmpId + "_q_first_nm" + obj.classCount)
          .removeClass("highlight-err mb-erbrd nb-erbrd")
          .siblings(".redc")
          .removeClass("redc");
        $("#t" + tmpId + "_error_first_name" + obj.classCount).addClass(
          "bedsnone"
        );
      } else if (todo === "enableNameField") {
        $("#t" + tmpId + "_q_first_nm" + obj.classCount)
          .prop("disabled", false)
          .removeClass(ssbClass("disable", tmpId));
        if (
          event.data.fromwhere === "code" ||
          event.data.fromwhere === "emptyTempName"
        )
          ReqObj.TempName = "";
      } else if (todo === "disableNameField") {
        if (isSet(event.data.value)) {
          $("#t" + tmpId + "_q_first_nm" + obj.classCount).val(
            event.data.value
          );
          $("#t" + tmpId + "_name-lb1").removeClass("redc");
          isSSB(tmpId)
            ? ""
            : $("#t" + tmpId + "_q_first_nm" + obj.classCount)
              .parents()
              .addClass("eqfcsed");
          //(isnewSSB(tmpId)) ? $("#t" + tmpId + "_q_first_nm" + obj.classCount).parents().addClass('focused') :
        }
        if (event.data.fromwhere === "afterhit") {
          ReqObj.TempName = event.data.value;
          $("#t" + tmpId + "_q_first_nm" + obj.classCount).attr(
            "disabled",
            "disabled"
          );
          isSSB(tmpId)
            ? $("#t" + tmpId + "_q_first_nm" + obj.classCount).addClass(
              ssbClass("disable", tmpId)
            )
            : "";
        }
      } else if (todo === "validationError") {
        var errormsg = event.data.errormsg;
        $("#t" + tmpId + "_primary_info_errmsg_login").html(errormsg);
        $("#t" + tmpId + "_msg_primary_info_err_login").removeClass("bedsnone");
        if (IsChatbl(tmpId)) {
          $(".cbl_error").addClass("cbl_frnerr");
          if (IsChatBLInline(tmpId)) {
            $("#t" + tmpId + "mflag").addClass("mb25");
            if (toShowTnc(tmpId)) $("#t" + tmpId + "_tCond").addClass("bt142");
          }
          addChatblError(tmpId, errormsg);
        } else $("#t" + tmpId + "_login_field").addClass("highlight-err");
        if (isSSB(tmpId)) {
          $("#t" + tmpId + "_login_field").focus();
          $("#t" + tmpId + "_helpmsg").addClass("bedsnone");
        }
        if (
          !IsChatbl(tmpId) &&
          !isSSB(tmpId) &&
          (!isOtherEnq(tmpId) ||
            (isOtherEnq(tmpId) && tmpId.substring(0, 2) !== "09"))
        )
          $("#t" + tmpId + "_label-l").addClass("redc");
      } else if (todo === "09defaultcss") {
        $("#t" + tmpId + "_login_field").focus();
        if (!isOtherEnq(tmpId))
          $("#t" + tmpId + "_login_field").css({
            border: "1px solid #43bfb3 ",
            boxShadow: "1px 0px 4px #43bfb3 ",
          });
      } else if (todo === "chatblur") {
        if (event.data.fromwhere === "beforehit") {
          $("#t" + tmpId + "_login_field")
            .prop("disabled", true)
            .addClass("chatblur");
          $("#t" + tmpId + "_submit")
            .prop("disabled", true)
            .addClass("chatblur");
        } else if (event.data.fromwhere === "aftercomplete") {
          $("#t" + tmpId + "_login_field")
            .prop("disabled", false)
            .removeClass("chatblur");
          $("#t" + tmpId + "_submit")
            .prop("disabled", false)
            .removeClass("chatblur");
        }
      } else if (todo === "hideemail") {
        $("#t" + tmpId + "_q_email_in" + obj.classCount)
          .val(event.data.value)
          .prop("disabled", true)
          .addClass(ssbClass("disable", tmpId));
      } else if (todo === "hidecity") {
        isSSB(tmpId) && isnewSSB(tmpId)
          ? $("#t" + tmpId + "_q_city_oth" + obj.classCount)
            .parent()
            .addClass("cbl_vh")
          : $("#t" + tmpId + "_q_city_oth" + obj.classCount)
            .parent()
            .parent()
            .addClass("cbl_vh");
      } else if (todo === "showemail") {
        var inputval =
          event.data.task === "toempty"
            ? ""
            : isSet(event.value) && event.value !== ""
              ? event.value
              : $("#t" + tmpId + "_q_email_in" + obj.classCount).val();
        $("#t" + tmpId + "_q_email_in" + obj.classCount)
          .val(inputval)
          .prop("disabled", false)
          .removeClass(ssbClass("disable", tmpId));
      } else if (todo === "showcity") {
        isSSB(tmpId) && isnewSSB(tmpId)
          ? $("#t" + tmpId + "_q_city_oth" + obj.classCount)
            .parent()
            .removeClass("cbl_vh")
          : $("#t" + tmpId + "_q_city_oth" + obj.classCount)
            .parent()
            .parent()
            .removeClass("cbl_vh");
      } else if (todo === "hidemobile") {
        $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
          .val(event.data.value)
          .prop("disabled", true)
          .addClass(ssbClass("disable", tmpId));
        if (isEnq(tmpId))
          $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
            .parent()
            .addClass("eqfcsed");
      } else if (todo === "showmobile") {
        var inputval =
          event.data.task === "toempty"
            ? ""
            : isSet(event.value) && event.value !== ""
              ? event.value
              : $("#t" + tmpId + "_q_email_in" + obj.classCount).val();
        $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
          .val(inputval)
          .prop("disabled", false)
          .removeClass(ssbClass("disable", tmpId));
      }
    }
  }
};
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

function Validation() {
  var usercookie = new UserCookie(); //hatadena
  this.result = {
    type: true,
    error: "",
  };
  this.usercountry = currentISO();
}
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
// Validation.prototype.toShowTick = function (event) {
//   var pressedKeyLength = (event.which === 8) ? 0 : event.key.length;
//   if ((pressedKeyLength + event.target.value.length) === 10) {
//     $("#t" + event.data.tmpId + "chatbltick").removeClass("bedsnone");
//   }
//   else
//     $("#t" + event.data.tmpId + "chatbltick").addClass("bedsnone");

// };
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

function checkJunkCname(cname) {
  var junkCname = [
    /\b(no company)\b/,
    /\b(no name)\b/,
    /\b(not applicable)\b/,
    /\b(person)\b/,
    /\b(personal)\b/,
    /\b(individual)\b/,
  ];

  for (var x in junkCname) {
    var re = new RegExp(junkCname[x]);
    if (isSet(cname.match(re))) return true;
  }
  return false;
}
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
var validation = new Validation();
var isBlEnqLoaded = true;
var isChatBlSequenceUpdated = false;
var ischatblnextquestionasked = false;
var isChatWidgetOpen = false;
// for generating event
var FormCloseEvent = jQuery.Event("formClose");
var OnBlEnqClose = jQuery.Event("onBLEnqClose");
//form load event
var ReqFormScriptLoaded = jQuery.Event("ReqFormLoaded");
$("body").trigger(ReqFormScriptLoaded);

function DescMapWithId(tmpId, optionDesc, optionId) {
  ReqObj.Form[tmpId].IdMapDesc = {};
  for (i = 0; i < optionDesc.length; i++) {
    ReqObj.Form[tmpId].IdMapDesc[optionDesc[i].toLowerCase()] = optionId[i];
  }
}

function convertHtml(IsqObj, tmpId, ObjectPosition) {
  if (!isSet(ObjectPosition)) ObjectPosition = 0;
  ReqObj.Form[tmpId].questionCount += 1;
  var option_desc = IsqObj.IM_SPEC_OPTIONS_DESC
    ? IsqObj.IM_SPEC_OPTIONS_DESC.split(IsqSeperator)
    : [];
  var option_id = IsqObj.IM_SPEC_OPTIONS_ID
    ? IsqObj.IM_SPEC_OPTIONS_ID.split(IsqSeperator)
    : [];
  var IsOptionIdEmpty = isSet(option_id) && option_id.length > 0 ? true : false;
  IsqObj.IM_SPEC_MASTER_FULL_DESC =
    isSet(IsqObj.IM_SPEC_MASTER_FULL_DESC) &&
      IsqObj.IM_SPEC_MASTER_FULL_DESC !== "" &&
      IsqObj.IM_SPEC_MASTER_FULL_DESC.length > 40
      ? IsqObj.IM_SPEC_MASTER_FULL_DESC.substr(0, 60) + "..."
      : IsqObj.IM_SPEC_MASTER_FULL_DESC;
  var prefilledAns = FillIsq(IsqObj.IM_SPEC_MASTER_DESC, tmpId);
  prefilledAns = prefilledAns === null ? "" : prefilledAns;
  var type = returnIsqObjType(tmpId, IsqObj);
  switch (type) {
    case 1:
      return typeText({
        data: {
          tmpId: tmpId,
          IsqObj: IsqObj,
          keys: {
            ObjectPosition: ObjectPosition,
            prefilledAns: prefilledAns,
            option_id: option_id,
            option_desc: option_desc,
            IsOptionIdEmpty: IsOptionIdEmpty,
          },
        },
      });
    case 2:
      return typeRadio({
        data: {
          tmpId: tmpId,
          IsqObj: IsqObj,
          keys: {
            ObjectPosition: ObjectPosition,
            prefilledAns: prefilledAns,
            option_id: option_id,
            option_desc: option_desc,
            IsOptionIdEmpty: IsOptionIdEmpty,
          },
        },
      });
    case 3:
      return typeSelect({
        data: {
          tmpId: tmpId,
          IsqObj: IsqObj,
          keys: {
            ObjectPosition: ObjectPosition,
            prefilledAns: prefilledAns,
            option_id: option_id,
            option_desc: option_desc,
            IsOptionIdEmpty: IsOptionIdEmpty,
          },
        },
      });
    case 4:
      return typeCheckBox({
        data: {
          tmpId: tmpId,
          IsqObj: IsqObj,
          keys: {
            ObjectPosition: ObjectPosition,
            prefilledAns: prefilledAns,
            option_id: option_id,
            option_desc: option_desc,
            IsOptionIdEmpty: IsOptionIdEmpty,
          },
        },
      });
    case 5:
      return typeQuantity({
        data: {
          tmpId: tmpId,
          IsqObj: IsqObj,
          keys: {
            ObjectPosition: ObjectPosition,
            prefilledAns: prefilledAns,
            option_id: option_id,
            option_desc: option_desc,
            IsOptionIdEmpty: IsOptionIdEmpty,
            type: "qt",
          },
        },
      });
    case 6:
      return typeQuantity({
        data: {
          tmpId: tmpId,
          IsqObj: IsqObj,
          keys: {
            ObjectPosition: ObjectPosition,
            prefilledAns: prefilledAns,
            option_id: option_id,
            option_desc: option_desc,
            IsOptionIdEmpty: IsOptionIdEmpty,
            type: "ut",
          },
        },
      });
  }
}

function returnIsqObjType(tmpId, IsqObj) {
  if (IsqObj.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity") return 5;
  else if (IsqObj.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit")
    return 6;
  else return parseInt(IsqObj.IM_SPEC_MASTER_TYPE);
}
/*---------------------------------------return Empty Object--------------------------------------------*/

function returnEmptyObject() {
  return {
    OuterWrapper: "<div>",
    beforeLabel: "",
    Label: "",
    beforeInput: "",
    UserInput: "",
    ClosingWrapper: "</div>",
  };
}
/* ---------------------------------------------------TYPE : text ---------------------------------------------------- */

function typeText(event) {
  var QuestionObject = returnIsqQuestionObject({
    data: {
      type: "TEXTBOX",
      questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
      questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
        ? event.data.IsqObj.IM_SPEC_MASTER_ID
        : "",
      optionSelector: "",
      others: [],
    },
  });
  var textboxObject = returnIsqHtmlObject(event, QuestionObject);
  textboxObject["optionId"] = event.data.keys.IsOptionIdEmpty
    ? event.data.keys.option_id
    : false;
  textboxObject["inputId"] =
    event.data.tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
      ? "t" +
      event.data.tmpId +
      "txtbx_option" +
      ReqObj.Form[event.data.tmpId].questionCount +
      (ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1)
      : "t" +
      event.data.tmpId +
      "txtbx_option" +
      ReqObj.Form[event.data.tmpId].questionCount;
  textboxObject["inputName"] =
    "t" +
    event.data.tmpId +
    "text_name" +
    ReqObj.Form[event.data.tmpId].questionCount;
  textboxObject["ans"] = event.data.keys.prefilledAns;
  textboxObject["placeholder"] = IsChatbl(event.data.tmpId)
    ? " Enter " + QuestionObject.questionText
    : "";

  if (
    isImageVidEnq(event.data.tmpId) &&
    ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
    isSet(ReqObj.Form[event.data.tmpId].isQtutShown) &&
    ReqObj.Form[event.data.tmpId].isQtutShown === true &&
    textboxObject.QuestionDesc.toLowerCase() === "quantity"
  )
    return returnEmptyObject();
  ReqObj.Form[event.data.tmpId].isQtutShown =
    isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
      ? true
      : false;
  QuestionObject.optionSelector =
    "input[name='" + textboxObject.inputName + "']";
  /* CSS related */
  textboxObject["divClass"] =
    event.data.keys.ObjectPosition > 0 && !IsChatbl(event.data.tmpId)
      ? "bepr beclr isq-st19"
      : "bepr beclr";
  textboxObject["lblClass"] = " be-lbl";
  textboxObject["inputClass"] = !IsChatbl(event.data.tmpId)
    ? isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
      ? "be-input beisq-tbx bg-white inpt_errorbx imgoneqty"
      : isSSB(event.data.tmpId)
        ? ""
        : (isInactiveBL(event.data.tmpId)) ? "be-w50 lgcont be-input beisq-tbx bg-white inpt_errorbx cbl_br10 cpNm" : "be-input beisq-tbx bg-white inpt_errorbx"
    : "cbl_txt"; /* WARNING - Don't use imgoneqty class anywhere else */
  textboxObject["inputClass"] =
    isOtherEnq(event.data.tmpId) &&
      textboxObject.QuestionDesc.toLowerCase() !== "quantity"
      ? textboxObject["inputClass"] + " txtblng"
      : textboxObject["inputClass"];
  if (event.data.keys.ObjectPosition > 0 && IsChatbl(event.data.tmpId)) {
    textboxObject["inputClass"] = !IsChatbl(event.data.tmpId)
      ? textboxObject["inputClass"] + " be-chatW"
      : "cbl_qunty";
  }
  var descriptionHtml =
    isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
      ? ""
      : Tooltip("text", event.data.IsqObj.IM_SPEC_MASTER_FULL_DESC);
  var lblClass = "lbtool";
  textboxObject["lblin"] = true;
  if (
    isImageVidEnq(event.data.tmpId) &&
    ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
  ) {
    lblClass = "";
    textboxObject["lblin"] = false;
  }
  var typetextHtmlObj = {
    OuterWrapper:
      isSSB(event.data.tmpId) || isBlInline(event.data.tmpId)
        ? ""
        : "<div class='" + textboxObject.divClass + "'>",
    beforeLabel: "",
    Label: isSSB(event.data.tmpId)
      ? "<label class = '" +
      ssbClass("label", event.data.tmpId) +
      "'>" +
      textboxObject.QuestionDesc +
      "</label>"
      : "<div class='" +
      lblClass +
      "'>" +
      MakeLabel(textboxObject, descriptionHtml, event.data.tmpId) +
      "</div>",
    beforeInput: "",
    UserInput: isSSB(event.data.tmpId)
      ? isnewSSB(event.data.tmpId)
        ? TextBoxIp(textboxObject)
        : '<div class="mb-InCon">' + TextBoxIp(textboxObject) + "</div>"
      : TextBoxIp(textboxObject),
    ClosingWrapper: "</div>",
  };
  var html = "";
  html += returnContainer(
    textboxObject["inputId"],
    "_err",
    "texterr errpdg bedsnone",
    "",
    ""
  );
  html += returnContainer(
    textboxObject["inputId"],
    "_errmsg",
    "",
    "content",
    ""
  );
  html += "</div>Please enter valid input</div>";
  typetextHtmlObj["UserInput"] = typetextHtmlObj["UserInput"] + "" + html;
  //typetextHtmlObj["UserInput"] = typetextHtmlObj["UserInput"] + "</div>" + html; // isq disappear backbutton
  ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
  return typetextHtmlObj;
}
/* ---------------------------------------------------TYPE : Radio ---------------------------------------------------- */

function typeRadio(event) {
  ReqObj.Form[event.data.tmpId].toAppendQues = IsChatBLInline(event.data.tmpId)
    ? true
    : false;
  var QuestionObject = returnIsqQuestionObject({
    data: {
      type: "RADIO",
      questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
      questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
        ? event.data.IsqObj.IM_SPEC_MASTER_ID
        : "",
      optionSelector: "",
      others: [],
    },
  });
  var screen_no =
    event.data.tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
      ? ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1
      : "";
  var RadioboxObject = returnIsqHtmlObject(event, QuestionObject);
  // ReqObj.Form[event?.data?.tmpId].isNewImage=="1" && (RadioboxObject["lblClass"] = " be-lbl");  js error unexpected token '.'
  isSet(ReqObj.Form[event.data.tmpId].isNewImage) &&
    ReqObj.Form[event.data.tmpId].isNewImage == "1" &&
    (RadioboxObject["lblClass"] = " be-lbl");
  var descriptionHtml = Tooltip(
    "radio",
    event.data.IsqObj.IM_SPEC_MASTER_FULL_DESC
  );
  QuestionObject.optionSelector =
    "input[name='" +
    "t" +
    event.data.tmpId +
    "radio_name" +
    ReqObj.Form[event.data.tmpId].questionCount +
    screen_no +
    "']";
  var typeRadioHtmlObj = {
    OuterWrapper:
      isSSB(event.data.tmpId) &&
        event.data.IsqObj.IM_SPEC_MASTER_DESC === "Looking for suppliers"
        ? "<div class='" + ssbClass("wrprClass", event.data.tmpId) + "'>"
        : "",
    Label: isSSB(event.data.tmpId)
      ? LabelForCheckAndRadio(
        RadioboxObject,
        descriptionHtml,
        event.data.tmpId,
        ""
      )
      : "<div class='lbtool'>" +
      LabelForCheckAndRadio(
        RadioboxObject,
        descriptionHtml,
        event.data.tmpId,
        ""
      ) +
      "</div>",
    ClosingWrapper:
      isSSB(event.data.tmpId) &&
        event.data.IsqObj.IM_SPEC_MASTER_DESC === "Looking for suppliers"
        ? "</div>"
        : "",
  };

  typeRadioHtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
    ? "<div class = 'cbl_radio'>"
    : isBlInline(event.data.tmpId)
      ? "<div class='iwChk'>"
      : isSSB(event.data.tmpId) && isnewSSB(event.data.tmpId)
        ? "<div class='nb-flex nb-aic nb-flwp nb-mt10'>"
        : "<div class=''>";

  if (isSet(event.data.keys.option_desc)) {
    var len = event.data.keys.option_desc.length;
    for (var i = 0; i < len; i++) {
      var indexofAns = -1;
      var optionDesc = event.data.keys.option_desc[i];
      if (isSet(optionDesc)) {
        optionDesc = trimVal(optionDesc);
      }
      if (event.data.keys.prefilledAns.length > 0) {
        //indexofAns = $.inArray(optionDesc, event.data.keys.prefilledAns); // 1 Kg and kg case mismatch issue
        var defaultResult = -1;
        var indexofAns = defaultResult;
        $.each(event.data.keys.prefilledAns, function (index, value) {
          if (
            indexofAns == defaultResult &&
            value.toLowerCase() == optionDesc.toLowerCase()
          ) {
            indexofAns = index;
          }
        });

        if (indexofAns !== -1)
          event.data.keys.prefilledAns.splice(indexofAns, 1);
      }
      if (
        checkdefaultIsq(
          event.data.tmpId,
          QuestionObject.questionText,
          QuestionObject.type,
          optionDesc
        )
      ) {
        indexofAns = 1;
        typeRadioHtmlObj["WrapClass"] = "dn";
      }
      if (
        optionDesc.trim().toLowerCase() === "others" ||
        optionDesc.trim().toLowerCase() === "other"
      ) {
        var cbl_br = (isInactiveBL(event.data.tmpId)) ? "cbl_br10" : "";
        var OtherObject = {
          divClass: isSSB(event.data.tmpId)
            ? "t" +
            event.data.tmpId +
            "be-radioboxtemp be-radiobox t" +
            event.data.tmpId +
            "other_radiotemp"
            : "t" +
            event.data.tmpId +
            "be-radioboxtemp be-radiobox oth_bx other_radio t" +
            event.data.tmpId +
            "other_radiotemp " + cbl_br,
          optionId: event.data.keys.IsOptionIdEmpty
            ? event.data.keys.option_id[i]
            : "",
          inputName:
            "t" +
            event.data.tmpId +
            "other_radio_name" +
            ReqObj.Form[event.data.tmpId].questionCount,
          inputId:
            "t" +
            event.data.tmpId +
            "other_radio_name" +
            ReqObj.Form[event.data.tmpId].questionCount +
            "_option" +
            (i + 1),
          ans: indexofAns === -1 ? event.data.keys.prefilledAns : "",
        };
        typeRadioHtmlObj["UserInput"] += OthersBox(
          OtherObject,
          event.data.tmpId
        );
        QuestionObject["others"].push(
          "#" +
          "t" +
          event.data.tmpId +
          "other_radio_name" +
          ReqObj.Form[event.data.tmpId].questionCount +
          "_option" +
          (i + 1)
        );
      } else {
        var RadioBoxObject = {
          option_id: event.data.keys.IsOptionIdEmpty
            ? event.data.keys.option_id[i]
            : "",
          templateId: "t" + event.data.tmpId,
          questionCount: ReqObj.Form[event.data.tmpId].questionCount,
          option_desc: event.data.keys.option_desc[i],
          i: i,
        };
        var radSubmit = IsChatBLInline(event.data.tmpId)
          ? " t" + event.data.tmpId + "_radSubmit"
          : "";
        RadioBoxObject["inputClass"] = IsChatbl(event.data.tmpId)
          ? "cbl_chekbx_btn"
          : "bevT bedblk";
        RadioBoxObject["labelClass"] = IsChatbl(event.data.tmpId)
          ? "cbl_chekbx_label CheckboxClick"
          : "bepr CheckboxClick";
        RadioBoxObject["divClass1"] =
          indexofAns !== -1
            ? "t" +
            event.data.tmpId +
            "be-radioboxtemp be-radiobox sl-box chksl be-chckbox"
            : IsChatbl(event.data.tmpId)
              ? IsChatBLInline(event.data.tmpId)
                ? "cbl_rdon cbl_df cbl_aic cbl_ml20" + radSubmit
                : "cbl_chekbx cbl_df cbl_aic cbl_ml20" + radSubmit
              : isSSB(event.data.tmpId)
                ? ssbClass("radin", event.data.tmpId)
                : (isInactiveBL(event.data.tmpId)) ? "be-chckbox cbl_br10" : "be-chckbox";
        RadioBoxObject["divClass2"] =
          indexofAns !== -1 ? "berdio-sl" : "berdio-sl bedsnone";
        RadioBoxObject["inputClass"] =
          indexofAns !== -1
            ? "eqVam bedblk radioClick waschecked"
            : isSSB(event.data.tmpId)
              ? ssbClass("radio", event.data.tmpId)
              : "eqVam bedblk radioClick";
        RadioBoxObject["checked"] = indexofAns !== -1 ? "checked" : "";
        RadioBoxObject["spanClass"] =
          indexofAns !== -1
            ? IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
              ? ""
              : "bevT bedblk beisq3 w-txt"
            : IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
              ? ""
              : "bevT bedblk beisq3";
        if (event.data.IsqObj.IM_SPEC_MASTER_DESC === "Looking for suppliers") {
          RadioBoxObject["cityFunc"] = "onclick = radCheck(this)";
          if (
            indexofAns !== -1 &&
            RadioBoxObject.option_desc.toLowerCase() === "specific city"
          )
            RadioBoxObject["spanClass"] += " specCity";
        }
        typeRadioHtmlObj["UserInput"] += RadioBox(
          event.data.tmpId,
          RadioBoxObject
        );
      }
    }
  }
  typeRadioHtmlObj["UserInput"] +=
    RadioboxObject["QuestionDesc"].toLowerCase() === "why do you need this" &&
      isSSB(event.data.tmpId)
      ? "</div></div>"
      : "</div>";
  // changes for ssb (single page)
  if (isSet(OtherObject) && isSet(OtherObject["inputId"])) {
    var html = "";
    html += returnContainer(
      OtherObject["inputId"],
      "_err",
      "texterr bedsnone",
      "",
      ""
    );
    html += returnContainer(
      OtherObject["inputId"],
      "_errmsg",
      "",
      "content",
      ""
    );
    html += "</div>Please enter valid input</div>";
    typeRadioHtmlObj["UserInput"] =
      typeRadioHtmlObj["UserInput"] + "</div>" + html;
  }
  ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
  return typeRadioHtmlObj;
}

/* ---------------------------------------------------TYPE : Select ---------------------------------------------------- */

function typeSelect(event) {
  var typeSelectHtmlObj = {};
  var QuestionObject = returnIsqQuestionObject({
    data: {
      type: "SELECT",
      questionText: isSet(event.data.IsqObj.IM_SPEC_MASTER_DESC)
        ? event.data.IsqObj.IM_SPEC_MASTER_DESC
        : "",
      questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
        ? event.data.IsqObj.IM_SPEC_MASTER_ID
        : "",
      optionSelector: "",
      others: [],
    },
  });
  var tmpId = event.data.tmpId;
  var selectObject = returnIsqHtmlObject(event, QuestionObject);
  selectObject["onchange"] = false;
  selectObject["optionValue"] = "Select a value";
  selectObject["selectName"] =
    "t" +
    event.data.tmpId +
    "select_name" +
    ReqObj.Form[event.data.tmpId].questionCount;
  selectObject["selectId"] =
    "t" +
    event.data.tmpId +
    "select_name" +
    ReqObj.Form[event.data.tmpId].questionCount;
  QuestionObject.optionSelector = IsChatbl(event.data.tmpId)
    ? "#t" +
    event.data.tmpId +
    "_selectDD" +
    ReqObj.Form[event.data.tmpId].questionCount
    : "select[name='" + selectObject.selectName + "']";
  if (
    isImageVidEnq(event.data.tmpId) &&
    ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
    isSet(ReqObj.Form[event.data.tmpId].isQtutShown) &&
    ReqObj.Form[event.data.tmpId].isQtutShown === true &&
    selectObject.QuestionDesc.toLowerCase() === "quantity unit"
  )
    return returnEmptyObject();

  selectObject["divClass"] =
    currentISO() !== "IN" &&
      QuestionObject.questionText.toLowerCase() === "total order value"
      ? "bedblk bepr mr20"
      : "bedblk bepr";
  selectObject["lblClass"] = "be-lbl";
  selectObject["selectClass"] = IsChatbl(event.data.tmpId)
    ? "cbl_selct_unit _ul_select dn"
    : isSSB(event.data.tmpId)
      ? isnewSSB(tmpId)
        ? "nb-selct betextclr"
        : "mb-selct mb-w230 betextclr"
      : isBlInline(tmpId)
        ? ""
        : (isInactiveBL(event.data.tmpId)) ? "be-input bewfull betextclr cbl_br10 cpNm" : "be-input bewfull betextclr";
  selectObject["selectClass"] =
    event.data.keys.ObjectPosition > 0 &&
      IsChatbl(event.data.tmpId) &&
      !IsChatbl(event.data.tmpId)
      ? selectObject["selectClass"] + " be-chatW slt-styl"
      : selectObject["selectClass"];
  selectObject["divClass"] = !IsChatbl(event.data.tmpId)
    ? selectObject["divClass"] + " be-w50 lgcont"
    : selectObject["divClass"];
  selectObject["optionValue"] = SelBoxMSg(
    selectObject.QuestionDesc,
    event.data.tmpId
  );
  if (isBlInline(tmpId)) selectObject["divClass"] = "";
  var optionHtml = ""; //
  var selBoxPrefilled = false;
  var OtherOptionId = "";
  var OtherOptionDesc = "";
  var OtherOptionVal = "";
  var chatBlSpecificObject = {
    readonly:
      '<input type="text" value = "" readonly="" class="cbl_unit" id = "t' +
      event.data.tmpId +
      "_selectDD" +
      ReqObj.Form[event.data.tmpId].questionCount +
      '" name="select_unit" maxlength="1000" autocomplete="off" placeholder= "' +
      selectObject["optionValue"] +
      '">',
    arrow:
      "<div onclick = \"funcClick(this,'" +
      event.data.tmpId +
      "', " +
      ReqObj.Form[event.data.tmpId].questionCount +
      ' )"><svg class="cbl_arw" id = "t' +
      event.data.tmpId +
      '_select_box"><use xlink:href="#t' +
      event.data.tmpId +
      'dwnarow"></use></svg></div>',
    chatblOuterdiv:
      selectObject.QuestionDesc === "Currency"
        ? '<div class="cbl_selct cbl_pr cbl_df cbl_aic cbl_curr">'
        : '<div class="cbl_selct cbl_pr cbl_df cbl_aic">',
    chatblClosingdiv: "</div>",
  };

  if (isSet(event.data.keys.option_desc)) {
    var len = event.data.keys.option_desc.length;
    for (var i = 0; i < len; i++) {
      var selected = "";
      var optionDesc = isSet(event.data.keys.option_desc[i])
        ? trimVal(event.data.keys.option_desc[i])
        : "";
      var str = handleSpecialQuotes(optionDesc);
      if ($.inArray(optionDesc, event.data.keys.prefilledAns) !== -1) {
        // maps!
        selected = " selected";
        selectObject["selectClass"] += " beclr3";
        selBoxPrefilled = true;
      }
      if (
        optionDesc.toLowerCase() === "others" ||
        optionDesc.toLowerCase() === "other"
      ) {
        selectObject["onchange"] = true;
        OtherOptionVal = str;
        OtherOptionId = event.data.keys.option_id[i];
        OtherOptionDesc = event.data.keys.option_desc[i];
      } else {
        var element = IsChatbl(event.data.tmpId) ? "li" : "option";
        optionHtml += returnCustomElement(
          event.data.tmpId,
          "",
          element,
          str,
          event.data.keys.option_id[i],
          selected,
          event.data.keys.option_desc[i]
        );
      }
    }
  }
  var descriptionHtml = Tooltip("text", selectObject.questionText);
  if (
    !isImageVidEnq(event.data.tmpId) &&
    ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
    selectObject.questionText !== ""
  ) {
    selectObject["lblClass"] + " bedbtip";
  }
  var OtherIpField = "";
  var OtherBoxAnswer = "";
  if (selectObject["onchange"]) {
    var OtherClasses = "be-slbox beisq-tbx be-othr othrwd inpt_errorbx";
    var OtherBoxAnswer =
      !selBoxPrefilled && notEmpty(event.data.keys.prefilledAns[0])
        ? event.data.keys.prefilledAns[0]
        : "";
    var OtherSelected = notEmpty(OtherBoxAnswer) ? "selected" : "";
    OtherClasses = !notEmpty(OtherBoxAnswer)
      ? OtherClasses + " bedsnone"
      : OtherClasses;
    // var OtherIpField = "<input type = 'text' id = 'other_" + "t" + event.data.tmpId + "select_name" + ReqObj.Form[event.data.tmpId].questionCount + "_1' class='" + OtherClasses + "' value ='" + OtherBoxAnswer + "'/>";

    var OtherIpField = isBlInline(tmpId)
      ? "<input type = 'text' id = 'other_" +
      "t" +
      event.data.tmpId +
      "select_name" +
      ReqObj.Form[event.data.tmpId].questionCount +
      "_1' class= bedsnone'" +
      OtherClasses +
      "' value ='" +
      OtherBoxAnswer +
      "'/>"
      : "<input type = 'text' id = 'other_" +
      "t" +
      event.data.tmpId +
      "select_name" +
      ReqObj.Form[event.data.tmpId].questionCount +
      "_1' class= '" +
      OtherClasses +
      "' value ='" +
      OtherBoxAnswer +
      "'/>";
    // box changes

    var element = IsChatbl(event.data.tmpId) ? "li" : "option";
    optionHtml += returnCustomElement(
      event.data.tmpId,
      "",
      element,
      OtherOptionVal,
      OtherOptionId,
      OtherSelected,
      OtherOptionDesc
    );
    QuestionObject["others"].push(
      "#other_" +
      "t" +
      event.data.tmpId +
      "select_name" +
      ReqObj.Form[event.data.tmpId].questionCount +
      "_1"
    );
  }
  var element = IsChatbl(event.data.tmpId) ? "ul" : "select";
  var popupChatUserInput =
    chatBlSpecificObject["chatblOuterdiv"] +
    chatBlSpecificObject["readonly"] +
    chatBlSpecificObject["arrow"] +
    "<div class='cbl_sclBr cbl_pa dn'>" +
    SelectBoxIp(selectObject, event.data.tmpId) +
    optionHtml +
    "</" +
    element +
    ">" +
    OtherIpField +
    chatBlSpecificObject["chatblClosingdiv"] +
    chatBlSpecificObject["chatblClosingdiv"];
  var lblClass = "lbtool";
  selectObject["lblin"] = true;
  if (
    isImageVidEnq(event.data.tmpId) &&
    ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
  ) {
    lblClass = "";
    selectObject["lblin"] = false;
  }
  typeSelectHtmlObj["OuterWrapper"] =
    isSSB(event.data.tmpId) || isBlInline(event.data.tmpId)
      ? ""
      : "<div class='" + selectObject.divClass + "'>";
  typeSelectHtmlObj["Label"] =
    isSSB(event.data.tmpId) || isBlInline(event.data.tmpId)
      ? MakeLabel(selectObject, descriptionHtml, event.data.tmpId)
      : "<div class='" +
      lblClass +
      "'>" +
      MakeLabel(selectObject, descriptionHtml, event.data.tmpId) +
      "</div>";
  typeSelectHtmlObj["ClosingWrapper"] = isSSB(event.data.tmpId) ? "" : "</div>";
  // typeSelectHtmlObj["UserInput"] = (IsChatbl(event.data.tmpId)) ? popupChatUserInput : SelectBoxIp(selectObject, event.data.tmpId) + optionHtml + "</" + element + ">" + OtherIpField;
  if (isBlInline(tmpId)) {
    typeSelectHtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
      ? popupChatUserInput
      : SelectBoxIp(selectObject, event.data.tmpId) +
      optionHtml +
      "</" +
      element +
      ">";
  } else {
    typeSelectHtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
      ? popupChatUserInput
      : SelectBoxIp(selectObject, event.data.tmpId) +
      optionHtml +
      "</" +
      element +
      ">" +
      OtherIpField;
  }
  ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
  if (
    isSSB(event.data.tmpId) &&
    selectObject.QuestionDesc.toLowerCase() === "currency"
  ) {
    typeSelectHtmlObj["UserInput"] =
      "<div>" +
      typeSelectHtmlObj["UserInput"] +
      " <div class = 'mb-ertxt mb-mt10' id = 't" +
      event.data.tmpId +
      "_curr_err'> </div></div>";
  }
  return typeSelectHtmlObj;
}
/* ---------------------------------------------------TYPE : CheckBox ---------------------------------------------------- */

function typeCheckBox(event) {
  var QuestionObject = returnIsqQuestionObject({
    data: {
      type: "CHECKBOX",
      questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
      questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
        ? event.data.IsqObj.IM_SPEC_MASTER_ID
        : "",
      optionSelector: "",
      others: [],
    },
  });
  var CheckboxObject = returnIsqHtmlObject(event, QuestionObject);
  // ReqObj.Form[event?.data?.tmpId].isNewImage=="1" && (CheckboxObject["lblClass"] = " be-lbl"); js error Unexpected token '.'
  isSet(ReqObj.Form[event.data.tmpId].isNewImage) &&
    ReqObj.Form[event.data.tmpId].isNewImage == "1" &&
    (CheckboxObject["lblClass"] = " be-lbl");
  var descriptionHtml = Tooltip(
    "check",
    event.data.IsqObj.IM_SPEC_MASTER_FULL_DESC
  );
  var type4HtmlObj = {
    OuterWrapper: "",
    Label: isSSB(event.data.tmpId)
      ? LabelForCheckAndRadio(
        CheckboxObject,
        descriptionHtml,
        event.data.tmpId,
        ""
      )
      : "<div class='lbtool'>" +
      LabelForCheckAndRadio(
        CheckboxObject,
        descriptionHtml,
        event.data.tmpId,
        ""
      ) +
      "</div>",
    ClosingWrapper: "",
  };
  var closedivcls = isSSB(event.data.tmpId)
    ? isnewSSB(event.data.tmpId)
      ? "nb-flex nb-aic nb-flwp nb-mt10"
      : "mb-flex"
    : isBlInline(event.data.tmpId)
      ? "iwChk"
      : "bemgb15 nwDt";
  type4HtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
    ? ""
    : "<div class='" + closedivcls + "'>";
  QuestionObject.optionSelector =
    "input[name='" +
    "t" +
    event.data.tmpId +
    "checkbox_name" +
    ReqObj.Form[event.data.tmpId].questionCount +
    "']";
  type4HtmlObj["UserInput"] += !IsChatbl(event.data.tmpId)
    ? ""
    : "<div class = 'cbl_radio'>";

  if (isSet(event.data.keys.option_desc)) {
    for (var i = 0; i < event.data.keys.option_desc.length; i++) {
      var indexofAns = -1;
      if (event.data.keys.prefilledAns.length > 0) {
        var optionDesc = event.data.keys.option_desc[i];
        if (isSet(optionDesc)) {
          optionDesc = trimVal(optionDesc);
        }
        indexofAns = $.inArray(optionDesc, event.data.keys.prefilledAns);
        if (indexofAns !== -1)
          event.data.keys.prefilledAns.splice(indexofAns, 1);
      }

      if (
        event.data.keys.option_desc[i].trim().toLowerCase() === "others" ||
        event.data.keys.option_desc[i].trim().toLowerCase() === "other"
      ) {
        QuestionObject["others"].push(
          "#" +
          "t" +
          event.data.tmpId +
          "other_checkbox_name" +
          ReqObj.Form[event.data.tmpId].questionCount +
          "_option" +
          (i + 1)
        );
        var OthersBoxObject = {
          divClass: isSSB(event.data.tmpId)
            ? isnewSSB(event.data.tmpId)
              ? "nb-pr15"
              : ""
            : "be-chckbox oth_bx other_check",
          optionId: event.data.keys.IsOptionIdEmpty
            ? event.data.keys.option_id[i]
            : "",
          inputName:
            "t" +
            event.data.tmpId +
            "other_checkbox_name" +
            ReqObj.Form[event.data.tmpId].questionCount,
          inputId:
            "t" +
            event.data.tmpId +
            "other_checkbox_name" +
            ReqObj.Form[event.data.tmpId].questionCount +
            "_option" +
            (i + 1),
          ans: "",
        };
        if (indexofAns === -1)
          OthersBoxObject["ans"] = event.data.keys.prefilledAns;
        type4HtmlObj["UserInput"] += OthersBox(
          OthersBoxObject,
          event.data.tmpId
        );
      } else {
        var CheckBoxObject = {
          option_id: event.data.keys.IsOptionIdEmpty
            ? event.data.keys.option_id[i]
            : "",
          templateId: "t" + event.data.tmpId,
          questionCount: ReqObj.Form[event.data.tmpId].questionCount,
          option_desc: event.data.keys.option_desc[i],
          i: i,
        };
        CheckBoxObject["inputClass"] = IsChatbl(event.data.tmpId)
          ? "cbl_chekbx_btn"
          : "bevT bedblk";
        CheckBoxObject["labelClass"] = IsChatbl(event.data.tmpId)
          ? "cbl_chekbx_label CheckboxClick"
          : isSSB(event.data.tmpId)
            ? "CheckboxClick"
            : "bepr CheckboxClick";

        if (indexofAns !== -1) {
          CheckBoxObject["divClass1"] = isOtherEnq(event.data.tmpId)
            ? "be-chckbox sl-box chksl eqchkbx"
            : "be-chckbox sl-box chksl";
          CheckBoxObject["divClass2"] = "betick-sl";
          CheckBoxObject["checked"] = "checked";
          CheckBoxObject["spanClass"] =
            IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
              ? ""
              : "bevT bedblk beisq3 w-txt";
        } else {
          CheckBoxObject["divClass1"] = IsChatbl(event.data.tmpId)
            ? "cbl_chekbx cbl_df cbl_aic cbl_ml20"
            : isSSB(event.data.tmpId)
              ? isnewSSB(event.data.tmpId)
                ? "nb-chk nb-pr nb-dib nb-pr15"
                : "mb-chk mb-pr mb-dib"
              : isOtherEnq(event.data.tmpId)
                ? "be-chckbox eqchkbx"
                : (isInactiveBL(event.data.tmpId)) ? "be-chckbox cbl_br10" : "be-chckbox";
          CheckBoxObject["divClass2"] = "betick-sl bedsnone";
          CheckBoxObject["checked"] = "";
          CheckBoxObject["spanClass"] =
            IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
              ? ""
              : "bevT bedblk beisq3";
        }
        type4HtmlObj["UserInput"] += CheckBox(event.data.tmpId, CheckBoxObject);
      }
    }
  }
  type4HtmlObj["UserInput"] +=
    IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId) ? "</div>" : "";
  // changes for ssb (single page)
  if (isSet(OthersBoxObject) && isSet(OthersBoxObject["inputId"])) {
    var html = "";
    html += returnContainer(
      OthersBoxObject["inputId"],
      "_err",
      "texterr bedsnone",
      "",
      ""
    );
    html += returnContainer(
      OthersBoxObject["inputId"],
      "_errmsg",
      "",
      "content",
      ""
    );
    html += "</div>Please enter valid input</div>";
    type4HtmlObj["UserInput"] = type4HtmlObj["UserInput"] + "</div>" + html;
  }
  ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
  return type4HtmlObj;
}

/* -------------------------------------------- TYPE : Quantity & Unit ------------------------------------------------------- */

function typeQuantity(event) {
  var QuestionObject = returnIsqQuestionObject({
    data: {
      type: "TEXTBOX",
      questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
      questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
        ? event.data.IsqObj.IM_SPEC_MASTER_ID
        : "",
      optionSelector: "",
      others: [],
    },
  });
  event.data.IsqObj.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit"
    ? DescMapWithId(
      event.data.tmpId,
      event.data.keys.option_desc,
      event.data.keys.option_id
    )
    : "";
  if (event.data.keys.type === "ut") {
    ReqObj.Form[event.data.tmpId].qutAnswers =
      event.data.IsqObj.IM_SPEC_OPTIONS_DESC.split("##");
  }
  var firstqut =
    isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
      ? true
      : false;
  if (
    (isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
      isSet(ReqObj.Form[event.data.tmpId].isQtutShown) &&
      ReqObj.Form[event.data.tmpId].isQtutShown === true &&
      (event.data.keys.type === "ut" || event.data.keys.type === "qt")) ||
    (isSet(ReqObj.Form[event.data.tmpId].isBlQtutShown) &&
      ReqObj.Form[event.data.tmpId].isBlQtutShown)
  ) {
    event.data.tmpId.substr(0, 2) === "01" ||
      event.data.tmpId.substr(0, 2) === "04"
      ? (ReqObj.Form[event.data.tmpId].stopper += 1)
      : "";
    return returnEmptyObject();
  }
  var screen_no =
    event.data.tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
      ? ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1
      : "";
  var iden_class =
    screen_no !== ""
      ? "qtut" + event.data.tmpId + "_" + screen_no
      : "qtut" + event.data.tmpId;
  var unsugg_class =
    screen_no !== ""
      ? "unsug" + event.data.tmpId + "_" + screen_no
      : "unsug" + event.data.tmpId;

  var brdlft = (isInactiveBL(event.data.tmpId)) ? " brdlft8" : "";
  var brdrgt = (isInactiveBL(event.data.tmpId)) ? " brdrgt8" : "";

  var textboxObject = {
    // to return html
    labelId:
      "t" +
      event.data.tmpId +
      "ques" +
      ReqObj.Form[event.data.tmpId].questionCount,
    questionId: QuestionObject.questionId,
    optionId: event.data.keys.IsOptionIdEmpty
      ? event.data.keys.option_id[0]
      : false,
    QuestionDesc: QuestionObject.questionText,
    inputId:
      "t" +
      event.data.tmpId +
      "txtbx_option" +
      ReqObj.Form[event.data.tmpId].questionCount +
      screen_no,
    inputName:
      "t" +
      event.data.tmpId +
      "text_name" +
      ReqObj.Form[event.data.tmpId].questionCount +
      screen_no,
    ans: event.data.keys.prefilledAns,

    placeholder: IsChatbl(event.data.tmpId)
      ? " Enter " + QuestionObject.questionText
      : isBlFirstfold(event.data.tmpId)
        ? QuestionObject.questionText
        : firstqut === true && event.data.keys.type === "qt"
          ? ""
          : "",

    // lblClass: (event.data.keys.type === "qt") ? (isSSB(event.data.tmpId)) ? ssbClass("label", event.data.tmpId) : "qt_lbl" : "",

    lblClass:
      event.data.keys.type === "qt"
        ? isSSB(event.data.tmpId)
          ? ssbClass("label", event.data.tmpId)
          : isBlFirstfold(event.data.tmpId)
            ? "be-lbl dn"
            : "qt_lbl"
        : "",

    divClass:
      event.data.keys.type === "qt" ? "bepr isq-st19" : "bedblk bepr be-w50",
    inputClass:
      event.data.keys.type === "qt"
        ? "be-input in_cus " + iden_class + brdlft
        : "be-input " + unsugg_class + " inut_cus" + brdrgt,
    maxlength: event.data.keys.type === "qt" ? "12" : "1000",
    type: event.data.keys.type,
  };
  textboxObject.inputClass +=
    IsChatbl(event.data.tmpId) && event.data.keys.type === "qt"
      ? " cbl_qtut"
      : "";
  textboxObject.ans =
    event.data.keys.type === "qt" && !isAllNumbers(textboxObject.ans[0])
      ? ""
      : textboxObject.ans;
  if (event.data.keys.type === "qt" && textboxObject.ans !== "") {
    updateQtKey(event.data.tmpId, "prefilled");
    textboxObject.ans = textboxObject.ans[0].substring(0, 12);
  }
  textboxObject["inputClass"] =
    event.data.keys.type === "qt" &&
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
      ? textboxObject["inputClass"] + " imgoneqty"
      : textboxObject["inputClass"];
  QuestionObject.optionSelector =
    "input[name='" + textboxObject.inputName + "']";
  var addvalue = event.data.keys.type === "ut" ? true : false;
  if (event.data.IsqObj.IM_CAT_SPEC_CATEGORY_TYPE === "2") addvalue = false;
  textboxObject["optionId"] =
    addvalue && isSet(textboxObject.ans) && textboxObject.ans != ""
      ? getOptionId(event.data.tmpId, textboxObject.ans[0])
      : textboxObject["optionId"];
  var error_div =
    event.data.keys.type === "qt"
      ? screen_no !== ""
        ? '<div id="t' +
        event.data.tmpId +
        "_" +
        screen_no +
        '_validinev"' +
        screen_no +
        ' class="bedsnone" value=""></div>'
        : '<div id="t' +
        event.data.tmpId +
        '_validinev"' +
        screen_no +
        ' class="bedsnone" value=""></div>'
      : "";
  var typetextHtmlObj = {
    OuterWrapper: "<div class='" + textboxObject.divClass + "'>",
    beforeLabel: "",
    Label: "",
    beforeInput: "",
    UserInput: TextBoxIp(textboxObject, false, addvalue),
    ClosingWrapper: "</div>",
    qtuttype: event.data.keys.type === "ut" ? 6 : 5,
    error_div: error_div,
    label_div:
      firstqut === true
        ? ""
        : "<label id='" +
        textboxObject.labelId +
        "' class='" +
        textboxObject.lblClass +
        "'>" +
        textboxObject.QuestionDesc +
        "</label>",
  };
  ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
  ReqObj.Form[event.data.tmpId].isQtutShown =
    event.data.keys.type === "ut" &&
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
      ? true
      : ReqObj.Form[event.data.tmpId].isQtutShown;
  ReqObj.Form[event.data.tmpId].qtUtQuesPresent = true;
  if (
    (isBlInline(event.data.tmpId) || isBlFirstfold(event.data.tmpId)) &&
    event.data.keys.type === "ut"
  )
    ReqObj.Form[event.data.tmpId].isBlQtutShown = true;
  return typetextHtmlObj;
}

/*--------------------------------------------------------------------------------------------------------------------- */
/*----------- City Suggester for location ISQ  -------------*/
function citySugg(tmpId, id) {
  var iso = currentISO();
  if (typeof Suggester === "undefined") {
    setTimeout(function () {
      citySugg(tmpId);
    }, 50);
  } else {
    if (typeof Suggester !== "undefined") {
      var CitySuggSuffix = "_citySugg";
      var row_num = BlAutoSuggRowNum(tmpId);
      var autocompleteClass = SetAutoCompleteClass(tmpId, CitySuggSuffix);
      if (IsChatBLInline(tmpId)) autocompleteClass += " smChtSg";
      main_city_sugg = new Suggester({
        element: id,
        onSelect: "",
        type: "city",
        fields: "std,state,id,stateid",
        minStringLengthToDisplaySuggestion: 1,
        rowsToDisplay: row_num,
        autocompleteClass: autocompleteClass,
        displayFields: "value,state",
        displaySeparator: " >> ",
        filters: "iso:" + iso,
        recentData: false,
        rowsToDisplay: IsChatBLInline(tmpId) ? 3 : "",
      });
    }
  }
}
function returnIsqQuestionObject(event) {
  return {
    type: event.data.type,
    questionText: event.data.questionText,
    questionId: event.data.questionId,
    optionSelector: event.data.optionSelector,
    others: event.data.others,
  };
}

function returnIsqHtmlObject(event, QuestionObject) {
  return {
    labelId:
      "t" +
      event.data.tmpId +
      "ques" +
      ReqObj.Form[event.data.tmpId].questionCount,
    questionId: QuestionObject.questionId,
    QuestionDesc: QuestionObject.questionText,
    type: QuestionObject.type,
  };
}

function handleSpecialQuotes(str) {
  if (typeof str !== "undefined" && str !== "") {
    if (str.indexOf("'") > 0) {
      str = str.replace(/'/g, "&#39");
    } else if (str.indexOf('"') > 0) {
      str = str.replace(/"/g, "&quot");
    }
    return str;
  }
  return "";
}

var webAddressLocation = location.hostname;
var appsServerName = webAddressLocation.match(/^dev/)
  ? "//dev-apps.imimg.com/"
  : webAddressLocation.match(/^stg/)
    ? "//stg-apps.imimg.com/"
    : "//apps.imimg.com/";

function notEmpty(val) {
  if (isSet(val) && val !== "") {
    return true;
  } else return false;
}

function isFirstImgVidCTA(tmpId) {
  return isImageVidEnq(tmpId) &&
    ((ReqObj.Form[tmpId].FormSequence.StepCounter < 1 && imeshExist() === "") ||
      (Enq09(tmpId) &&
        imeshExist() &&
        NEC() &&
        ReqObj.Form[tmpId].FormSequence._stepCounter < 1))
    ? true
    : false;
}
function isFirstImgVidCTAFR(tmpId) {
  return isImageVidEnq(tmpId) &&
    ReqObj.Form[tmpId].FormSequence.StepCounter < 1 &&
    (imeshExist() === "" || currentISO() !== "IN")
    ? true
    : false;
}

function returnSubmitInnerHtml(tmpId) {
  var html = returnContainer(
    "t" + tmpId,
    "_fBtn",
    "bepr eqClearfx",
    "",
    "",
    ""
  );
  html +=
    "<div class='backdiv bedsnone' id='t" +
    tmpId +
    "_backdiv'><input value='' class='be-backbtn' id='t" +
    tmpId +
    "_be-backbtn' type='submit'><div id='t" +
    tmpId +
    "_backarr'></div></div><div class='' id='t" +
    tmpId +
    "_submitdiv'><input value='Next' class='form-btn' id='t" +
    tmpId +
    "_submit' type='submit' style='background-color: #00a699'></div>";
  html += "</div>";

  if (isInactiveBL(tmpId)) {
    $("#t" + tmpId, "_fBtn").css({
      "margin-right": "25%",
    });
  }
  return html;
}

function getMcatImage(tmpId, cbObj, left) {
  if (
    isSet(tmpId) && isSet(ReqObj) && isSet(ReqObj.Form) &&
    isSet(ReqObj.Form[tmpId]) &&
    isSet(ReqObj.Form[tmpId].formType)
  ) {
    if (
      isSet(ReqObj.Form[tmpId].mcatId) &&
      parseInt(ReqObj.Form[tmpId].mcatId) > -1 &&
      isSet(modIdf) &&
      modIdf !== -1 &&
      modIdf !== ""
    ) {
      $("#t" + tmpId + "_imglodr").removeClass("bedsnone");
      ReqObj.Form[tmpId].displayImage =
        isSet(ReqObj.Form[tmpId].displayImage) &&
          ReqObj.Form[tmpId].displayImage === ""
          ? ""
          : ReqObj.Form[tmpId].displayImage;
      ReqObj.Form[tmpId].zoomImage = "";
      ReqObj.mcatImage = "";
      ReqObj.mcatdtl.ping = true;
      fireAjaxRequest({
        data: {
          ga: {
            s: false,
            f: true,
            gatype: "McatDtl",
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
          ajaxtimeout: 3000,
          ajaxdata: {
            modid: modIdf,
            mcatid: parseInt(ReqObj.Form[tmpId].mcatId),
          },
          hitfinserv: "",
          type: 9,
          key: {
            cbObj: cbObj,
            left: left,
          },
        },
      });
    }
  }
}

function ShowOtp(tmpId) {
  var imeshcookie = imeshExist();
  if (
    imeshcookie &&
    usercookie.getParameterValue(imeshcookie, "uv") !== "V" &&
    usercookie.getParameterValue(imeshcookie, "iso") === "IN"
  )
    return true;
  else return false;
}
function toAddSkipOtp(tmpId, message) {
  return checkblockedUser()
    ? false
    : (isEnq(tmpId) &&
      (isSecondEnq() === false || (message === "" && isSecondEnq()))) ||
      (isBl(tmpId) &&
        (isSecondBl() === false || (message === "" && isSecondBl())))
      ? true
      : false;
}

function ObjectTrim(object) {
  var trimmedObject = {};
  for (var key in object) {
    if (typeof object[key] === "string") object[key] = object[key].trim();
    if (object[key] !== "") trimmedObject[key] = object[key];
  }
  return trimmedObject;
}

/*
 * @description this method is used to check if localstorage exists
 *
 *
 * @returns true if localStorage exists else false
 */
function CheckLocalStorage() {
  try {
    localStorage.setItem("__checklocalstorage", "exists");
    localStorage.removeItem("__checklocalstorage");
    return true;
  } catch (exception) {
    return false;
  }
}

/*
 * maybe class not required
 * Class     : LoginFlag
 * Usage     : returns the login flag.
 *
 * @function : returnLoginFlag - returns the login flag
 */
function LoginFlag() { }
LoginFlag.prototype.returnLoginFlag = function (todo) {
  if (todo === "glusrupdate" && todo !== "") return 2;
  if (todo === "verifyusr" && todo !== "") return 5;
  if (todo === "login" && todo !== "") return 1;
  if (todo === "blurlogin" && todo !== "") return 3;
};

/*
 * Class     : LoginMode
 * Usage     : returns the login mode
 *
 * @function : cookies      - read required cookies
 * @function : getLoginMode - return login mode
 */
function LoginMode() { }
LoginMode.prototype.getLoginMode = function () {
  var v4iilexCookie = usercookie.getCookie("v4iilex");
  var imissCookie = usercookie.getCookie("im_iss");
  var imEqGlCookie = usercookie.getCookie("imEqGl");
  var imeshCookie = imeshExist();
  var loginmode = 0;
  if (imeshCookie === "" && v4iilexCookie !== "") {
    usercookie.deleteCookie("v4iilex"); /* */
    v4iilexCookie = "";
  }
  if (imeshCookie === "" && imEqGlCookie !== "") {
    /* logout kiya user ne and for mozilla*/
    usercookie.deleteCookie("imEqGl");
  }

  if (isSet(imissCookie) && imissCookie !== "") {
    /* when v4iilex cookie is set */
    loginmode = 1;
  } else if (isSet(imeshCookie) && imeshCookie !== "") {
    /* when imesh cookie is set */
    loginmode = 2;
  } else loginmode = 3; //new user /* nothing is set */

  return loginmode;
};
/*
 * Usage : to check for European Countries
 *
 */

// function isEuroCountry(country_iso) {
//   var len = isSet(global_euroArr) ? global_euroArr.length : 0;
//   for (var i = 0; i < len; i++) {
//     if (global_euroArr[i] === country_iso)
//       return true;
//   }
//   return false;
// }
/*
 * Usage :
 */
function isSet(checkVar) {
  return typeof checkVar !== "undefined" && checkVar !== null ? true : false;
}
/*
 * Usage : To move to next fieldbfbfdbdfbdbd
 */
function movetoNext(event) {
  var tmpId = event.data.tmpId;
  if ($("#t" + tmpId + event.data.param1).val() !== "") {
    $("#t" + tmpId + event.data.param2).focus();
  }
}
/*
 * Usage : To move to previous field
 */
function movetoPrevious(event) {
  var tmpId = event.data.tmpId;
  if (event.keyCode == 8) {
    if ($("#t" + tmpId + event.data.param1).val() === "") {
      $("#t" + tmpId + event.data.param2).focus();
      $("#t" + tmpId + event.data.param2).html("");
    }
  }
}
/*
 * Usage : String to Key,Value pairs
 */
function stringToObject(query, seperator) /* a or b required ? */ {
  var query_arr = query.split(seperator);
  var len = isSet(query_arr) ? query_arr.length : 0;
  var obj = {};
  for (var i = 0; i < len; i++) {
    var sub_query_arr = query_arr[i].split("=");
    obj[sub_query_arr[0]] = sub_query_arr[1];
  }
  return obj;
}

/*
 *  Change and check tracking
 */

function MakeRefText(tmpId) {
  ReqObj.Form[tmpId].refText =
    "ctaName=" +
    (isSet(ReqObj.Form[tmpId].ctaName) ? ReqObj.Form[tmpId].ctaName : "");
  ReqObj.Form[tmpId].refText +=
    "|ctaType=" +
    (isSet(ReqObj.Form[tmpId].ctaType) ? ReqObj.Form[tmpId].ctaType : "");
  ReqObj.Form[tmpId].refText +=
    "|PT=" +
    (isSet(ReqObj.Form[tmpId].pageType) ? ReqObj.Form[tmpId].pageType : "");
  ReqObj.Form[tmpId].refText +=
    "|Section=" +
    (isSet(ReqObj.Form[tmpId].section) ? ReqObj.Form[tmpId].section : "");
  ReqObj.Form[tmpId].refText +=
    "|Position=" +
    (isSet(ReqObj.Form[tmpId].position) ? ReqObj.Form[tmpId].position : "");
  ReqObj.Form[tmpId].refText +=
    "|ScriptVer=" +
    (isSet(ReqObj.Form[tmpId].scriptVersion)
      ? ReqObj.Form[tmpId].scriptVersion
      : "");
  ReqObj.Form[tmpId].refText +=
    "|compRank=" +
    (isSet(ReqObj.Form[tmpId].FCPRank) ? ReqObj.Form[tmpId].FCPRank : "");
  ReqObj.Form[tmpId].refText +=
    "|searchTerm=" +
    (isSet(ReqObj.Form[tmpId].mcatName) ? ReqObj.Form[tmpId].mcatName : "");
}

function imInvokeRequestForGaCode(tmpId, eventAction) {
  //<!--google analytics async code start-->
  // var script = trackScript;
  // _gaq.push(['_trackPageview', script]);
  //<!--google analytics async code end-->
  // if(ReqObj.Form[tmpId].toFireGaTracking === true){
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var imeshcookie = imeshExist();

  var virtualPageURL =
    "/cgi/" +
    modIdf +
    "/" +
    form_type +
    "/" +
    getEventLabel();
  virtualPageURL += imeshcookie === "" ? "-new.mp" : ".mp";

  imgtm.push({
    event: "VirtualPageview",
    virtualPageURL: virtualPageURL,
    virtualPageTitle: "Send Enquiry -" + eventAction,
    CD_Additional_Data: ReqObj.Form[tmpId].refText,
  });
  ReqObj.Form[tmpId].pvTrackingFired = true;
  // }
}
//inactive changes
// isinteraactive==1 -> not interactive
// isinteraactive==0 ->  interactive

function blenqGATracking(eventCategory, eventAction, eventLabel, isinteraactive, tmpId) {
  if (isSet(ReqObj.Form[tmpId]) && (ReqObj.Form[tmpId].toFireGaTracking === true || ReqObj.Form[tmpId].noSampling === true || isinteraactive === 1 || ReqObj.Form[tmpId].inactiveBL)) {
    var event_type = isinteraactive === 0 ? "IMEvent" : "IMEvent-NI";
    if (glmodid == "PRODDTL" && eventAction == "Redirect:ProductUrl") event_type = "IMEvent";
    var modid = eventCategory === "iploc" ? glmodid : modIdf;
    var CD_Additional_Data = tmpId === 0 ? modid : modid + "-" + ReqObj.Form[tmpId].refText;
    eventLabel = ReqObj.seller_cta && (ReqObj.su_cta == 0 || ReqObj.su_cta == 1) ? eventLabel + " |SA" : eventLabel;

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

function blenqGATrackingMisc(eventCategory, eventAction, eventLabel, isinteraactive, tmpId, refText) {
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

function labelNEC(iso) {
  var nec = "";
  if(isSet(ReqObj) && isSet(ReqObj.UserDetail)){
  if (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "") nec += "N";
  if (iso === "IN") {
    if (ReqObj.UserDetail.em !== "") nec += "E";
    if (ReqObj.UserDetail.ctid !== "") nec += "C";
    if (nec === "") nec = "NO-NEC";
  } else {
    if (ReqObj.UserDetail.mb1 !== "") nec += "M";
    if (nec === "") nec = "NO-NM";
  }
}
  return nec;
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

/* no idea about this */
function ServiceGATrack(TracName, TracEvent, FileName) {
  if (isSet(_gaq)) {
    _gaq.push(["_trackEvent", TracName, TracEvent, FileName, 0, true]);
  }
}

function addTemplates(templateid, template_array) {
  if ($.inArray(templateid, template_array) === -1) {
    template_array.push(templateid);
  }
}

function UpdateAfterLogin(key) {
  if (usercookie.getParameterValue(imeshExist(), key) !== "") {
    ReqObj.UserDetail[key] = setDetail(key);
  }
}

function isGDPRCountry() {
  var GdprCountries = [
    "AT",
    "BE",
    "BG",
    "HR",
    "CY",
    "CZ",
    "DK",
    "EE",
    "FI",
    "FR",
    "DE",
    "GR",
    "HU",
    "IE",
    "IT",
    "LV",
    "LT",
    "LU",
    "MT",
    "NL",
    "PL",
    "PT",
    "RO",
    "SK",
    "SI",
    "ES",
    "SE",
    "GB",
    "UK",
  ];
  if ($.inArray(currentISO(), GdprCountries) !== -1) return true;
  return false;
}
/*--------------------To show Tnc-------------------- */
function toShowTnc(tmpId) {
  if (imeshExist() === "") {
    return isGDPRCountry() === true ? true : false;
  }
  return false;
}
/*--------------------Hov - onSubmit Tnc-------------------- */
function onHovSub(tmpId) {
  var isGDPR = isGDPRCountry();
  if (currentISO() !== "IN") {
    if (isGDPR === true) {
      isSet(ReqObj.Form[tmpId].IsCheckboxChecked) &&
        ReqObj.Form[tmpId].IsCheckboxChecked === true
        ? $("#t" + tmpId + "_submit").addClass("hovsub")
        : $("#t" + tmpId + "_submit").removeClass("hovsub");
    } else $("#t" + tmpId + "_submit").addClass("hovsub");
  } else $("#t" + tmpId + "_submit").addClass("hovsub");
}
/*--------------------Checked Tnc-------------------- */
function checkedTNC(tmpId) {
  if (isSet(tmpId) && isSet(ReqObj.Form[tmpId])) {
    if ($("#t" + tmpId + "_tCondCheckBox").prop("checked")) {
      ReqObj.Form[tmpId].IsCheckboxChecked = true;
      $("#t" + tmpId + "_error_tCond")
        .text("Please agree to the terms and conditions")
        .addClass("bedsnone");
      submitTncUI(tmpId, 1);
    } else {
      ReqObj.Form[tmpId].IsCheckboxChecked = false;
      submitTncUI(tmpId, 0);
    }
    onHovSub(tmpId);
  }
}
/*--------------------To show or hide-------------------- */
function ShowHideTNC(tmpId) {
  toShowTnc() === true ? ShowTncBox(tmpId) : HideTncBox(tmpId);
}
/*--------------------To show-------------------- */
function ShowTncBox(tmpId) {
  if (IsChatBLInline(tmpId)) {
    if (toShowTnc(tmpId) && $("#t" + tmpId + "verify_error").is(":visible"))
      $("#t" + tmpId + "_tCond").addClass("bt142");
  }
  $("#t" + tmpId + "_tCond").removeClass("bedsnone");
  if (Enq09(tmpId)) {
    $("#t" + tmpId + "_tCond").addClass("pd_b");
    if (direnqImage(tmpId)) {
      $("#t" + tmpId + "_tCond").addClass("pdtop");
    }

  }
  if (Bl01(tmpId)) $("#t" + tmpId + "_tCond").addClass("bemb5");
  $("#t" + tmpId + "_tCondCheckBox").prop("checked", false);
  if (isBlInlineFr(tmpId)) {
    $("#t" + tmpId + "_tCond").addClass("mar_bemb");
    $("#t" + tmpId + "_tCond").removeClass("bemt10");
  }
  submitTncUI(tmpId, 0);
}
/*--------------------To hide-------------------- */
function HideTncBox(tmpId) {
  $("#t" + tmpId + "_tCond").addClass("bedsnone");
  $("#t" + tmpId + "_tCondCheckBox").prop("checked", true);
  submitTncUI(tmpId, 1);
}
/*--------------------UI- show/hide-------------------- */
function submitTncUI(tmpId, todo) {
  var dv = isEcomProduct(tmpId) ? false : todo === 0 ? true : false;
  var dc = isEcomProduct(tmpId)
    ? "#00a699"
    : todo === 0
      ? "#b2b2b2"
      : "#00a699";
  $("#t" + tmpId + "_submit").prop("disabled", dv);
  if (isImageVidEnq(tmpId)) {
    isEcomProduct(tmpId)
      ? $("#t" + tmpId + "_submit").removeAttr("style")
      : todo === 0
        ? $("#t" + tmpId + "_submit")
          .prop("disabled", dv)
          .attr("style", "background:" + dc + "; box-shadow:none")
        : $("#t" + tmpId + "_submit").removeAttr("style");
  } else if (!IsChatbl(tmpId))
    (isSSB(tmpId) || (isGlIdEven(tmpId) && tmpId.substr(0, 2) === "01")) && !dv
      ? $("#t" + tmpId + "_submit")
        .prop("disabled", false)
        .attr("style", "")
      : $("#t" + tmpId + "_submit")
        .prop("disabled", false)
        .css("background-color", dc);
  else {
    if (todo === 1) $(".cbl_sbmt_btn").removeClass("cbl_dsbl");
    else {
      $(".cbl_error").addClass("cbl_frnerr"); // popup
      $(".cbl_sbmt_btn").addClass("cbl_dsbl");
    }
  }
}

function toShowOtpFlagCondition(tmpId) {
  if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" || IsChatbl(tmpId)) {
    return (
      isSet(ReqObj.Form[tmpId].toShowOtpStepbl) &&
      ReqObj.Form[tmpId].toShowOtpStepbl !== false
    );
  } else if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
    return (
      isSet(ReqObj.Form[tmpId].toShowOtpStepenq) &&
      ReqObj.Form[tmpId].toShowOtpStepenq !== false
    );
  }
}

function disableEnquiryButton(tmpId) {
  if (typeof ReqObj.Form[tmpId].enqSentCallBack === "function") {
    var value =
      isSet(ReqObj.Form[tmpId].enquiryDivID) &&
        ReqObj.Form[tmpId].enquiryDivID !== ""
        ? ReqObj.Form[tmpId].enquiryDivID
        : "dispid" + ReqObj.Form[tmpId].pDispId;

    var passVal = ReturntoProp(tmpId);
    ReqObj.Form[tmpId].enqSentCallBack(passVal);
  }
}

function appendImEqGlCookie(tmpId, createstep) {
  if (isSet(tmpId)) {
    ReqObj.Form[tmpId].toShowOtpStep =
      isSet(createstep) && createstep === "firsttimecreation" ? false : true;
    var value = "";
    if (
      isSet(ReqObj.Form[tmpId].formType) &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
    ) {
      value =
        isSet(ReqObj.Form[tmpId].enquiryDivID) &&
          ReqObj.Form[tmpId].enquiryDivID !== ""
          ? ReqObj.Form[tmpId].enquiryDivID
          : "dispid" + ReqObj.Form[tmpId].pDispId;
    } else {
      value = "BL" + usercookie.getParameterValue(imeshExist(), "glid");
    }

    if (isSet(value) && value !== "") {
      var imEqGlCookie = usercookie.getCookie("imEqGl");
      var len = usercookie.getCookie("imEqGl").length;
      if (len === 0) {
        usercookie.setCookie("imEqGl", value, "1", modIdf);
      } else {
        if (imEqGlCookie.substring(0, len - 2) === ",") {
          value = imEqGlCookie + value + ",";
        } else {
          value = imEqGlCookie + "," + value;
        }

        usercookie.setCookie("imEqGl", value, "1", modIdf);
      }
    }
    return value;
  }
  return "";
}

function RemoveValFromImEqGl(val) {
  if (isSet(val) && val !== "") {
    var imEqgl = usercookie.getCookie("imEqGl");
    if (isSet(imEqgl) && trimVal(imEqgl) !== "" && imEqgl !== "undef") {
      var arr = imEqgl.split(",");
      for (var s = arr.length - 1; s >= 0; s--) {
        if (isSet(arr[s])) {
          if (arr[s] === val) arr.splice(s, 1);
        }
      }
    }
  }
}

function toShowBuyerInfo(tmpId, screen_name) {
  if (
    imeshExist() !== "" && 
    !isInactiveBL(tmpId) &&
    !pdpenqImage(tmpId) &&
    screen_name.toLowerCase() !== "userverification" &&
    screen_name.toLowerCase() !== "thankyou"
  ) {
    $("#t" + tmpId + "_byrinfo")
      .html(get_buyer_info(tmpId))
      .removeClass("bedsnone");
  } else {
    $("#t" + tmpId + "_byrinfo")
      .html(get_buyer_info(tmpId))
      .addClass("bedsnone");
  }
  // Not found BL
  if (Bl04(tmpId) && imeshExist() !== "")
    $("#t" + tmpId + "_byrinfoIn")
      .html(get_buyer_info(tmpId))
      .removeClass("bedsnone");
}

function get_buyer_info(tmpId) {
  var details = "";
  var imeshcookie = imeshExist();
  if (imeshcookie === "") return "";
  var sections = {};
  sections["main"] = "Your Contact Information :";
  sections["buyername"] =
    isSet(ReqObj.UserDetail["fn"]) && ReqObj.UserDetail["fn"] !== ""
      ? ReqObj.UserDetail["fn"]
      : "";
  sections["buyermobile"] =
    isSet(ReqObj.UserDetail["mb1"]) && ReqObj.UserDetail["mb1"] !== ""
      ? "+" +
      usercookie.getParameterValue(imeshcookie, "phcc") +
      "-" +
      ReqObj.UserDetail["mb1"]
      : "";
  sections["buyeremail"] =
    isSet(ReqObj.UserDetail["em"]) && ReqObj.UserDetail["em"] !== ""
      ? ReqObj.UserDetail["em"]
      : "";
  var cls = isImageVidEnq(tmpId) ? "epUstxt" : "";
  var details = "<b class='" + cls + "'>" + sections["main"] + "</b><br/>";
  if (sections["buyername"] !== "") {
    details += sections["buyername"];
    details += pdpenqImage(tmpId)
      ? returnSpan("", "", "   |   ", "befwt", "")
      : "</br>";
  }
  if (isOtherEnq(tmpId)) {
    if (sections["buyermobile"] !== "" && sections["buyeremail"] !== "") {
      details +=
        sections["buyermobile"] +
        returnSpan("", "", "   |   ", "befwt", "") +
        sections["buyeremail"];
    } else if (sections["buyermobile"] !== "") {
      details += sections["buyermobile"];
    } else if (sections["buyeremail"] !== "") {
      details += sections["buyeremail"];
    }
  } else {
    if (sections["buyermobile"] !== "") {
      details += sections["buyermobile"] + "</br>";
    }
    if (sections["buyeremail"] !== "") {
      details += sections["buyeremail"] + "</br>";
    }
  }

  if (
    sections["buyername"] === "" &&
    sections["buyermobile"] === "" &&
    sections["buyeremail"] === ""
  )
    return "";

  if (details !== "" && !isInactiveBL(tmpId)) {
    $("#t" + tmpId + "_leftR").addClass("btPd");
  }
  return details;
}

function ReturntoProp(tmpId) {
  var returnValue = JSON.parse(JSON.stringify(ReqObj.Original[tmpId]));
  returnValue.IsqArray = ReqObj.Form[tmpId].IsqArray;
  returnValue.displayImage = ReqObj.Form[tmpId].displayImage;
  returnValue.prodName = ReqObj.Form[tmpId].prodName;
  returnValue.generationId = ReqObj.Form[tmpId].generationId;
  returnValue.mcatName = ReqObj.Form[tmpId].mcatName;
  return returnValue;
}

function changeProd(event) {
  if (isSet(event) && isSet(event.data)) {
    ReqObj.changeProdClick = true;
    var tmpId = event.data.tmpId;
    var todo = event.data.todo;
    if (imeshExist() === "") {
      addDetachedFlag();
      //detachFlag2(tmpId);
    }
    $(".be-prdimg").children("img").attr("src", "");
    if (todo === "prev" && isSet(ReqObj.Form[tmpId].prev)) {
      ReqObj.ImageVideoIsqSeq = false;
      var returnObj = ReturntoProp(tmpId);
      ReqObj.Form[tmpId].prev(returnObj);
    } else if (todo === "next" && isSet(ReqObj.Form[tmpId].next)) {
      ReqObj.ImageVideoIsqSeq = false;
      var returnObj = ReturntoProp(tmpId);
      ReqObj.Form[tmpId].next(returnObj);
    }
  }
}

function BlEnqGenerated(tmpId) {
  if (
    isSet(tmpId) &&
    isSet(ReqObj.Form[tmpId].generationId) &&
    parseInt(ReqObj.Form[tmpId].generationId) > 1
  )
    return true;
  else return false;
}

function ShowProdName(tmpId) {
  if (
    ReqObj.Form[tmpId].modrefType.toLowerCase() === "product" &&
    !BlEnqGenerated(tmpId) &&
    (ReqObj.Form[tmpId].prodName === "" ||
      (ReqObj.Form[tmpId].prodName === "" && IsChatbl(tmpId)) ||
      (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
        (tmpId.substring(0, 2) === "09" || tmpId.substring(0, 2) === "04")) ||
      (ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
        (tmpId.substring(0, 2) === "04" || tmpId.substring(0, 2) === "01")))
  ) {
    ReqObj.Form[tmpId].flags.WasProdNamePresent = true;
    ReqObj.Form[tmpId].isproductshown = true;
    return true; //
  } else {
    return ReqObj.Form[tmpId].flags.WasProdNamePresent;
  }
}

function isProdNamePresent(tmpId) {
  return ReqObj.Form[tmpId].modrefType.toLowerCase() === "product" &&
    ReqObj.Form[tmpId].prodName !== ""
    ? true
    : false;
}

//improve logic for this function
function ShowReqBox(tmpId) {
  if (
    isBlInline(tmpId) &&
    currentISO() !== "IN" &&
    isNewInlineBl(tmpId) &&
    showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2)
  ) {
    return false;
  }
  if (
    isBlInline(tmpId) &&
    currentISO() !== "IN" &&
    isNewInlineBl(tmpId) &&
    !showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2)
  ) {
    return true;
  }
  if (isBlInline(tmpId) && isNewInlineBl(tmpId)) return false;
  if (ReqObj.Form[tmpId].flags.isDescDivShown === true) return false;
  else return true;
}

function GetPopUpHtml(tmpId) {
  loadOverlay();
  var regex = /0901/gi;
  return ReqObj.OverlayHtml.replace(regex, tmpId);
}

function loadOverlay() {
  if (
    isSet($("#t0901_bewrapper").html()) &&
    $("#t0901_bewrapper").html() !== ""
  ) {
    ReqObj.OverlayHtml = $("#t0901_bewrapper").html();
  }
}
/*-----------------new proposed seq---------------------- */
function _makeExtraKey(_classArray, _fallback) {
  var extraKey = {};
  var count = 0;
  for (var ele in _classArray) {
    count += 1;
    extraKey[count] = _extraKey(_classArray[ele], _fallback);
  }
  return extraKey;
}
function _extraKey(_className, _fallback) {
  switch (
  _className.toString().toLowerCase() // tr : toReplace, is:Service, hf:hasFallback, fObj : fallbackObj
  ) {
    case "enquirenow":
      return { tr: false, is: false, hf: true, fobj: null };
    case "userlogin":
      return { tr: true, is: false, hf: false, fobj: null };
    case "contactdetail":
      return { tr: false, is: false, hf: false, fobj: null };
    case "userverification":
      return { tr: false, is: false, hf: false, fobj: null };
    case "isq":
      return { tr: false, is: false, hf: true, fobj: _fallback };
    case "requirementdtl":
      return { tr: true, is: false, hf: false, fobj: null };
    case "moredetails":
      return { tr: true, is: false, hf: false, fobj: null };
    case "thankyou":
      return { tr: false, is: false, hf: false, fobj: null };
    case "productname":
      return { tr: true, is: false, hf: false, fobj: null };
    case "blstaticques":
      return { tr: true, is: false, hf: false, fobj: null };
  }
}

function _makeDataAndServiceArr(_classArray, attribute, type) {
  var array = {};
  var count = 0;
  for (var ele in _classArray) {
    count += 1;
    array[count] =
      type === 1 ||
        (type === 2 &&
          isSet(_classArray[ele]) &&
          _classArray[ele].toString().toLowerCase() === "contactdetail")
        ? attribute
        : [];
  }
  return array;
}

/**-------------------new seq----------------------------- */
function _mandatDetailsFilled() {
  var ct = ReqObj.UserDetail.ctid || ReqObj.UserDetail.cityname || ReqObj.UserDetail.ctoth ? true : false;
  return ct === true && isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn ? true : false; // if city and name not present return true else false
}
function userCity() {
  if (ReqObj.UserDetail.ctid === "" && ReqObj.UserDetail.cityname === "" && ReqObj.UserDetail.ctoth === "")
    return "";
  else return "notEmpty";
}
function _contactScreen(iso) {
  if (iso === "IN") {
    var ct = userCity();
    return (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn === "") || ReqObj.UserDetail.em === "" || ct === "" ? true : false;
  } else {
    return (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn === "") || ReqObj.UserDetail.mb1 === "" ? true : false;
  }
}
/**-------------------new seq----------------------------- */
function NEC() {
  if (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn) {
    if (currentISO() === "IN") {
      if (ReqObj.UserDetail.em && (ReqObj.UserDetail.ctid || ReqObj.UserDetail.cityname || ReqObj.UserDetail.ctoth))
        return false;
      else return true;
    } else {
      if (ReqObj.UserDetail.mb1) return false;
      else return true;
    }
  } else {
    return true;
  }
}
function ReturnCorrectVal(val, defaultvalue) {
  if (isSet(val) && val !== "") {
    return val;
  } else {
    return isSet(defaultvalue) ? (defaultvalue !== "" ? defaultvalue : "") : "";
  }
}

function setDetail(key) {
  return ReturnCorrectVal(
    usercookie.getParameterValue(imeshExist(), key),
    ReturnCorrectVal(ReqObj.UserDetail[key], "")
  );
}

function SetUserDetails(where) {
  createGlobalObject();
  var imeshcookie = imeshExist();
  ReqObj.UserDetail["fn"] =
    isSet(where) && where == "changeflag"
      ? ""
      : ReturnCorrectVal(
        usercookie.getParameterValue(imeshcookie, "fn"),
        ReqObj.UserDetail["fn"]
      );
  ReqObj.UserDetail["em"] =
    isSet(where) && where == "changeflag"
      ? ""
      : ReturnCorrectVal(
        usercookie.getParameterValue(imeshcookie, "em"),
        ReqObj.UserDetail["em"]
      );
  ReqObj.UserDetail["ctid"] =
    isSet(where) && where == "changeflag"
      ? ""
      : ReturnCorrectVal(
        usercookie.getParameterValue(imeshcookie, "ctid"),
        ReqObj.UserDetail["ctid"]
      );
  ReqObj.UserDetail["mb1"] =
    isSet(where) && where == "changeflag"
      ? ""
      : ReturnCorrectVal(
        usercookie.getParameterValue(imeshcookie, "mb1"),
        ReqObj.UserDetail["mb1"]
      );
  ReqObj.UserDetail["uv"] =
    isSet(where) && where == "changeflag"
      ? ""
      : ReturnCorrectVal(
        usercookie.getParameterValue(imeshcookie, "uv"),
        ReqObj.UserDetail["uv"]
      );
}

SetUserDetails();

function setIPDetails(resp) {
  ReqObj.IPDetails["countryiso"] = resp.geoip_countryiso;
  ReqObj.IPDetails["countryname"] = resp.geoip_countryname;
  ReqObj.IPDetails["ipaddress"] = resp.geoip_ipaddress;
}
function currentISO() {
  var imeshiso = usercookie.getParameterValue(imeshExist(), "iso");
  var ipiso = usercookie.getParameterValue(
    usercookie.getCookie("iploc"),
    "gcniso"
  );
  var iso =
    imeshiso !== ""
      ? imeshiso
      : isSet(ReqObj) && ReqObj.changeUserIso !== ""
        ? ReqObj.changeUserIso
        : ipiso !== ""
          ? ipiso
          : "IN";
  return iso;
}

function currentIpCountry() {
  return usercookie.getParameterValue(usercookie.getCookie("iploc"), "gcnnm");
}
function tofindindexfn(array, component, obj) {
  for (var i = 0; i < array.length; i++) {
    if (ConstructorName(array[i][obj]).toLowerCase() === component) {
      return i;
    }
  }

  return -1;
}

function ConstructorName(obj) {
  if (isSet(obj)) {
    if (obj.constructor.name) {
      return obj.constructor.name;
    } else {
      if (isSet(obj.className) && obj.className !== "") {
        return obj.className;
      } else {
        var regex = new RegExp(/s*function\s*(.*?)\s*\{/);
        var fun = obj.constructor.toString().match(regex)[1];

        var index = fun.indexOf("(");
        if (index !== -1) {
          return fun.substr(0, index);
        }
      }
    }
  }
}
function FormCloseButtons(tmpId) {
  $(document).off("keydown.BlEnqForm").on("keydown.BlEnqForm", function (event) {
      if (
        event.keyCode === 27 &&
        ReqObj.Form[tmpId].toFireEscTracking === true &&
        (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ||
          ReqObj.Form[tmpId].formType.toLowerCase() === "enq" ||
          IsChatBLOverlay(tmpId))
      ) {
        if (closeFormCond(tmpId)) FormCloseEnqBL(tmpId, event);
        else FormCloseStep(tmpId, event);
      }
    });
  $("#t" + tmpId + "_cls")
    .off("click")
    .on("click", function (event) {
      removeYTLoader(tmpId);
      if (closeFormCond(tmpId)) FormCloseEnqBL(tmpId, event);
      else FormCloseStep(tmpId, event);
    });
}

function trimVal(val) {
  var trimmedVal = "";
  if (isSet(val) && typeof val === "string") trimmedVal = val.trim();
  return trimmedVal;
}

$(document).ready(function () {
  var window_width1 = $(window).width();
  ReqObj[windowctrlscroll] = window_width1;
});

function stopBgScroll() {
  $(".gl-wrapper").css("width", ReqObj[windowctrlscroll] + "px");
  $("html").addClass("scroll_layout");
}

function resumeBgScroll() {
  $("html").removeClass("scroll_layout");
  $(".gl-wrapper").css("width", 100 + "%");
}

//all global variable should be in one place

loadOverlay();

function createGlobalObject() {
  /* USE ONLY IF OBJECTS CAN BE REINITIALIZED, WITH NO HARM ! */
  validation = new Validation();
  usercookie = new UserCookie();
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

//this function takes object (strictly)
function isObjectEmpty(obj) {
  if (isSet(obj) && typeof obj === "object") {
    obj = ObjectTrim(obj);
    return !$.isEmptyObject(obj);
  } else return false;
}

function returnObjectSize(obj) {
  var count = 0;

  if (obj instanceof Object) {
    $.each(obj, function () {
      count = count + 1;
    });
  }
  return count;
}

// //both keyName and value should be string
// function SetKeyInLocalStorage(keyName, value) {
//   if (CheckLocalStorage()) {
//     if (isSet(keyName) && typeof keyName === "string" && keyName !== "" && isSet(value) && value !== "") {
//       localStorage.setItem(keyName, value);
//     }
//   }

// }

// function GetFromLocalStorage(keyName) {
//   if (CheckLocalStorage()) {
//     if (isSet(keyName) && keyName !== "") {
//       var value = localStorage.getItem(keyName);
//       return value;
//     }
//     return null;
//   }
//   return null;

// }

function StaticMessage() {
  var constantText = "Get verified supplier details instantly on your ";
  if (currentISO() === "IN") {
    constantText += "mobile";
  } else constantText += "email";
  return constantText;
}

/*
function showBanner(tmpId) {
  if (isSet(ReqObj.Form[tmpId].formType) && ReqObj.Form[tmpId].formType === "Enq") {
    var utyp = ReturnCorrectVal(usercookie.getParameterValue(usercookie.getCookie('ImeshVisitor'), "utyp"), "");
    if (custTypeCheck(tmpId) === 'P') {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return true;
  }
 
}
 
 
function custTypeCheck(tmpId) {
  if (isSet(ReqObj.Form[tmpId].rcvCustType) && ReqObj.Form[tmpId].rcvCustType !== "" && parseInt(ReqObj.Form[tmpId].rcvCustType, 10) < 700) {
    return 'P';
  }
  else {
    return 'F';
  }
}
*/

function ShowNameField(tmpId) {
  var ipcookie = iplocExist();
  if (!usercookie.getParameterValue(imeshExist(), "fn")) {
    if (
      currentISO() !== "IN" ||
      (ReqObj.ipLoc.zoneISO === "OTHER" && ipcookie === "")
    )
      return true;
    else {
      if (
        isSet(ReqObj.Form[tmpId].HideNameonFirstStep) &&
        parseInt(ReqObj.Form[tmpId].HideNameonFirstStep, 10) === 1
      )
        return false;
      return true;
    }
  } else {
    return false;
  }
}

function HideSuggester() {
  $("ul.ui-autocomplete").each(function () {
    $(this).hide();
  });
  var ul = $("ul.ui-autocomplete");
  // ul.css("display", "none");
  ul.parent().css("display", "none");
  // $(".be-sugg").css("display")
}

// function SuggestorHit() {
//   var submit_url = "https://dev-suggest.imimg.com/suggest/suggest.php?q=jammu&tag=suggestions&limit=40&type=city&fields=state%2Cid%2Cstateid%2Cflname%2Calias&display_fields=value%2C%3Dstate&display_separator=%2C+&match=fuzzy&catid=101&showloc=1&p=42";
//   $.ajax({
//     cache: false,
//     url: submit_url,
//     type: 'GET',
//     //timeout: 3000,
//     dataType: 'json',
//     success: function (data) {
//       console.log(data);
//     },
//     error: function (o, st, e) {

//     },
//     complete: function (res) {

//     }
//   });
// }
// SuggestorHit();
//

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

function removeBLLoader(tmpId, type) {
  var NewTempId = isSet(tmpId) ? tmpId : "";
  if (NewTempId !== "" && IsChatbl(NewTempId)) {
    if (isSet(type) && type.toLowerCase() === "left")
      var ClassName = IsChatbl(tmpId) ? "cbl_ques" : "";
    else var ClassName = "txt-cnt";
    var element = $("#t" + NewTempId + "_typing");
    if (element.hasClass(ClassName)) element.remove();
  } else {
    // if (isSet(ReqObj.Form[tmpId].FormSequence) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0) {
    //   var templateId = tmpId.substring(0, 2);
    //   NewTempId = tmpId.replace(templateId, "09");
    // }

    var el = $("#t" + NewTempId + "_belodr");
    if (!el.hasClass("bedsnone")) {
      el.addClass("bedsnone");
    }
  }
}

//test work done
function addBlLoader(tmpId, type) {
  var NewTempId = tmpId;
  if (NewTempId !== "" && IsChatbl(NewTempId)) {
    if (!($("#t" + tmpId + "_typing").length > 0)) {
      if (IsChatbl(tmpId)) {
        // $("#t" + NewTempId + "_bl_form").append(appendChatLoader(tmpId, type, "blchat-lodr2"));
        $("#t" + NewTempId + "_new_chatbl").append(
          appendChatLoader(tmpId, type, "txt_area  cbl_bg1")
        );
      }
    }
    //$("#t" + NewTempId + "_bl_form").append(appendChatLoader(tmpId, type));
  } else {
    // if (isSet(ReqObj.Form[tmpId].FormSequence) && ReqObj.Form[tmpId].FormSequence.StepCounter > 0) {
    //   var templateId = tmpId.substring(0, 2);
    //   var NewTempId = tmpId.replace(templateId, "09");
    // }
    var el = $("#t" + NewTempId + "_belodr");
    if (el.hasClass("bedsnone")) {
      el.removeClass("bedsnone");
    }
  }
}

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
function callFlagSuggestor(tmpId, fromwhere) {
  if (
    $("#t" + tmpId + "flagdiv2").length == 0 ||
    $("#t" + tmpId + "country_dropd").html() === "" ||
    (isSet(ReqObj.setflag) && ReqObj.setflag)
  ) {
    if ($("#t" + tmpId + "flagdiv2").length == 0) {
      var ele = "<div id='t" + tmpId + "flagdiv2' class='bedsnone'></div>";
      $("#t" + tmpId + "flagdiv").after(ele);
      ReqObj.Form[tmpId]["flagcalling"] = 0;
    }
    ReqObj["showcountry"] = true;
    flagsugg.setFlagSuggestor(tmpId, fromwhere);
  }
}

function ipFlagSuggestor() {
  var len = template_array.length;
  for (var i = 0; i < len; i++) {
    callFlagSuggestor(template_array[i], "load");
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

function WrapperObj(outerHtml, closingHtml, suffix) {
  var wrapObj = {
    SuffixOuterHtml: outerHtml,
    SuffixClosingHtml: closingHtml,
    suffix: suffix,
  };
  return wrapObj;
}
function MakeWrapper(arrayofQues, tmpId, SuffixHtmlObj, type) {
  if (isSet(ReqObj.Form[tmpId].formType) && IsChatbl(tmpId)) {
    var Questext = IsChatbl(tmpId)
      ? "<div class = 'txt_area cbl_bg1'>"
      : "<div class='Question'>";
    var userInput = IsChatbl(tmpId)
      ? ""
      : "<div class='t" + tmpId + "_userInput' class='bewbg'>";
    for (var i = 0; i < arrayofQues.length; i++) {
      for (var j = 0; j < arrayofQues[i].length; j++) {
        Questext += arrayofQues[i][j].Label;
        // userInput += "<span class='bepr'>" + arrayofQues[i][j].UserInput + "</span>";
        userInput += arrayofQues[i][j].UserInput;
      }
    }
    Questext += "</div>";
    userInput += "</div>";
    var textToWrap = !IsChatbl(tmpId)
      ? Questext + userInput
      : type === "ques"
        ? Questext
        : userInput;

    var classtotest = chatBlClass(tmpId, "left");
    var leftright = IsChatbl(tmpId) ? SuffixHtmlObj.SuffixOuterHtml : "";
    return ConversationLeftWrapper(tmpId, textToWrap, {
      classtotest: classtotest,
      leftright: leftright,
    });
  } else {
    var normalHtml = SuffixHtmlObj.SuffixOuterHtml;
    var beRowHtml = "";
    var closingRowDiv = "";
    var ClearBothDiv = "";

    if (isSet(SuffixHtmlObj)) {
      if (isSet(SuffixHtmlObj.suffix) && SuffixHtmlObj.suffix !== "") {
        if (SuffixHtmlObj.suffix === "_isqBox" || SuffixHtmlObj.suffix === "_contactinfo" || SuffixHtmlObj.suffix === "_Prodname") {
          var clsName = currentISO() !== "IN" && SuffixHtmlObj.isPhone === true ? "eqflot eqIsf eqIsMn mt19"
            : "eqflot bepr";

          var wrapClass = isSSB(tmpId) ? ssbClass("wrprClass", tmpId) : isBlInline(tmpId) ? isBlInlineFr(tmpId) ? " fmb15" : " idsf pfstrt mb20" : isInactiveBL(tmpId) ? SuffixHtmlObj.suffix === "_contactinfo" ? "" : " be-row2" : " be-row";

          beRowHtml += SuffixHtmlObj.suffix === "_contactinfo" && isOtherEnq(tmpId) ? "<div class='" + clsName + "'>" : "<div class='" + wrapClass + "'>"; closingRowDiv += "</div>";
        }

        if (SuffixHtmlObj.suffix === "_contactinfo") {
          if (isBlFirstfold(tmpId))
            ClearBothDiv += "<div class='beclr'></div>";
          else {
            if (currentISO() === "IN")
              ClearBothDiv += "<div class='beclr'></div>";
          }
        }

      }
    }

    if (isInactiveBL(tmpId) && SuffixHtmlObj.suffix === "_contactinfo" && arrayofQues.length == 3) {
      normalHtml += '<div class="NameEmail">';
    }

    for (var i = 0; i < arrayofQues.length; i++) {
      for (var j = 0; j < arrayofQues[i].length; j++) {

        if (isSet(arrayofQues[i][j].WrapClass) && arrayofQues[i][j].WrapClass != "" && SuffixHtmlObj.suffix === "_isqBox")
          beRowHtml = "<div class='" + wrapClass + " " + arrayofQues[i][j].WrapClass + "'>";

        if (!isSSB(tmpId) || (isSSB(tmpId) && SuffixHtmlObj.suffix !== "_isqBox")) {
          if (isInactiveBL(tmpId) && SuffixHtmlObj.suffix === "_contactinfo" && arrayofQues.length == 3 && i == 2) {
            normalHtml += "</div>";
          }
          normalHtml += beRowHtml;
        }

        if (isSet(arrayofQues[i][j].WrapClass) && arrayofQues[i][j].WrapClass != "" && SuffixHtmlObj.suffix === "_isqBox")
          beRowHtml = "<div class='" + wrapClass + "'>";

        if (isSSB(tmpId) && SuffixHtmlObj.suffix === "_isqBox") {
          beRowHtml = (isSet(arrayofQues[i].clsNm) && arrayofQues[i].clsNm === false) || (isSet(arrayofQues[i][j].clsNm) && arrayofQues[i][j].clsNm === false)
            ? "<div class=''>"
            : "<div class='" + ssbClass("wrprClass", tmpId) + "'>";
          normalHtml += beRowHtml;
        }

        if (isSet(arrayofQues[i][j].isenquire) && arrayofQues[i][j].isenquire === true) {
          normalHtml = SuffixHtmlObj.SuffixOuterHtml + "<div class='eqmb5 eqmt20'>";
        }

        normalHtml +=
          arrayofQues[i][j].OuterWrapper +
          arrayofQues[i][j].Label +
          arrayofQues[i][j].UserInput +
          arrayofQues[i][j].ClosingWrapper;
      }
      normalHtml += closingRowDiv;
    }

    normalHtml += SuffixHtmlObj.SuffixClosingHtml;
    normalHtml += ClearBothDiv;
    return normalHtml;
  }
}
function checkdefaultIsq(tmpId, QuestionText, type, option) {
  if (
    isSet(ReqObj.Form[tmpId].defaultIsq) &&
    ReqObj.Form[tmpId].defaultIsq === "1" &&
    isSet(type) &&
    type.toLowerCase() === "radio"
  ) {
    QuestionText = QuestionText.toLowerCase();
    for (var isq in DefaultIsqAns)
      return (
        isSet(QuestionText.match(isq.toLowerCase())) &&
        option.toLowerCase() === DefaultIsqAns[isq].toLowerCase()
      );
  }
  return false;
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

function ConversationCenterWrapper(tmpId, message) {
  /* add attributes at end  */
  if (isSet(message) && message !== "")
    if (!IsChatbl(tmpId))
      return '<div class="chat-mblV chat-blH">' + message + "</div>";
    else return '<div class ="cbl_verfy">' + message + "</div>";
}

function getTimeStamp() {
  var date = new Date();
  var time = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
  return time % 10 === 0 ? true : false;
}

function returnIsoHtml(tmpId, isoclass, isovalue) {
  /* add attributes at end */
  if (!isSet(isovalue)) isovalue = "";
  return (
    '<input type="text" value="' +
    isovalue +
    '" readonly="" name="iso" id="t' +
    tmpId +
    '_iso" class="' +
    isoclass +
    '" tabindex="-1" disabled="disabled">'
  );
}

function returnInput(
  tmpId,
  element,
  type,
  name,
  placeholder,
  inputclass,
  value,
  inlinestyle,
  maxlength,
  attribute
) {
  /* add attributes at end  */
  return (
    '<input id="' +
    tmpId +
    element +
    '" type="' +
    type +
    '" name="' +
    name +
    '" value="' +
    value +
    '" class="' +
    inputclass +
    '" placeholder="' +
    placeholder +
    '" maxlength="' +
    maxlength +
    '" style="' +
    inlinestyle +
    '"' +
    attribute +
    '="">'
  );
}

function returnButton(tmpId, element, buttontext, buttonclass, bstyle) {
  /* add attributes at end  */
  return (
    '<button id="' +
    tmpId +
    element +
    '" class="' +
    buttonclass +
    '" style="' +
    bstyle +
    '">' +
    buttontext +
    "</button>"
  );
}

function returnContainer(
  tmpId,
  element,
  containerclass,
  datarole,
  divtext,
  style
) {
  /* add attributes at end  */
  if (!isSet(divtext)) divtext = "";
  return (
    '<div id="' +
    tmpId +
    element +
    '" class="' +
    containerclass +
    '" data-role="' +
    datarole +
    '" style="' +
    style +
    '">' +
    divtext
  );
}

function returnTextarea(tmpId, element, containerclass, placeholder) {
  /* add attributes at end  */
  return (
    '<textarea id="' +
    tmpId +
    element +
    '" class="' +
    containerclass +
    '" placeholder="' +
    placeholder +
    '" />'
  );
}

function returnSpan(tmpId, element, text, spanclass, style) {
  /* add attributes at end  */
  return ('<span id="' +tmpId +element +'" class="' +spanclass +'" style="' +style +'" >' +text +"</span>");
}

function returnLabel(tmpId, text, element, labelclass) {
  /* add attributes at end  */
  return (
    '<label id="' +
    tmpId +
    element +
    '" class="' +
    labelclass +
    '">' +
    text +
    "</label>"
  );
}

function returnDl(tmpId, element, dlclass, disabled) {
  /* add attributes at end  */
  return (
    '<dl id="' +
    tmpId +
    element +
    '" class="' +
    dlclass +
    '" disabled="' +
    disabled +
    '"></dl>'
  );
}

function returnA(tmpId, element, href, target, aclass) {
  /* add attributes at end  */
  return (
    '<a href="' + href + '" target="' + target + '" class="' + aclass + '">'
  );
}

function returnImg(tmpId, element, src, imgclass) {
  /* add attributes at end  */
  return (
    '<img id="' +
    tmpId +
    element +
    '"src="' +
    src +
    '" class="' +
    imgclass +
    '">'
  );
}

function returnOption(tmpId, element, value, optionid, optiontext) {
  return (
    '<option value="' +
    value +
    '" optionid="' +
    optionid +
    '">' +
    optiontext +
    "</option>"
  );
}

function returnCustomElement(
  tmpId,
  element,
  customele,
  value,
  optionid,
  selected,
  optiontext
) {
  return (
    "<" +
    customele +
    ' value="' +
    value +
    '" optionid="' +
    optionid +
    '"' +
    selected +
    " >" +
    optiontext +
    "</" +
    customele +
    ">"
  );
}

function returnAnswer(tmpId, key) {
  return ReqObj.Form[tmpId].UserInputs[key];
}

function flagwrapper(message) {
  return '<div class="cbl_flag">' + message + "</div>";
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

function addLine() {
  return '<div class="cbl_line"></div>';
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

function returnIsqHtmlObj(RecurOfQues, tmpId) {
  var imeshcookie = imeshExist();

  if (isSSB(tmpId)) return returnSSBIsqHtml(RecurOfQues, tmpId);
  // var qtcls = (isBlInline(tmpId)) ? "qut_cus iqutm" : "qut_cus";
  var qtcls = isBlInline(tmpId)
    ? "qut_cus iqutm"
    : isBlFirstfold(tmpId)
      ? imeshcookie == "" && currentISO() == "IN"
        ? "qut_cus qut_ffun qtmt"
        : "qut_cus qut_ffid qtmt"
      : "qut_cus";
  var blfrcls = isBlInlineFr(tmpId) ? " flx1" : "";
  var outrdiv = isBlInline(tmpId)
    ? RecurOfQues[0].label_div +
    "<div class='inW240" +
    blfrcls +
    "'>" +
    RecurOfQues[0].error_div +
    "<div id='t" +
    tmpId +
    "qut_id' class='" +
    qtcls +
    "'>"
    : RecurOfQues[0].error_div +
    RecurOfQues[0].label_div +
    "<div id='t" +
    tmpId +
    "qut_id' class='" +
    qtcls +
    "'>";
  return [
    {
      ClosingWrapper: isBlInline(tmpId) ? "</div></div>" : "</div>",
      Label: IsChatbl(tmpId) ? "<div>" + ChatBlMsgs("Quantity") + "</div>" : "",
      OuterWrapper: outrdiv,
      UserInput: RecurOfQues[0].UserInput + RecurOfQues[1].UserInput,
      beforeInput: "",
      beforeLabel: "",
      qtuttype: 6,
    },
  ];
}

//Scroll Bottom
function scrollSmoothToBottom(id) {
  var scrollDiv = document.getElementById(id);
  if (isSet(scrollDiv)) {
    $("#" + id).animate(
      {
        scrollTop: scrollDiv.scrollHeight - scrollDiv.clientHeight,
      },
      500
    );
  }
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

function SetAutoCompleteClass(tmpId, suffix) {
  var autocompleteClass = "be-sugg t" + tmpId + suffix;
  if (IsChatbl(tmpId)) {
    autocompleteClass += " bl-chat";
  } else if (isSSB(tmpId)) autocompleteClass += " mb-prod-sugg" + " suggz";

  return autocompleteClass;
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

function showQuantityUnit(tmpId, arr, type) {
  var isq = arr;
  var isq_length = isSet(isq) ? isq.length : 0;
  for (var i = 0; i < isq_length; i++) {
    if (isq[i].length === 2) {
      var isqtype = [
        isq[i][0].IM_SPEC_MASTER_DESC.toLowerCase(),
        isq[i][1].IM_SPEC_MASTER_DESC.toLowerCase(),
      ];
      if (
        $.inArray("quantity", isqtype) ||
        $.inArray("quantity unit", isqtype)
      ) {
        ReqObj.Form[tmpId].quantityunit = isq[i];
        if (type === 1) {
          return ReqObj.Form[tmpId].quantityunit[0]
            .IM_CAT_SPEC_CATEGORY_TYPE === "2"
            ? false
            : true;
        }
        return true;
      }
      return false;
    }
  }
  return false;
}

function ShowStaticQuestionForeign(tmpId) {
  // if (isSet(tmpId) && tmpId.substring(0, 2) === "09") {
  //   if (parseInt(ReqObj.Form[tmpId].disableIsq) !== 1 && currentISO() !== "IN") return true;
  //   return false;
  // }
  return false;
}

function GetObjectKeys(obj) {
  if (!Object.keys) {
    var keys = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  } else {
    return Object.keys(obj);
  }
}

function updateChatWidgetGlobalVar(tmpId) {
  if (IsChatBLInline(tmpId) && tmpId.substring(0, 2) === "08") {
    isChatWidgetOpen = $("#t" + tmpId + "_chatBL").hasClass("cbl_vh")
      ? false
      : true;
  }
}

function BlAutoSuggRowNum(tmpId) {
  if (isSet(tmpId)) {
    var row_num = 5;
    if (tmpId === "202") row_num = 3;
    if (IsChatbl(tmpId)) row_num = 4;
    return row_num;
  }
  return 5;
}

function ReturnBlUserName(tmpId) {
  var BLname = "";
  var firstName = "";
  if (isSet(ReqObj.UserDetail["fn"]) && ReqObj.UserDetail["fn"] !== "")
    firstName = ReqObj.UserDetail["fn"];
  else firstName = usercookie.getParameterValue(imeshExist(), "fn");
  if (IsChatbl(tmpId) && isSet(firstName) && firstName !== "") {
    var classtotest = !IsChatbl(tmpId)
      ? chatBlClass(tmpId, "left")
      : "txt_area cbl_bg1";
    var leftright = IsChatbl(tmpId) ? "cbl_ques cbl_vh" : "";
    BLname = ConversationLeftWrapper(
      tmpId,
      "Welcome " + firstName,
      {
        classtotest: classtotest,
        leftright: leftright,
      },
      "name"
    );
  }
  return BLname;
}

function IsChatbl(tmpId) {
  return isSet(tmpId) && tmpId.substr(0, 2) === "08" ? true : false;
}

function IsChatBLInline(tmpId) {
  return ReqObj.Form[tmpId].formType.toLowerCase() === "chatbl-inline"
    ? true
    : false;
}

function IsChatBLOverlay(tmpId) {
  return ReqObj.Form[tmpId].formType.toLowerCase() === "chatbl" ? true : false;
}

function isSSB(tmpId) {
  return tmpId.substr(0, 2) === "06" ? true : false;
}

function isnewSSB(tmpId) {
  return tmpId.substr(0, 2) === "06" &&
    isSet(ReqObj.Form[tmpId].isnewssb) &&
    ReqObj.Form[tmpId].isnewssb === "1"
    ? true
    : false;
}

function isBlInline(tmpId) {
  return isGlIdEven(tmpId) &&
    ReqObj.Form[tmpId].typeofform === "bl" &&
    tmpId.substr(0, 2) === "01" &&
    ReqObj.Form[tmpId].screenNumber < 0
    ? true
    : false;
}

function isBlFirstfold(tmpId) {
  return ReqObj.Form[tmpId].typeofform === "bl" &&
    tmpId.substr(0, 2) === "04" &&
    ReqObj.Form[tmpId].screenNumber < 0
    ? true
    : false;
}

function isScriptTag(name) {
  name = name.toLowerCase();
  if (
    name.includes("<script>") ||
    name.includes("</script>") ||
    name.includes("script&gt") ||
    name.includes("%3cscript") ||
    name.includes("script%253e") ||
    (name.includes("<") && name.includes(">"))
  )
    return true;
  else false;
}

function isBlInlineFlag(tmpId) {
  return isGlIdEven(tmpId) &&
    ReqObj.Form[tmpId].typeofform === "bl" &&
    tmpId.substr(0, 2) === "01"
    ? true
    : false;
}

function isGlIdEven(tmpId) {
  if (isSet(ReqObj.Form[tmpId].isNewUI) && ReqObj.Form[tmpId].isNewUI === "0") {
    return true;
  }
  return false;
}
function isBlInlineFr(tmpId) {
  if (
    ReqObj.Form[tmpId].screenNumber <= 0 &&
    ReqObj.Form[tmpId].FormSequence._stepCounter <= 0 &&
    isGlIdEven(tmpId) &&
    isSet(ReqObj.Form[tmpId].isFrInline) &&
    ReqObj.Form[tmpId].isFrInline === "1"
  ) {
    return true;
  }
  return false;
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

function IsProduction() {
  var isProd = webAddressLocation.match(/^dev/)
    ? false
    : webAddressLocation.match(/^stg/)
      ? false
      : true;
  return isProd;
}

function CopyObject(Obj) {
  var CopyObj = Obj || {};
  var returnObj = {};
  for (var prop in CopyObj) {
    if (CopyObj.hasOwnProperty(prop)) {
      returnObj[prop] = CopyObj[prop];
    }
  }
  return returnObj;
}

function ResetUserDetails(key) {
  ReqObj.UserDetail[key] = "";
}

/**
for future if we need to replace all duplicate tracking fired
then replace numberToFind with number
*/
function binaryArraySearch(array, number) {
  if (isSet(array)) {
    var numberToFind = number;
    var start = 0,
      end = array.length - 1;
    while (start <= end) {
      var mid = Math.floor((start + end) / 2);
      if (array[mid] === numberToFind) return mid;
      else if (array[mid] > numberToFind) {
        end = mid - 1;
      } else if (array[mid] < numberToFind) {
        start = mid + 1;
      }
    }
    return -1;
  }
  return -1;
}

function StaticQuesForeignUser(tmpId) {
  // if (currentISO() !== "IN" && (tmpId.substring(0, 2) === "09" || IsChatbl(tmpId))) return true;
  // else false;

  return false;
}

function updateEnrichShownKey(tmpId, isStatic, isAttachment) {
  ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown = isStatic;
  ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = isAttachment;

  //is showAttachment is 1 we need to show the attachment
  if (ReqObj.Form[tmpId].showAttachment === "1") {
    ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = false;
  } else if (ReqObj.Form[tmpId].showAttachment === "0") {
    ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = true;
  } else if (
    ReqObj.Form[tmpId].showAttachment === "-1" &&
    ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
  ) {
    if (StaticQuesForeignUser(tmpId)) {
      ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = true;
    } else ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = false;
  } else if (
    ReqObj.Form[tmpId].showAttachment === "-1" &&
    ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
  ) {
    ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = true;
  }
}

function returnIsEnrichShownKeyVal(tmpId) {
  if (
    (currentISO() === "IN" &&
      (ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown === false ||
        ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown === false)) ||
    (currentISO() !== "IN" &&
      ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown === false)
  ) {
    return true;
  }
  return false;
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

// function chatBlPopupInline(tmpId) {
//   if ((chatblverlay(tmpid) || IsChatBLInline(tmpId)) && tmpId.substring(0, 2) === "08") { // later change to 08 ---POPUPCHATBL
//     return "popup";
//   }else
//     return "nochat";
// }

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

function ChatblfooterAns(tmpId) {
  $("#t" + tmpId + "_blchatfooter").hasClass("focus")
    ? ""
    : setTimeout(function () {
      $("#t" + tmpId + "_blchatfooter").addClass("focus");
    }, 1000);
  $("#t" + tmpId + "_typhere").hasClass("dn")
    ? ""
    : setTimeout(function () {
      $("#t" + tmpId + "_typhere").addClass("dn");
      $("#t" + tmpId + "_newblchatReply").removeClass("cbl_vh");
    }, 1099);
}

function chatblHideTransition(tmpId) {
  $("#t" + tmpId + "_typhere").removeClass("dn");
  $("#t" + tmpId + "_newblchatReply").addClass("cbl_vh");
}

function isSecondEnq() {
  var imEqgl = usercookie.getCookie("imEqGl");
  if (isSet(imEqgl) && trimVal(imEqgl) !== "" && imEqgl !== "undef") {
    var arr = imEqgl.split(",");
    for (var s = 0; s < arr.length; s++) {
      if (isSet(arr[s]) && trimVal(arr[s]) !== "") {
        if (arr[s].substring(0, 6) === "dispid") return true;
      }
    }
    return false;
  } else return false;
}

function isSecondBl() {
  var imEqgl = usercookie.getCookie("imEqGl");
  if (isSet(imEqgl) && trimVal(imEqgl) !== "" && imEqgl !== "undef") {
    var arr = imEqgl.split(",");
    for (var s = 0; s < arr.length; s++) {
      if (isSet(arr[s]) && trimVal(arr[s]) !== "") {
        if (arr[s].substring(0, 2) === "BL") return true;
      }
    }
    return false;
  } else return false;
}

function isSecondBlEnq(tmpId) {
  if (isSet(tmpId)) {
    if (isSet(ReqObj.Form[tmpId].formType)) {
      if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" && isSecondBl())
        return true;
      else if (
        ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
        isSecondEnq()
      )
        return true;
      return false;
    } else {
      return false;
    }
  } else return false;
}

function foreignUserIsq() {
  var ShowForeignUserIsq = true;
  return ShowForeignUserIsq;
}

/*
 *
 * To maintain mcatId and related image
 *
 */

function pushImage(mcatID, dispImgUrl, zoomImgUrl) {
  ReqObj.ImageKey[mcatID] =
    isSet(dispImgUrl) && dispImgUrl !== ""
      ? dispImgUrl
      : isSet(zoomImgUrl) && zoomImgUrl !== ""
        ? zoomImgUrl
        : "";
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

function isOtherEnq(tmpId) {
  return ReqObj.Form[tmpId].formType.toLowerCase() === "enq" ? true : false;
}

function isImageEnqDIR(tmpId) {
  return ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
    isSet(ReqObj.Form[tmpId].typeofform) &&
    (ReqObj.Form[tmpId].typeofform.toLowerCase() === "image" ||
      ReqObj.Form[tmpId].typeofform.toLowerCase() === "video")
    ? true
    : false;
}

function isImageVidEnq(tmpId) {
  return ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
    isSet(ReqObj.Form[tmpId].typeofform) &&
    (ReqObj.Form[tmpId].typeofform.toLowerCase() === "image" ||
      ReqObj.Form[tmpId].typeofform.toLowerCase() === "video")
    ? true
    : false;
}

function getCurrentCounter(currentpage) {
  return currentpage.length;
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

function isAllNumbers(str) {
  var exp = /^[0-9]*$/;
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

function setIplocCookie(tmpId) {
  if (!(Enq04(tmpId) || Bl04(tmpId) || Bl01(tmpId) || isSSB(tmpId))) {
    var imcoockie = usercookie.getCookie("ImeshVisitor");
    var ipcookie = usercookie.getCookie("iploc");
    if (imcoockie == "" && ipcookie == "") new IpLoc(tmpId);
  }
}

function flagsugcall(tmpId, ctname, ciso) {
  if (ctname != "India" && ctname !== ReqObj.Form[tmpId].ctn) {
    $("#t" + tmpId + "country_dropd").html("");
    ReqObj.changeUserIso = ciso;
    ReqObj.setflag = 1;
    flagsugg.setFlagSuggestor(tmpId, "load");
  }
}

function IpLoc(tmpId) {
  var tempipLoc = usercookie.getCookie("iploc");
  if (
    (tempipLoc === "" ||
      (tempipLoc !== "" &&
        usercookie.getParameterValue(tempipLoc, "gip") === "")) &&
    !navigator.userAgent.match(/googlebot|mediapartners/)
  ) {
    this.getIp(tmpId);
  } else {
    this.captureDetailsOfIploc();
  }
}

IpLoc.prototype.getIp = function (tmpId) {
  var that = this;
  //var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var appSName = location.hostname.match(/^dev/)
    ? "//geoip.imimg.com/"
    : location.hostname.match(/^stg/)
      ? "//geoip.imimg.com/"
      : "//geoip.imimg.com/";
  if (typeof glmodid !== "undefined" && glmodid !== null && glmodid !== "") {
    $.ajax({
      cache: false,
      url: appSName + "api/location.php",
      //url: 'https://geoip.imimg.com/api/location.php',
      timeout: 3000,
      data: {
        modid: glmodid,
        token: "imobile@15061981",
      },
      type: "POST",
      dataType: "json",
      success: function (s) {
        ReqObj.ipLoc.response = true;
        if (isSet(s) && isSet(s.Response)) {
          if (
            isSet(s.Response.Code) &&
            parseInt(s.Response.Code) === 200 &&
            isSet(s.Response.Status) &&
            s.Response.Status === "Success"
          ) {
            //s={"Response":{"Data":{"geoip_countryiso":"JP","geoip_countryname":"Japan","geoip_stateiso":"13","geoip_statename":"Tokyo","geoip_accuracy":1000,"geoip_ipaddress":"84.17.34.18"},"Code":200,"Status":"Success","Message":"Successfully returning data"}};
            var resp = s.Response.Data;
            if (isSet(resp)) {
              ReqObj.IPDetails = [];
              resp.geoip_cityname = isSet(resp.geoip_cityname)
                ? resp.geoip_cityname
                : "";
              resp.geoip_cityid = isSet(resp.geoip_cityid)
                ? resp.geoip_cityid
                : "";
              resp.geoip_countryiso = isSet(resp.geoip_countryiso)
                ? resp.geoip_countryiso
                : "";
              resp.geoip_countryname = isSet(resp.geoip_countryname)
                ? resp.geoip_countryname
                : "";
              resp.geoip_accuracy = isSet(resp.geoip_accuracy)
                ? resp.geoip_accuracy
                : "";
              resp.geoip_ipaddress = isSet(resp.geoip_ipaddress)
                ? resp.geoip_ipaddress
                : "";
              resp.geoip_statename = isSet(resp.geoip_statename)
                ? resp.geoip_statename
                : "";
              that.setIpLoc(resp, glmodid, tmpId);
              setIPDetails(resp);
              if (isSet(tmpId))
                setTimeout(function () {
                  flagsugcall(
                    tmpId,
                    resp.geoip_countryname,
                    resp.geoip_countryiso
                  );
                }, 1000);
            }
          } else {
            blenqGATracking("iploc", "service:location:failure", s.Response, 1, 0);
            ReqObj.ipLoc.isFailed = true;
            that.failSafe();
          } /* last parameter = 0 denotes ip req */
        } else {
          blenqGATracking("iploc", "service:location:failure", "response undefined", 1, 0);
          ReqObj.ipLoc.isFailed = true;
          that.failSafe();
        }
      },
      error: function (res) {
        ReqObj.ipLoc.response = true;
        ReqObj.ipLoc.isFailed = true;
        that.failSafe();
        res = isSet(res) ? res : "response undefined";
        blenqGATracking("iploc", "service:location:failure", JSON.stringify(res), 1, 0);
      },
    });
  }
};
/*
this method makes iploc cookie using setCookie() method of UserCookie class
*/
IpLoc.prototype.setIpLoc = function (resp, glmodid, tmpId) {
  var tempipLoc =
    "gcniso=" +
    resp.geoip_countryiso +
    "|gcnnm=" +
    resp.geoip_countryname +
    "|gctnm=" +
    resp.geoip_cityname +
    "|gctid=" +
    resp.geoip_cityid +
    "|gacrcy=" +
    resp.geoip_accuracy +
    "|gip=" +
    resp.geoip_ipaddress +
    "|gstnm=" +
    resp.geoip_statename;
  usercookie.setCookie("iploc", tempipLoc, 0.125, glmodid); /* glmodid */
  this.captureDetailsOfIploc(tmpId);
};
IpLoc.prototype.captureDetailsOfIploc = function (tmpId) {
  var iploccookie = usercookie.getCookie("iploc");
  ReqObj.UserDetail["ipctid"] = usercookie.getParameterValue(
    iploccookie,
    "gctid"
  );
  ReqObj.UserDetail["ipcityname"] = usercookie.getParameterValue(
    iploccookie,
    "lg_ct"
  );
  if (!isSet(ReqObj.IPDetails)) {
    ReqObj.IPDetails = [];
    ReqObj.IPDetails["countryiso"] = usercookie.getParameterValue(
      iploccookie,
      "gcniso"
    );
    ReqObj.IPDetails["countryname"] = usercookie.getParameterValue(
      iploccookie,
      "gcnnm"
    );
    ReqObj.IPDetails["ipaddress"] = usercookie.getParameterValue(
      iploccookie,
      "gip"
    );
  }
  if (
    usercookie.getParameterValue(iploccookie, "gcniso") !== "IN" ||
    (usercookie.getParameterValue(iploccookie, "gcniso") === "IN" &&
      ReqObj.ipLoc.zoneISO === "OTHER")
  ) {
    if (!isSet(tmpId)) {
      ipFlagSuggestor();
    }
  }
  ReqObj.UserDetail["suggesCity"] = {
    geoloc: [
      usercookie.getParameterValue(iploccookie, "lg_ct"),
      usercookie.getParameterValue(iploccookie, "lg_ctid"),
    ],
    hdcity: [
      usercookie.getParameterValue(usercookie.getCookie("xnHist"), "city"),
      "",
    ],
    iploc: [
      usercookie.getParameterValue(iploccookie, "gctnm"),
      usercookie.getParameterValue(iploccookie, "gctid"),
    ],
  };
};
IpLoc.prototype.failSafe = function () {
  if (ReqObj.ipLoc.zoneISO !== "IN") {
    ReqObj.ipLoc.callIpFlagSugg = true;
    ipFlagSuggestor();
  }
};
new IpLoc();
ReqObj.ipLoc.pinged = true;

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
/*--------------------------------------- Pass mcat id to get image if available---------------------------------------------- */
function getImage(key) {
  return ReqObj.ImageKey[key];
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

function toCallMiniDetails(tmpId) {
  // cname
  //if(currentISO() === "IN") { // check
  if (
    (!isSet(ReqObj.CNSerCalled) || !ReqObj.CNSerCalled) &&
    (imeshExist() !== "" || (isSet(ReqObj.glid) && ReqObj.glid != ""))
  ) {
    ReqObj.CNSerCalled = true;
    miniDetailService(tmpId);
  } else ReqObj.Form[tmpId].cName.toask = false;
  //}
}
function updateToAsk(tmpId) {
  ReqObj.Form[tmpId].cName.toask =
    imeshExist() !== "" &&
      (typeof ReqObj.UserDetail.cName === "undefined" ||
        (isSet(ReqObj.UserDetail.cName) && ReqObj.UserDetail.cName === ""))
      ? true
      : false;
}

function toAskCname(tmpId) {
  return typeof ReqObj.UserDetail.cName === "undefined" ||
    (isSet(ReqObj.UserDetail.cName) && ReqObj.UserDetail.cName === "")
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
function RadioClick(tmpId) {
  $(".radioClick")
    .off("click")
    .on("click", function (event) {
      var tempId = event.target.id;
      tempId = tempId.substr(1, 4);
      var imeshcookie = imeshExist();
      if (IsChatbl(tmpId))
        $("#t" + tmpId + "_submitNo2") //chat bl bug
          .parent()
          .addClass("dn");
      var curEl = this;
      var name = $(this).attr("name");
      var isSelected = $(curEl).hasClass("waschecked");

      $("input[name='" + name + "']").each(function () {
        $(this).prop("checked", false).removeClass("waschecked");
        $(this).parent().removeClass("sl-box chksl");
        $(this).siblings("label").children(".bechk-in").children().hide();
      });
      var crb = false;
      if (!isSelected) {
        if (
          $("#t" + tmpId + "ques" + name.charAt(name.length - 1))
            .text()
            .toLowerCase() === "why do you need this"
        )
          crb = true;
        if (
          $("#" + curEl.id)
            .val()
            .toLowerCase() === "for reselling" ||
          $("#" + curEl.id)
            .val()
            .toLowerCase() === "for business use"
        ) {
          ReqObj.Form[tempId].cName.rb = true;
        } else {
          ReqObj.Form[tempId].cName.rb = false;
        }
        $(curEl).prop("checked", true).addClass("waschecked");
        $(curEl).parent().siblings(".oth_bx").children("input").val("");
        IsChatbl(tempId) || isSSB(tempId)
          ? ""
          : $(curEl).parent().addClass("sl-box chksl");
        $(curEl).siblings("label").children(".bechk-in").children().show();
        if (crb === true && !isEnq(tmpId)) onCName(tmpId, true);
      } else if (!IsChatbl(tmpId) && crb === true && !isEnq(tmpId)) {
        ReqObj.Form[tempId].cName.rb = false;
        onCName(tmpId, true);
      }
    });
}

function CheckBoxClick(tmpId) {
  setTimeout(function () {
    $(".cbl_chekbx").focus();
  }, 1800);
  $(".cbl_chekbx_btn ")
    .off("click")
    .on("click", function () {
      if (IsChatbl(tmpId)) {
        $("#t" + tmpId + "_submitNo1") //chat bl bug
          .parent()
          .addClass("dn");
      }
    });
  $(".CheckboxClick")
    .off("click")
    .on("click", function () {
      if (IsChatbl(tmpId)) {
        $("#t" + tmpId + "_submitNo1") //chat bl bug
          .parent()
          .addClass("bedsnone");
      }
      var checkBox = $(this);
      if (checkBox.siblings("input").prop("checked")) {
        checkBox.children(".bechk-in").children().hide();
        checkBox.parent().removeClass("chksl");
      } else {
        checkBox.children(".bechk-in").children().show();
        IsChatbl(tmpId) || isSSB(tmpId)
          ? ""
          : checkBox.parent().addClass("chksl");
      }
    });
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

function chckval(cityid, val) {
  // if (val == '') {
  //   $('#' + cityid).val('');
  // }
}

function blkerr(templateId) {
  // if ($('#' + templateId + 'error_city_locpref').css('display') == 'block') {
  //   $('#' + templateId + 'error_city_locpref').css('display', 'none');
  //   $('#' + templateId + 'enrich_city1').removeClass("highlight-err");
  // }
}

function thankYouTrack(tmpId, msg, sellerId) {
  var formtype =
    isSet(ReqObj.Form[tmpId].formType) &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ? "Post Buy Leads" : "Send Enquiry";
  if (isSet(sellerId)) blenqGATracking(formtype, msg, sellerId, 1, tmpId);
  else blenqGATracking(formtype, msg, getEventLabel(), 1, tmpId);
  return true;
}

//This will be available as global variable
var webAddressLocation = location.hostname;
var appsServerName = webAddressLocation.match(/^dev/)
  ? "//dev-apps.imimg.com/"
  : webAddressLocation.match(/^stg/)
    ? "//stg-apps.imimg.com/"
    : "//apps.imimg.com/";

function ProductName(tmpId, from) {
  this.ProductNameHTML = "";
  this.onselect = 0;
  this.tmpId = "";
  ReqObj.Form[tmpId].productObject = this;
  if (
    !isSSB(tmpId) &&
    !(tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId)) &&
    from !== "enter"
  )
    $("#t" + tmpId + "_prodtitle").html("");
  this.className = "ProductName";
  this.isProdNameChanged = false;
  this.ProductNameHtmlObj = {
    Label: "",
    UserInput: "",
    OuterWrapper: "",
    ClosingWrapper: "",
  };
  this.ProductNameHtmlObjArray = [];
}

ProductName.prototype.addHtmlObjToArray = function (htmlObj) {
  this.ProductNameHtmlObjArray.push(htmlObj);
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

ProductName.prototype.hasHtml = function (ProductNameObj) {
  if (isSet(ProductNameObj)) {
    this.tmpId = ProductNameObj.tmpId;
    var tmpId = ProductNameObj.tmpId;
    // if (isSet(ReqObj.UserHtml[tmpId])) {
    // ReqObj.UserHtml[tmpId]["ProductSugg"] = true;
    this.addHtmlObjToArray(this.getProductHtml(tmpId));
    // var ProductNameSuffixObj = {
    //   "suffix": "_prodtitle",
    //   "class": ""
    // };
    if (!IsChatbl(tmpId)) {
      var clasnm = isSSB(tmpId) ? ssbClass("wrprClass", tmpId) : isBlInline(tmpId) ? isBlInlineFr(tmpId) ? "fmb15" : "idsf pfstrt mb20" : isInactiveBL(tmpId) ? "porlt bemb5":"porlt";
      var ProductNameSuffixOuterHtml = "<div  id='t" + tmpId + "_prodtitle' class='" + clasnm + "'>";
      var ProductNameSuffixClosingHtml = "</div>";
      var ProductNameSuffixHtmlObj = {
        SuffixOuterHtml: ProductNameSuffixOuterHtml,
        SuffixClosingHtml: ProductNameSuffixClosingHtml,
        suffix: "_prodtitle",
      };

      this.ProductNameHTML = MakeWrapper(
        [this.ProductNameHtmlObjArray],
        tmpId,
        ProductNameSuffixHtmlObj,
        ""
      );
    } else {
      this.ProductNameHTMLQues = MakeWrapper(
        [this.ProductNameHtmlObjArray],
        tmpId,
        WrapperObj(
          "<div  id='t" + tmpId + "_prodtitle' class = 'cbl_ques cbl_vh'>",
          "</div>",
          "_prodtitle"
        ),
        "ques"
      );

      this.ProductNameHTMLInput = MakeWrapper(
        [this.ProductNameHtmlObjArray],
        tmpId,
        WrapperObj(
          "<div class = 'cbl_dtls cbl_prdchng cbl_df t" +
          tmpId +
          "_userInput cbl_br10 dn'>",
          "</div>",
          "_prodtitle"
        ),
        "input"
      );

      this.ProductNameHTML =
        this.ProductNameHTMLQues + this.ProductNameHTMLInput;
    }
    // var ProdNameHtml = this.ProductNameHTML;
    // ReqObj.UserHtml[tmpId] = {
    //   "ProductSugg": true,
    //   "ProductName": ProdNameHtml
    // };
    // }
    // else {
    //   ReqObj.UserHtml[tmpId]["ProductSugg"] = false;

    //   this.ProductNameHTML = ReqObj.UserHtml[tmpId]["ProductName"];
    // }
    if (this.ProductNameHTML !== "") {
      ReqObj.Form[tmpId].currentclassCount++;
      this.ifHtmlPresent(ProductNameObj, tmpId);
    } else {
      this.ifHtmlNotPresent(ProductNameObj, tmpId);
    }
  }
};

ProductName.prototype.ifHtmlPresent = function (ProductNameObj, tmpId) {
  ProductNameObj.that.NumberofClassCalled -= 1;
  AttachObject(ProductNameObj.object, tmpId);
  if (isSet(ProductNameObj.AfterService)) {
    for (var i = 0; i < ProductNameObj.AfterService.length; i++) {
      ProductNameObj.that.MakeSeq(ProductNameObj.AfterService[i], tmpId);
    }
  }
  if (ProductNameObj.that.NumberofClassCalled === 0) {
    makeFinalSeq(ProductNameObj, tmpId);
  }
};

ProductName.prototype.ifHtmlNotPresent = function (ProductNameObj, tmpId) {
  if (ProductNameObj.hasFallback) {
    CreateSeq(ProductNameObj.FallbackObj);
  } else ProductNameObj.that.NumberofClassCalled -= 1;
};

ProductName.prototype.returnProductInput = function (tmpId, inputclass) {
  var placehold = "Enter Product / Service name";
  var html = '<input templateId="' + tmpId + '" class="' + inputclass + '" type="text" name="q_title" id="t' + tmpId + 'prodtitle" onblur="" maxlength="100" placeholder="' + placehold + '" autocomplete="off" spellcheck="true" role="textbox" aria-autocomplete="list" aria-haspopup="true">';
  if (isSSB(tmpId) && !isnewSSB(tmpId)) return '<div class="mb-InCon">' + html;
  return html;
};

ProductName.prototype.returnProductError = function (tmpId,formType,errorclass) {
  var div = '<div class="' + errorclass + '" id="t' + tmpId + '_error_title"><div data-role="content"';
  div += isSSB(tmpId) ? 'class="mb-ertxt mb-mt10">Enter product/service name</div>' : ">Enter product/service name</div>";
  return div;
};

ProductName.prototype.getInput = function (tmpId, formType) {
  this.ProductNameHtmlObj["UserInput"] = IsChatbl(tmpId) ? this.returnProductInput(tmpId, "") + "</div>" : this.getBlEnqInputHtml(tmpId, formType);
};

ProductName.prototype.getBlEnqInputHtml = function (tmpId, formType) {
  var html = "";
  html += isSSB(tmpId) || isBlInline(tmpId) ? this.returnProductInput(tmpId, "") : !isInactiveBL(tmpId) ? this.returnProductInput(tmpId, "be-slbox inpt_errorbx be-row") : this.returnProductInput( tmpId, "be-slbox inpt_errorbx be-row bed_input cpNm wid_600" );
  var errorcls = isSSB(tmpId) ? "" : "beerrp4 bedsnone be-erbx";
  html += this.returnProductError(tmpId, formType, errorcls);
  html += isSSB(tmpId) ? isnewSSB(tmpId) ? "</div>" : "</div></div>" : '<a class="be-erarw" data-role="arrow"></a></div>';
  if (isBlInline(tmpId)) {
    var cls = isBlInlineFr(tmpId) ? "flx1" : "pr pflx1";
    html = "<div class = '" + cls + "'>" + html + "</div>";
  }
  return html;
};

ProductName.prototype.getLabel = function (tmpId, formType) {
  var cls = isBlInline(tmpId) ? isBlInlineFr(tmpId) ? "fs0 wf" : "fs15 cl11" : "be-lbl";
  if (isInactiveBL(tmpId)) {
    cls = "be-lbl";
  }
  var label = isBlInline(tmpId) || (isSSB(tmpId) && isnewSSB(tmpId)) ? "I want quotes for" : isSSB(tmpId) ? "Product/Service name" : (isInactiveBL(tmpId)) ? "Enter Product/Service name <span class='redc'>*</span>" : "Enter Product/Service name";
  this.ProductNameHtmlObj["Label"] = IsChatbl(tmpId) ? returnLabel("t" + tmpId, "Please enter Product/Service name", "_name-l", "") : isSSB(tmpId) ? returnLabel("t" + tmpId, label, "_name-l", ssbClass("label", tmpId)) : returnLabel("t" + tmpId, label, "_name-l", cls);
};

ProductName.prototype.getProductHtml = function (tmpId) {
  this.getLabel(tmpId, ReqObj.Form[tmpId].formType.toLowerCase());
  this.getInput(tmpId, ReqObj.Form[tmpId].formType.toLowerCase());
  this.ProductNameHtmlObj["ClosingWrapper"] = "";
  this.ProductNameHtmlObj["OuterWrapper"] = "";
  return this.ProductNameHtmlObj;
};

ProductName.prototype.displayHtml = function () {
  return IsChatbl(this.tmpId)
    ? [this.ProductNameHTMLQues, this.ProductNameHTMLInput]
    : [this.ProductNameHTML];
};

ProductName.prototype.handleUI = function (event) {
  var tmpId = event.data.tmpId;
  var todo = event.data.todo;
  if (todo === "default") {
    // if (ReqObj.UserHtml[tmpId]["ProductSugg"])
    this.setTitleSuggester(tmpId);
    $("#t" + tmpId + "_error_title").addClass("bedsnone");
    isSSB(tmpId)
      ? $("#t" + tmpId + "prodtitle").removeClass("mb-erbrd nb-erbrd")
      : $("#t" + tmpId + "prodtitle").removeClass("highlight-err");
    $("#t" + tmpId + "_name-l").removeClass("redc");
    this.showMcatFilled(tmpId);
  }
};

ProductName.prototype.handleHeading = function (tmpId) {
  if (isOtherEnq(tmpId)) ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
};

ProductName.prototype.defaultEvents = function (tmpId) {
  this.handleUI({
    data: {
      tmpId: tmpId,
      todo: "default",
    },
  });
  this.handleEvents(tmpId);
  $(document)
    .off("click.prodName keypress.prodName keydown.prodName")
    .on(
      "click.prodName keypress.prodName keydown.prodName",
      ".inpt_errorbx",
      function () {
        $("#t" + tmpId + "_error_title").addClass("bedsnone");
        $("#t" + tmpId + "prodtitle").removeClass("highlight-err");
        $("#t" + tmpId + "_name-l").removeClass("redc");
      }
    );

  isSSB(tmpId)
    ? $("#t" + tmpId + "prodtitle")
      .off("keyup")
      .on("keyup", function () {
        $("#t" + tmpId + "_error_title").addClass("bedsnone");
        $("#t" + tmpId + "prodtitle").removeClass("mb-erbrd nb-erbrd");
      })
    : "";
};

ProductName.prototype.handleButton = function (tmpId) {
  if (Bl04(tmpId)) ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
};

function Callblur(event) {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (
    keycode === 13 &&
    event.target.id === "t" + event.data.param1 + "prodtitle"
  ) {
    if (isSet($("#t" + event.data.param1 + "prodtitle")[0])) {
      var EventArray = $._data(
        $("#t" + event.data.param1 + "prodtitle")[0],
        "events"
      );
      var BLurEvent = isSet(EventArray.blur) ? EventArray.blur : [];
      for (var b = 0; b < BLurEvent.length; b++) {
        BLurEvent[b].handler(BLurEvent[b]);
      }
      HideSuggester();
    }
  }
}

ProductName.prototype.AddBlur = function (tmpId) {
  var that = this;
  $("#t" + tmpId + "prodtitle")
    .off("blur.blEnqProdNameBlur")
    .on(
      "blur.blEnqProdNameBlur",
      {
        param1: tmpId,
        param2: "blur",
        pnObject: that,
      },
      that.checkMcatIDJquery
    );
};

ProductName.prototype.RemoveBlur = function (tmpId) {
  $("#t" + tmpId + "prodtitle").off("blur.blEnqProdNameBlur");
};

ProductName.prototype.handleEvents = function (tmpId) {
  this.IsEnterPressed = false;
  var that = this;
  var BLurEvents = [];
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    ChatblfooterAns(tmpId);

    if (ReqObj.Form[tmpId].flags.autofocusPName) {
      $("#t" + tmpId + "prodtitle").focus();
    }
    if (IsChatbl(tmpId)) {
      setTimeout(function () {
        $("#t" + tmpId + "prodtitle").focus();
      }, 1800);
    } else {
      that.AddBlur(tmpId);

      // $('#t' + tmpId + 'prodtitle').off("blur.BlEnqEvent").on("blur.BlEnqEvent", { param1: tmpId, param2: "blur", pnObject: that }, that.checkMcatIDJquery);

      $("#t" + tmpId + "prodtitle")
        .off("mouseleave.BlEnqEvent")
        .on("mouseleave.BlEnqEvent", function () {
          $("#t" + tmpId + "_cls").each(function () {
            if (
              $(this).css("display") === "block" ||
              $(this).css("display") === "inline-block"
            ) {
              $(this)
                .off("mouseenter.BlEnqEvent")
                .on("mouseenter.BlEnqEvent", function (event) {
                  that.RemoveBlur(tmpId);
                });
              $(this)
                .off("mouseleave.BlEnqEvent")
                .on("mouseleave.BlEnqEvent", function () {
                  that.AddBlur(tmpId);
                });
            }
          });
        });

      $(document)
        .off("mouseenter.BlEnqEvent")
        .on(
          "mouseenter.BlEnqEvent",
          ".t" + tmpId + "_prodName",
          function (event) {
            if (
              $(this).css("display") === "block" ||
              $(this).css("display") === "inline-block"
            ) {
              that.RemoveBlur(tmpId);
            }
          }
        );

      $(document)
        .off("mouseleave.BlEnqEvent")
        .on("mouseleave.BlEnqEvent", ".t" + tmpId + "_prodName", function () {
          if (
            $(this).css("display") === "block" ||
            $(this).css("display") === "inline-block"
          ) {
            that.AddBlur(tmpId);
          }
        });

      var SubmitDisplay = $("#t" + tmpId + "_submit").css("display");
      if (SubmitDisplay === "block" || SubmitDisplay === "inline-block") {
        $("#t" + tmpId + "_submit")
          .off("mouseenter.BlEnqEvent")
          .on("mouseenter.BlEnqEvent", function () {
            that.RemoveBlur(tmpId);
          });

        $("#t" + tmpId + "_submit")
          .off("mouseleave.SubmitBtn")
          .on("mouseleave.SubmitBtn", function () {
            that.AddBlur(tmpId);
          });
      }
    }

    $("#t" + tmpId + "prodtitle")
      .off("keypress.BlEnqEvent")
      .on("keypress.BlEnqEvent", function (event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode === 13) {
          // if (that.isProdNameChanged)
          //   // RefactorFormArrays(tmpId);
          if (!$("#t" + tmpId + "_submit").is(":disabled")) {
            that.IsEnterPressed = true;
            $("#t" + tmpId + "prodtitle").off("blur");
            HideSuggester();
          }
        }
      });
  }
};

ProductName.prototype.setTitleSuggester = function (tmpId) {
  // $("#t" + tmpId + "prodtitle").html("");
  var that = this;
  var title_sugg = "sugg_title_" + tmpId;

  var title_count = setInterval(function () {
    if (typeof Suggester !== "undefined") {
      var ProductNameSuffix = "_prodName";
      //remove all existing product name suggestor
      $(".t" + tmpId + ProductNameSuffix).each(function () {
        $(this).remove();
      });
      //upto here
      var autocompleteClass = SetAutoCompleteClass(tmpId, ProductNameSuffix);
      var row_num = BlAutoSuggRowNum(tmpId);
      window[title_sugg] = new Suggester({
        element: "t" + tmpId + "prodtitle",
        getQuotation: false,
        onSelect: that.selectTitle,
        fields: "",
        type: "product",
        module: "BL-FORM",
        rowsToDisplay: row_num,
        recentData: 1,
        autocompleteClass: autocompleteClass,
      });
      if (JSON.stringify(title_sugg)) {
        if (
          isSet(tmpId) && isSet(ReqObj) && isSet(ReqObj.Form) &&
          isSet(ReqObj.Form[tmpId]) &&
          isSet(ReqObj.Form[tmpId].flags)
        )
          ReqObj.Form[tmpId].flags.isTitleSuggSet = true;
        clearInterval(title_count);
      }
    }
  }, 1000);
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

ProductName.prototype.showMcatFilled = function (tmpId) {
  var name = "";
  if (ReqObj.Form[tmpId].prodName !== "") {
    if (
      typeof ReqObj.Form[tmpId].prodServ !== "undefined" &&
      ReqObj.Form[tmpId].prodServ !== "C"
    ) {
      name = ReqObj.Form[tmpId].prodName;
    } else if (
      ReqObj.Form[tmpId].prodServ === "C" &&
      ReqObj.Form[tmpId].formType === "BL"
    )
      name = ReqObj.Form[tmpId].prodName;
  }
  if (!IsChatbl(tmpId))
    if (isSSB(tmpId) && ReqObj.Form[tmpId].flags.prodSecNochange) {
      ReqObj.Form[tmpId].flags.prodSecNochange = false;
    } else {
      $("#t" + tmpId + "prodtitle").val(name);
      /*if(isSSB(tmpId) && isnewSSB(tmpId) && $('#t' + tmpId + 'prodtitle').val() !== "")
      $('#t' + tmpId + 'prodtitle').parent().addClass("focused");*/
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

function RequirementDtl(tmpId) {
  this.className = "RequirementDtl";
  this.RequirementDtlObj = {
    OuterWrapper: "",
    UserInput: "",
    ClosingWrapper: "",
    Label: "",
  };
  this.Rdbox = "";
  this.setValue = "";
  this.countclick = 0;
  this.QuestionArray = [];
}

RequirementDtl.prototype.hasHtml = function (RdObj) {
  if (isSet(RdObj)) {
    ReqObj.Form[RdObj.tmpId].ReqDtl.HasHtmlCalled = true; // whether hashtml called or not.
    if (this.getHtml(RdObj.tmpId) !== "") {
      ReqObj.Form[RdObj.tmpId].flags.isReqHtmlPresent = true;
      if (
        isSet(RdObj.object.countlastUpdated) &&
        RdObj.object.countlastUpdated === false
      )
        ReqObj.Form[RdObj.tmpId].currentclassCount++;
      this.ifHtmlPresent(RdObj);
    } else {
      ReqObj.Form[RdObj.tmpId].flags.isReqHtmlPresent = false;
      this.ifHtmlNotPresent(RdObj);
    }
  }
};

RequirementDtl.prototype.displayHtml = function (tmpId) {
  if (isSet(tmpId)) {
    ReqObj.Form[tmpId].flags.isDescDivShown = true;
    this.getHtml(tmpId);
    if (!IsChatbl(tmpId)) {
      var clsnm = isSSB(tmpId)
        ? ssbClass("wrprClass", tmpId)
        : isBlInline(tmpId)
          ? isBlInlineFr(tmpId)
            ? "fmb15"
            : "idsf pfstrt mb20 inTxAr"
          : isInactiveBL(tmpId)
            ? "bepdpreq bemb10 bemt5"
            : "bepdpreq bemt15 ";
      var cdiv =
        isSSB(tmpId) ||
          (ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
            tmpId.substring(0, 2) === "09")
          ? "<div id='t" + tmpId + "_cdiv'></div>"
          : "";
      if (
        ReqObj.Form[tmpId].FormSequence.StepCounter === 0 &&
        isImageVidEnq(tmpId)
      )
        cdiv = "";
      var RequirementDtlSuffixHtmlObj = {
        SuffixOuterHtml:
          "<div  id='t" + tmpId + "_reqbox' class='" + clsnm + "'>",
        SuffixClosingHtml: "</div>" + cdiv,
        suffix: "_reqbox",
      };
      this.Rdbox = MakeWrapper(
        [[this.RequirementDtlObj]],
        tmpId,
        RequirementDtlSuffixHtmlObj,
        ""
      );
    } else {
      this.RdboxQues = MakeWrapper(
        [[this.RequirementDtlObj]],
        tmpId,
        WrapperObj(
          "<div  id='t" + tmpId + "_reqbox' class='cbl_ques cbl_vh'>",
          "</div>",
          "_reqbox"
        ),
        "ques"
      );

      this.RdboxInput = MakeWrapper(
        [[this.RequirementDtlObj]],
        tmpId,
        WrapperObj(
          "<div  id='t" +
          tmpId +
          "_reqboxInput ' class='cbl_dtls cbl_name cbl_df t" +
          tmpId +
          "_userInput cbl_br10 dn'>",
          "</div>",
          "_reqbox"
        ),
        "input"
      );

      this.Rdbox = this.RdboxQues + this.RdboxInput;

      return [this.RdboxQues, this.RdboxInput];
    }

    return [this.Rdbox];
  }
};
RequirementDtl.prototype.ifHtmlPresent = function (RdObj) {
  RdObj.that.NumberofClassCalled -= 1;
  AttachObject(RdObj.object, RdObj.tmpId);
  if (isSet(RdObj.AfterService)) {
    for (var i = 0; i < RdObj.AfterService.length; i++) {
      RdObj.that.MakeSeq(RdObj.AfterService[i], RdObj.tmpId);
    }
  }
  if (RdObj.that.NumberofClassCalled === 0) {
    makeFinalSeq(RdObj, RdObj.tmpId);
  }
};

RequirementDtl.prototype.ifHtmlNotPresent = function (RdObj) {
  if (RdObj.hasFallback) {
    CreateSeq(RdObj.FallbackObj);
  }
};

RequirementDtl.prototype.getHtml = function (tmpId) {
  this.getInput(tmpId);
  this.getLabel(tmpId);
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

RequirementDtl.prototype.getInput = function (tmpId) {
  //fghdjhggg
  var input = "";
  var placeholdertext = this.getPlaceHolderText(tmpId);
  if (IsChatbl(tmpId)) {
    input +=
      "<input class='cbl_name cbl_txt' id = 't" +
      tmpId +
      "_reqBoxTemplates' placeholder='" +
      placeholdertext +
      "'></input>";
    // only for RequirementDtl input
    if (ReqObj.Form[tmpId].currentScreen === "RequirementDtl") {
      var FormId = "#t" + tmpId + "_newblchatReply";
      if ($(FormId).children(".cbl_resend.cbl_skip")) {
        $(FormId).children(".cbl_resend.cbl_skip").remove();
      }
      input += skipDiv1(tmpId); //chat bl bug
    }
  } else {
    var stickycss = isSticky(tmpId) ? "FM_be-slbox" : "be-slbox";
    var cls =
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
        tmpId.substr(0, 2) !== "01" &&
        currentISO() !== "IN"
        ? stickycss + " be-txtarea blFh90"
        : stickycss + " be-txtarea";

    if (isInactiveBL(tmpId)) {
      cls += " cpNm cbl_br8 wid_600"
    }
    input += isSSB(tmpId)
      ? isnewSSB(tmpId)
        ? "<textarea type='text'  id='t" +
        tmpId +
        "_reqBoxTemplates' placeholder='" +
        placeholdertext +
        "'></textarea>"
        : "<div class='mb-InCon'><textarea type='text'  id='t" +
        tmpId +
        "_reqBoxTemplates' placeholder='" +
        placeholdertext +
        "'></textarea></div>"
      : isBlInline(tmpId) && !isBlInlineFr(tmpId)
        ? returnContainer("", "", "pflx1", "", "", "") +
        returnContainer("", "", "pr", "", "", "") +
        "<textarea  id='t" +
        tmpId +
        "_reqBoxTemplates' placeholder='" +
        placeholdertext +
        "'></textarea></div>"
        : returnContainer("", "", "betarea", "", "", "") +
        returnTextarea("t" + tmpId, "_reqBoxTemplates", cls, placeholdertext);
  }

  input += "</div>";
  this.RequirementDtlObj["UserInput"] = input;
};

RequirementDtl.prototype.getPlaceHolderText = function (tmpId) {
  if (isBlInline(tmpId) || (isSSB(tmpId) && isnewSSB(tmpId))) {
    return "Additional details about your requirement...";
  }
  if (currentISO() !== "IN") {
    /*if(isSSB(tmpId) && isnewSSB(tmpId))
    return "";*/
    if (IsChatBLInline(tmpId)) return "You can enter specific details here..";
    return "Briefly describe what you are looking to buy...";
  }
  if (isOtherEnq(tmpId)) {
    return "Additional details about your requirement...";
  }
  if (IsChatbl(tmpId)) {
    return "You can enter specific details here...";
  } else if (currentISO() === "IN") {
    return "";
  }
  return "";
};

RequirementDtl.prototype.getLabel = function (tmpId) {
  if (!IsChatbl(tmpId))
    this.RequirementDtlObj["Label"] =
      "<div class='be-erbx beerrp6 bedsnone' id='t" +
      tmpId +
      "_textarea_error'><div id='t" +
      tmpId +
      "_textarear_cont' data-role='content'>Please enter your requirement in Detail</div><a class='be-erarw' data-role='arrow'></a></div>";
  var LabelObj = {
    lblClass: isBlInline(tmpId)
      ? isBlInlineFr(tmpId)
        ? "fs15 cl11 wf"
        : ""
      : isSticky(tmpId)
        ? "FM_be-lbl"
        : "be-lbl",
    labelId: "t" + tmpId + "_textarea",
    QuestionDesc: isBlInline(tmpId)
      ? "Briefly describe your requirement"
      : "Requirement Details",
    flag: "1",
  };
  if (
    isOtherEnq(tmpId) &&
    tmpId.substring(0, 2) === "09" &&
    (ReqObj.Form[tmpId].disableIsq === "1" ||
      ReqObj.Form[tmpId].IsqArray === [] ||
      ReqObj.Form[tmpId].IsqArray === null)
  )
    LabelObj["QuestionDesc"] = "Write your message here";
  this.RequirementDtlObj["Label"] = isSSB(tmpId)
    ? "<label class='" +
    ssbClass("reqBxLbl", tmpId) +
    "'>" +
    LabelObj["QuestionDesc"] +
    "</label>"
    : MakeLabel(LabelObj, "", tmpId);
};

RequirementDtl.prototype.resetClass = function (tmpId) {
  ReqObj.Form[tmpId].flags.isDescDivShown = false;
  if (ReqObj.Form[tmpId].flags.isDescDivShown) {
    ReqObj.Form[tmpId].prevCount -= ReqObj.Form[tmpId].IsqStepN; //isqstepn
  } else {
    ReqObj.Form[tmpId].prevCount -= ReqObj.Form[tmpId].IsqStep1; //isqstep1
  }
};

RequirementDtl.prototype.defaultEvents = function (tmpId) {
  if (isSet(tmpId)) {
    //next->submit
    //hide pns unidentified user
    if (isPnsEnq(tmpId) ) $(".pnsEnq").show();
    if ( EnqPopupDIR(tmpId) && ReqObj.Form[tmpId].toShowMsg && $("#yajaca").css("display") == "none" ) {
      $("#yajaca").show();
      $( "#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input" ).addClass("toConv");
      $("input.toConv").attr("value", "Submit");
      ReqObj.Form[tmpId].toShowMsg = 0;
      ReqObj.Form[tmpId].msgFromOtp = 0;
    }
    //mob track
    if(currentISO() === "IN"){
      if(isSet(ReqObj.Form[tmpId].mobEntered) && ReqObj.Form[tmpId].mobEntered==1){    
        mobEnteredTrack(tmpId,"ISQ");       
      }
    }
    else{
      if(isSet(ReqObj.Form[tmpId].emailEntered) && ReqObj.Form[tmpId].emailEntered==1){    
        emailEnteredTrack(tmpId,"ISQ");       
      }
    }

    this.handleUI({
      data: {
        tmpId: tmpId,
        todo: "defaults",
        obj: this,
      },
    });
    ChatblfooterAns(tmpId);
    var RdEl = $("#t" + tmpId + "_reqBoxTemplates");
    if (StaticQuesForeignUser(tmpId) && !IsChatbl(tmpId)) {
      var attrdiv = $("#t" + tmpId + "_reqBoxTemplates").attr("isqattr");
      if (attrdiv === "true") {
        RdEl.height(100);
        RdEl.css("line-height", "16px");
      } else RdEl.height(80);
    }

  // get more photos form changes //new gmp
    var pdname = typeof ReqObj.Form[tmpId].prodDispName !== "undefined" &&
                 ReqObj.Form[tmpId].prodDispName !== "" &&
                 ReqObj.Form[tmpId].prodDispName !== null &&
                 ReqObj.Form[tmpId].prodDispName !== "null"
                 ? ReqObj.Form[tmpId].prodDispName
                 : isSet(ReqObj.Form[tmpId].prodName)? ReqObj.Form[tmpId].prodName : "";

    if (isSet(ReqObj.Form[tmpId].ReqDtlBox)){

          if(getMorePh(tmpId)){
              RD_prefilled = "Please share the latest Photos of " + pdname ;
              RdEl.text("Please share the latest Photos of " + pdname);
          }
          else{
              RdEl.text(ReqObj.Form[tmpId].ReqDtlBox);
          }

    }
    else{
          if(getMorePh(tmpId)){
              RD_prefilled = "Please share the latest Photos of " + pdname ;
              RdEl.text("Please share the latest Photos of " + pdname);
          }
          else{
              ReqObj.Form[tmpId].ReqDtlBox = "";
          }
    }

  //ends here 

    RdEl.off("blur").on("blur", function (event) {
      ReqObj.Form[tmpId].ReqDtlBox = $("#t" + tmpId + "_reqBoxTemplates").val();
    });
    if (ReqObj.Form[tmpId].afflId === "-126")
      currentISO() !== "IN" ? RdEl.attr("placeholder","Briefly describe what you are looking to buy...") : RdEl.attr("placeholder", "Type your message here...");
    RdEl.on("focus", function () {
      var errorcls = isSSB(tmpId) ? isnewSSB(tmpId) ? "nb-erbrd" : "mb-erbrd" : "highlight-err";
      RdEl.removeClass(errorcls);
      $("#t" + tmpId + "_reqBoxTemplates_err").addClass("bedsnone");
      $("#t" + tmpId + "_textarea").removeClass("redc");
      $("#t" + tmpId + "_textarea_error").addClass("bedsnone");
    });
    if (IsChatbl(tmpId)) {
      setTimeout(function () {
        RdEl.focus();
      }, 1800);
    }
  }
  if ( !Enq09(tmpId) || (Enq09(tmpId) && $("#t" + tmpId + "_reqbox").length > 0 && currentISO() !== "IN") )
    manipulateWidth(tmpId, ReqObj.Form[tmpId].cName.cnameId);
  if ( (isSSB(tmpId) || (isImageVidEnq(tmpId) && (ReqObj.Form[tmpId].isQtutShown === true || (ReqObj.Form[tmpId].isQtutShown === false && ReqObj.Form[tmpId].cName.qtut === false)))) && currentISO() !== "IN")
    if (!Enq09(tmpId)) onCName(tmpId, "", "rbox");
  if (isSSB(tmpId)) onURLName(tmpId);
  get_buyer_info(tmpId);
  if (imeshExist() !== "" && !isInactiveBL(tmpId))
    $("#t" + tmpId + "_leftR").removeClass("lftMgn");
};

RequirementDtl.prototype.EventIfScreenPresent = function (tmpId) {
  if (isOtherEnq(tmpId)) {
    this.handleHeading(tmpId);
    ButtonNameUI("isq", tmpId);
  }
  //onCName(tmpId);
};

RequirementDtl.prototype.handleHeading = function (tmpId) {
  ReqObj.Form[tmpId].ctaheadingappend = false;
  if (ReqObj.Form[tmpId].formType.toLowerCase() !== "enq"){
    if(isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0){
      $("#blheading").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    }
    else{
      $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    }
  }
  else {

    if ( ReqObj.Form[tmpId].currentScreen.toLowerCase() === "isqrequirementdtl" || ReqObj.Form[tmpId].currentScreen.toLowerCase() === "isqrequirementdtlmoredetails") {
      if ( $("#isq_first_screen").attr("type") === "hidden" && $("#isq_first_screen").attr("value") === "Screen1" ) {
        if (ReqObj.Form[tmpId].IsqLength < 3) {
          ReqObj.Form[tmpId].ctaheadingappend = ReqObj.Form[tmpId].FormSequence.StepCounter === 0 ? true : false;
          if ( isImageVidEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter === 0 )
            $("#t" + tmpId + "_hdg").addClass("bedsnone").html("");
          else
            $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "Isq"));
        } else {
          if ( isImageVidEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter === 0)
            $("#t" + tmpId + "_hdg").addClass("bedsnone").html("");
          else {
            $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "isqrequirementdtl"));
          }
        }
      } else
        $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "isqrequirementdtl"));
    } else if ( ReqObj.Form[tmpId].currentScreen.toLowerCase() === "requirementdtl" || ReqObj.Form[tmpId].currentScreen.toLowerCase() === "requirementdtlrequirementdtl" || ReqObj.Form[tmpId].currentScreen.toLowerCase() === "requirementdtlmoredetails" ) {
      if ( $("#isq_first_screen").attr("type") === "hidden" && $("#isq_first_screen").attr("value") === "Screen1")
        $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "isqrequirementdtl"));
      else
        $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "requirementdtl"));
    }
  }
};

RequirementDtl.prototype.handleButton = function (tmpId) {
  ButtonNameUI("requirementdtl", tmpId);
};

RequirementDtl.prototype.handleEvents = function (event) { };

RequirementDtl.prototype.handleUI = function (event) {
  var tmpId = event.data.tmpId;
  var todo = event.data.todo;
  var obj = event.data.obj;
  if (todo === "defaults") {
    if (obj.setValue === "yes") {
      if ($("#t" + tmpId + "_reqBoxTemplates").val() === "") {
      }
    }
  }
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