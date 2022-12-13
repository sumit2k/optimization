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