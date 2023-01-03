
  function returnmdtlObject(array, hooks, tmpId, that, countlastUpdated, md) {
    var Obj = {
      object: {
        obj: new MoreDetails(tmpId),
        toReplace: false,
        isService: false,
        array: array,
        hooks: hooks,
        countlastUpdated: countlastUpdated,
      },
      tmpId: tmpId,
      that: that,
      AfterService: [],
      hasFallback: false,
      FallbackObj: null,
      md: md,
    };
    return Obj;
  }
  
  function toAskMoreDetails(tmpId) {
    var cn = cNameConditions(tmpId);
    var gst = gstConditions(tmpId);
    if (cn === true) return { ask: true, what: "Company Name", key: 0 };
    else if (gst === true) return { ask: true, what: "GST Number", key: 1 };
    return { ask: false, what: "", key: -1 };
  }  
  var addScrollingInDdBl = function (eleId) {
    var d = "";
    $("#" + eleId + " div ul li").click(function () {
      return (
        (d = $("#" + eleId + " div ul li").index(this)),
        $("#" + eleId + " div ul li").removeClass("selected"),
        $("#" + eleId + " div ul li:eq(" + d + ")").addClass("selected"),
        $("#" + eleId)
          .children("div")
          .hide()
      );
    });
  };
  
  var activateDropDownBl = function (eleId) {
    $("#" + eleId + " dt a").click(function () {
      document.getElementById(eleId).getAttribute("disabled") ||
        ($("#" + eleId)
          .children("div")
          .toggle(),
        $("#" + eleId + " ul li:first-child").focus());
    });
    $(document).bind("click", function (e) {
      var t = $(e.target);
      if (t.context.id.substr(6) === "flagInput") return;
      t.parents().hasClass("dropdown") ||
        $("#" + eleId)
          .children("div")
          .hide();
    });
  };
  
  var flagRes = function (tmpId) {
    ReqObj.Form[tmpId].flagSuggCalledOnce = true;
    var eleId = "t" + tmpId + "country_dropd";
    var current_iso = currentISO();
    var countryText = "";
    var countryUi = "";
  
    $.each(flagResList, function (t) {
      flagResList[t].id = tmpId;
      if (isSet(flagResList[t].data.iso) && current_iso.toLowerCase() === flagResList[t].data.iso.toLowerCase()) {
        countryUi = flagResList[t];
      }
      countryText +=
        "<li onclick='javascript:setCountryISO(event," +
        JSON.stringify(flagResList[t]).replace(/'/g, "\xE2\u20AC\u2122") +
        ")'><span style=\"background-position:0px -" +
        11 * flagResList[t].data.icon_order +
        'px"></span><a>' +
        flagResList[t].label +
        "</a></li>";
    });
  
    $("#" + eleId + " ul").append(countryText);
  
    addScrollingInDdBl(eleId);
  
    if (isSet(ReqObj.Form[tmpId].flags)) {
      ReqObj.Form[tmpId].flags.isFlagSuggSet = true;
    }
  
    setCountryISO(undefined, countryUi);
  };
  
  FlagSuggestor.prototype.setFlagSuggestor = function (tmpId, fromwhere) {
    var that = this;
    that.tmpId = tmpId;
    that.fromwhere = fromwhere;
    var eleId = "t" + tmpId + "country_dropd";
    ReqObj["showcountry"] = false;
  
    addTemplates(tmpId, template_array);
  
    if (imeshExist() === "") {
      if (
        fromwhere !== "load" &&
        isSet(that.hitObject) &&
        isSet(that.hitObject[tmpId]) &&
        that.hitObject[tmpId] === true
      )
        return;
      else {
        if (
          fromwhere === "load" &&
          isSet(that.hitObject) &&
          isSet(that.hitObject[tmpId]) &&
          that.hitObject[tmpId] === true &&
          ReqObj["showcountry"]
        )
          return;
        else that.hitObject[tmpId] = true;
      }
  
      if (!$("#" + eleId).html()) {
        var dropdownText =
          '<dt><a><span></span><div class="as_arrow"></div></a><span class="value" ></span></dt>';
        dropdownText +=
          "<div class=\"eqAts\"><input type='text' name='" +
          tmpId +
          "' placeholder='Search..' onkeyup='javascript:filterFunction(event)' id='t" +
          tmpId +
          "_flagInput'><ul></ul></div>";
        $("#" + eleId).append(dropdownText);
  
        flagRes(tmpId);
        activateDropDownBl(eleId);
      }
    }
  };
  
  function savelogin(tmpid, ui) {
    if (
      isSet(ui["data"].iso) && ui["data"].iso != "IN" &&
      $("#t" + tmpid + "_login_field")
        .attr("placeholder")
        .includes("email") &&
      notempty("#t" + tmpid + "_login_field")
    ) {
      savenem(tmpid);
    } else {
      ReqObj.Form[tmpid]["savevalue"] = { flogin: "" };
      ReqObj.Form[tmpid]["savevalue"]["fname"] = "";
    }
  }
  
  function saveQuantity(tmpid) {
    var qun = "",
      qununit = "";
    if (notempty("#t" + tmpid + "txtbx_option1")) {
      qun = $("#t" + tmpid + "txtbx_option1").val();
      qununit = $("#t" + tmpid + "txtbx_option2").val();
    }
    ReqObj.Form[tmpid].userFilledIsq = [
      { questionsDesc: "Quantity", optionsValue: qun },
      { questionsDesc: "Quantity Unit", optionsValue: qununit },
    ];
  }
  
  
  function rvalue(tmpId, id) {
    if (
      isSet(ReqObj.Form[tmpId]["savevalue"]) &&
      isSet(ReqObj.Form[tmpId]["savevalue"][id]) &&
      ReqObj.Form[tmpId]["savevalue"][id] != ""
    ) {
      var loginv = ReqObj.Form[tmpId]["savevalue"][id];
      ReqObj.Form[tmpId]["savevalue"][id] = "";
      return loginv;
    } else return "";
  }
  function savemc(tmpid) {
    ReqObj.Form[tmpid]["savevalue"]["evalue"] = $("#t" + tmpid + "_q_email_in1")
      .length
      ? $("#t" + tmpid + "_q_email_in1").val()
      : "";
    ReqObj.Form[tmpid]["savevalue"]["cvalue"] = $("#t" + tmpid + "_q_city_oth1")
      .length
      ? $("#t" + tmpid + "_q_city_oth1").val()
      : "";
  }
  function savenem(tmpid) {
    ReqObj.Form[tmpid]["savevalue"] = {
      flogin: $("#t" + tmpid + "_login_field").length
        ? $("#t" + tmpid + "_login_field").val()
        : "",
    };
    ReqObj.Form[tmpid]["savevalue"]["fname"] = $("#t" + tmpid + "_q_first_nm1")
      .length
      ? $("#t" + tmpid + "_q_first_nm1").val()
      : "";
    if (isSSB(tmpid)) {
      ReqObj.Form[tmpid]["savevalue"]["mobval"] = $("#t" + tmpid + "_q_mobile_f1")
        .length
        ? $("#t" + tmpid + "_q_mobile_f1").val()
        : "";
    }
  }
  
  function UpdateISO(iso, countryName) {
    ReqObj.changeUserIso = iso;
    ReqObj.changeUserCountry = countryName;
  }
    
  function closeFormCond(tmpId) {
    return (isEnq(tmpId) || isBl(tmpId)) &&
      (!ReqObj.Form[tmpId].generationCalled ||
        !$("#t" + tmpId + "_thankDiv").hasClass("bedsnone"))
      ? true
      : false;
  }
  
  function setCountryName(tmpId) {
    if (isSet(ReqObj["CountryName"]) && $("#t" + tmpId + "country").length) {
      var ele = $("#t" + tmpId + "country_dropd").detach();
      if (ReqObj["CountryName"].includes("Lao People"))
        $("#t" + tmpId + "country").text("Lao People's Democratic Republic");
      else $("#t" + tmpId + "country").text(ReqObj["CountryName"]);
      $("#t" + tmpId + "country").append(ele);
      if ($("#t" + tmpId + "country").height() > 18) {
        $("#t" + tmpId + "country").addClass("eHcnty");
      } else {
        $("#t" + tmpId + "country").removeClass("eHcnty");
      }
    }
  }  
  
  
  function FormCloseStep(tmpId, event) {
    var form_type =ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : (pdpInactiveBL(tmpId))? "Post Buy Leads New" : "Post Buy Leads";
    var that = ReqObj.Form[tmpId].FormSequence || {};
    var hasBedsnone = $("#t" + tmpId + "_thankDiv").hasClass("bedsnone");
    var ClassesforTracking = "CloseStep:";
    ReqObj.Form[tmpId].IsthroughClosebtn = true;
    if (ReqObj.Form[tmpId].IsbackClicked === true) {
      ReqObj.Form[tmpId].IsbackClicked = false;
      that.StepCounter += 1;
    }
    if (!ReqObj.Form[tmpId].generationCalled || !hasBedsnone) {
      if (!ReqObj.Form[tmpId].generationCalled) {
        if (that.StepCounter > -1) {
          ClassesforTracking += that.StepCounter + 1 + ":";
          if (isSet(ReqObj.Form[tmpId].UiArray[that.StepCounter])) {
            for (var i = 0;i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length;i++) {
              if (i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length &&i > 0)
                ClassesforTracking += "-";
              ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
            }
          }
          blenqGATracking(form_type,ClassesforTracking,getEventLabel(),0,tmpId);
          CloseForm(tmpId);
        } else {
          CloseForm(tmpId);
        }
      } else if (!hasBedsnone) {
          that.OnCloseCounter = parseInt(that.OnCloseCounter, 10);
          that.StepCounter = parseInt(that.StepCounter, 10);
          if (that.OnCloseCounter > -1) {
              ClassesforTracking +=that.StepCounter + 1 + (that.OnCloseCounter + 1) + ":";
              if (isSet(ReqObj.Form[tmpId].OnCloseArray) &&isSet(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter])) {
                  for (var i = 0;i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length;i++) {
                      if (i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length &&i > 0)
                      ClassesforTracking += "-";
                      ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter][i].Obj);
                  }
              }
              blenqGATracking(form_type,ClassesforTracking,getEventLabel(),0,tmpId);
              CloseForm(tmpId);
          } else {
              ClassesforTracking += that.StepCounter + 1 + 1 + ":ThankYou";
              CloseForm(tmpId);
          }
      }
    } else {
      var constructor = "";
      if (isSet(ReqObj.Form[tmpId].OnCloseStep) && !ReqObj.Form[tmpId].OnCloseStep) {
          ClassesforTracking += that.StepCounter + 1 + ":";
          if (isSet(ReqObj.Form[tmpId].UiArray[that.StepCounter])) {
              for (var i = 0;i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length;i++) {
              if (i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length && i > 0)
                  ClassesforTracking += "-";
              constructor += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
              ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
              }
          }
          blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
          if (isBl(tmpId) || isEnq(tmpId)) {
              ReqObj.Form[tmpId].FormSequence._screen7(tmpId);
          } else ReqObj.Form[tmpId].FormSequence.OnCloseSeq(tmpId);
      } else {
          ClassesforTracking +=that.StepCounter + 1 + (that.OnCloseCounter + 1) + ":";
          if (isSet(ReqObj.Form[tmpId].OnCloseArray) &&isSet(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter])) {
              if (isSet(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter])) {
                  for (var i = 0;i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length;i++) {
                      if (i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length &&i > 0)
                          ClassesforTracking += "-";
                      ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter][i].Obj);
                  }
              }
          }
          blenqGATracking(form_type,ClassesforTracking,getEventLabel(),0,tmpId);
          ReqObj.Form[tmpId].FormSequence.OnClosegetStep(tmpId);
      }
    }
  }
  
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
  
  function toFireGeneration(tmpId, type) {
    var toreturn = true;
    if (isEnq(tmpId)) {
      toreturn = isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" ? true : false;
      toreturn = isSet(type) && type === "intent" ? false : toreturn;
      if ( toreturn === false && isSet(ReqObj.Form[tmpId].enqintentCalled) && ReqObj.Form[tmpId].enqintentCalled === false)
        toFireEnqIntent(tmpId);
      ReqObj.Form[tmpId].toFireIsq = toreturn === true || (toreturn === false && isSet(ReqObj.Form[tmpId].generationId) && parseInt(ReqObj.Form[tmpId].generationId) !== defaultGenerationId) ? true : false;
    } else if (isBl(tmpId)) {
      toreturn = Bl01(tmpId) && ReqObj.Form[tmpId].screenNumber < 2 && isSecondBl() && ReqObj.UserDetail["uv"] !== "V" && !ReqObj.Form[tmpId]._NCOnFrstScrn ? false : isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" ? true : false;
      if ( Bl09(tmpId) && isSecondBl() && ReqObj.UserDetail["uv"] !== "V" && _mandatDetailsFilled() && !ReqObj.Form[tmpId]._NCOnFrstScrn)
        toreturn = false;
      if (Bl04(tmpId) && isSecondBl() && ReqObj.UserDetail["uv"] !== "V") {
        if ( !_mandatDetailsFilled() || (_mandatDetailsFilled() && !ReqObj.Form[tmpId]._NCOnFrstScrn && isSet(ReqObj.Form[tmpId].intentCalled) && ReqObj.Form[tmpId].intentCalled === false))
          toreturn = false;
      }
  
      if ( toreturn === false && isSet(ReqObj.Form[tmpId].intentCalled) && ReqObj.Form[tmpId].intentCalled === false)
        toFireBLIntent(tmpId, "");
      ReqObj.Form[tmpId].toFireIsq = toreturn === true ? true : false;
    } else if ( ReqObj.Form[tmpId].formType.toLowerCase() === "bl" || IsChatbl(tmpId)) {
      if ( ReqObj.UserDetail["uv"] === "V" || (ReqObj.UserDetail["uv"] !== "V" && !isSecondBl()))
        toreturn = isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" ? true : false;
      if (ReqObj.UserDetail["uv"] !== "V" && isSecondBl()) toreturn = false;
      if ( toreturn === false && isSet(ReqObj.Form[tmpId].intentCalled) && ReqObj.Form[tmpId].intentCalled === false)
        toFireBLIntent(tmpId, "");
      ReqObj.Form[tmpId].toFireIsq = toreturn === true ? true : false;
    } else toreturn = true;
  
    ReqObj.Form[tmpId].toFireIsq = isSet(ReqObj.Form[tmpId].generationId) && parseInt(ReqObj.Form[tmpId].generationId) !== defaultGenerationId ? true : ReqObj.Form[tmpId].toFireIsq;
  
    return toreturn;
  }
  
  function toFireEnqIntent(tmpId) {
    if ( (Enq09(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0) || ((ReqObj.Form[tmpId].FormSequence._stepCounter === 1 || ReqObj.Form[tmpId].FormSequence._stepCounter === 0) && Enq04(tmpId))) {
      new Generation(1, 1).onSubmit(tmpId);
      ReqObj.Form[tmpId].enqintentCalled = true;
    } else ReqObj.Form[tmpId].enqintentCalled = false;
  }
  
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
  
  /*-------------------------Communication Headings-------------------------------------------*/
  function getEnqHeading(tmpId, fromscreen) {
    if (pdpenqImage(tmpId)) return "";
    var ctanamemodid = ReqObj.Form[tmpId].ctaName.toLowerCase().trim();
    if (
      tmpId.substring(0, 2) !== "09" &&
      ReqObj.Form[tmpId].FormSequence.StepCounter === 0
    )
      return defaultCaseHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
    var fromscreen = fromscreen.toLowerCase();
    switch (fromscreen) {
      case "userlogin":
        return getLoginHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
      case "userlogincontactdetail":
        return getLoginHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
      case "contactdetail":
        return getContactHeading("all", tmpId, ReqObj.Form[tmpId].ctaName);
      case "isq":
        return getIsqHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
      case "isqrequirementdtl":
        return currentISO() === "IN"
          ? getBlStaticIsqReqHeading("all", tmpId, ReqObj.Form[tmpId].ctaName)
          : getIsqHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
      case "requirementdtl":
        return getReqHeading("all", tmpId, ReqObj.Form[tmpId].ctaName);
      case "blstaticques":
        return getBlStaticIsqReqHeading("all", tmpId, ReqObj.Form[tmpId].ctaName);
      case "contactdetailonclosein":
        return getContactDetailOnCloseInHeading(
          "all",
          tmpId,
          ReqObj.Form[tmpId].ctaName
        );
      case "contactdetailonclosenotin":
        return getContactDetailOnCloseNotInHeading(
          "all",
          tmpId,
          ReqObj.Form[tmpId].ctaName
        );
      case "userverification":
        return getUserVerificationHeading(
          "all",
          tmpId,
          ReqObj.Form[tmpId].ctaName
        );
      case "userverificationonclose":
        return getUserVerificationHeading(
          "all",
          tmpId,
          ReqObj.Form[tmpId].ctaName
        );
      case "moredetailscompanyname":
        return "Provide your company name to get quick response from supplier";
      case "moredetailsgst":
        return "Provide your GST number to get quick response from supplier";
      default:
        return defaultScreenMsg(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
    }
  }
  
  function getBLHeading(tmpId, fromscreen) {
    var iso = currentISO();
    if (
      ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" &&
      Bl04(tmpId) &&
      ReqObj.Form[tmpId].FormSequence._screenCounter === 0
    )
      return "<div class='beclrW be-bgb cbl_p10 txt-cnt' style='font-size: 18px;'>Tell us what you need</div>";
    if (
      tmpId.substr(0, 2) === "01" &&
      isGlIdEven(tmpId) &&
      ReqObj.Form[tmpId].screenNumber < 0
    ) {
      var heading = "Tell us what you need, and we'll help you get quotes";
      heading =
        iso != "IN"
          ? pdpBL(tmpId)
            ? "Save Time! Get <strong>verified exporters</strong> shipping to " +
              isoCountries[currentISO()]
            : "Save Time! Get verified sellers exporting to " +
              isoCountries[currentISO()]
          : heading;
      return heading;
    }
    //ff_here
    var _case =
      (ReqObj.Form[tmpId].FormSequence._screenCounter === 0 ||
        ReqObj.Form[tmpId].FormSequence._screenCounter === 1) &&
      Bl04(tmpId)
        ? -1
        : 0;
    if (iso === "IN" && _case !== -1) {
      var mainHeading = "";
      var subHeading = "";
      fromscreen = fromscreen.toLowerCase();
      if (fromscreen.includes("productname")) {
        mainHeading = "Looking to buy something?";
        subHeading =
          "Tell us your requirement and get free quotes from multiple sellers";
      } else if (fromscreen === "contactdetail") {
        mainHeading = "We want to know more about you!";
        subHeading = "Please provide a few details to get quotes on your mobile";
      } else if (fromscreen === "isq") {
        mainHeading = "Share more details about your requirement";
        subHeading = "Add a few details to connect with relevant suppliers";
        if (ReqObj.Form[tmpId].prevCount > 3) {
          mainHeading = "Share more details about your requirement";
          subHeading = "Add a few more details to submit your requirement";
        }
      } else if (
        fromscreen.includes("blstaticques") ||
        fromscreen.includes("requirementdtl")
      ) {
        mainHeading = "Few more details to get your requirement fulfilled";
        subHeading = "Share a few more information and get best quotes";
      } else if (
        fromscreen.includes("contactdetail_last") ||
        fromscreen.includes("moredetails") ||
        fromscreen === "default"
      ) {
        mainHeading = "Just one step away to connect with verified sellers";
        subHeading = "Enter your remaining contact details";
      } else if (fromscreen === "userverification") {
        var imeshcookie = imeshExist();
        var phonenumber =
          "+" +
          usercookie.getParameterValue(imeshcookie, "phcc") +
          "-" +
          usercookie.getParameterValue(imeshcookie, "mb1");
        mainHeading = "Verify your mobile number to receive quotes";
        // subHeading = "Enter the 4 digit One Time Password (OTP) sent to your Mobile Number " + phonenumber;
      }
      let bemb = pdpInactiveBL(tmpId) ? "bemb8" : "bemb20";
      return (
        "<div class='otphdg'>" +
        mainHeading +
        `</div><div class='befs16 blotp ${bemb}'>` +
        subHeading +
        "</div>"
      );
    } else {
      var blmsg = "Save Time! Get verified sellers ";
      blmsg +=
        iso !== "IN"
          ? "exporting to " +
            isoCountries[iso] +
            "<div class='cbl_fs17 eqmb10 bemt10 beclr3'>Requirement for: <span class='befwt'>" +
            ReqObj.Form[tmpId].prodName +
            "</span></div>"
          : "for " + ReqObj.Form[tmpId].prodName;
      if (
        tmpId.substring(0, 2) !== "09" &&
        ReqObj.Form[tmpId].FormSequence.StepCounter === 0 &&
        fromscreen !== "ContactDetailonclosenotin"
      )
        return tmpId.substring(0, 2) === "04"
          ? ""
          : isSet(ReqObj.Form[tmpId].prodName) &&
            ReqObj.Form[tmpId].prodName !== ""
          ? blmsg
          : "Tell us your requirement";
      else
        return currentISO() === "IN"
          ? tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId)
            ? "Adding few details can get you a quick response"
            : "Tell us what you need, and we'll help you get quotes"
          : pdpBL(tmpId)
          ? "Receive quotations from <strong>verified exporters</strong> shipping to " +
            isoCountries[currentISO()]
          : "Receive quotations from verified suppliers exporting to " +
            isoCountries[currentISO()];
    }
  }
  
  function getChatBlHeading(tmpId, fromscreen) {
    return "Tell us your requirement to Get Best Price";
  }
  
  function getFormHeading(tmpId, fromscreen) {
    var formType = ReqObj.Form[tmpId].formType.toLowerCase();
    switch (formType) {
      case "enq":
        return getEnqHeading(tmpId, fromscreen);
      case "bl":
        return getBLHeading(tmpId, fromscreen);
      case "chatbl":
        return getChatBlHeading(tmpId, fromscreen);
    }
  }
  
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
  
  function defaultCaseHeading(ctanamemodid, tmpId, ctaname) {
    switch (ctanamemodid) {
      case "sticky right":
        return "";
      default:
        return isSet(ReqObj.Form[tmpId].heading) &&
          ReqObj.Form[tmpId].heading.trim() !== ""
          ? ReqObj.Form[tmpId].heading
          : "Send Enquiry to the Seller";
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
  //
  /*
   * DO NOT REMOVE
   * touch at your own risk
   */
  var defaultGenerationId = 1;
  var flagsugg = new FlagSuggestor();
  var usercookie = new UserCookie();
  /*
   * DO NOT REMOVE
   * touch at your own risk
   */
  
  function ClearSeqArrays(tmpId) {
    ReqObj.Form[tmpId]["UiArray"] = [];
    ReqObj.Form[tmpId]["ServiceSequence"] = [];
    ReqObj.Form[tmpId]["HitArray"] = [];
    ReqObj.Form[tmpId]["OnCloseArray"] = [];
  }
  
  function IsqKeys(tmpId) {
    ReqObj.Form[tmpId].IsqArray = "";
    ReqObj.Form[tmpId].prevCount = 0;
    ReqObj.Form[tmpId].stopper = 0;
    ReqObj.Form[tmpId].IsqLength = 0;
    ReqObj.Form[tmpId].IsqDiv = 0;
    ReqObj.Form[tmpId].isqScreen = 0;
    ReqObj.Form[tmpId].isqSubmitted = 0;
    ReqObj.Form[tmpId].questionCount = 0;
    ReqObj.Form[tmpId].questionsId = [];
    ReqObj.Form[tmpId].questionsDesc = [];
    ReqObj.Form[tmpId].optionsId = [];
    ReqObj.Form[tmpId].optionsValue = [];
    ReqObj.Form[tmpId].Isq = {};
    ReqObj.Form[tmpId].Isq.CurrentPageQuestions = [];
    ReqObj.Form[tmpId].Isq.CurrentScreenAnswers = "";
    ReqObj.Form[tmpId].toGetCurrentPagestring = false;
    ReqObj.Form[tmpId].toGetQuestionsOnly = false;
    ReqObj.Form[tmpId].Isq.getIsqQuestionString = [];
    ReqObj.Form[tmpId].Isq.currentQuestionString = [];
    ReqObj.Form[tmpId].requireNow = false;
    ReqObj.Form[tmpId].isQuantIsq = false;
    ReqObj.Form[tmpId].isQtutShown = false;
    ReqObj.Form[tmpId].QtUtError = false;
    ReqObj.Form[tmpId].qutAnswers = [];
    ReqObj.Form[tmpId].IsqQtUtEvents = {
      onselect: false,
    };
    ReqObj.Form[tmpId].unitSuggester = []; // empty array while initialising
    ReqObj.Form[tmpId].qtutchange = {
      quantity: "empty",
      unit: "prefilled",
    }; // fine
    ReqObj.Form[tmpId].qtUtQuesPresent = false;
    ReqObj.Form[tmpId].noSampling = false;
  }
  
  function ContactDetailKeys(tmpId) {
    ReqObj.Form[tmpId].ContactDetail = {};
  }
  
  function RdBoxKeys(tmpId, reqBx) {
    ReqObj.Form[tmpId].ReqDtlBox = isSet(ReqObj.Form[tmpId].ReqDtlBox)
      ? ReqObj.Form[tmpId].ReqDtlBox
      : "";
    ReqObj.Form[tmpId].flags.isDescDivShown =
      isSet(reqBx) && reqBx !== "" ? reqBx : false;
    ReqObj.Form[tmpId].ReqDtl = {};
  
    // ReqObj.Form[tmpId].IsCheckboxChecked = false;
    // ReqObj.Form[tmpId].flags.isDescDivShown = false;
  }
  
  function EnrichKeys(tmpId) {
    ReqObj.Form[tmpId].EnrichmentVal = "";
  
    ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown = false;
    ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = false;
    // ReqObj.Form[tmpId].IsCheckboxChecked = false;
    // ReqObj.Form[tmpId].flags.isDescDivShown = false;
  }
  
  function StaticIsqKeys(tmpId) {
    ReqObj.Form[tmpId].Static = {
      questionsId: [],
      questionsDesc: [],
      optionsId: [],
      optionsValue: [],
    };
  }
  
  function ChatBlKeys(tmpId) {
    /* Should be POP-UP not inline change tmpIds accordingly */
    if (IsChatbl(tmpId)) {
      // ReqObj.Form[tmpId].classfortracking = "";
      // ReqObj.Form[tmpId].prevClass = "";
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
        toChange: "",
        Company: "",
        GST: "",
      };
    }
  }
  
  function setTemplateDefaultValue(tempId, instId, templateDefaults, reqBx) {
    var tmpId = tempId + instId;
  
    //should be called once
    PropertyDefault(tmpId, templateDefaults);
  
    //both times
    IsqKeys(tmpId);
    RdBoxKeys(tmpId, reqBx);
    EnrichKeys(tmpId);
    StaticIsqKeys(tmpId);
    ContactDetailKeys(tmpId);
  
    ReqObj.Form[tmpId].cityOth = "";
    ReqObj.Form[tmpId].generationCalled = false;
    // ReqObj.Form[tmpId].sequenceUpdate = false;
  
    ReqObj.userType = "";
    // ReqObj.Form[tmpId].customHeadline = ReturnCorrectVal(templateDefaults.customHeadline, "");
    // ReqObj.Form[tmpId].isGaSet = false;
  
    //once
    MakeRefText(tmpId);
  
    ReqObj.Form[tmpId].selectPrdTitle = function (event, ui) {
      selectTitle(tmpId, ui);
    };
    // if (isSet(ReqObj.Form[tmpId].flags) && !ReqObj.Form[tmpId].flags.isFlagSuggSet) {
    //   flagsugg.setFlagSuggestor(tmpId);
    // } /* No need after flag called from show step */
  }  
  
  var supplier = {
    1: { name: "Leading Supplier", class: "equLs" },
    2: { name: "Star Supplier", class: "equSs" },
  };
  var verified = {
    1: { name: "TrustSEAL Verified", class: "equTs" },
    2: { name: "Verified Supplier", class: "equVs" },
  };
  
  var verifiedexporter = {
    1: { name: "Verified Exporter", class: "equVe"}
  };
  
  function isPnsEnq(tmpId) {
    //PNS on enq form
    if (isSet(ReqObj.Form[tmpId].pnsNumber) &&
      isSet(ReqObj.Form[tmpId].ctaName) &&
      (ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call" || ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call_next" || ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call_pre")
    )
      return true;
    else return false;
  }
  function getProdDetailsHtml(tmpId, typeofform, step) {
    var html = pdpenqImage(tmpId) ? "<div class='epLf30'>" : "";
  
    html += returnContainer("t" + tmpId, "_Prodname" + step, "", "", "", "") + "</div>";
  
    var pprice = returnContainer("t" + tmpId, "_ProdPrice" + step, "befs16", "", "", "") + "<span id='t" + tmpId + "_price" + step + "'></span ><span id='t" + tmpId + "_unit" + step + "'></span > " + "</div > ";
  
    var pcom = returnContainer("t" + tmpId, "_Compname" + step, "befs16", "", "", "") + "</div>";
  
    var psold = returnContainer("t" + tmpId, "_soldBy" + step, "befs16", "", "", "") + "<span id='t" + tmpId + "_sold" + step + "'></span><span id='t" + tmpId + "_addr" + step + "'></span>" + "</div>";
  
    var pnsno = isSet(ReqObj.Form[tmpId].pnsNumber) ? ReqObj.Form[tmpId].pnsNumber : "09XXXXXXXX";
  
    pnsno = [pnsno.slice(0, 11), " ", pnsno.slice(11)].join('');   // no breathing space in pns number
  
    var enqpns = returnContainer("t" + tmpId, "_pnsEnq" + step, "befs16", "", "", "") + "<span class='pnsEnq'  ><span class='cll'>Call </span><span class='pnsno'>" + pnsno + "</span></span>" + "</div>"; //pns on enq form
  
    html += pdpenqImage(tmpId) ? "</div><div class='ibgc epLf30 epB10 epT10'>" :direnqImage(tmpId)?"<div >"  : "";
  
    html = isMoglixUi(tmpId) ? html + psold + pprice + pcom : html + pprice + pcom + psold;
  
    if (isPnsEnq(tmpId))
      //pns on enq form
      html += enqpns;
    if (pdpenqImage(tmpId) || direnqImage(tmpId)) {
      var review = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls.reviewCount) && ReqObj.Form[tmpId].additionalDtls.reviewCount !== 0 ? ReqObj.Form[tmpId].additionalDtls.reviewCount : -1;
  
      var starCount = isSet(ReqObj.Form[tmpId].additionalDtls) && isSet(ReqObj.Form[tmpId].additionalDtls.seller_rating) && ReqObj.Form[tmpId].additionalDtls.seller_rating !== 0 ? ReqObj.Form[tmpId].additionalDtls.seller_rating : 0;
  
      if ( starCount && review && !(parseInt(starCount) <= 0 && parseInt(review) <= 0)) {
        html += '<div class="befs14 eqRC1 disp-inl bemt5">';
        if (parseInt(starCount) > 0) {
          var width_par = (starCount / 5) * 100;
          html += '<span class="befwt">' + starCount + '</span>/5 <div class="eqsRt disp-inl e_f18 txtl bepr"><div class="eqflsRt eqd_l0 beabult" style="width:' + width_par + '%"><span>★★★★★</span></div><div class="eqemsRt"><span>★★★★★</span></div></div>';
        }
        html += parseInt(review) > 0 ? '<span class="eqRC2 epf12">(' + review + " Review)</span>" : "";
        html += "</div>";
      }
      var verf = ReqObj.Form[tmpId].additionalDtls["verified"];
      var supp = ReqObj.Form[tmpId].additionalDtls["supplier"];
  
      var verfexp = ReqObj.Form[tmpId].additionalDtls["VerifiedExporter"];
      
      if(direnqImage(tmpId)){
        html += '<div class="idsf eflwp befs14 eqRC3 bemt5 sldby">';
      }
      else{
        html += '<div class="idsf eflwp befs14 eqRC3 bemt5 ">';  
      }
  
      if (supp === "1" || supp === "2")
        html += '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' + supplier[supp]["class"] + '"></i>' + supplier[supp]["name"] + "</div>";
  
      if (verf === "1" || verf === "2")
        html += '<div class="idsf id_aic emr10"><i class="imFsp oef0 ' + verified[verf]["class"] + '"></i>' + verified[verf]["name"] + "</div>";
      if(direnqImage(tmpId)){
        if(verfexp === "1") 
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
    var cl = isMoglixUi(tmpId) ? "befs14 berowe_clr1" : "befs16 berow";
    var isq_class = pdpenqImage(tmpId) ? " epLf30" : "";
    html +=
      returnContainer(
        "t" + tmpId,
        "_isqdetails" + step,
        cl + isq_class,
        "",
        "",
        ""
      ) + "</div>";
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
    datavalue["modrefType"] =
      isSet(ReqObj.Form[event.initialdata.tmpId].modrefType) &&
      ReqObj.Form[event.initialdata.tmpId].modrefType !== ""
        ? ReqObj.Form[event.initialdata.tmpId].modrefType
        : "";
  
    // datavalue["sellerIsq"] = (isSet(ReqObj.Form[event.initialdata.tmpId].sellerIsq) && ReqObj.Form[event.initialdata.tmpId].sellerIsq !== "") ? ReqObj.Form[event.initialdata.tmpId].sellerIsq : "";
    datavalue["plsqArr"] =
      isSet(ReqObj.Form[event.initialdata.tmpId].plsqArr) &&
      ReqObj.Form[event.initialdata.tmpId].plsqArr !== ""
        ? ReqObj.Form[event.initialdata.tmpId].plsqArr
        : "";
  
    return datavalue;
  }
  
  function prodDetailsHtmlInsertion(event) {
    prodDetailsHtmlDefautls(event);
    prodNameHtmlInsertion(event);
    compNameHtmlInsertion(event);
    prodPriceHtmlInsertion(event);
    soldByHtmlInsertion(event);
  
    if (
      pdpenqImage(event.initialdata.tmpId) ||
      (direnqImage(event.initialdata.tmpId) )
    ) {
      isqQuestionHtmlInsertion(event);
    } else if (
      event.initialdata.typeofform === "image" &&
      isEcomProduct(event.initialdata.tmpId) &&
      event.initialdata.step === "0R"
    ) {
    } else if (
      (event.initialdata.typeofform === "image" ||
        event.initialdata.typeofform === "video") &&
      event.initialdata.step === "0R"
    ) {
      if (imeshExist() !== "")
        $(
          "#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step
        ).html(msg_firimgvid("Enquire now", event.initialdata.tmpId));
    } else {
      isqQuestionHtmlInsertion(event);
    }
    prodDetailshandleCSS(event);
  }
  
  function prodDetailsHtmlDefautls(event) {
    // $('#t' + event.initialdata.tmpId + '_isqdetails' + event.initialdata.step).html("");
    $("#t" + event.initialdata.tmpId + "_Prodname" + event.initialdata.step).html( "");
    $("#t" + event.initialdata.tmpId + "_Compname" + event.initialdata.step).html( "");
    $("#t" + event.initialdata.tmpId + "_price" + event.initialdata.step).html( "");
    $("#t" + event.initialdata.tmpId + "_unit" + event.initialdata.step).html("");
    $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).html("");
    $("#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step).html("");
    $( "#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).html("");
  }
  
  function enqImghandleBuutton(tmpId) {
    var x = returnEnquireNowHtml(tmpId);
    var html = x["OuterWrapper"] + x["Label"] + x["ClosingWrapper"];
    $("#t" + tmpId + "_submitdiv").removeClass("befstgo2 bearrowN");
    $("#t" + tmpId + "_submit")
      .removeClass("form-btn")
      .addClass("befstgo2 hovsub")
      .val("Enquire Now");
    $("#t" + tmpId + "_bl_form").html(html);
  }
  
  function returnProdCnameUrlHtml(tmpId, key, val, id, cls) {
    var svg = "";
    if (glmodid == "PRODDTL" && key == "produrl") {
      svg = `<svg fill="#2e3192" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -3 24 24" width="17px" height="17px"><path d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z"/></svg>`;
    }
    if (
      isImageVidEnq(tmpId) &&
      isSet(ReqObj.Form[tmpId].redirectUrl) &&
      isSet(ReqObj.Form[tmpId].redirectUrl[key]) &&
      ReqObj.Form[tmpId].redirectUrl[key] !== ""
    ) {
      return (
        "<a href = '" +
        ReqObj.Form[tmpId].redirectUrl[key] +
        "' target = '_blank' class='enqa " +
        cls +
        "'id = 't" +
        tmpId +
        id +
        "'>" +
        val +
        " " +
        svg +
        "</a>"
      );
    } else {
      return val;
    }
  }
  
  function urlTrack(tmpId, msg) {
    if (glmodid == "PRODDTL" && msg == "Redirect:ProductUrl") {
      blenqGATracking("Product_Name_Clicked", msg, getEventLabel(), 0, tmpId);
      return true;
    }
    var formtype =isSet(ReqObj.Form[tmpId].formType) && ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ? "Post Buy Leads": "Send Enquiry";
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
  //fsdgsdgsdhgs
  function isqQuestionHtmlInsertion(event) {
    var plsqArr = decodeURIComponent(event.datavalue["plsqArr"]);
    if (isSet(plsqArr) && plsqArr !== "" && !isMoglixUi(event.initialdata.tmpId)) {
      var count = 0;
      var keyVal = plsqArr.split("#");
      var len = keyVal.length;
      var total = 225;
      for (var i = 0; i < len; i++) {
        var selisq = keyVal[i].split(":");
        var ques = selisq[0];
        var varr = selisq[1];
        if (isSet(ques) && ques !== "" && isSet(varr) && varr !== "") {
          var ans = ques + "" + varr;
          var count_val = pdpenqImage(event.initialdata.tmpId) || direnqImage(event.initialdata.tmpId) ? 3 : 4;
          var col_cls1 = pdpenqImage(event.initialdata.tmpId) || direnqImage(event.initialdata.tmpId) ? "eqRC4" : isMoglixUi(event.initialdata.tmpId) ? "" : "col111";
          var col_cls2 = pdpenqImage(event.initialdata.tmpId) || direnqImage(event.initialdata.tmpId) ? "eqRC3" : isMoglixUi(event.initialdata.tmpId) ? "e_clr2" : "col77";
          if (ans.length < total && count < count_val) {
            $(
              "#t" +
                event.initialdata.tmpId +
                "_isqdetails" +
                event.initialdata.step
            ).append(
              "<p class='" +
                col_cls1 +
                "'>" +
                returnSpan(
                  "t" + event.initialdata.tmpId,
                  "_isqkey" + i,
                  ques + ": ",
                  col_cls2,
                  ""
                ) +
                varr +
                "</p>"
            );
            total = total - ans.length;
            count++;
          } else break;
        }
      }
    }
  }
  
  function prodDetailshandleCSS(event) {
    var cl = isMoglixUi(event.initialdata.tmpId)
      ? "be-pnm eprod BL_Fwb e_f18"
      : "eprod";
    var ppricecl = isMoglixUi(event.initialdata.tmpId)
      ? "eqprodpr bemt10 bemb5"
      : "eqprodpr";
    var pricecl = isMoglixUi(event.initialdata.tmpId)
      ? "eqpr e_f20 e_clr1 BL_Fwb"
      : "eqpr";
    var unitcl = isMoglixUi(event.initialdata.tmpId) ? "e_clr2" : "";
    $(
      "#t" + event.initialdata.tmpId + "_Prodname" + event.initialdata.step
    ).addClass(cl);
    $(
      "#t" + event.initialdata.tmpId + "_price" + event.initialdata.step
    ).addClass(pricecl);
    $("#t" + event.initialdata.tmpId + "_unit" + event.initialdata.step).addClass(
      unitcl
    );
    $("#t" + event.initialdata.tmpId + "_ProdPrice" + event.initialdata.step)
      .removeClass()
      .addClass(ppricecl);
    $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).addClass(
      "eqsold"
    );
    $("#t" + event.initialdata.tmpId + "_soldBy" + event.initialdata.step)
      .removeClass()
      .addClass("eqsoldby");
    
    if(direnqImage(event.initialdata.tmpId)){
      
        $("#t" + event.initialdata.tmpId + "_sold" + event.initialdata.step).removeClass().addClass("sldby");
        $("#t" + event.initialdata.tmpId + "_addr" + event.initialdata.step).addClass("sldby");
    
      }
    
    
    
    //$("#t" + event.initialdata.tmpId + "_isqdetails" + event.initialdata.step).addClass("befs16 berow");
  }
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
  
  /*--------------------------------- */
  /*
   * Usage :
   *
   *
   */   
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
  
    data["modId"] = ReqObj.Form[tmpId].modId;
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
  
  
  function FindObject(arr, name, obj) {
    if (isSet(arr) && isSet(name)) {
      for (var i = 0; i < arr.length; i++) {
        if ( isSet(arr[i]) && isSet(arr[i].fn) && ConstructorName(arr[i].fn).toLowerCase() === name.toLowerCase()) {
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
        FindObject(
          Objconfig.array.ServiceArray,
          ConstructorName(Objconfig.obj),
          Objconfig
        ) === false
      ) {
        // console.log("duplicate", Objconfig.obj);
      } else {
        var parent = findParent(ConstructorName(Objconfig.obj));
        parent = isSet(parent) ? parent : [];
  
        Objconfig.obj = makeObj(Objconfig.obj, Objconfig.hooks);
        var ObjInsertedOnce = false;
  
        if (parent.length > 0) {
          for (var i = 0; i < parent.length; i++) {
            if (
              FindCorrectSpot(
                Objconfig.array.ServiceArray,
                Objconfig.obj,
                parent[i]
              ) === true
            )
              ObjInsertedOnce = true;
            else if (i === parent.length - 1 && !ObjInsertedOnce)
              Objconfig.array.ServiceArray.push(Objconfig.obj);
          }
        } else Objconfig.array.ServiceArray.push(Objconfig.obj);
      }
    }
  }

  function InitiateSequence(tmpId, where) {
    GetIsqFromService(tmpId);
    ReqObj.Form[tmpId].FormSequence = new FormSeq();
    ReqObj.Form[tmpId].FormSequence.FirstStepSequence(tmpId, where);
    FormCloseButtons(tmpId);
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
    if (
      (tmpId.substring(0, 2) === "09" &&
        ReqObj.Form[tmpId].formType.toLowerCase() === "bl") ||
      IsChatbl(tmpId)
    ) {
      leftSideTransition(0, tmpId);
    }
    if (typeof flagsugg === "undefined") {
      ReqObj.changeFlag = false;
    } else ReqObj.changeFlag = true;
    InitiateSequence(tmpId, flagsugg);
  }
  
 
  
  function callGlobalFunction() {
    if (
      typeof ims !== "undefined" &&
      isSet(ims) &&
      isSet(ims.dirTypeFull) &&
      ims.dirTypeFull !== ""
    ) {
      var dirTypeFull = ims.dirTypeFull.toLowerCase();
      if (
        dirTypeFull === "impcat" ||
        dirTypeFull === "city" ||
        dirTypeFull === "search"
      ) {
        if (typeof block_softask === "function") block_softask();
      }
    }
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
        if (ispdp(tmpId)) {
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
    if ( isSet(ReqObj.Form[tmpId].ServiceSequence) && isSet(ReqObj.Form[tmpId].HitArray) && isSet(arr)) {
      for (var i = 0; i < arr.length; i++) {
        var parent = findParent(ConstructorName(arr[i].fn));
        parent = isSet(parent) ? parent : [];
        var ObjAttached = false;
        if (parent.length > 0) {
          for (var j = 0; j < parent.length; j++) {
            if ( FindCorrectSpot( ReqObj.Form[tmpId].ServiceSequence, arr[i], parent[j] )) {
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
    if ( isSet(tmpId) && isSet(ReqObj.Form[tmpId]) && isSet(ReqObj.Form[tmpId].ServiceSequence)) {
      if (isSet(showLoader) && showLoader) IsChatbl(tmpId) && ReqObj.Form[tmpId].currentScreen.toLowerCase() === "userverification" ? ReqObj.Form[tmpId].isSkipOTPClicked ? "" : $("#t" + tmpId + "cbl_msg").parent().removeClass("dn") : addBlLoader(tmpId, "right");
  
      while (ReqObj.Form[tmpId].ServiceSequence.length > 0) {
        if ( isSet(ReqObj.Form[tmpId].ServiceSequence[0]) && isSet(ReqObj.Form[tmpId].ServiceSequence[0].fn) && typeof ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit === "function")
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
    if ( isSet(tmpId) && isSet(ReqObj.Form[tmpId]) && isSet(ReqObj.Form[tmpId].ServiceSequence)) {
      while (ReqObj.Form[tmpId].ServiceSequence.length > 0) {
        if ( isSet(ReqObj.Form[tmpId].ServiceSequence[0]) && isSet(ReqObj.Form[tmpId].ServiceSequence[0].fn) && typeof ReqObj.Form[tmpId].ServiceSequence[0].fn.onSubmit === "function" && isSet(ConstructorName(ReqObj.Form[tmpId].ServiceSequence[0].fn)) && ConstructorName( ReqObj.Form[tmpId].ServiceSequence[0].fn ).toLowerCase() === "generation")
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
    if ( ReqObj.Form[tmpId].ctaType.toLowerCase() !== "image" && ReqObj.Form[tmpId].ctaType.toLowerCase() !== "video" && ReqObj.Form[tmpId].formType.toLowerCase() === "enq" && imeshcookie !== "" && !pdpInactiveBL(tmpId)) {
      $("#t" + tmpId + "_leftR").removeClass("lftMgn");
      if (currentISO() !== "IN") $("#t" + tmpId + "_thankDiv").addClass("fnUser");
    }
    if ( ReqObj.Form[tmpId].ctaType.toLowerCase() !== "image" && ReqObj.Form[tmpId].ctaType.toLowerCase() !== "video" && ReqObj.Form[tmpId].formType.toLowerCase() === "enq" && imeshcookie === "")
      $("#t" + tmpId + "_leftR").addClass("lftMgn");
    else if (!pdpInactiveBL(tmpId))
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
    data["modid"] = ReqObj.Form[tmpId].modId;
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
  
    if (pdpInactiveBL(tmpId)) {
      $("#t" + tmpId, "_fBtn").css({
        "margin-right": "25%",
      });
    }
    return html;
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
   * maybe class not required
   * Class     : LoginFlag
   * Usage     : returns the login flag.
   *
   * @function : returnLoginFlag - returns the login flag
   */
  function LoginFlag() {}
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
  function LoginMode() {}
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
      ReqObj.Form[tmpId].modId +
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
  
  
  function labelNEC(iso) {
    var nec = "";
    if (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "") nec += "N";
    if (iso === "IN") {
      if (ReqObj.UserDetail.em !== "") nec += "E";
      if (ReqObj.UserDetail.ctid !== "") nec += "C";
      if (nec === "") nec = "NO-NEC";
    } else {
      if (ReqObj.UserDetail.mb1 !== "") nec += "M";
      if (nec === "") nec = "NO-NM";
    }
    return nec;
  }
  
  
  
  /* no idea about this */
  function ServiceGATrack(TracName, TracEvent, FileName) {
    if (isSet(_gaq)) {
      _gaq.push(["_trackEvent", TracName, TracEvent, FileName, 0, true]);
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
      if(direnqImage(tmpId)){
        $("#t" + tmpId + "_tCond").addClass("pdtop");
      }
      if (isMoglixUi(tmpId)) $("#t" + tmpId + "_tCond").addClass("bemt10");
    }
    if (Bl01(tmpId)) $("#t" + tmpId + "_tCond").addClass("bemb5");
    $("#t" + tmpId + "_tCondCheckBox").prop("checked", false);
    if (isBlInlineFr(tmpId)) {
      $("#t" + tmpId + "_tCond").addClass("mar_bemb"); //adwords_ch
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
    if (isImageVidEnq(tmpId) || isMoglixUi(tmpId)) {
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
          usercookie.setCookie("imEqGl", value, "1", ReqObj.Form[tmpId].modId);
        } else {
          if (imEqGlCookie.substring(0, len - 2) === ",") {
            value = imEqGlCookie + value + ",";
          } else {
            value = imEqGlCookie + "," + value;
          }
  
          usercookie.setCookie("imEqGl", value, "1", ReqObj.Form[tmpId].modId);
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
      !isMoglixUi(tmpId) &&
      !pdpInactiveBL(tmpId) &&
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
  
    if (details !== "" && !pdpInactiveBL(tmpId)) {
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
    if ( ReqObj.UserDetail.ctid === "" && ReqObj.UserDetail.cityname === "" && ReqObj.UserDetail.ctoth === "")
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
        if ( ReqObj.UserDetail.em && (ReqObj.UserDetail.ctid || ReqObj.UserDetail.cityname || ReqObj.UserDetail.ctoth) )
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
  function FormCloseButtons(tmpId) {
    $(document)
      .off("keydown.BlEnqForm")
      .on("keydown.BlEnqForm", function (event) {
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
  
  $(document).ready(function () {
    var window_width1 = $(window).width();
    ReqObj[windowctrlscroll] = window_width1;
  });
  
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
  
 
  function HideSuggester() {
    $("ul.ui-autocomplete").each(function () {
      $(this).hide();
    });
    var ul = $("ul.ui-autocomplete");
    // ul.css("display", "none");
    ul.parent().css("display", "none");
    // $(".be-sugg").css("display")
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
  
  
  function WrapperObj(outerHtml, closingHtml, suffix) {
    var wrapObj = {
      SuffixOuterHtml: outerHtml,
      SuffixClosingHtml: closingHtml,
      suffix: suffix,
    };
    return wrapObj;
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
  
