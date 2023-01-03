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

function thankYouTrack(tmpId, msg, sellerId) {
  var formtype =
    isSet(ReqObj.Form[tmpId].formType) &&
    ReqObj.Form[tmpId].formType.toLowerCase() === "bl"? "Post Buy Leads": "Send Enquiry";
  if (isSet(sellerId)) blenqGATracking(formtype, msg, sellerId, 1, tmpId);
  else blenqGATracking(formtype, msg, getEventLabel(), 1, tmpId);
  return true;
}

// Miscellaneous
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
  return (
    "<div id='t" +
    tmpId +
    "defaultimage' class='be-nobgimg'><div class='blnewform_sprit be-noimg'></div></div>"
  );
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
    let beWbl = pdpInactiveBL(templateId.substr(1, 5))? "beW10bl" :"beW15";
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
          "<div class='bepr "+ beWbl + " belft text_bx'><label class='be-lbl'>City " +
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
    let bemt = pdpInactiveBL(templateId.substr(1, 5)) ? " bemt15" : " bemt5" ;
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
          blenqGATracking("geoloc","service:GeoLocation:failure",res,1,ReqObj.cityId[0].substr(2, 4));
        }
      },
      error: function (res) {
        res = isSet(res) ? res : "response undefined";
        blenqGATracking("geoloc","service:GeoLocation:failure",JSON.stringify(res),1,ReqObj.cityId[0].substr(2, 4));
      },
    });
  }
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
  data["modId"] = ReqObj.Form[tmpId].modId;
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
  
function getCurrentCounter(currentpage) {
  return currentpage.length;
}

function chatblHideTransition(tmpId) {
  $("#t" + tmpId + "_typhere").removeClass("dn");
  $("#t" + tmpId + "_newblchatReply").addClass("cbl_vh");
}
 
function foreignUserIsq() {
  var ShowForeignUserIsq = true;
  return ShowForeignUserIsq;
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

function ResetUserDetails(key) {
  ReqObj.UserDetail[key] = "";
}

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) e.preventDefault();
  e.returnValue = false;
}

function keydown(e) {
  var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
  for (var i = keys.length; i--; ) {
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
  
function isOTPBoxHidden(tmpId) {
  return $("#t" + tmpId + "_otpbox").length === 0 ||
    $("#t" + tmpId + "_otpbox").hasClass("bedsnone")
    ? true
    : false;
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

// Miscellaneous

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
    var cls =
      isMoglixUi(tmpId) && outerid == "_company_ncbx"
        ? "int-ct3 info_iconeqbl Tleft"
        : "int-ct3 info_iconeqbl";
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
    if(pdpInactiveBL(tmpId)) cls += " cbl_br10";
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
        ? isMoglixUi(tmpId)
          ? ""
          : pdpenqImage(tmpId)
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
        ? isMoglixUi(tmpId)
          ? "eqflot beW5 bemt10 pr"
          : pdpenqImage(tmpId)
          ? "eqflot eCwd"
          : "eqflot beW5"
        : isMoglixUi(tmpId)
        ? "bemt10 pr"
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

  // UserVerification
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
      $("#t" + tmpId + "OtpMainHeading")
        .removeClass("bedsnone")
        .html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
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
  
      if (
        !isSSB(tmpId) &&
        currentISO() === "IN" &&
        !isMoglixUi(tmpId) &&
        !IsChatbl(tmpId) &&
        isSet(ReqObj.Form[tmpId].mcatId) &&
        parseInt(ReqObj.Form[tmpId].mcatId, 10) !== -1 &&
        ReqObj.Form[tmpId].mcatId != "" &&
        !isSet(sessionStorage.getItem("plaWidget-" + ReqObj.Form[tmpId].mcatId))
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
      if (this.verifyhtml !== "") return true;
      else return false;
    }
  };

  UserVerification.prototype.defaultEvents = function (tmpId) {
    $("#yajaca").hide(); // click away message on pns form
    if (isSet(tmpId)) {
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
      var authkey =
        $("#t" + tmpId + "bl_enqOtp1").val() +
        $("#t" + tmpId + "bl_enqOtp2").val() +
        $("#t" + tmpId + "bl_enqOtp3").val() +
        $("#t" + tmpId + "bl_enqOtp4").val();
      this.otp = authkey;
      if (
        !isOTPBoxHidden(tmpId) &&
        ((isSet(authkey) && authkey === "") || authkey.length !== 4)
      ) {
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
        var cls = isMoglixUi(tmpId) ? "btpErr bedsnone" : "bltperor bedsnone";
        otphtml += that.returnErrorDiv(tmpId, cls);
        // if (isOtherEnq(tmpId)) { otphtml += returnContainer("t" + tmpId, "_helpmsg", "eqOtphlp", "", "Sent to mobile " + returnSpan("t" + tmpId, "_phone", PhoneNumber, "", "") + " via " + returnSpan("t" + tmpId, "_sms", "SMS", "", ""), ""); otphtml += "</div>"; }
        otphtml += '</div ></div ><div class="beclr"></div>';
        otphtml = isOtherEnq(tmpId)
          ? otphtml + '<div class="beotpSW betxtc">Did not receive  OTP?'
          : otphtml + '<div class="beotpSW betxtc">Did not receive  OTP? ';
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
        var cls = isMoglixUi(tmpId)
          ? "blgrcl1 disp-inl f_bold cbl_vh dn"
          : "blgrcl1 disp-inl f_bold cbl_vh";
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
      var otpMsg = isBl(tmpId)
        ? "Verify your mobile number to receive quotes"
        : "Confirm your requirement";
      var cls = isMoglixUi(tmpId) ? "e_hdg" : "otphdg";
      var otphed = returnContainer(
        "t" + tmpId,
        "OtpMainHeading",
        cls,
        "",
        otpMsg
      );
      otphed += "</div>";
      if (isMoglixUi(tmpId) && $("#t" + tmpId + "OtpMainHeading").length == 0) {
        $("#t" + tmpId + "_leftS").before(otphed);
      } else if (!isMoglixUi(tmpId)) {
        otphtml += otphed;
      }
      otphtml += returnContainer(
        "",
        "",
        "befs16 blotp bemb20",
        "",
        "Enter the 4 digit One Time Password (OTP) sent to your Mobile Number "
      );
      otphtml +=
        returnSpan("", "", PhoneNumber, "disp-inl befwt", "") + "</span>";
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
    if (
      isSSB(tmpId) &&
      ReqObj.Form[tmpId].isEnterclicked &&
      id.toLowerCase() === "resendotp"
    ) {
      ReqObj.Form[tmpId].isEnterclicked = false;
      return "";
    }
    if (ReqObj.Form[tmpId].OnCloseStep && isSet(ReqObj.Form[tmpId].FormSequence))
      var StepNumber =
        ReqObj.Form[tmpId].FormSequence.StepCounter +
        1 +
        ReqObj.Form[tmpId].FormSequence.OnCloseCounter +
        1;
    else var StepNumber = ReqObj.Form[tmpId].FormSequence.StepCounter + 1;
  
    if (resend === 1 && id === "resendOtp")
      blenqGATracking(form_type,"resendOTP|" + StepNumber + "|UserVerification",getEventLabel(),0,tmpId);
    else if (resend === 0 && id === "bl_enqMisscall")
      blenqGATracking(form_type,"OncallOTP|" + StepNumber + "|UserVerification",getEventLabel(),0,tmpId);
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
    } else if (
      that.otpCount > 0 &&
      that.otpCount <= 3 &&
      ReqObj["OTPratelimitstatus"] !== "Access Denied"
    ) {
      that.handleUI(tmpId, "otpCount123", "", "");
    }
  
    var data =
      type === 3
        ? that.getData(3, resend, tmpId, "")
        : type === 1
        ? that.getData(1, resend, tmpId, "")
        : "";
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
      modid: ReqObj.Form[tmpId].modId,
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
  UserVerification.prototype.sendRequest = function ( data, type, verifyObject, userVerificationObject, tmpId) {
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
  
          if (that.otpCount !== 0 &&ReqObj["OTPratelimitstatus"] !== "Access Denied") {
            that.handleUI(tmpId, "showmessage", "", "");
          }
          if (ReqObj["OTPratelimitstatus"] === "Access Denied") {
            that.handleUI(tmpId, "ratelimitmessage", "", "");
          }
  
          if (isSet(res.Response) && res.Response.Status === "Success") {
            var block_case = 1;
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
              if ( block_case === 2 && isSet(res.Response.LOGIN_DATA) && isSet(res.Response.LOGIN_DATA.DataCookie)) {
                imesh_obj.set(res.Response.LOGIN_DATA.DataCookie);
                ReqObj.UserDetail.blusrdtl.blkUsr = res.Response.LOGIN_DATA.DataCookie["uv"] === "V" ? 0 : ReqObj.UserDetail.blusrdtl.blkUsr;
                UpdateUserDetailKey();
              }
              usercookie.deleteCookie("imEqGl"); /* since user is verified, we need to clear the imEqGl cookie */
              that.updateFulllogin(res);
              if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ||ReqObj.Form[tmpId].formType.toLowerCase() === "enq")
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
              if ( isSet(ReqObj.Form[tmpId].RemainingService) && ReqObj.Form[tmpId].RemainingService.length > 0 && !ShowOtp() && ReqObj.Form[tmpId].flags.ImEqgl) {
                formatServices(ReqObj.Form[tmpId].RemainingService, tmpId);
  
                if (isSet(ReqObj.Form[tmpId].ServiceSequence)) {
                  while (ReqObj.Form[tmpId].ServiceSequence.length > 0) {
                    if (isSet(ReqObj.Form[tmpId].ServiceSequence[0]) && isSet(ReqObj.Form[tmpId].ServiceSequence[0].fn) && typeof ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit ==="function")
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
            if ( parseInt(res.Response.Code) === 204 && res.Response.Message === "OTP not Verified") {
              that.handleUI(tmpId, "verificationFailed", "afterRequest", "");
              RemoveObjFromHit(verifyObject, tmpId);
              return;
            }
          }
        } else {
          blenqGATracking(form_type,"service:OtpAuthentication:failure","response undefined",1,tmpId);
          RemoveObjFromHit(verifyObject, tmpId);
        }
      },
      error: function (res) {
        res = isSet(res) ? JSON.stringify(res) : "response undefined";
        blenqGATracking(form_type,"service:OtpAuthentication:failure",res,1,tmpId);
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
  
  // UserVerification

  // BlStaticQues
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
    var cbl_br = (pdpInactiveBL(tmpId)) ? "cbl_br10" : "";
    var width_par = (pdpInactiveBL(tmpId)) ? "width: 130px; margin-bottom: 20px;" : "";
    var inline = (pdpInactiveBL(tmpId)) ? "" : "style = 'padding-bottom:20px;'";
    var div =
      '<div id="t' +
      tmpId +
      "myDIV" +
      '" class ="inAtch '+ cbl_br + '" style ="text-align:center;clear:both;border-top:1px solid #dfd8d8;'+ width_par +'"><input type="file" id="t' +
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
    enrichObj["modid"] = ReqObj.Form[tmpId].modId;
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
        modId: ReqObj.Form[tmpId].modId,
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
          modId: ReqObj.Form[tmpId].modId,
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
        error: function (res) {},
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
    if (imeshExist() !== "" && !pdpInactiveBL(tmpId))
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
    if (ReqObj.Form[tmpId].formType.toLowerCase() !== "enq")
      $("#t" + tmpId + "_hdg")
        .removeClass("bedsnone")
        .html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
    else {
      if (
        isImageVidEnq(tmpId) &&
        ReqObj.Form[tmpId].FormSequence.StepCounter === 0
      )
        $("#t" + tmpId + "_hdg")
          .addClass("bedsnone")
          .html("");
      else
        $("#t" + tmpId + "_hdg")
          .removeClass("bedsnone")
          .html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
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
        error: function (res) {},
      });
    }
  };
  // BlStaticQues
// Reqimage prototypes
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
  if (this.funcToCall.toLowerCase() === "enq") {
    if (this.displayImage !== "") {
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




// Reqimage prototypes

// Validation


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

// Validation

// Youtube

 
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

// Youtube 
// Side initialize

/*
  Currently there are only  two sections left and right. More sections can be added ! Follow the same pattern.
  */
  function sectionInitialisationStepWise(tmpId, step) {
    leftSideInitialise(tmpId, step);
    rightSideInitialise(tmpId, step);
    if (pdpInactiveBL(tmpId)) {
      let relatedProdHtml = downSideInitialise(tmpId);
      if (!document.getElementById("recommendProd")) {
        $("#t" + tmpId + "_mcont").append(relatedProdHtml);
      }
  
      if(relatedProdHtml!=''){
          $("#recommendProd").css({
              display: "block",
          });
      }
    }
  }
  
  function downSideInitialise(tmpId) {
      let brd_mcat_id = ReqObj.Form[tmpId].mcatId;
      let forms_data = $.parseJSON(
          sessionStorage.getItem("formsPla" + brd_mcat_id)
      );
      
      return (isSet(forms_data) && forms_data.length>1) ? recomendedProds(forms_data,tmpId) : '';
  }
  
  function recomendedProds(forms_data,tmpId) {
      if(isSet(forms_data)){
          let html = `<!-- Similar Section -->
              <div id="recommendProd" class="VSP-SEC">
              <div class="vsp-heading">
                  <h3>View Similar products</h3>
              </div>
              <ul id="prodList" class="ProBoxUL">`;
          let count=0;
          forms_data.forEach((item) => {
              count+=1;
              item.ProdUrl = item.ProdUrl + '&blform=1';
              html += `<li class="berds10" id='recomProd${count}' onclick="bltrack(${count},${tmpId})">
                            <a target="_blank" href=${item.ProdUrl} class="ProBox-Item disp-inl">
                                <div class="Proimg">
                                    <img src=${item.ProdImage} />
                                </div>
                                <p class="procontent color3 atxu cbl_fs16 befwt">${item.ProdName}</p>
                                <p class="proPrice">${item.Price}</p>
                            </a>
                      </li>`;
          });
  
          html += `</ul></div>`;
          return html;
      }
  }
  function bltrack(count,tmpId){
      ReqObj.Form['0'+tmpId].inactiveBL = true;
      blenqGATracking("Inactive BL", "Prod"+count, getEventLabel(), 0, "0901");
      ReqObj.Form['0'+tmpId].inactiveBL = false;
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
    $("#t" + tmpId + "_leftsection").html(
      sectionInitialise(getSections(tmpId, ReqObj.Form[tmpId].typeofform)["left"])
    );
    $("#t" + tmpId + "_rightsection").html(
      sectionInitialise(
        getSections(tmpId, ReqObj.Form[tmpId].typeofform)["right"]
      )
    );
  }
  
  function sectionInitialise(section_obj) {
    var len = section_obj.length;
    var html = "";
    for (var i = 0; i < len; i++) {
      html +=
        returnContainer(
          section_obj[i].section_id,
          section_obj[i].section_element,
          section_obj[i].section_class,
          "",
          "",
          ""
        ) + "</div>";
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
// Side initialize

/*----------------------------------------------IntentGeneration------------------------------------------ */
  
function GenerateIntent(data) {
  var form_type =
    !isSet(data["form_type"]) || data["form_type"] === ""
      ? ""
      : data["form_type"];
  if (form_type === "")
    form_type =
      !isSet(data["formType"]) || data["formType"] === ""
        ? ""
        : data["formType"];
  data["form_type"] = form_type;
  var tmpId =
    parseInt(data["tmpId"]) === 0 || !isSet(data["tmpId"]) ? 0 : data["tmpId"];
  data["tmpId"] = "";
  if (
    data["form_type"].toLowerCase() !== "" &&
    data["form_type"].toLowerCase() === "bl"
  ) {
    var blIntent = data["BLIntent"].toLowerCase();
    if (isSet(blIntent) && blIntent !== "") {
      if (blIntent === "yes" && data["ctaName"].toLowerCase() === "mcat video")
        data["flag"] = 16;
      if (blIntent === "yes" && data["ctaName"].toLowerCase() !== "mcat video")
        data["flag"] = 14;
    }
  } //
  data = ObjectTrim(data);
  if (imeshExist() !== "") {
    var s = parseInt(data["flag"]) === 12 && tmpId !== 0 ? true : false;
    var f = tmpId !== 0 ? true : false;
    fireAjaxRequest({
      data: {
        ga: {
          gatype: "IntentGeneration",
          s: s,
          f: f,
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
        type: 0,
      },
    });
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

// MISC

  function InlineDefault(tmpId) {       
    $("#t" + tmpId + "_allBtn").html("");
    $("#t" + tmpId + "_thankDiv")
      .html("")
      .addClass("bedsnone");
    if (!ispdp(tmpId)) {
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
  function ShowStaticQuestionForeign(tmpId) {
    // if (isSet(tmpId) && tmpId.substring(0, 2) === "09") {
    //   if (parseInt(ReqObj.Form[tmpId].disableIsq) !== 1 && currentISO() !== "IN") return true;
    //   return false;
    // }
    return false;
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
      var bfstgo = pdpInactiveBL(tmpId)?(iso=="IN")?"befstgobl":"bfstgobl":(iso=="IN")?"befstgo":"befstgo1";
      var bfsbtnbl = pdpInactiveBL(tmpId)? "bfsbtnbl hovsub" : "befstbtn hovsub";
      var valuebtn = pdpInactiveBL(tmpId)? "Continue" : "Go";
      var gobtn =pdpInactiveBL(tmpId) ? " gobtn": "";
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
          var mt0 = pdpInactiveBL(tmpId) ? (new RegExp("moredetails").test(currentScreen) || (new RegExp("contactdetail").test(currentScreen) && ReqObj.Form[tmpId].FormSequence._screenCounter > 0) ) ? " mt20" : " bemt0":"";
          var btn_cls = pdpInactiveBL(tmpId) && currentISO()=="IN" ? " blbtn" : "";
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
          var mt0 = pdpInactiveBL(tmpId)? (new RegExp("blstaticques").test(currentScreen)  ) ? "mt20" : "mt2" : "";
          var btn_cls = pdpInactiveBL(tmpId) && currentISO()=="IN" ? " blbtn" : "";
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
    if (isImageVidEnq(tmpId)) btnObj.buttonCls += direnqImage(tmpId)?" btmarg befwt": " befwt";
    return btnObj;
  } 
  function stepNextButton(typeofform, tmpId, currentScreen) {
    var btnObj = restScreensButton(typeofform, tmpId, currentScreen); //rest screens
    backButtonNameUI(tmpId);
    return btnObj;
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
  function flagwrapper(message) {
    return '<div class="cbl_flag">' + message + "</div>";
  }

  function OpenBLEnqPopup(tmpId) {
    isBLFormOpen = true;
    var imeshcookie = imeshExist();
    $("#t" + tmpId + "_leftS").removeAttr("style");
    if (!pdpenqImage(tmpId)) {
      $("#t" + tmpId + "_thankDiv").removeClass("eqTst eqRes");
      $("#t" + tmpId + "_mcont").removeClass("eqTst eqRes");
    }
    if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
      if (imeshcookie === "") $("#t" + tmpId + "_leftR").addClass("lftMgn");
      else if (!pdpInactiveBL(tmpId))
        $("#t" + tmpId + "_leftR").removeClass("lftMgn");
      $("#t" + tmpId + "_thankDiv").addClass("oEq");
      $("#t" + tmpId + "_mcont").addClass("oEq");
      $("#t" + tmpId + "_mcont").removeClass("eqImSec");
      $("#t" + tmpId + "_thankDiv").removeClass("eqImSec");
      if (currentISO() !== "IN") $("#t" + tmpId + "_thankDiv").addClass("fnUser");
    } else {
      if (
        ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
        tmpId.substring(0, 2) === "09"
      ) {
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
    if (               //bl-inline bug
        ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
        tmpId.substring(0, 2) === "01"
      ){
        $("#t" + tmpId + "_thankDiv").removeClass("eqImSec");
      }
    if (currentISO() === "IN") $("#t" + tmpId + "_thankDiv").removeClass("nfusr");
    $("#t" + tmpId + "_thankDiv").removeClass("BL_Thnky");
    $("#t" + tmpId + "_bewrapper")
      .removeClass("bedsnone")
      .css({
        display: "block",
      });
    if (!isMoglixUi(tmpId)) {
      $("#t" + tmpId + "_blkwrap").removeClass("e_bgc");
      $("#t" + tmpId + "_bewrapper").removeClass("e_opn");
      if ($("#t" + tmpId + "OtpMainHeading").hasClass("e_hdg"))
        $("#t" + tmpId + "OtpMainHeading").remove();
      if (
        $("#t" + tmpId + "_mcont")
          .parent()
          .hasClass("e_whm")
      )
        $("#t" + tmpId + "_mcont")
          .parent()
          .removeClass()
          .addClass("be-frmcont");
      if (!ispdp(tmpId)) {
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
        $("#t" + tmpId + "_leftR")
          .removeClass()
          .addClass("be-Rsc be-frmpop");
      }
      if (pdpInactiveBL(tmpId)) {
        $("#t" + tmpId + "_leftR")
          .removeClass()
          .addClass("be-Rsc be-frmpop lftMgn be-Rsc2 cbl_br8");
      }
    } else if (isMoglixUi(tmpId)) {
      $("#t" + tmpId + "_blkwrap").addClass("e_bgc");
      $("#t" + tmpId + "_leftR")
        .removeClass()
        .addClass("e_p20");
      $("#t" + tmpId + "_bewrapper").addClass("e_opn");
      $("#t" + tmpId + "_mcont")
        .parent()
        .removeClass()
        .addClass("e_whm");
      $("#t" + tmpId + "_mcont")
        .removeClass()
        .css({
          display: "",
        });
    }
  
    updateKeyTypeOfForm(tmpId);
    initialiseOuterSection(tmpId); // left and right sections initialisation
    sectionInitialisationStepWise(tmpId, 0); // step wise intialisation
    if (
      !(
        isSet(ReqObj.Form[tmpId].zoomImage) && ReqObj.Form[tmpId].zoomImage !== ""
      ) &&
      ReqObj.mcatdtl.ping === true &&
      ReqObj.mcatdtl.response === false
    )
      $("#t" + tmpId + "_imglodr").removeClass("bedsnone");
    else $("#t" + tmpId + "_imglodr").addClass("bedsnone");
    $("#search_string").blur();
    stopBgScroll();
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
  function stopBgScroll() {
    $(".gl-wrapper").css("width", ReqObj[windowctrlscroll] + "px");
    $("html").addClass("scroll_layout");
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
function ConversationCenterWrapper(tmpId, message) {
  /* add attributes at end  */
  if (isSet(message) && message !== "")
    if (!IsChatbl(tmpId))
      return '<div class="chat-mblV chat-blH">' + message + "</div>";
    else return '<div class ="cbl_verfy">' + message + "</div>";
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

function RemoveService(arr, ObjectToFind) {
  if (isSet(arr)) {
    for (var i = 0; i < arr.length; i++) {
      if ( isSet(arr[i].fn) && ConstructorName(arr[i].fn).toLowerCase() === ObjectToFind.toLowerCase()) {
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
function currentIpCountry() {
  return usercookie.getParameterValue(usercookie.getCookie("iploc"), "gcnnm");
}
function detachFlag2(tmpId) {
  var ele = $("#t" + tmpId + "country_dropd").detach();
  $("#t" + tmpId + "flagdiv2").append(ele);
}function onPlayerStateChange(event) {
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
  
  // MISC

  //Heading
  function defaultScreenMsg(ctanamemodid, tmpId, ctaname) {
    return isEnq(tmpId)
      ? direnqImage(tmpId) ? "" : "Please provide a few details to get quick response from the supplier"
      : imeshExist() === ""
      ? getLoginHeading(ctanamemodid, tmpId, ctaname)
      : loginDefaultmsg(tmpId, ctaname, "Connect with ");
  }
  
  function loginGetmsg(tmpId, msg, addon) {
    var usertype = currentISO() !== "IN" ? "email" : "mobile";
    var hcls = isMoglixUi(tmpId) ? "BL_Fwb" : "befwt";
    return (
      returnSpan("", "", msg, hcls) +
      " " +
      addon +
      ' from "' +
      ReqObj.Form[tmpId].rcvName +
      '" on your ' +
      usertype +
      " quickly"
    );
  }
  
  function loginGetmsgSpecialCase(tmpId, msg, addon) {
    var usertype = currentISO() !== "IN" ? "email" : "mobile";
    return (
      returnSpan("", "", msg, "befwt") +
      " " +
      addon +
      " on your " +
      usertype +
      " quickly"
    );
  }
  
  function loginDefaultmsg(tmpId, ctaname, msg) {
    if (isImageVidEnq(tmpId))
      return (
        returnSpan("", "", "Get Best Quotes", "befwt") +
        " for " +
        ReqObj.Form[tmpId].prodName
      );
    else
      return (
        msg + '"' + returnSpan("", "", ReqObj.Form[tmpId].rcvName, "befwt") + '"'
      );
  }
  
  function contactLogMsg(tmpId, ctaname, msg) {
    return msg + '"' + ReqObj.Form[tmpId].rcvName + '" for more information';
  }
  
  function contactMsg(tmpId, ctaname) {
    if(direnqImage(tmpId)){
      return "";
    }
    else{
      return returnSpan("", "", "Supplier wants to know more about you", "befwt");
    }
    // return returnSpan("", "", "Supplier wants to know more about you", "befwt");
  }
  
  function getLoginHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "get best quote":
        return loginGetmsg(tmpId, ctaname, "");
      case "get quote":
        return loginGetmsg(tmpId, ctaname, "");
      case "get latest price":
        return loginGetmsg(tmpId, ctaname, "and details");
      case "inlineenq":
        return loginDefaultmsg(tmpId, ctaname); //
      case "send email":
        return loginDefaultmsg(tmpId, ctaname, "Connect with "); //
      case "send sms":
        return loginDefaultmsg(tmpId, ctaname, "Connect with "); //
      case "contact seller":
        return loginGetmsgSpecialCase(tmpId, "Contact Seller", "and get details");
      case "contact seller_next":
        return loginGetmsgSpecialCase(tmpId, "Contact Seller", "and get details");
      case "contact seller_pre":
        return loginGetmsgSpecialCase(tmpId, "Contact Seller", "and get details");
      case "contact supplier":
        return loginGetmsgSpecialCase(
          tmpId,
          "Contact Supplier",
          "and get details"
        );
      case "click to call":
        return loginDefaultmsg(tmpId, ctaname, "Connect with "); //
      case "ask price":
        return loginGetmsg(tmpId, "Ask for price", "and details");
      case "ask for price":
        return loginGetmsg(tmpId, "Ask for price", "and details");
      case "no price":
        return loginGetmsg(tmpId, "Ask for price", "and details");
      case "request a call back":
        return loginGetmsg(tmpId, "", "Request a Call Back ");
      case "contact now":
        return contactLogMsg(tmpId, ctaname, "Contact ");
      default:
        return loginDefaultmsg(tmpId, ctaname, "Connect with ");
    }
  }
  
  function getContactHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "all":
        return contactMsg(tmpId, ctaname);
      /*Do not remove this code*/
      // case "get best quote": return loginDefaultmsg(tmpId, ctaname);
      // case "get quote": return loginDefaultmsg(tmpId, ctaname);
      // case "get latest price": return loginDefaultmsg(tmpId, ctaname);
      // case "inlineenq": return loginDefaultmsg(tmpId, ctaname);
      // case "send email": return loginDefaultmsg(tmpId, ctaname);
      // case "send sms": return loginDefaultmsg(tmpId, ctaname);
      // case "contact seller": return loginDefaultmsg(tmpId, ctaname);
      // case "contact seller_next": return loginDefaultmsg(tmpId, ctaname);
      // case "contact seller_pre": return loginDefaultmsg(tmpId, ctaname);
      // case "click to call": return loginDefaultmsg(tmpId, ctaname);
      // case "ask price": return loginDefaultmsg(tmpId, "Ask Price");
      // case "ask for price": return loginDefaultmsg(tmpId, "Ask Price");
      // case "no price": return loginDefaultmsg(tmpId, "Ask Price");
      // case "request a call back": return loginGetmsg(tmpId, "", "get a Call Back");
      // case "contact now": return contactLogMsg(tmpId, ctaname, "Contact ");
      /* Do not remove this code*/
      default:
        return loginDefaultmsg(tmpId, ctaname, "Connect with ");
    }
  }
  
  function returnIsqHeading(tmpId, ctaname) {
    return isSet(ReqObj.Form[tmpId].ctaheadingappend) &&
      ReqObj.Form[tmpId].ctaheadingappend === true
      ? returnSpan("", "", ctaname, "befwt") +
          "\n" +
          " by adding a few details of your requirement"
      : "Adding a few details of your requirement can get you quick response from the supplier";
  }
  
  function getIsqHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "get best quote":
        return returnIsqHeading(tmpId, "Get Best Quote");
      case "get quote":
        return returnIsqHeading(tmpId, "Get Quote");
      case "get latest price":
        return returnIsqHeading(tmpId, "Get Latest Price");
      case "contact seller":
        return returnIsqHeading(tmpId, "Contact Seller");
      case "contact seller_next":
        return returnIsqHeading(tmpId, "Contact Seller");
      case "contact seller_pre":
        return returnIsqHeading(tmpId, "Contact Seller");
      case "contact supplier":
        return returnIsqHeading(tmpId, "Contact Supplier");
      case "ask price":
        return returnIsqHeading(tmpId, "Ask Price");
      case "ask for price":
        return returnIsqHeading(tmpId, "Ask for price");
      //case 'all': return "Adding a few details of your requirement can get you quick response from the supplier";
      default:
        if(direnqImage(tmpId)){
          return "";
        }
        else{
          return "Adding a few details of your requirement can get you quick response from the supplier";
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
        if(direnqImage(tmpId)){
          return "";
        }
        else{
          return "Confirm your requirement";
        }
        // return "Confirm your requirement";
      default:
        return defaultCaseHeading(ctanamemodid, tmpId, ctaname);
    }
  }
  
  function getBlStaticIsqReqHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "all":
        if(direnqImage(tmpId)){
          return "";
        }
        else{
          return "Almost done!";
        }
        // return "Almost done!";
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
  //Heading