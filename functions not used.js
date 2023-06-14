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
function ShowStaticQuestionForeign(tmpId) {
  // if (isSet(tmpId) && tmpId.substring(0, 2) === "09") {
  //   if (parseInt(ReqObj.Form[tmpId].disableIsq) !== 1 && currentISO() !== "IN") return true;
  //   return false;
  // }
  return false;
}
function flagwrapper(message) {
  return '<div class="cbl_flag">' + message + "</div>";
}
function detachFlag2(tmpId) {
  var ele = $("#t" + tmpId + "country_dropd").detach();
  $("#t" + tmpId + "flagdiv2").append(ele);
}
function CheckLocalStorage() {
  try {
    localStorage.setItem("__checklocalstorage", "exists");
    localStorage.removeItem("__checklocalstorage");
    return true;
  } catch (exception) {
    return false;
  }
}
function onPlayerStateChange(event) {
  if (event.data !== 1) blStop = 0;
  else blStop = 1;
}
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
function StaticMessage() {
  var constantText = "Get verified supplier details instantly on your ";
  if (currentISO() === "IN") {
    constantText += "mobile";
  } else constantText += "email";
  return constantText;
}
function currentIpCountry() {
  return usercookie.getParameterValue(usercookie.getCookie("iploc"), "gcnnm");
}
function getCurrentCounter(currentpage) {
  return currentpage.length;
}
function foreignUserIsq() {
  var ShowForeignUserIsq = true;
  return ShowForeignUserIsq;
}
// function chatBlPopupInline(tmpId) {
//   if ((chatblverlay(tmpid) || IsChatBLInline(tmpId)) && tmpId.substring(0, 2) === "08") { // later change to 08 ---POPUPCHATBL
//     return "popup";
//   }else
//     return "nochat";
// }
function ResetUserDetails(key) {
  ReqObj.UserDetail[key] = "";
}
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

// ThankYou.prototype.payxBsec = function (data) {
//   return returnContainer("", "", "be-w237 bevT bedtc", "", data["payxHtml"], "") + "</div >";
// };

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
// Validation.prototype.toShowTick = function (event) {
//   var pressedKeyLength = (event.which === 8) ? 0 : event.key.length;
//   if ((pressedKeyLength + event.target.value.length) === 10) {
//     $("#t" + event.data.tmpId + "chatbltick").removeClass("bedsnone");
//   }
//   else
//     $("#t" + event.data.tmpId + "chatbltick").addClass("bedsnone");

// };

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

// function isMoglixUi(tmpId) {
//   return isSet(ReqObj.Form[tmpId].New_UI) && ReqObj.Form[tmpId].New_UI === "1";
// }
function blkerr(templateId) {
  // if ($('#' + templateId + 'error_city_locpref').css('display') == 'block') {
  //   $('#' + templateId + 'error_city_locpref').css('display', 'none');
  //   $('#' + templateId + 'enrich_city1').removeClass("highlight-err");
  // }
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
