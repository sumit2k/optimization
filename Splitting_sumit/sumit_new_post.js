
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
  
function currentIpCountry() {
    return usercookie.getParameterValue(usercookie.getCookie("iploc"), "gcnnm");
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
function ShowStaticQuestionForeign(tmpId) {
    // if (isSet(tmpId) && tmpId.substring(0, 2) === "09") {
    //   if (parseInt(ReqObj.Form[tmpId].disableIsq) !== 1 && currentISO() !== "IN") return true;
    //   return false;
    // }
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
  
function ResetUserDetails(key) {
    ReqObj.UserDetail[key] = "";
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
  
  
function chatblHideTransition(tmpId) {
    $("#t" + tmpId + "_typhere").removeClass("dn");
    $("#t" + tmpId + "_newblchatReply").addClass("cbl_vh");
  }

function foreignUserIsq() {
    var ShowForeignUserIsq = true;
    return ShowForeignUserIsq;
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