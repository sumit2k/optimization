
function EnqPopupDIR(tmpId) {    //next->submit
  return Enq09(tmpId) &&
    ReqObj.Form[tmpId].typeofform.toLowerCase() == "enquiry" &&
    (modIdf === "DIR" || modIdf === "STDPRD")
    ? true
    : false;
}

function Enq09(tmpId) {
  return tmpId.substring(0, 2) === "09" && isEnq(tmpId) ? true : false;
}
function Enq04(tmpId) {
  return tmpId.substring(0, 2) === "04" && isEnq(tmpId) ? true : false;
}

function ispdp(tmpId) {
  return modIdf === "PRODDTL";
}
function isDIR(tmpId) {      //inactive changes
  return (modIdf === "DIR" || modIdf === "STDPRD");
}
function isSeller(tmpId) {      //inactive changes
return modIdf === "SELLERS";
}
function recomOnInactive(tmpId){
  if(isDIR(tmpId) || ispdp(tmpId) || modIdf === "PDFIM" || isSeller(tmpId) || modIdf === "IMHOME" || modIdf === "FCP" || modIdf === "MDC" || modIdf === "CWSIM" || modIdf === "TDWIM" ){
    return true;
  }
  return false;
  }

function featOnInctive(tmpId){
  if(modIdf === "DIR" || modIdf === "IMHOME" || modIdf === "FCP"){
    return true;
  }
  return false;
}  

function pdpenq(tmpId) {
  return isEnq(tmpId) && ispdp(tmpId);
}

function pdpBL(tmpId) {
  return isBl(tmpId) && ispdp(tmpId);
}
function isLightbox(tmpId){      //lightbox
  return (                   
  isBl(tmpId) &&
 (ReqObj.Form[tmpId].ctaName.toLowerCase() === "lightbox")        
);
}

function isInactiveBL(tmpId) {     //lightbox
  return (                   //inactive changes 
    isBl(tmpId) &&
   (ReqObj.Form[tmpId].ctaName.toLowerCase() === "inactive" ||
   ReqObj.Form[tmpId].ctaName.toLowerCase() === "inactive-bl" || ReqObj.Form[tmpId].ctaName.toLowerCase() === "lightbox")       
  );
}
function getMorePh(tmpId) {     //new gmp
  return (        
    isSet(ReqObj.Form[tmpId].ctaName) && 
    (ReqObj.Form[tmpId].ctaName.toLowerCase() === "get more photos" ||
   ReqObj.Form[tmpId].ctaName.toLowerCase() === "get more photos_next" ||
   ReqObj.Form[tmpId].ctaName.toLowerCase() === "get more photos_pre") 
  );
}

function pdpenqImage(tmpId) {
  var resolution = window.innerWidth;
  return (
    resolution > 1024 &&
    isImageVidEnq(tmpId) &&
    isSet(ReqObj.Form[tmpId].isNewImage) &&
    ReqObj.Form[tmpId].isNewImage === "1"
  );
}
function direnqImage(tmpId) {
  return isImageEnqDIR(tmpId) && (modIdf === "DIR");
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

function FormCloseEnqBL(tmpId, event) {
  var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : (isInactiveBL(tmpId) && ispdp(tmpId)) ? "Post Buy Leads New" : "Post Buy Leads";   
       //inactive changes
  var that = ReqObj.Form[tmpId].FormSequence || {};
  var ClassesforTracking = "CloseStep:";
  ClassesforTracking += that.StepCounter + 1 + ":";
  var constructor = "";
  if (isSet(ReqObj.Form[tmpId].UiArray[that.StepCounter])) {
    for (var i = 0;i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length;i++) {
      constructor += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
      if (i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length && i > 0)
        ClassesforTracking += "-";
      ClassesforTracking += ConstructorName( ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj );
    }
  }
  pnsCloseTrack(tmpId); 
  //inactive changes
  if(isInactiveBL(tmpId) && !ispdp(tmpId) && modIdf.toLowerCase() != "pdfim" ){
    inactiveblCloseTrack(tmpId);
  }
  
  if(isImageVidEnq(tmpId) && (that.StepCounter == 0 || that.StepCounter == 1)){   //image track
    var sampling = ReqObj.Form[tmpId].noSampling;
    ReqObj.Form[tmpId].noSampling=true;
    blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
    ReqObj.Form[tmpId].noSampling=sampling;
  }
  else
  blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
  
  if (constructor.toLowerCase() === "userverification" && Enq09(tmpId))
    blenqGATracking(form_type, "OTP1NotFilled", getEventLabel(), 1, tmpId);
  CloseForm(tmpId); // check !
}

function FormCloseStep(tmpId, event) {
  var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : (isInactiveBL(tmpId) && ispdp(tmpId)) ? "Post Buy Leads New" : "Post Buy Leads";     //inactive changes
  var that = ReqObj.Form[tmpId].FormSequence || {};
  var hasBedsnone = $("#t" + tmpId + "_thankDiv").hasClass("bedsnone");
  var ClassesforTracking = "CloseStep:";
  ReqObj.Form[tmpId].IsthroughClosebtn = true;
  if (ReqObj.Form[tmpId].IsbackClicked === true) {
    ReqObj.Form[tmpId].IsbackClicked = false;
    that.StepCounter += 1;
  }
  pnsCloseTrack(tmpId);
  if (!ReqObj.Form[tmpId].generationCalled || !hasBedsnone) {
    if (!ReqObj.Form[tmpId].generationCalled) {
      if (that.StepCounter > -1) {
        ClassesforTracking += that.StepCounter + 1 + ":";
        if (isSet(ReqObj.Form[tmpId].UiArray[that.StepCounter])) {
          for (var i = 0; i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length; i++) {
            if (i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length && i > 0)
              ClassesforTracking += "-";
            ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
          }
        }
        blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
        CloseForm(tmpId);
      } else {
        CloseForm(tmpId);
      }
    } else if (!hasBedsnone) {
      that.OnCloseCounter = parseInt(that.OnCloseCounter, 10);
      that.StepCounter = parseInt(that.StepCounter, 10);
      if (that.OnCloseCounter > -1) {
        ClassesforTracking += that.StepCounter + 1 + (that.OnCloseCounter + 1) + ":";
        if (isSet(ReqObj.Form[tmpId].OnCloseArray) && isSet(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter])) {
          for (var i = 0; i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length; i++) {
            if (i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length && i > 0)
              ClassesforTracking += "-";
            ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter][i].Obj);
          }
        }
        blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
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
        for (var i = 0; i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length; i++) {
          if (i < ReqObj.Form[tmpId].UiArray[that.StepCounter].length && i > 0)
            ClassesforTracking += "-";
          constructor += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
          ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].UiArray[that.StepCounter][i].Obj);
        }
      }
      blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
      if (isBl(tmpId) || isEnq(tmpId)) {

        // Get More Photos //new gmp
        if(ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
          if(ValidGenId(ReqObj.Form[tmpId].generationId)){
            if(getMorePh(tmpId) && (new RegExp("userverification").test(ReqObj.Form[tmpId].currentScreen.toLowerCase()) || new RegExp("requirementdtl").test(ReqObj.Form[tmpId].currentScreen.toLowerCase()) || new RegExp("isq").test(ReqObj.Form[tmpId].currentScreen.toLowerCase()) || (currentISO() !== "IN" && ReqObj.UserDetail.mb1 == "" && ( ReqObj.Form[tmpId].currentScreen.toLowerCase() == "contactdetail"|| new RegExp("requirementdtl").test(ReqObj.Form[tmpId].currentScreen.toLowerCase()))))){
              saveEnr(tmpId);
          }
        }          
        
      }


        // Get More Photos


        ReqObj.Form[tmpId].FormSequence._screen7(tmpId);
      } else ReqObj.Form[tmpId].FormSequence.OnCloseSeq(tmpId);
    } else {
      ClassesforTracking += that.StepCounter + 1 + (that.OnCloseCounter + 1) + ":";
      if (isSet(ReqObj.Form[tmpId].OnCloseArray) && isSet(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter])) {
        if (isSet(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter])) {
          for (var i = 0; i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length; i++) {
            if (i < ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter].length && i > 0)
              ClassesforTracking += "-";
            ClassesforTracking += ConstructorName(ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter][i].Obj);
          }
        }
      }
      blenqGATracking(form_type, ClassesforTracking, getEventLabel(), 0, tmpId);
      ReqObj.Form[tmpId].FormSequence.OnClosegetStep(tmpId);
    }
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

function toFireGeneration(tmpId, type) {
  var toreturn = true;
  if (isEnq(tmpId)) {
    toreturn = isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" ? true : false;
    toreturn = isSet(type) && type === "intent" ? false : toreturn;
    if (toreturn === false && isSet(ReqObj.Form[tmpId].enqintentCalled) && ReqObj.Form[tmpId].enqintentCalled === false)
      toFireEnqIntent(tmpId);
    ReqObj.Form[tmpId].toFireIsq = toreturn === true || (toreturn === false && isSet(ReqObj.Form[tmpId].generationId) && parseInt(ReqObj.Form[tmpId].generationId) !== defaultGenerationId) ? true : false;
  } else if (isBl(tmpId)) {
    toreturn = Bl01(tmpId) && ReqObj.Form[tmpId].screenNumber < 2 && isSecondBl() && ReqObj.UserDetail["uv"] !== "V" && !ReqObj.Form[tmpId]._NCOnFrstScrn ? false : isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" ? true : false;
    if (Bl09(tmpId) && isSecondBl() && ReqObj.UserDetail["uv"] !== "V" && _mandatDetailsFilled() && !ReqObj.Form[tmpId]._NCOnFrstScrn)
      toreturn = false;
    if (Bl04(tmpId) && isSecondBl() && ReqObj.UserDetail["uv"] !== "V") {
      if (!_mandatDetailsFilled() || (_mandatDetailsFilled() && !ReqObj.Form[tmpId]._NCOnFrstScrn && isSet(ReqObj.Form[tmpId].intentCalled) && ReqObj.Form[tmpId].intentCalled === false))
        toreturn = false;
    }

    if (toreturn === false && isSet(ReqObj.Form[tmpId].intentCalled) && ReqObj.Form[tmpId].intentCalled === false)
      toFireBLIntent(tmpId, "");
    ReqObj.Form[tmpId].toFireIsq = toreturn === true ? true : false;
  } else if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" || IsChatbl(tmpId)) {
    if (ReqObj.UserDetail["uv"] === "V" || (ReqObj.UserDetail["uv"] !== "V" && !isSecondBl()))
      toreturn = isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "" ? true : false;
    if (ReqObj.UserDetail["uv"] !== "V" && isSecondBl()) toreturn = false;
    if (toreturn === false && isSet(ReqObj.Form[tmpId].intentCalled) && ReqObj.Form[tmpId].intentCalled === false)
      toFireBLIntent(tmpId, "");
    ReqObj.Form[tmpId].toFireIsq = toreturn === true ? true : false;
  } else toreturn = true;

  ReqObj.Form[tmpId].toFireIsq = isSet(ReqObj.Form[tmpId].generationId) && parseInt(ReqObj.Form[tmpId].generationId) !== defaultGenerationId ? true : ReqObj.Form[tmpId].toFireIsq;

  return toreturn;
}

function toFireBLIntent(tmpId, src) {
  var _case = IsChatbl(tmpId) && ReqObj.Form[tmpId].mcatId === "-1" && ReqObj.Form[tmpId].catId === "-1" ? 0 : 1;
  if (_case === 1 && ((isSet(src) && src === "i") || (isSet(ReqObj.Form[tmpId].FormSequence.StepCounter) && ReqObj.Form[tmpId].FormSequence.StepCounter > -2 && ReqObj.Form[tmpId].FormSequence.StepCounter < 2))) {
    new Generation(1, 1).onSubmit(tmpId);
    ReqObj.Form[tmpId].intentCalled = true;
  }
  else if (_case === 1 && IsChatBLInline(tmpId)){    // new chat bl unidentified
    var showIntent = isSet(ReqObj.Form[tmpId].FormSequence.StepCounter) && isSet(ReqObj.Form[tmpId].IsqLength) ? ReqObj.Form[tmpId].FormSequence.StepCounter - ReqObj.Form[tmpId].IsqLength + 1 : 11;
    if(ReqObj.Form[tmpId].isProdNameShown)
    showIntent-=1;
    if(showIntent > -2 && showIntent <2)
    new Generation(1, 1).onSubmit(tmpId);
    ReqObj.Form[tmpId].intentCalled = true;
  } else ReqObj.Form[tmpId].intentCalled = false;
}

function toFireEnqIntent(tmpId) {
  if ((Enq09(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0) || ((ReqObj.Form[tmpId].FormSequence._stepCounter === 1 || ReqObj.Form[tmpId].FormSequence._stepCounter === 0) && Enq04(tmpId))) {
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

function fireAjaxRequest(event) {
  var revent = event;
  var tmpId = revent.data.tmpId;
  var ajaxObj = revent.data.ajaxObj;
  var ajaxtimeout = revent.data.ajaxtimeout;
  var ajaxdata = revent.data.ajaxdata;
  var formtype = isSet(ReqObj.Form[tmpId]) ? ReqObj.Form[tmpId].formType : isSet(ajaxdata["formType"]) ? ajaxdata["formType"] : "BL";
  var form_type = formtype === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  if ((revent.data.type === 0 && isSet(ReqObj.Form[tmpId]) && isSet(modIdf) && modIdf === "PRODDTL") || (revent.data.type === 8 && pdpenq(tmpId))) {
    ajaxdata.pdp = true;
  }
  $.ajax({
    cache: false,
    url: getAjaxURL(revent),
    type: revent.data.type === 8 ? "POST" : "GET",
    timeout: ajaxtimeout,
    dataType: "json",
    crossOrigin: true,
    crossDomain: true,
    data: ajaxdata,
    success: function (res) {
      if (isSet(res)) {
        if ((isSet(res.CODE) && parseInt(res.CODE) === 200) || (isSet(res.Response) && parseInt(res.Response.Code) === 200) || (isSet(res.success) && parseInt(res.success) === 1) || (isSet(res.RESPONSE) && parseInt(res.RESPONSE.Code) === 200) || (isSet(res.RESP) && res.RESP !== "failure") || (isSet(res.queryid) && ValidGenId(res.queryid)) || (isSet(res.ofr) && ValidGenId(res.ofr)) || (isSet(res.msg) && isSet(res.msg.MESSAGE) && parseInt(res.msg.MESSAGE.CODE) === 200)) {
          OnAjaxSuccess(revent, res);
          if (revent.data.ga.s === true)
            blenqGATracking(form_type, "service:" + revent.data.ga.gatype + ":success " + revent.data.ga.source, getEventLabel(), 1, tmpId);
          if (ajaxObj !== "" && ajaxObj.s.ss === 1) {
            if (isSSB(tmpId))
              ReqObj.Form[tmpId].servicecalled.push(ConstructorName(ajaxObj.obj.fn));
            PostAjax(ajaxObj.obj, tmpId);
          }
          finishEnqDependents(tmpId, revent.data.type);
        } else {
          OnAjaxError(revent, res);
          if (revent.data.ga.f === true)
            blenqGATracking(form_type, "service:" + revent.data.ga.gatype + ":failure", res, 1, tmpId);
          if (ajaxObj !== "" && ajaxObj.s.sf.af === 1)
            Ajaxfailure(ajaxObj.obj, tmpId, revent.data.hitfinserv);
          if (ajaxObj !== "" && ajaxObj.s.sf.pa === 1)
            PostAjax(ajaxObj.obj, tmpId, revent.data.hitfinserv);
        }
      } else {
        OnAjaxError(revent, res);
        finishEnqDependents(tmpId, revent.data.type);
        if (revent.data.ga.f === true)
          blenqGATracking(form_type, "service:" + revent.data.ga.gatype + ":failure", "response undefined", 1, tmpId);
        if (ajaxObj !== "" && ajaxObj.s.f === 1)
          Ajaxfailure(ajaxObj.obj, tmpId, revent.data.hitfinserv);
        if (isSet(revent.data.key) && isSet(revent.data.key.appendedVal) && revent.data.key.appendedVal !== "")
          RemoveValFromImEqGl(revent.data.key.appendedVal);
      }
    },
    error: function (res) {
      if (ajaxObj !== "" && ajaxObj.f.f === 1)
        Ajaxfailure(ajaxObj.obj, tmpId, revent.data.hitfinserv);
      res = isSet(res) ? JSON.stringify(res) : "response undefined";
      if (revent.data.ga.f === true)
        blenqGATracking(form_type, "service:" + revent.data.ga.gatype + ":failure", res, 1, tmpId);
      OnAjaxError(revent, res);
      finishEnqDependents(tmpId, revent.data.type);
    },
    complete: function (res) {
      OnAjaxComplete(revent, res);
    },
  });
}

function getAjaxURL(event) {
  var webAddressLocation = location.hostname;
  var appsServerName = webAddressLocation.match(/^dev/)
    ? "//dev-apps.imimg.com/"
    : webAddressLocation.match(/^stg/)
      ? "//stg-apps.imimg.com/"
      : "//apps.imimg.com/";
  switch (event.data.type) {
    case 1:
      return appsServerName + "index.php?r=Newreqform/saveEnrichment";
    case 2:
      return appsServerName + "index.php?r=Newreqform/BLEnqUpdate";
    case 3:
      return appsServerName + "index.php?r=postblenq/saveIsqBlEnq";
    case 4:
      return appsServerName + "index.php?r=Newreqform/TermNCondition";
    case 5:
      return appsServerName + "index.php?r=Newreqform/FinishEnqService";
    case 6:
      return appsServerName + "index.php?r=Newreqform/GlusrUpdate";
    case 7:
      return appsServerName + "index.php?r=Newreqform/MiniDetails";
    case 0:
      return appsServerName + "index.php?r=Newreqform/IntentGeneration";
    case 8:
      return appsServerName + "index.php?r=Newreqform/Postreq";
    case 9:
      return appsServerName + "index.php?r=postblenq/McatDtl";
  }
}

function OnAjaxSuccess(revent, res) {
  switch (revent.data.type) {
    case 6:
      revent.data.ga.gatype === "GlusrUpdate"
        ? GlusrUpdateOnSuccess(revent, 0, res)
        : GlusrUpdateOnSuccess(revent, 1, res);
      break;
    case 7:
      MiniDetailsOnSuccess(revent, res);
      break;
    case 8:
      ReqObj.Form[revent.data.tmpId].formType.toLowerCase() === "enq"
        ? EnqGenOnSuccess(revent, res)
        : BLGenOnSuccess(revent, res);
      break;
    case 9:
      McatDtlOnSuccess(revent, res);
      break;
  }
}

function OnAjaxError(revent, res) {
  switch (revent.data.type) {
    case 6:
      revent.data.ga.gatype === "GlusrUpdate"
        ? GlusrUpdateOnError(revent, 0, res)
        : GlusrUpdateOnError(revent, 1, res);
      break;
    case 7:
      MiniDetailsOnError(revent, res);
      break;
    case 8:
      BlEnqOnError(revent, res);
      break;
  }
}

function OnAjaxComplete(revent, res) {
  switch (revent.data.type) {
    case 1:
      savenrflag = 1;
      break;
    case 9:
      McatDtlOnComplete(revent, res);
      break;
  }
}
/*--------------------------McatDtlOnSuccess----------------------- */

function McatDtlOnSuccess(revent, res) {
  ReqObj.mcatdtl.response = true;
  if (
    isSet(res.Response.Data) &&
    isSet(res.Response.Data.glcat_mcat_img1_250x250)
  ) {
    var img_url = res.Response.Data.glcat_mcat_img1_250x250;
    img_url = img_url.replace("http:", "");
    if (isSet(revent.data.key.cbObj) && revent.data.key.cbObj.hasCallback) {
      ReqObj.Form[revent.data.tmpId].displayImage = img_url;
    } else {
      ReqObj.mcatImage = img_url;
    }
    pushImage(ReqObj.Form[revent.data.tmpId].mcatId, img_url, "");
  }
  if (isSet(res.Response.Data) && isSet(res.Response.Data.glcat_mcat_name)) {
    var mcat_name = res.Response.Data.glcat_mcat_name;
    ReqObj.Form[revent.data.tmpId].mcatName = mcat_name;
    if (isBlInlineFr(revent.data.tmpId))
      $("#t" + revent.data.tmpId + "_mcatNameAdw").text(
        ReqObj.Form[revent.data.tmpId].mcatName
      );
    MakeRefText(revent.data.tmpId);
  }
}
/*--------------------------McatDtlOnComplete----------------------- */

function McatDtlOnComplete(revent, res) {
  ReqObj.mcatdtl.response = true;
  if (isSet(revent.data.key.cbObj) && revent.data.key.cbObj.hasCallback)
    revent.data.key.cbObj.cbfunc(revent.data.tmpId);
  $("#t" + revent.data.tmpId + "_imglodr").addClass("bedsnone");
  if (isSet(revent.data.key.left) && revent.data.key.left === 1)
    leftSideTransition(0, revent.data.tmpId, "fromservice");
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
/*-------------------------Mini Detail on Success---------------------- */
function MiniDetailsOnSuccess(revent, res) {
  ReqObj.miniDetailHit.ping = false;
  var cname =
    isSet(res.Response.Data.glusr_usr_companyname) &&
      res.Response.Data.glusr_usr_companyname !== ""
      ? false
      : true;
  ReqObj.UserDetail.cName =
    cname === false ? res.Response.Data.glusr_usr_companyname : "";
  ReqObj.UserDetail.isgst = res.Response.Data.IS_GST_AVAILABLE;
  ReqObj.UserDetail.isurl = res.Response.Data.IS_URL_AVAILABLE;
  ReqObj.gst.toask =
    isSet(res.Response.Data.IS_GST_AVAILABLE) &&
      parseInt(res.Response.Data.IS_GST_AVAILABLE) === 0
      ? true
      : false;
  ReqObj.url.toask =
    isSet(res.Response.Data.IS_URL_AVAILABLE) &&
      parseInt(res.Response.Data.IS_URL_AVAILABLE) === 0
      ? true
      : false;
  if (ReqObj.UserDetail.cName !== "") ReqObj.miniDetailHit.reply.success = true;
  else ReqObj.miniDetailHit.reply.failure = true;
  ReqObj.seller_cta = !toAskCname(revent.data.tmpId) && currentISO() == "IN";
  ReqObj.su_cta++;
  if (
    isSSB(revent.data.tmpId) &&
    ReqObj.UserDetail.cName === "" &&
    ((currentISO() === "IN" &&
      ReqObj.Form[revent.data.tmpId].prodName !== "") ||
      currentISO() !== "IN") &&
    cNameConditions(revent.data.tmpId) === true
  ) {
    onCName(revent.data.tmpId);
  } else if (!isEnq(revent.data.tmpId) && ReqObj.UserDetail.cName !== "") {
    $("#t" + revent.data.tmpId + "_cdiv").html("");
    $("#t" + revent.data.tmpId + "_cbx").addClass("bedsnone");
  }
  if (
    isSSB(revent.data.tmpId) &&
    ReqObj.url.toask === true &&
    currentISO() !== "IN" &&
    urlConditions(revent.data.tmpId).ask === true
  ) {
    onURLName(revent.data.tmpId);
  }
}

function MiniDetailsOnError(revent, res) {
  if (
    isSet(res) &&
    isSet(res.Response) &&
    isSet(res.Response.Code) &&
    parseInt(res.Response.Code) === 204 &&
    isSet(res.Response.Status) &&
    res.Response.Status.toLowerCase() === "failure"
  ) {
    ReqObj.gst.toask = true;
    ReqObj.url.toask = true;
    ReqObj.UserDetail.cName = "";
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
  if ( tmpId.substring(0, 2) !== "09" && ReqObj.Form[tmpId].FormSequence.StepCounter === 0 )
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
      return currentISO() === "IN" ? getBlStaticIsqReqHeading("all", tmpId, ReqObj.Form[tmpId].ctaName) : getIsqHeading(ctanamemodid, tmpId, ReqObj.Form[tmpId].ctaName);
    case "requirementdtl":
      return getReqHeading("all", tmpId, ReqObj.Form[tmpId].ctaName);
    case "blstaticques":
      return getBlStaticIsqReqHeading("all", tmpId, ReqObj.Form[tmpId].ctaName);
    case "contactdetailonclosein":
      return getContactDetailOnCloseInHeading( "all", tmpId, ReqObj.Form[tmpId].ctaName );
    case "contactdetailonclosenotin":
      return getContactDetailOnCloseNotInHeading( "all", tmpId, ReqObj.Form[tmpId].ctaName );
    case "userverification":
      return getUserVerificationHeading( "all", tmpId, ReqObj.Form[tmpId].ctaName );
    case "userverificationonclose":
      return getUserVerificationHeading( "all", tmpId, ReqObj.Form[tmpId].ctaName );
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
  if ( ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" && Bl04(tmpId) && ReqObj.Form[tmpId].FormSequence._screenCounter === 0)
    return "<div class='beclrW be-bgb cbl_p10 txt-cnt' style='font-size: 18px;'>Tell us what you need</div>";

  if ( tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId) && ReqObj.Form[tmpId].screenNumber < 0) {
    var heading = "Tell us what you need, and we'll help you get quotes";

    heading = iso != "IN" ? pdpBL(tmpId) ? "Save Time! Get <strong>verified exporters</strong> shipping to " + isoCountries[currentISO()] : "Save Time! Get verified sellers exporting to " + isoCountries[currentISO()] : heading;
    return heading;
  }

  var _case = (ReqObj.Form[tmpId].FormSequence._screenCounter === 0 || ReqObj.Form[tmpId].FormSequence._screenCounter === 1) && Bl04(tmpId) ? -1 : 0;

  if (iso === "IN" && _case !== -1) {
    var mainHeading = "";
    var subHeading = "";
    fromscreen = fromscreen.toLowerCase();
    if (fromscreen.includes("productname")) {
      mainHeading = "Looking to buy something?";
      subHeading = "Tell us your requirement and get free quotes from multiple sellers";
      if(isInactiveBL(tmpId)){
        mainHeading = "";
        subHeading = "Tell us your requirement and <strong>get free quotes</strong> from multiple sellers";
      }
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
    } else if ( fromscreen.includes("blstaticques") || fromscreen.includes("requirementdtl")) {
      mainHeading = "Few more details to get your requirement fulfilled";
      subHeading = "Share a few more information and get best quotes";
    } else if ( fromscreen.includes("contactdetail_last") || fromscreen.includes("moredetails") || fromscreen === "default") {
      mainHeading = "Just one step away to connect with verified sellers";
      subHeading = "Enter your remaining contact details";
    } else if (fromscreen === "userverification") {
      var imeshcookie = imeshExist();
      var phonenumber = "+" + usercookie.getParameterValue(imeshcookie, "phcc") + "-" + usercookie.getParameterValue(imeshcookie, "mb1");
      mainHeading = "Verify your mobile number to receive quotes";
      // subHeading = "Enter the 4 digit One Time Password (OTP) sent to your Mobile Number " + phonenumber;
    }
    let bemb = isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0 ? "befs16 beclr3 bemb8" : "befs16 blotp bemb20";
    let otphdg = isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0 ? "pdpotphdg" : "otphdg";
    return ( "<div class='"+ otphdg + "'>" + mainHeading + `</div><div class='${bemb}'>` + subHeading + "</div>" );
  } else {
    var blmsg = "Save Time! Get verified sellers ";
    blmsg += iso !== "IN" ? "exporting to " + isoCountries[iso] + "<div class='cbl_fs17 eqmb10 bemt10 beclr3'>Requirement for: <span class='befwt'>" + ReqObj.Form[tmpId].prodName + "</span></div>" : "for " + ReqObj.Form[tmpId].prodName;

    if ( tmpId.substring(0, 2) !== "09" && ReqObj.Form[tmpId].FormSequence.StepCounter === 0 && fromscreen !== "ContactDetailonclosenotin")
      return tmpId.substring(0, 2) === "04" ? "" : isSet(ReqObj.Form[tmpId].prodName) && ReqObj.Form[tmpId].prodName !== "" ? blmsg : "Tell us your requirement";
    else
      return currentISO() === "IN" ? tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId) ? "Adding few details can get you a quick response" : "Tell us what you need, and we'll help you get quotes" : pdpBL(tmpId) ? (isInactiveBL(tmpId)) ? '<div class="bemb20">Get free quotes from <strong>verified exporters</strong> shipping to ' + isoCountries[currentISO()] + '</div>' : "Receive quotations from <strong>verified exporters</strong> shipping to " + isoCountries[currentISO()] : (isInactiveBL(tmpId)) ? '<div class="bemb20">Get free quotes from <strong>verified exporters</strong> shipping to ' + isoCountries[currentISO()] + '</div>' : "Receive quotations from verified suppliers exporting to " + isoCountries[currentISO()];
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

function loginGetmsg(tmpId, msg, addon) {
  var usertype = currentISO() !== "IN" ? "email" : "mobile";
  var hcls = "befwt";
  return ( returnSpan("", "", msg, hcls) + " " + addon + ' from "' + ReqObj.Form[tmpId].rcvName + '" on your ' + usertype + " quickly" );
}

function loginGetmsgSpecialCase(tmpId, msg, addon) {
  var usertype = currentISO() !== "IN" ? "email" : "mobile";
  return ( returnSpan("", "", msg, "befwt") + " " + addon + " on your " + usertype + " quickly" );
}

function loginDefaultmsg(tmpId, ctaname, msg) {
  if (isImageVidEnq(tmpId))
    return ( returnSpan("", "", "Get Best Quotes", "befwt") + " for " + ReqObj.Form[tmpId].prodName );
  else{
    if(ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call" || ReqObj.Form[tmpId].ctaName.toLowerCase() == "view mob e")
      return ( "<span> Please login to view Supplier's Mobile Number </span>" );
    return ( msg + '"' + returnSpan("", "", ReqObj.Form[tmpId].rcvName, "befwt") + '"' );
  }
    return ( msg + '"' + returnSpan("", "", ReqObj.Form[tmpId].rcvName, "befwt") + '"' );
}

function contactLogMsg(tmpId, ctaname, msg) {
  return msg + '"' + ReqObj.Form[tmpId].rcvName + '" for more information';
}

function contactMsg(tmpId, ctaname) {
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
        pnsno = pnsno.slice(4);
        pnsno = '0' + pnsno;
      }
      if(ispdp(tmpId) && currentISO()!= "IN")
        // return "Please share more details so supplier can contact you";
        returnSpan("", "", "Please share more details so supplier can contact you", "befwt");
        //  + "<div class='mt5 vmngrey'>" + `<span class='cbl_fs17'>You can contact supplier on </span><span class='befwt cbl_fs17'>${pnsno}</span>${pns_extn}` +"</div>";
          
      // return "Supplier wants to know more about you";
      return returnSpan("", "", "Supplier wants to know more about you", "befwt");
      //  + "<div class='mt5 vmngrey'>" + `<span class='cbl_fs17'>You can contact supplier on </span><span class='befwt cbl_fs17'>${pnsno}</span>${pns_extn}` +"</div>";
    }
    return returnSpan("", "", "Supplier wants to know more about you", "befwt");
  }
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
      return loginGetmsgSpecialCase(tmpId,"Contact Supplier","and get details");
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

    // new case added for get more photos form  //new gmp
    case "get more photos":
      return loginGetmsg(tmpId, "Get More Photos", "and details");   
    case "get more photos_next":
      return loginGetmsg(tmpId, "Get More Photos", "and details");
    case "get more photos_pre":          
      return loginGetmsg(tmpId, "Get More Photos", "and details");      

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
  return isSet(ReqObj.Form[tmpId].ctaheadingappend) && ReqObj.Form[tmpId].ctaheadingappend === true ? returnSpan("", "", ctaname, "befwt") + "\n" + " by adding a few details of your requirement" : "Adding a few details of your requirement can get you quick response from the supplier";
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
          return "Adding a few details of your requirement can get you quick response from the supplier";
          //  + "<div class='mt5 vmngrey'>" + `<span class='cbl_fs17'>You can contact supplier on </span><span class='befwt cbl_fs17'>${pnsno}</span>${pns_extn}` +"</div>";
        }
        //new gmp
        return getMorePh(tmpId) ? ReqObj.Form[tmpId].FormSequence.StepCounter === 0 ?"Add a few details of your requirement to <strong>get more photos</strong> and details from the seller quickly" : "Add a few details of your requirement to get more photos and details from the seller quickly" : "Adding a few details of your requirement can get you quick response from the supplier";
        // return "Adding a few details of your requirement can get you quick response from the supplier";
      }

  }
}

function defaultCaseHeading(ctanamemodid, tmpId, ctaname) {
  switch (ctanamemodid) {
    case "sticky right":
      return "";
    default:
      return isSet(ReqObj.Form[tmpId].heading) && ReqObj.Form[tmpId].heading.trim() !== "" ? ReqObj.Form[tmpId].heading : "Send Enquiry to the Seller";
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

function PropertyDefault(tmpId, templateDefaults) {
  ReqObj.Form[tmpId].mcatName = ReturnCorrectVal(templateDefaults.mcatName, "");
  ReqObj.Form[tmpId].mcatId = ReturnCorrectVal(templateDefaults.mcatId, "-1");
  ReqObj.Form[tmpId].catId = ReturnCorrectVal(templateDefaults.catId, "-1");
  ReqObj.Form[tmpId].modId = ReturnCorrectVal(templateDefaults.modId, "DIR");
  modIdf = ReqObj.Form[tmpId].modId;
  ReqObj.Form[tmpId].ctaType = ReturnCorrectVal(
    templateDefaults.ctaType,
    "other"
  );
  ReqObj.Form[tmpId].plsqArr = ReturnCorrectVal(templateDefaults.plsqArr, "");
  ReqObj.Form[tmpId].userFilledIsq = ReturnCorrectVal(
    templateDefaults.userFilledIsq,
    []
  );
  ReqObj.Form[tmpId].ordr_qnty_index = ReturnCorrectVal(
    templateDefaults.ordr_qnty_index,
    ""
  );
  ReqObj.Form[tmpId].currentclassCount = 0;
  ReqObj.Form[tmpId].pvTrackingFired = false;
  ReqObj.Form[tmpId].populate = true;
  ReqObj.Form[tmpId].intentCalled = false;
  ReqObj.Form[tmpId].enqintentCalled = false;
  ReqObj.Form[tmpId].glusrService = {
    times: 0,
    toCall: false,
    isPhone: false,
    isName: false,
  };
  ReqObj.Form[tmpId].nec = { classCount: 0 };
  ReqObj.Form[tmpId].defSubmit = {
    todo: true,
    eve: "",
    blurfired: false,
    subfired: false,
    loginfval: "",
  };
  ReqObj.Form[tmpId].showAttachment = isSet(templateDefaults.showAttachment)
    ? templateDefaults.showAttachment
    : "-1";
  ReqObj.Form[tmpId].toFireEscTracking = updateToFireEscTrackingKey(tmpId);
  (ReqObj.Form[tmpId].cName = {
    prodServ: "",
    toask: false,
    qtut: false, // qtut condition
    tov: false, // tov condition
    rb: false, // reselling/business condition
    tov1: false, // if user selects larger that 1 lac
    isIN: false, // if not not indian - don't ask
    isq: false, // if isq fails , ask company name
    isShown: false,
    cdiv: false,
    fs: false, // fireservice
    chtml: false,
    cnameId: "",
  }),
    (ReqObj.Form[tmpId].flagSuggCalledOnce = false);
  ReqObj.Form[tmpId].gst = {
    html: false,
    number: 0,
  };
  ReqObj.Form[tmpId].url = {
    html: false,
    name: "",
    isq: "",
    rbox: "",
  };
  ReqObj.Form[tmpId].isqMcat = -1;
  //set default afflid here for chat bl
  if (isSet(ReqObj.Form[tmpId].formType)) {
    if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl") {
      ReqObj.Form[tmpId].afflId = ReturnCorrectVal(templateDefaults.afflId, 0);
      ReqObj.Form[tmpId].BLIntent = ReturnCorrectVal(
        templateDefaults.BLIntent,
        ""
      );
    } else {
      ReqObj.Form[tmpId].reqSent = ReturnCorrectVal(
        templateDefaults.reqSent,
        ""
      );
    }
  }

  ReqObj.Form[tmpId].insert = ReturnCorrectVal(templateDefaults.insert, "I");
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

function initializeForm(formArray) {
  createGlobalObject();
  // var ImageCalled = false;
  //var iplocCalled = false;
  if(isSet(ReqObj)) ReqObj.isAddSlot = 0;
  if (isSet(formArray)) {
    for (var i = 0; i < formArray.length; i++) {
      if (isSet(formArray[i]) && formArray[i] !== "") {
        if ( $.inArray(formArray[i].tempId, BlPopup) === -1 || $.inArray(formArray[i].tempId, EnqPopup) === -1) {
          OpenForm(formArray[i]);
          if ( !(isSet(formArray[i].displayImage) && formArray[i].displayImage !== "") && ( isSet(ReqObj) && typeof ReqObj.ImageCalled === "undefined" && formArray[i].formType.toLowerCase() === "bl") ) {
            // if ( (isSet(formArray[i].displayImage) && formArray[i].displayImage !== "") || (isSet(formArray[i].zoomImage) && formArray[i].zoomImage !== "") || (!ImageCalled && formArray[i].formType.toLowerCase() === "bl") ) {
            ReqObj.ImageCalled = true;
            getMcatImage(formArray[i].tempId + formArray[i].instId, {
              hasCallback: false,
            });
          }
          // if (!iplocCalled) {
          //   iplocCalled = true;
          //   new IpLoc(formArray[i].tempId + formArray[i].instId);
          // }
        }
      } else continue;
    }
  }
}
function updateToFireEscTrackingKey(tmpId) {
  if (tmpId.substring(0, 2) === "09") {
    return true;
  } else if (IsChatbl(tmpId)) {
    return true;
  } else if ( tmpId.substring(0, 2) !== "09" && $("#t" + tmpId + "_enrichform_maindiv").html() === "" ) {
    return false;
  } else return true;
}
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
function Isq(tmpId) {
  this.templateId = "t" + tmpId;
  this.className = "Isq";
  ReqObj.Form[tmpId].preFilledIsq = {};
  StructureIsq(tmpId); // to check for prefilled isq's
  this.IsqScreen = -1;
  this.countISQUpdated = false;
}

Isq.prototype.hasHtml = function (IsqObject) {
  if (isSet(IsqObject)) {
    ReqObj.Form[IsqObject.tmpId].Isq.HasHtmlCalled = true;
    GetIsqFromObj(IsqObject.tmpId);
    if (ReqObj.Form[IsqObject.tmpId].IsqArray === "") {
      ReqObj.Form[IsqObject.tmpId].GlobalIsqObject.IsqObject = IsqObject;
    } else {
      if (
        isSet(ReqObj.Form[IsqObject.tmpId].GlobalIsqObject) &&
        typeof ReqObj.Form[IsqObject.tmpId].GlobalIsqObject.AttachingObject ===
        "function"
      )
        ReqObj.Form[IsqObject.tmpId].GlobalIsqObject.AttachingObject(IsqObject);
    }
  }
};

Isq.prototype.defaultEvents = function (tmpId) {
  ChatblfooterAns(tmpId);

  qtutEvents(tmpId);
  if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ||ReqObj.Form[tmpId].formType.toLowerCase() === "enq")
    qtutUI(tmpId);
  if (ReqObj.Form[tmpId].locisqId.length) {
    for (var i = 0; i < ReqObj.Form[tmpId].locisqId.length; i++)
      citySugg(tmpId, ReqObj.Form[tmpId].locisqId[i]);
  }
  SelectBoxEvents(tmpId);
  InputBoxEvents(tmpId);
  InputBoxAutoFocus(tmpId);
  CheckBoxClick(tmpId);
  RadioClick(tmpId);
  if (isSSB(tmpId)) onCName(tmpId, "", "isq");
  $(".t" + tmpId + "other_radiotemp").off("click").on("click", function (event) {
      if ($(this).hasClass("t" + tmpId + "be-radioboxtemp")) {
        $(this).siblings().each(function () {
          if ($(this).parent().css("display") === "block") {
            isRadioOtherClicked(this);
          }
        });
      }
    });

  if (GenerationOnClick(tmpId)) this.validate(tmpId, 1);

  if (imeshExist() !== "" && !isInactiveBL(tmpId))
    $("#t" + tmpId + "_leftR").removeClass("lftMgn");

  if ((ReqObj.Form[tmpId].typeofform.toLowerCase() === "image" ||ReqObj.Form[tmpId].typeofform.toLowerCase() === "video") &&ReqObj.Form[tmpId].FormSequence.StepCounter === 0) {
    $("#t" + tmpId + "_question").addClass("qtunfrst");
    $("#t" + tmpId + "_question").addClass("mvta");
    $("#t" + tmpId + "ques2").addClass("bedsnone");
  } else {
    $("#t" + tmpId + "_question").removeClass("qtunfrst");
    $("#t" + tmpId + "_question").removeClass("mvta");
    $("#t" + tmpId + "ques2").removeClass("bedsnone");
  }
  get_buyer_info(tmpId);

  //hide pns unidentified user
  if (isPnsEnq(tmpId) ) $(".pnsEnq").show();
  //next->submit
  if ( EnqPopupDIR(tmpId) && ReqObj.Form[tmpId].toShowMsg && $("#yajaca").css("display") == "none" ) {
    $("#yajaca").show();
    $("#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input").addClass("toConv");
    // this.inputText=$("input.toConv").attr("value");
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
      obj: this,
    },
  });
};
Isq.prototype.handleUI = function (event) {
  if ( isSet(ReqObj.Form[event.data.tmpId].isQuantIsq) && ReqObj.Form[event.data.tmpId].isQuantIsq !== "" && ReqObj.Form[event.data.tmpId].isQuantIsq === true ) {
    $("#t" + event.data.tmpId + "_interested").html("Enter required quantity to ");
    $("#t" + event.data.tmpId + "_getbestrest").html("");
  }
};

Isq.prototype.EventIfScreenPresent = function (tmpId) {
  if (isOtherEnq(tmpId)) {
    this.handleHeading(tmpId);
    ButtonNameUI("isq", tmpId);
  }
};

Isq.prototype.handleHeading = function (tmpId) {
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
    if (ReqObj.Form[tmpId].currentScreen.toLowerCase() === "isq" ||ReqObj.Form[tmpId].currentScreen.toLowerCase() === "isqmoredetails")  {
      if ( $("#isq_first_screen").attr("type") === "hidden" && $("#isq_first_screen").attr("value") === "Screen1") {
        ReqObj.Form[tmpId].ctaheadingappend = ReqObj.Form[tmpId].FormSequence.StepCounter === 0 ? true : false;
        if ( isImageVidEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter === 0)
          $("#t" + tmpId + "_hdg").addClass("bedsnone").html("");
        else
          $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "isq"));
      } else {
        if ( isImageVidEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter === 0 )
          $("#t" + tmpId + "_hdg").addClass("bedsnone").html("");
        else
          $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, "IsqRequirementDtl"));
      }
    }
  }
};

Isq.prototype.handleButton = function (tmpId) {
  ButtonNameUI("isq", tmpId);
};

Isq.prototype.AttachingObject = function (IsqObject) {
  if (isSet(IsqObject)) {
    var type = currentISO() !== "IN" && Enq09(IsqObject.tmpId) ? false : true;
    if (Enq04(IsqObject.tmpId) || isBl(IsqObject.tmpId)) type = false;
    if (ReqObj.Form[IsqObject.tmpId].IsqArray !== null && ReqObj.Form[IsqObject.tmpId].prevCount !== ReqObj.Form[IsqObject.tmpId].IsqLength) {
      IsqObject.that.NumberofClassCalled -= 1;
      AttachObject(IsqObject.object, IsqObject.tmpId); // attach object to ui or service accordingly
      if (isSet(IsqObject.AfterService)) {
        for (var i = 0; i < IsqObject.AfterService.length; i++) {
          if (typeof IsqObject.that.MakeSeq === "function")
            IsqObject.that.MakeSeq(IsqObject.AfterService[i], IsqObject.tmpId);
        }
      }
      if (isImageVidEnq(IsqObject.tmpId) && ReqObj.Form[IsqObject.tmpId].FormSequence.StepCounter === -1) {
        // not yet 0
        if (IsqObject.that.NumberofClassCalled === 0) {
          // this is required because whenever NumberOfClassCalled is 0 sequnece is called to show steps
          makeFinalSeq(IsqObject, IsqObject.tmpId);
        }
      } else if (isSSB(IsqObject.tmpId)) {
        isqNextSequence(IsqObject);
      } else if (type === true && !isBlInline(IsqObject.tmpId) &&
        ((isImageVidEnq(IsqObject.tmpId) &&
          ReqObj.Form[IsqObject.tmpId].isQtutShown &&
          ReqObj.Form[IsqObject.tmpId].FormSequence.StepCounter === 0) ||
          (isSet(ReqObj.Form[IsqObject.tmpId].formType) &&
            (ReqObj.Form[IsqObject.tmpId].formType.toLowerCase() === "enq" ||
              ReqObj.Form[IsqObject.tmpId].formType.toLowerCase() === "bl") &&
            (ReqObj.Form[IsqObject.tmpId].IsqLength -
              ReqObj.Form[IsqObject.tmpId].prevCount <
              3 ||
              currentISO() !== "IN"))) &&
        (ShowReqBox(IsqObject.tmpId) || cNameConditions(IsqObject.tmpId))
      ) {
        // If 'to show' isq is less than 3 ; enq ; showreq return true show reqbox with it -
        if (currentISO() !== "IN") {
          ReqObj.Form[IsqObject.tmpId].currentclassCount++;
          this.countISQUpdated = true;
        } // for isq object
        var countlastUpdated =
          currentISO() !== "IN" && IsqObject.last === true ? true : false; // last is true
        IsqObject.that.NumberofClassCalled += 1; //change acc to condition
        var hooks = {
          pre: [],
          post: [],
        };
        if (IsqObject.last === true) {
          IsqObject.that.NumberofClassCalled += 1;
          if (currentISO() !== "IN")
            ReqObj.Form[IsqObject.tmpId].currentclassCount++;
        }
        var md = toAskMoreDetails(IsqObject.tmpId);
        var mdObj = returnmdtlObject(
          IsqObject.object.array,
          IsqObject.object.hooks,
          IsqObject.tmpId,
          IsqObject.that,
          countlastUpdated,
          md
        );
        var RdObj = {
          object: {
            obj: new RequirementDtl(IsqObject.tmpId),
            toReplace: true,
            isService: false,
            array: IsqObject.object.array,
            hooks: hooks,
            countlastUpdated: countlastUpdated,
          },
          tmpId: IsqObject.tmpId,
          that: IsqObject.that,
          AfterService: [],
          hasFallback: false,
          FallbackObj: null,
        };
        var cn = cNameConditions(IsqObject.tmpId);
        var toCall = true;
        if (IsqObject.last === true) {
          if (
            md.ask === false ||
            (md.ask === true &&
              ReqObj.Form[IsqObject.tmpId].currentclassCount === 4)
          ) {
            IsqObject.that.NumberofClassCalled -= 1;
            toCall = false;
          }
          if (ShowReqBox(IsqObject.tmpId)) CreateSeq(RdObj);
          else IsqObject.that.NumberofClassCalled -= 1;
          if (
            md.ask === true &&
            toCall === true &&
            ReqObj.Form[IsqObject.tmpId].currentclassCount < 5 &&
            !isEnq(IsqObject.tmpId) &&
            !isBl(IsqObject.tmpId)
          )
            CreateSeq(mdObj);
        } else if (ShowReqBox(IsqObject.tmpId)) {
          if (pdpenq(IsqObject.tmpId)) {
            if (ReqObj.Form[IsqObject.tmpId].onsuccess)
              makeFinalSeq(IsqObject, IsqObject.tmpId);
            IsqObject.that.NumberofClassCalled -= 1;
          } else CreateSeq(RdObj);
        } else if (
          md.ask === true &&
          toCall === true &&
          !isEnq(IsqObject.tmpId) &&
          !isBl(IsqObject.tmpId)
        ) {
          CreateSeq(mdObj);
        } else makeFinalSeq(IsqObject, IsqObject.tmpId);
      } else if (IsqObject.that.NumberofClassCalled === 0) {
        // this is required because whenever NumberOfClassCalled is 0 sequnece is called to show steps
        if ((isBlInline(IsqObject.tmpId) || ((Bl09(IsqObject.tmpId) || Bl04(IsqObject.tmpId)) && currentISO() !== "IN" && !isInactiveBL(IsqObject.tmpId))) && ShowReqBox(IsqObject.tmpId)) {
          if (Bl04(IsqObject.tmpId) || Bl09(IsqObject.tmpId)) {
            var flen = IsqObject.FallbackObj.length;
            IsqObject.that.NumberofClassCalled += flen + 1;
            for (i = 0; i < flen; i++) CreateSeq(IsqObject.FallbackObj[i]);
            IsqObject.that.NumberofClassCalled -= 1;
          } else {
            IsqObject.that.NumberofClassCalled += 2;
            CreateSeq(IsqObject.FallbackObj);
            IsqObject.that.NumberofClassCalled -= 1;
          }
        }
        if (isInactiveBL(IsqObject.tmpId) && currentISO() != 'IN') {
          let qut = 0;
          for (let i = 0; i < ReqObj.Form[IsqObject.tmpId].IsqArray.length; i++) {
            if (ReqObj.Form[IsqObject.tmpId].IsqArray[i].length > 1) {
              if (ReqObj.Form[IsqObject.tmpId].IsqArray[i][0].IM_SPEC_MASTER_DESC == "Quantity") {
                qut = 1;
                break;
              }
            }
          }
          if (qut == 0) {
            var flen = IsqObject.FallbackObj.length;
            IsqObject.that.NumberofClassCalled += flen + 1;
            for (i = 0; i < flen; i++) CreateSeq(IsqObject.FallbackObj[i]);
            IsqObject.that.NumberofClassCalled -= 1;
          }
        }
        makeFinalSeq(IsqObject, IsqObject.tmpId);
      }
    } else {
      if (IsqObject.hasFallback) {
        // abhi tk no use ???
        if (
          isBlInline(IsqObject.tmpId) &&
          ReqObj.Form[IsqObject.tmpId].IsqArray === null &&
          IsqObject.that.NumberofClassCalled > 1
        ) {
          IsqObject.that.NumberofClassCalled -= 1;
        }
        if (isSet(IsqObject.Thankyou) && IsqObject.Thankyou) {
          if (
            isSet(ReqObj.Form[IsqObject.tmpId].FormSequence) &&
            typeof ReqObj.Form[IsqObject.tmpId].FormSequence.OnCloseSeq ===
            "function"
          )
            ReqObj.Form[IsqObject.tmpId].FormSequence.OnCloseSeq(
              IsqObject.tmpId
            ); // on close sequence is called
        } else if (isSSB(IsqObject.tmpId)) {
          IsqObject.that.NumberofClassCalled -= 1;
          isqNextSequence(IsqObject);
        } else if (
          currentISO() !== "IN" &&
          (isEnq(IsqObject.tmpId) || Bl04(IsqObject.tmpId)) &&
          ReqObj.Form[IsqObject.tmpId].ReqDtl.HasHtmlCalled
        ) {
          IsqObject.that.NumberofClassCalled -= 1;
          makeFinalSeq(IsqObject, IsqObject.tmpId);
        }
        else if (Bl04(IsqObject.tmpId)) {
          IsqObject.that.NumberofClassCalled -= 1;
          makeFinalSeq(IsqObject, IsqObject.tmpId);
        }

        Bl09(IsqObject.tmpId)
          ? CreateSeq(IsqObject.FallbackObj[0])
          : CreateSeq(IsqObject.FallbackObj);
      } else {
        if (
          isSet(IsqObject.nextStep) &&
          typeof IsqObject.nextStep === "function"
        )
          IsqObject.nextStep.apply(ReqObj.Form[IsqObject.tmpId].FormSequence); // is next step available FormSequence for next step is called
      }
    }
  }
};

function UserType() {
  // checks whether is Indian or not.
  if (currentISO() === "IN") return "IN";
  else return "FR";
}

function returnIsq(tmpId) {
  var IsqCountry = currentISO() === "IN" ? "IN" : "F";
  var isqmdata = null;
  var isqcdata = null;
  try{
  isqmdata = $.parseJSON(sessionStorage.getItem("enqbl" + ReqObj.Form[tmpId].mcatId + "-" + IsqCountry));
  isqcdata = $.parseJSON(sessionStorage.getItem("enqbl" + ReqObj.Form[tmpId].catId + "-" + IsqCountry));
  }
  catch(err){
    isqmdata = null;
    isqcdata = null;
  }
  if (isSet(isqmdata) && isqmdata !== "") return isqmdata.DATA;
  if (
    isSet(savedMcatIsq[ReqObj.Form[tmpId].mcatId]) &&
    isSet(savedMcatIsq[ReqObj.Form[tmpId].mcatId][IsqCountry]) &&
    savedMcatIsq[ReqObj.Form[tmpId].mcatId][IsqCountry] !== ""
  )
    return savedMcatIsq[ReqObj.Form[tmpId].mcatId][IsqCountry];
  if (isSet(isqcdata) && isqcdata !== "") return isqcdata.DATA;
  if (
    isSet(savedCatIsq[ReqObj.Form[tmpId].catId]) &&
    isSet(savedCatIsq[ReqObj.Form[tmpId].catId][IsqCountry]) &&
    savedCatIsq[ReqObj.Form[tmpId].catId][IsqCountry] !== ""
  )
    return savedCatIsq[ReqObj.Form[tmpId].catId][IsqCountry];
  return null;
}

function IsqPopulate(todo) {
  var arr = template_array;
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    if (
      !isSet(ReqObj.Form[arr[i]].IsqArray) ||
      ReqObj.Form[arr[i]].IsqArray === "" ||
      ReqObj.Form[arr[i]].IsqArray === null
    ) {
      ReqObj.Form[arr[i]].IsqArray = todo === true ? returnIsq(arr[i]) : null;
      ReqObj.Form[arr[i]].IsqLength =
        isSet(ReqObj.Form[arr[i]].IsqArray) &&
          ReqObj.Form[arr[i]].IsqArray !== null
          ? ReqObj.Form[arr[i]].IsqArray.length
          : 0;
    }
    ReqObj.Form[arr[i]].onsuccess =
      todo === true && Enq09(arr[i]) ? true : false;
    onCompleteISQ(arr[i]);
  }
}

function GetIsqFromObj(tmpId) {
  // update IsqArray depending on mcatId /catId
  if (isSet(tmpId)) {
    var country = UserType(); // check for country
    ReqObj.Form[tmpId].IsqArray = ""; // initial value empty
    if (
      parseInt(ReqObj.Form[tmpId].mcatId) === -1 &&
      parseInt(ReqObj.Form[tmpId].catId) === -1
    ) {
      // if -1 isq array is null and length 0
      ReqObj.Form[tmpId].IsqArray = null;
      ReqObj.Form[tmpId].IsqLength = 0;
    } else {
      if (
        parseInt(ReqObj.Form[tmpId].mcatId) !== -1 &&
        ReqObj.Form[tmpId].mcatId !== ""
      ) {
        // mcatid !(-1) and not empty
        if (ReqObj.Form[tmpId].mcatId in savedMcatIsq) {
          // find mcatId in object
          if (country in savedMcatIsq[ReqObj.Form[tmpId].mcatId]) {
            // country --mcatid
            ReqObj.Form[tmpId].IsqArray =
              savedMcatIsq[ReqObj.Form[tmpId].mcatId][country]; // isqarray updated
          }
        }
      } else if (ReqObj.Form[tmpId].catId in savedCatIsq) {
        // same for savedCatIsq
        if (country in savedCatIsq[ReqObj.Form[tmpId].catId]) {
          ReqObj.Form[tmpId].IsqArray =
            savedCatIsq[ReqObj.Form[tmpId].catId][country];
        }
      }
      ReqObj.Form[tmpId].IsqLength = isSet(ReqObj.Form[tmpId].IsqArray)
        ? ReqObj.Form[tmpId].IsqArray.length
        : 0; // length of isq array
    }
  }
  // Why??
}

function GetIsq(tmpId) {
  // ti fetch Isq Service
  if (isSet(tmpId)) {
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    GetIsqFromObj(tmpId);
    if (
      ReqObj.Form[tmpId].IsqArray === "" ||
      ReqObj.Form[tmpId].IsqArray === null
    ) {
      if (
        parseInt(ReqObj.Form[tmpId].mcatId, 10) !== -1 &&
        ReqObj.Form[tmpId].mcatId !== ""
      ) {
        var mcatId = ReqObj.Form[tmpId].mcatId;
        var cat_type = 3;
      } else if (parseInt(ReqObj.Form[tmpId].catId, 10) !== -1) {
        var mcatId = ReqObj.Form[tmpId].catId;
        var cat_type = 2;
      }
      ReqObj.Form[tmpId].isqMcat = mcatId;
      var IsqCountry = currentISO() === "IN" ? "IN" : "F";
      if (
        isSet(document.referrer) &&
        document.referrer.includes("indianexporters")
      ) { // sessionStorage.removeItem("enqbl" + ReqObj.Form[tmpId].catId + "-" + IsqCountry);
        // sessionStorage.removeItem("enqbl" + mcatId + "-" + IsqCountry);          // js error Failed to read the sessionStorage
        try {
          sessionStorage.removeItem("enqbl" + ReqObj.Form[tmpId].catId + "-" + IsqCountry);
          sessionStorage.removeItem("enqbl" + mcatId + "-" + IsqCountry);
        }
        catch (err) {
          // js error Failed to read the sessionStorage
        }
      }
      var isq_mdata = null;
      var isq_cdata = null;
      try {
        isq_mdata = $.parseJSON(
          sessionStorage.getItem("enqbl" + mcatId + "-" + IsqCountry)
        );
      }
      catch (err) {
        isq_mdata = null;
        // js error Failed to read the sessionStorage
      }
      try {
        isq_cdata = $.parseJSON(
          sessionStorage.getItem(
            "enqbl" + ReqObj.Form[tmpId].catId + "-" + IsqCountry
          )
        );
      }
      catch (err) {
        isq_cdata = null;
        // js error Failed to read the sessionStorage
      }
      var isq_data = isSet(isq_mdata) ? isq_mdata : isq_cdata;
      var country = UserType();
      var isqCalled =
        isSet(ReqObj.IsqCalled[mcatId + IsqCountry]) &&
          ReqObj.IsqCalled[mcatId + IsqCountry] === true
          ? true
          : false;
      if (isq_mdata !== null && isq_mdata.DATA !== "")
        isq_data = showQuantityUnit(tmpId, isq_mdata.DATA, 1) ? isq_data : "";
      if (
        (isq_data === "" ||
          isq_data === null ||
          typeof isq_data === "undefined") &&
        isSet(mcatId) &&
        parseInt(mcatId, 10) !== -1 &&
        isqCalled === false
      ) {
        ReqObj.IsqCalled[mcatId + IsqCountry] = true;
        $.ajax({
          cache: true,
          url: appsServerName + "index.php?r=Newreqform/GetIsq",
          type: "GET",
          crossOrigin: true,
          crossDomain: true,
          data: {
            modid: modIdf,
            mcatid: mcatId,
            cat_type: cat_type,
            flag: 1,
            isq_format: 1,
            generic_flag: 1,
            country_iso: currentISO(),
          },
          dataType: "json",
          timeout: 3000,
          success: function (res) {
            if (
              isSet(res) &&
              isSet(res.DATA) &&
              !(
                typeof res.DATA === "string" &&
                res.DATA.toLowerCase() === "null"
              )
            ) {
              if (res.DATA.length > 0) {
                ReqObj.Form[tmpId].IsqArray = res.DATA;
                ReqObj.Form[tmpId].IsqLength =
                  ReqObj.Form[tmpId].IsqArray.length;
                // sessionStorage.setItem("enqbl" + mcatId + "-" + IsqCountry, JSON.stringify(res)); // js error Failed to execute 'setItem' on 'Storage': Setting the value of 'enqbl208665-IN' exceeded the quota.
                try {
                  sessionStorage.setItem(
                    "enqbl" + mcatId + "-" + IsqCountry,
                    JSON.stringify(res)
                  );
                } catch (err) {
                  // quota_exceeded_error
                }
                var PushArr = [];
                var PushId = "";
                if (
                  parseInt(ReqObj.Form[tmpId].mcatId) !== -1 &&
                  ReqObj.Form[tmpId].mcatId !== ""
                ) {
                  PushArr = savedMcatIsq;
                  PushId = ReqObj.Form[tmpId].mcatId;
                } else {
                  PushArr = savedCatIsq;
                  PushId = ReqObj.Form[tmpId].catId;
                }
                if (PushId in PushArr)
                  PushArr[PushId][country] = ReqObj.Form[tmpId].IsqArray;
                else {
                  PushArr[PushId] = {};
                  PushArr[PushId][country] = ReqObj.Form[tmpId].IsqArray;
                }
                isSet(ReqObj.Form[tmpId].populate) &&
                  ReqObj.Form[tmpId].populate === true
                  ? IsqPopulate(true)
                  : onCompleteISQ(tmpId);
                ReqObj.Form[tmpId].onsuccess = false;
                // PushArr[PushId] = ReqObj.Form[tmpId].IsqArray;
              } else {
                ReqObj.Form[tmpId].IsqArray = null;
                ReqObj.Form[tmpId].IsqLength = 0;
                ReqObj.Form[tmpId].isqMcat = -1;
                if (
                  parseInt(ReqObj.Form[tmpId].mcatId) !== -1 &&
                  ReqObj.Form[tmpId].mcatId !== ""
                ) {
                  if (!isSet(savedMcatIsq[ReqObj.Form[tmpId].mcatId]))
                    savedMcatIsq[ReqObj.Form[tmpId].mcatId] = [];
                  savedMcatIsq[ReqObj.Form[tmpId].mcatId][country] = null;
                } else {
                  // savedCatIsq[ReqObj.Form[tmpId].catId] = null;

                  savedCatIsq[ReqObj.Form[tmpId].catId][country] = null;
                }
                ReqObj.IsqCalled[mcatId + IsqCountry] = false;
                IsqPopulate(false);
              }
              (!isSet(ReqObj.CNSerCalled) || !ReqObj.CNSerCalled) &&
                imeshExist() !== ""
                ? toCallMiniDetails(tmpId)
                : "";
            } else {
              ReqObj.Form[tmpId].IsqArray = null;
              ReqObj.Form[tmpId].IsqLength = 0;
              ReqObj.Form[tmpId].isqMcat = -1;
              ReqObj.IsqCalled[mcatId + IsqCountry] = false;
              IsqPopulate(false);
            }
            var plapresent=null;
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
          },
          error: function (res) {
            ReqObj.Form[tmpId].IsqArray = null;
            ReqObj.Form[tmpId].IsqLength = 0;
            ReqObj.IsqCalled[mcatId + IsqCountry] = false;
            IsqPopulate(false);
            res = isSet(res) ? res : "response undefined";
            blenqGATracking(form_type, "Get ISQ", res, 1, tmpId);
          },
          complete: function () {
        ReqObj.Form[tmpId].IsqComplete = true;  // new chat bl unidentified
            // if (isSet(tmpId) && isSet(ReqObj.Form[tmpId].Isq) && ReqObj.Form[tmpId].Isq.HasHtmlCalled) {
            //   if (isSet(ReqObj.Form[tmpId].GlobalIsqObject) && typeof ReqObj.Form[tmpId].GlobalIsqObject.AttachingObject === "function")
            //     ReqObj.Form[tmpId].GlobalIsqObject.AttachingObject(ReqObj.Form[tmpId].GlobalIsqObject.IsqObject); //// !!!!this is why GlobalIsqObject is used !!!!
            // }
            // if (isSet(tmpId) && isSet(ReqObj.Form[tmpId].ReqDtl) && ReqObj.Form[tmpId].ReqDtl.HasHtmlCalled) {
            //   if (isSet(ReqObj.Form[tmpId].GlobalRdObj) && typeof ReqObj.Form[tmpId].GlobalRdObj.AttachingObject === "function")
            //     ReqObj.Form[tmpId].GlobalRdObj.AttachingObject(ReqObj.Form[tmpId].GlobalRdObj.RdObj); //// !!!!this is why GlobalRdObj is used !!!!
            // }
          },
        });
      } else if (isSet(tmpId) && isSet(mcatId) && parseInt(mcatId, 10) === -1) {
        ReqObj.Form[tmpId].IsqArray = null;
        ReqObj.Form[tmpId].IsqLength = 0;
        delete HitMcatIsq[ReqObj.Form[tmpId].mcatId];
        if (ReqObj.Form[tmpId].Isq.HasHtmlCalled) {
          if (
            isSet(ReqObj.Form[tmpId].GlobalIsqObject) &&
            typeof ReqObj.Form[tmpId].GlobalIsqObject.AttachingObject ===
            "function"
          )
            ReqObj.Form[tmpId].GlobalIsqObject.AttachingObject(
              ReqObj.Form[tmpId].GlobalIsqObject.IsqObject
            ); //// !!!!this is why GlobalIsqObject is used !!!!
        }
      } else if (
        isq_data !== "" &&
        isq_data !== null &&
        typeof isq_data !== "undefined"
      ) {
        ReqObj.Form[tmpId].IsqArray = isq_data.DATA;
        ReqObj.Form[tmpId].IsqLength = isq_data.DATA.length;
        var PushArr = [];
        var PushId = "";
        if (
          parseInt(ReqObj.Form[tmpId].mcatId) !== -1 &&
          ReqObj.Form[tmpId].mcatId !== ""
        ) {
          PushArr = savedMcatIsq;
          PushId = ReqObj.Form[tmpId].mcatId;
        } else {
          PushArr = savedCatIsq;
          PushId = ReqObj.Form[tmpId].catId;
        }
        if (PushId in PushArr)
          PushArr[PushId][country] = ReqObj.Form[tmpId].IsqArray;
        else {
          PushArr[PushId] = {};
          PushArr[PushId][country] = ReqObj.Form[tmpId].IsqArray;
        }
        onCompleteISQ(tmpId);
      } else {
        if (isSet(tmpId)) {
          if (
            parseInt(ReqObj.Form[tmpId].mcatId) === -1 &&
            parseInt(ReqObj.Form[tmpId].catId) === -1
          ) {
            ReqObj.Form[tmpId].IsqArray = null;
          } else {
            ReqObj.Form[tmpId].IsqArray = "";
          }
          ReqObj.Form[tmpId].IsqLength = 0;
        }
      }
    } else {
      ReqObj.Form[tmpId].isqMcat =
        parseInt(ReqObj.Form[tmpId].mcatId) !== -1
          ? parseInt(ReqObj.Form[tmpId].mcatId)
          : parseInt(ReqObj.Form[tmpId].catId) !== -1
            ? parseInt(ReqObj.Form[tmpId].catId)
            : ReqObj.Form[tmpId].isqMcat;
    } // review
  }
}

function onCompleteISQ(tmpId) {
  if (
    isSet(tmpId) &&
    isSet(ReqObj.Form[tmpId].Isq) &&
    ReqObj.Form[tmpId].Isq.HasHtmlCalled
  ) {
    if (
      isSet(ReqObj.Form[tmpId].GlobalIsqObject) &&
      typeof ReqObj.Form[tmpId].GlobalIsqObject.AttachingObject === "function"
    )
      ReqObj.Form[tmpId].GlobalIsqObject.AttachingObject(
        ReqObj.Form[tmpId].GlobalIsqObject.IsqObject
      ); //// !!!!this is why GlobalIsqObject is used !!!!
  }

  if (
    isSet(tmpId) &&
    isSet(ReqObj.Form[tmpId].ReqDtl) &&
    ReqObj.Form[tmpId].ReqDtl.HasHtmlCalled
  ) {
    if (
      isSet(ReqObj.Form[tmpId].GlobalRdObj) &&
      typeof ReqObj.Form[tmpId].GlobalRdObj.AttachingObject === "function"
    )
      ReqObj.Form[tmpId].GlobalRdObj.AttachingObject(
        ReqObj.Form[tmpId].GlobalRdObj.RdObj
      ); //// !!!!this is why GlobalRdObj is used !!!!
  }
}

Isq.prototype.resetClass = function (tmpId) {
  if (ReqObj.Form[tmpId].prevCount > ReqObj.Form[tmpId].IsqStep1) {
    ReqObj.Form[tmpId].prevCount -= ReqObj.Form[tmpId].IsqStepN;

    //isqstepn
  } else {
    ReqObj.Form[tmpId].prevCount -= ReqObj.Form[tmpId].IsqStep1;
    //isqstep1
  }
};

Isq.prototype.validate = function (tmpId, updatedCounter) {
  if (updatedCounter !== 1 && (!ReqObj.Form[tmpId].isret || this.IsqScreen < 0))
    this.IsqScreen++;
  ReqObj.Form[tmpId].isret = 0;
  if (
    isImageVidEnq(tmpId) &&
    ReqObj.Form[tmpId].FormSequence.StepCounter === 0 &&
    ReqObj.Form[tmpId].qtUtQuesPresent === false
  )
    this.IsqScreen--;
  if (
    tmpId.substr(0, 2) === "01" &&
    isGlIdEven(tmpId) &&
    ReqObj.Form[tmpId].screenNumber <= 0 &&
    ReqObj.Form[tmpId].qtUtQuesPresent === false
  )
    this.IsqScreen--;
  if (
    tmpId.substr(0, 2) === "04" &&
    isGlIdEven(tmpId) &&
    ReqObj.Form[tmpId].screenNumber <= 0 &&
    ReqObj.Form[tmpId].qtUtQuesPresent === false
  )
    this.IsqScreen--;
  if (isSSB(tmpId)) this.IsqScreen = 0;
  var IsqScreen = this.IsqScreen;
  var Error = ValidateQuestions(tmpId, false, IsqScreen);
  if (!Error && updatedCounter !== 1) this.IsqScreen--;
  return Error;
};

Isq.prototype.displayHtml = function (tmpId) {
  if (isSet(tmpId) && isSet(ReqObj.Form[tmpId])) {
    if (
      (ReqObj.Form[tmpId].typeofform.toLowerCase() === "image" ||
        ReqObj.Form[tmpId].typeofform.toLowerCase() === "video") &&
      isSet(ReqObj.Form[tmpId].userFilledIsq) &&
      ReqObj.Form[tmpId].userFilledIsq !== "" &&
      ReqObj.Form[tmpId].FormSequence.StepCounter !== 0
    )
      StructureIsq(tmpId);
    if (isSSB(tmpId)) ReqObj.Form[tmpId].prevCount = 0;
    if (ReqObj.Form[tmpId].IsqArray === null) return null; // no isq available
    ReqObj.Form[tmpId].IsqStep1 = isSSB(tmpId)
      ? ReqObj.Form[tmpId].IsqLength
      : ReqObj.Form[tmpId].IsqStep1;
    var returnHtml =
      ReqObj.Form[tmpId].prevCount === 0
        ? this.makeIsq(ReqObj.Form[tmpId].IsqStep1, tmpId)
        : this.makeIsq(ReqObj.Form[tmpId].IsqStepN, tmpId);
    /*
              1. prev count = 0 || no isq shown || call makeIsq with isqStep1
              2. prev count > 0 || isq shown || call makeIsq with isqStepN --
              N - how many isq's on 2bd or 3rd or nth step
            */
    if (returnHtml !== "" && this.countISQUpdated === false)
      ReqObj.Form[tmpId].currentclassCount++;
    if (IsChatbl(tmpId)) {
      ReqObj.Form[tmpId].isqans = returnHtml !== "" ? true : false;
      return returnHtml !== "" ? [this.question, this.answer] : [""];
    }
    if (isOtherEnq(tmpId)) {
      if (
        isImageVidEnq(tmpId) &&
        ReqObj.Form[tmpId].FormSequence.StepCounter === 0
      )
        ReqObj.Form[tmpId].calledClassName[
          ReqObj.Form[tmpId].FormSequence.StepCounter
        ] = this.className + "SP";
      else
        ReqObj.Form[tmpId].calledClassName[
          ReqObj.Form[tmpId].FormSequence.StepCounter
        ] = this.className;
    }
    return [returnHtml];
  }
  return [""];
};
function isNewInlineBl(tmpId) {
  if (modIdf === "DIR") return true;
  else return false;
}

Isq.prototype.makeIsq = function (MaxIsq, tmpId) {
  ReqObj.Form[tmpId].stopper =
    Math.min(
      MaxIsq,
      ReqObj.Form[tmpId].IsqLength - ReqObj.Form[tmpId].prevCount
    ) + ReqObj.Form[tmpId].prevCount;
  if (
    isImageVidEnq(tmpId) &&
    ReqObj.Form[tmpId].FormSequence.StepCounter > 0 &&
    ReqObj.Form[tmpId].isQtutShown === true
  )
    ReqObj.Form[tmpId].stopper++;
  return this.TraverseIsq(tmpId);
};

Isq.prototype.TraverseIsq = function (tmpId) {
  var whole_wrapper = "";
  var suffix = isBlFirstfold(tmpId)
    ? "_isqBox' class='eqF100 isq_ffmt'>"
    : "_isqBox'>";


  var IsqBoxSuffixOuterHtml = "<div  id='t" + tmpId + suffix;
  var CurrentPageQuestions = [];
  var finalIsqQuestions = [];
  ReqObj.Form[tmpId].locisqId = [];
  if (
    (isOtherEnq(tmpId) &&
      ReqObj.Form[tmpId].prevCount === 0 &&
      !isImageVidEnq(tmpId)) ||
    (isImageVidEnq(tmpId) &&
      ReqObj.Form[tmpId].prevCount === 0 &&
      ReqObj.Form[tmpId].FormSequence.StepCounter > 0)
  ) {
    IsqBoxSuffixOuterHtml +=
      "<input type='hidden' id='isq_first_screen' value='Screen1'>";
  }
  if (
    (currentISO() !== "IN" && IsChatbl(tmpId)) ||
    (currentISO() === "IN" && pdpenq(tmpId))
  )
    ReqObj.Form[tmpId].stopper = ReqObj.Form[tmpId].IsqLength;
  for (
    var i = ReqObj.Form[tmpId].prevCount;
    i < ReqObj.Form[tmpId].stopper;
    i++
  ) {
    ReqObj.Form[tmpId].Isq.Question = [];
    if (
      isImageVidEnq(tmpId) &&
      ReqObj.Form[tmpId].FormSequence.StepCounter === 0
    ) {
      FindIsqObject(
        ReqObj.Form[tmpId].IsqArray[i],
        tmpId,
        0,
        false,
        finalIsqQuestions
      );
      ReqObj.ImageVideoIsqSeq = true;
      if (
        isSet(ReqObj.Form[tmpId].requireNow) &&
        ReqObj.Form[tmpId].requireNow === true &&
        finalIsqQuestions.length === 0
      ) {
        ReqObj.Form[tmpId].requireNow = false;
      }
    } else if (isBlInline(tmpId)) {
      if (showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2)) {
        quantityshown = 1;
        FindIsqObject(
          ReqObj.Form[tmpId].quantityunit,
          tmpId,
          0,
          false,
          finalIsqQuestions
        );

        CurrentPageQuestions.push(ReqObj.Form[tmpId].Isq.Question);
        if (ReqObj.Form[tmpId].IsqArray.length === 1) {
          ReqObj.Form[tmpId].prevCount += 1;
        }
        // ReqObj.Form[tmpId].isBlQtutShown = true;
      } else if (isNewInlineBl(tmpId)) {
        for (var i = 0; i < ReqObj.Form[tmpId].IsqArray.length; i++) {
          if (
            ReqObj.Form[tmpId].IsqArray[i].length !== 2 ||
            (ReqObj.Form[tmpId].IsqArray[i].length === 2 &&
              ReqObj.Form[tmpId].IsqArray[i][0].toLowerCase() !== "quantity")
          ) {
            FindIsqObject(
              ReqObj.Form[tmpId].IsqArray[i],
              tmpId,
              0,
              false,
              finalIsqQuestions
            );
            displayedisq = 1;
            if (ReqObj.Form[tmpId].IsqArray.length === 1) {
              ReqObj.Form[tmpId].prevCount += 1;
            }

            break;
          }
        }
        CurrentPageQuestions.push(ReqObj.Form[tmpId].Isq.Question);
      }
      break;
    } else if (
      Bl01(tmpId) &&
      isNewInlineBl(tmpId) &&
      this.className == "Isq" &&
      this.IsqScreen == -1 &&
      displayedisq === 1 &&
      !isBlFirstfold(tmpId) &&
      !IsChatbl(tmpId) &&
      !IsChatBLInline(tmpId) &&
      !isBlInlineFr(tmpId)
    ) {
      for (var i = 0; i < ReqObj.Form[tmpId].IsqArray.length; i++) {
        // if((ReqObj.Form[tmpId].IsqArray)[i].length === 2 && (ReqObj.Form[tmpId].IsqArray)[i][0].toLowerCase() !== "quantity"){
        //     if(i === 0){
        //         blankscreenisq = 1;
        //         continue;
        //     }
        // }
        if (ReqObj.Form[tmpId].IsqArray[i].length !== 2) {
          if (i === 0) {
            // if only 1 isq is there
            blankscreenisq = 1;
            continue;
          } else {
            blankscreenisq = 0;
            FindIsqObject(
              ReqObj.Form[tmpId].IsqArray[i],
              tmpId,
              0,
              false,
              finalIsqQuestions
            );
            CurrentPageQuestions.push(ReqObj.Form[tmpId].Isq.Question);
          }
        }
      }
      break;
    } else if (isBlFirstfold(tmpId)) {
      //here
      if (showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2)) {
        FindIsqObject(
          ReqObj.Form[tmpId].quantityunit,
          tmpId,
          0,
          false,
          finalIsqQuestions
        );
        CurrentPageQuestions.push(ReqObj.Form[tmpId].Isq.Question);
        if (ReqObj.Form[tmpId].IsqArray.length === 1) {
          ReqObj.Form[tmpId].prevCount += 1;
        }
      }
      break;
    } else
      FindIsqObject(
        ReqObj.Form[tmpId].IsqArray[i],
        tmpId,
        0,
        false,
        finalIsqQuestions
      );
    if (ReqObj.Form[tmpId].Isq.Question.length !== 0)
      CurrentPageQuestions.push(ReqObj.Form[tmpId].Isq.Question);
    if (
      isSet(ReqObj.ImageVideoIsqSeq) &&
      ReqObj.ImageVideoIsqSeq === true &&
      isSet(ReqObj.Form[tmpId].isQuantIsq) &&
      ReqObj.Form[tmpId].isQuantIsq === true
    ) {
      break;
    }
  }
  if (checkIsqHtmlCreation(finalIsqQuestions) === true) {
    if (
      isSSB(tmpId) &&
      ReqObj.Form[tmpId].Isq.CurrentPageQuestions.length !== 0
    ) {
      ReqObj.Form[tmpId].Isq.CurrentPageQuestionsStatic = [];
      ReqObj.Form[tmpId].Isq.CurrentPageQuestionsStatic.push(
        ReqObj.Form[tmpId].Isq.CurrentPageQuestions[0][0]
      );
      CurrentpageSSBIsq(tmpId, CurrentPageQuestions);
    } else if ((Bl09(tmpId) || Bl04(tmpId)) && currentISO() !== "IN") {
      ReqObj.Form[tmpId].Isq.CurrentPageQuestionsStatic = [];
      ReqObj.Form[tmpId].Isq.CurrentPageQuestionsStatic.push(
        ReqObj.Form[tmpId].Isq.CurrentPageQuestions[0]
      );
      ReqObj.Form[tmpId].Isq.CurrentPageQuestions = [];
    }
    // if (isSet(ReqObj.ImageVideoIsqSeq) && ReqObj.ImageVideoIsqSeq === true && isSet(ReqObj.Form[tmpId].isQuantIsq) && ReqObj.Form[tmpId].isQuantIsq === false)
    //   ReqObj.Form[tmpId].Isq.CurrentPageQuestions.pop();

    ReqObj.Form[tmpId].Isq.CurrentPageQuestions.push(CurrentPageQuestions);

    if (
      ReqObj.ImageVideoIsqSeq !== true &&
      !isBlInline(tmpId) &&
      !isBlFirstfold(tmpId)
    )
      ReqObj.Form[tmpId].prevCount = ReqObj.Form[tmpId].stopper;
    else if (
      ReqObj.ImageVideoIsqSeq === true &&
      ReqObj.Form[tmpId].FormSequence.StepCounter === 0
    )
      ReqObj.Form[tmpId].prevCount = 0;
    else if (
      ReqObj.ImageVideoIsqSeq === true &&
      ReqObj.Form[tmpId].FormSequence.StepCounter !== 0
    )
      ReqObj.Form[tmpId].prevCount = ReqObj.Form[tmpId].stopper;

    if (!IsChatbl(tmpId)) {
      var IsqBoxSuffixClosingHtml = "</div>";
      var IsqBoxSuffixHtmlObj = {
        SuffixOuterHtml: IsqBoxSuffixOuterHtml,
        SuffixClosingHtml: IsqBoxSuffixClosingHtml,
        suffix: "_isqBox",
      };
      if (
        isImageVidEnq(tmpId) &&
        ReqObj.Form[tmpId].FormSequence.StepCounter === 0 &&
        finalIsqQuestions.length < 2 &&
        ReqObj.Form[tmpId].requireNow !== true
      ) {
        finalIsqQuestions.unshift([returnEnquireNowHtml(tmpId)]);
      }
      whole_wrapper = MakeWrapper(
        finalIsqQuestions,
        tmpId,
        IsqBoxSuffixHtmlObj,
        ""
      );
    } else {
      this.question = MakeWrapper(
        finalIsqQuestions,
        tmpId,
        WrapperObj(
          "<div  id='t" + tmpId + "_isqBox' class = 'cbl_ques cbl_vh' >",
          "</div>",
          "_isqBox"
        ),
        "ques"
      );

      if (!ReqObj.Form[tmpId].toAppendQues) {
        var FormId = "#t" + tmpId + "_newblchatReply";
        if ($(FormId).children(".cbl_resend.cbl_skip")) {
          $(FormId).children(".cbl_resend.cbl_skip").remove();
        }
        finalIsqQuestions[0][0]["UserInput"] += skipDiv1(tmpId); //chat bl bug
      }

      this.answer = MakeWrapper(
        finalIsqQuestions,
        tmpId,
        WrapperObj(
          "<div  id='t" +
          tmpId +
          "_isqBoxInput' class='cbl_isq_grp cbl_dtls cbl_df cbl_aic t" +
          tmpId +
          "_userInput cbl_br10 dn'>",
          "</div>",
          "_isqBox"
        ),
        "input"
      );

      whole_wrapper = this.question + this.answer;
    }
    return whole_wrapper;
  } else {
    if (!isBlInline(tmpId) && !isBlFirstfold(tmpId))
      ReqObj.Form[tmpId].prevCount = ReqObj.Form[tmpId].stopper;
    return "";
  }
};

function checkIsqHtmlCreation(arr) {
  var len = arr.length;
  var count = 0;
  for (var i = 0; i < len; i++) {
    if (isSet(arr[i][0].flag) && arr[i][0].flag === false) count++;
  }
  return count === len ? false : true;
}

function addLine() {
  return '<div class="cbl_line"></div>';
}

function FindIsqObject(
  Collection,
  tmpId,
  ObjectPosition,
  isRecursion,
  arrayOfQues
) {
  // This function is used to get the object where data lies
  if (isSet(Collection)) {
    if (Collection instanceof Array) {
      var len = isSet(Collection) ? Collection.length : 0;
      var RecurOfQues = [];
      var toaddPartition = 0;
      var isqtut = false;
      for (var i = 0; i < len; i++) {
        if (
          1 === toaddPartition &&
          IsChatbl(tmpId) &&
          (currentISO() === "IN" ||
            (currentISO() !== "IN" &&
              (Collection[i].IM_SPEC_MASTER_DESC.toLowerCase() === "quantity" ||
                Collection[i].IM_SPEC_MASTER_DESC.toLowerCase() ===
                "quantity unit")))
        ) {
          QuesObj["UserInput"] += addLine();
        }
        if (len > 1) ObjectPosition++;
        var QuesObj = FindIsqObject(Collection[i], tmpId, ObjectPosition, true);
        RecurOfQues.push(QuesObj);
        toaddPartition = 1;
        isqtut =
          QuesObj.qtuttype === 5 || QuesObj.qtuttype === 6 ? true : false;
      }
      if (isqtut === true)
        return arrayOfQues.push(returnIsqHtmlObj(RecurOfQues, tmpId));
      else arrayOfQues.push(RecurOfQues);
      return arrayOfQues;
    } else {
      if (
        modIdf === "MDC" &&
        Collection.IM_SPEC_MASTER_DESC === "Brand"
      )
        ReqObj.Form[tmpId].stopper++;
      else {
        var qtisq = false;
        var sampisq = false;
        if (
          isSet(ReqObj.Form[tmpId].toGetCurrentPagestring) &&
          ReqObj.Form[tmpId].toGetCurrentPagestring
        )
          getIsqQuestions(Collection, "current", tmpId);
        if (
          Collection.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity" ||
          Collection.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit"
        ) {
          ReqObj.Form[tmpId].cName.qtut = true;
          qtisq = true;
          ReqObj.Form[tmpId].cName.qtracking = 1;
        }
        if (
          Collection.IM_SPEC_MASTER_DESC.toLowerCase() ===
          "total order value" ||
          Collection.IM_SPEC_MASTER_DESC.toLowerCase() ===
          "total order value(rs)"
        ) {
          ReqObj.Form[tmpId].cName.tov = true;
        }
        if (
          isSet(ReqObj.Form[tmpId].defaultIsq) &&
          ReqObj.Form[tmpId].defaultIsq === "1" &&
          isSet(
            Collection.IM_SPEC_MASTER_DESC.toLowerCase().match("sample order")
          )
        )
          sampisq = true;
        if (
          isImageVidEnq(tmpId) &&
          ReqObj.Form[tmpId].FormSequence.StepCounter === 0
        ) {
          if (
            Collection.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity" ||
            Collection.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit"
          ) {
            var htmlObj =
              qtisq === false && currentISO() !== "IN"
                ? {
                  clsNm: false,
                  flag: false,
                  ClosingWrapper: "",
                  Label: "",
                  OuterWrapper: "",
                  UserInput: "",
                }
                : convertHtml(Collection, tmpId, ObjectPosition); // if quantity call convert html
            ReqObj.Form[tmpId].previousFullDesc =
              Collection.IM_SPEC_MASTER_FULL_DESC;
            ReqObj.Form[tmpId].isQuantIsq = true;
            if (isRecursion) {
              return htmlObj;
            } else {
              return arrayOfQues.push([htmlObj]);
            }
          } else {
            ReqObj.Form[tmpId].requireNow = true;
            return returnEnquireNowHtml(tmpId); // return type must be object similar to htmlObj
          }
        } else {
          var htmlObj =
            qtisq === false &&
              sampisq === false &&
              (currentISO() !== "IN" || (currentISO() === "IN" && pdpenq(tmpId)))
              ? {
                clsNm: false,
                flag: false,
                ClosingWrapper: "",
                Label: "",
                OuterWrapper: "",
                UserInput: "",
              }
              : convertHtml(Collection, tmpId, ObjectPosition);
          ReqObj.Form[tmpId].previousFullDesc =
            Collection.IM_SPEC_MASTER_FULL_DESC;
        }

        // return html;
        if (isRecursion) {
          return htmlObj;
        } else {
          return arrayOfQues.push([htmlObj]);
        }
      }
    }
  }
}

function FindIsqObjectQuestions(
  Collection,
  tmpId,
  ObjectPosition,
  isRecursion,
  arrayOfQues
) {
  // This function is used to get the object where data lies
  if (isSet(Collection)) {
    if (Collection instanceof Array) {
      var len = isSet(Collection) ? Collection.length : 0;
      var RecurOfQues = [];
      for (var i = 0; i < len; i++) {
        if (len > 1) ObjectPosition++;
        var QuesObj = FindIsqObjectQuestions(
          Collection[i],
          tmpId,
          ObjectPosition,
          true
        );
        RecurOfQues.push(QuesObj);
      }
      arrayOfQues.push(RecurOfQues);
      return arrayOfQues;
    } else {
      if (
        isSet(ReqObj.Form[tmpId].toGetQuestionsOnly) &&
        ReqObj.Form[tmpId].toGetQuestionsOnly
      )
        getIsqQuestions(Collection, "allquestions", tmpId);
    }
  }
}

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

Isq.prototype.BackButton = function (tmpId) {
  this.IsqScreen--;
  if (ReqObj.Form[tmpId].isret) {
    this.IsqScreen--;
    ReqObj.Form[tmpId].isret = 0;
  }
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

function msg_firimgvid(text, tmpId) {
  var msg =
    ReqObj.Form[tmpId].typeofform.toLowerCase() === "image"
      ? "images"
      : "videos";
  if (direnqImage(tmpId)) {
    return "";
  }
  else {
    return (
      "<div class='eqimvid'>" +
      returnSpan("", "", text, "befwt", "") +
      " to get latest " +
      msg +
      " & best quotes</div>"
    );
  }

}
function returnEnquireNowHtml(tmpId) {
  return {
    ClosingWrapper: "</div>",
    Label: "",
    OuterWrapper: returnContainer(
      "t" + tmpId,
      "_enquirenow",
      "eqs16",
      "",
      "",
      ""
    ),
    UserInput: /*returnButton("t" + tmpId, "_submit", "Enquire now!", "")*/ "",
    beforeInput: "",
    beforeLabel: "",
    isenquire: true,
  };
}

function updateUserFilledIsq(tmpId, isq_data) {
  for (var i = 0; i < 2; i++) {
    var isqobj = {
      optionsId: isq_data.b_id[i],
      optionsValue: isq_data.b_response[i],
      questionsDesc: isq_data.q_desc[i],
      questionsId: isq_data.q_id[i],
    };
    ReqObj.Form[tmpId].userFilledIsq.push(isqobj);
  }
}

function updateQtKey(tmpId, change) {
  ReqObj.Form[tmpId].qtutchange.quantity = change;
}

function updateUtKey(tmpId, change) {
  ReqObj.Form[tmpId].qtutchange.unit = change;
}

function qtutUI(tmpId) {
  if (isSet(ReqObj.Form[tmpId].preFilledUnitDetail)) {
    var invalue = ReqObj.Form[tmpId].preFilledUnitDetail.invalue;
    var inputid = ReqObj.Form[tmpId].preFilledUnitDetail.id;
    if (isSet(invalue) && invalue !== "" && isSet(inputid) && inputid !== "") {
      if (invalue.length > 18) {
        $("body").addClass("enqblsug");
      } else {
        $("body").removeClass("enqblsug");
      }
    }
  }
}

function qtutEvents(tmpId) {
  var toappend =
    tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
      ? tmpId + "_" + (ReqObj.Form[tmpId].FormSequence.StepCounter + 1)
      : tmpId;

  var id2 = $(".unsug" + toappend).attr("id");
  var id = $(".qtut" + toappend).attr("id"); // delete sugg object before creating new !
  typeUnitSuggester(tmpId);
  typeQuantitySuggester(tmpId);
  $("#" + id).on("input", function (event) {
    ReqObj.Form[tmpId].errflag = false;
    var typedchar = $("#" + event.target.id).val();
    if (validateInputEvent(tmpId, event) === true) {
      if (!ReqObj.Form[tmpId].qtutsugg) {
        typeUnitSuggester(tmpId, "from-validate");
        typeQuantitySuggester(tmpId, "from-validate");
      }
      ReqObj.Form[tmpId].errflag = true;
      ReqObj.Form[tmpId].QtUtError = false;
      if (typedchar !== "") updateQtKey(tmpId, "filled");
      else updateQtKey(tmpId, "empty");
      handleErrorUI(
        {
          data: {
            r_data: {
              target: {
                id: id,
              },
            },
            tmpId: tmpId,
          },
        },
        false
      );
      var source = modifyqutAnswers(tmpId, typedchar);
      if (ReqObj.Form[tmpId].qtutsugg) {
        $("#" + id).autocomplete({
          source: source,
        });
      }
    }
    if (!isSet(ReqObj.Form[tmpId].errflag) || ReqObj.Form[tmpId].errflag)
      handleQuantityUi({
        data: {
          event: event,
          tmpId: tmpId,
          todo: "highlight",
        },
      });
  });

  $("#" + id).on("keydown", function (event) {
    // keydown events on numbers and letters only
    if (event.which === 40 || event.which === 38) updateQtUtFields(event, true);
  });

  $("#" + id + ", #" + id2)
    .focusout(function (event) {
      if (!isSet(ReqObj.Form[tmpId].errflag) || ReqObj.Form[tmpId].errflag) {
        handleQuantityUi({
          data: {
            event: event,
            tmpId: tmpId,
            todo: "removeFocus",
          },
        });
      }
    })
    .on("focus", function (event) {
      if (!isSet(ReqObj.Form[tmpId].errflag) || ReqObj.Form[tmpId].errflag) {
        handleQuantityUi({
          data: {
            event: event,
            tmpId: tmpId,
            todo: "highlight",
          },
        });
        if (
          $("#" + event.target.id).val() !== "" &&
          ReqObj.Form[tmpId].QtUtError === false
        ) {
          if (!ReqObj.Form[tmpId].qtutsugg) {
            typeUnitSuggester(tmpId);
            typeQuantitySuggester(tmpId);
          }
          var source = modifyqutAnswers(tmpId, $("#" + event.target.id).val());
          if (ReqObj.Form[tmpId].qtutsugg) {
            $("#" + id).autocomplete({
              source: source,
            });
          }
        }
      }
    });

  // $("#" + id).on("blur", function(event) {
  //   if (!isSet(ReqObj.Form[tmpId].errflag) || ReqObj.Form[tmpId].errflag)
  //     handleQuantityUi({
  //       data: {
  //         event: event,
  //         tmpId: tmpId,
  //         todo: "highlight"
  //       }
  //     });
  // });

  $("#" + $(".unsug" + toappend).attr("id")).on("keydown", function (event) {
    handleErrorUI(
      {
        data: {
          r_data: {
            target: {
              id: $(".unsug" + toappend).attr("id"),
            },
          },
          tmpId: tmpId,
        },
      },
      false
    );
    if (event.which === 8) {
      ReqObj.Form[tmpId].isUnitPrefilled = false;
      var pfval = $("#" + id).val();
      $("#" + id).val("");
      $("#" + id).val(pfval);
      if (returnType(pfval) === "num" && parseInt(pfval) !== 0) {
        if (!ReqObj.Form[tmpId].qtutsugg) {
          typeUnitSuggester(tmpId);
          typeQuantitySuggester(tmpId);
        }
        var source = modifyqutAnswers(tmpId, pfval);
        if (ReqObj.Form[tmpId].qtutsugg) {
          $("#" + id).autocomplete({
            source: source,
          });
        }
      }
    }
  });

  $("#" + $(".unsug" + toappend).attr("id")).on("input", function (event) {
    var val = $("#" + $(".unsug" + toappend).attr("id")).val();
    if (val !== "") updateUtKey(tmpId, "input");
    // else updateUtKey(tmpId, "empty");
    else {

      updateUtKey(tmpId, "empty");
      var arr = [];
      var sarr = [];

      for (var i = 0; i < ReqObj.Form[tmpId].IsqArray.length; i++) {
        if (ReqObj.Form[tmpId].IsqArray[i].length === 2) {
          for (var j = 0; j < 2; j++) {
            if (ReqObj.Form[tmpId].IsqArray[i][j].IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit") {
              arr = ReqObj.Form[tmpId].IsqArray[i][j].IM_SPEC_OPTIONS_DESC.split("##");
            }
          }
        }
        var len = arr.length;
        for (var i = 0; i < len; i++) {
          if (arr[i].toLowerCase() === "other" || arr[i].toLowerCase() === "others") {
            continue;
          }
          else {
            sarr.push(arr[i]);
          }
        }
        break;
      }
      $('#' + id2)
        .autocomplete({
          source: sarr,
          minLength: 0
        })
        .focus(function () {
          $(this).autocomplete('search', $(this).val())
        });

    }

  });

  if (IsChatbl(tmpId) && $(".qtut" + toappend).length > 0) {
    $("#t" + tmpId + "_isqBoxInput").addClass("cbl_odrq");
  }
}

function updateQtUtFields(event, keydownp) {
  var qt_element = $("#" + event.target.id);
  var tmpId = event.target.id.substring(1, 5);
  var toappend =
    tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
      ? tmpId + "_" + (ReqObj.Form[tmpId].FormSequence.StepCounter + 1)
      : tmpId;
  var ut_element = $("#" + $(".unsug" + toappend).attr("id"));

  var value = $(qt_element).val();
  var len = value.length;
  if (len > 0) {
    var count = 0;
    for (var i = 0; i < len; i++) {
      if (returnType(value[i]) === "num") count++;
      else break;
    }
    $(qt_element).val(value.substring(0, count).trim());
    if (keydownp !== true) $(qt_element).blur(); // to remove focus
    $(ut_element).val(value.substring(count, len).trim());
    updateOptionId(tmpId, $(".unsug" + toappend).attr("id"));
  }
}

function updateOptionId(tmpId, ut_element_id) {
  var ut_element = $("#" + ut_element_id);
  var unit = $(ut_element).val().toLowerCase();
  newOptionId = getOptionId(tmpId, unit);
  $(ut_element).attr("optionid", newOptionId);
}

function getOptionId(tmpId, unit) {
  if (ReqObj.Form[tmpId].IdMapDesc.hasOwnProperty(unit.toLowerCase()))
    newOptionId = ReqObj.Form[tmpId].IdMapDesc[unit];
  else newOptionId = ReqObj.Form[tmpId].IdMapDesc["other"];

  return isSet(newOptionId) ? newOptionId : "";
}

function modifyqutAnswers(tmpId, typedchar) {
  //var typedchar = "" + parseInt(typedchar) + "";
  if (typedchar !== "" && typedchar.length > 0) {
    var getcharCode = typedchar[typedchar.length - 1].charCodeAt(0);
    if (
      (getcharCode >= 65 && getcharCode <= 90) ||
      (getcharCode >= 97 && getcharCode <= 122)
    ) {
      typedchar = typedchar.substring(0, typedchar.length - 1);
    }
    var arr = JSON.parse(JSON.stringify(removeRepeated(tmpId)));
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      if (arr[i].toLowerCase() !== "other" && arr[i].toLowerCase() !== "others")
        if (arr[i].toLowerCase() !== "none") arr[i] = typedchar + " " + arr[i];
    }
    return arr;
  }
}

function removeRepeated(tmpId, start) {
  var toappend =
    tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
      ? tmpId + "_" + (ReqObj.Form[tmpId].FormSequence.StepCounter + 1)
      : tmpId;

  var arr = [];
  var len = ReqObj.Form[tmpId].qutAnswers.length;
  var ans = ReqObj.Form[tmpId].qutAnswers;
  var ut_element_value = $("#" + $(".unsug" + toappend).attr("id")).val();
  if (isSet(ut_element_value)) {
    ut_element_value = ut_element_value.trim();
    for (var i = 0; i < len; i++) {
      if (ans[i].toLowerCase() !== ut_element_value.toLowerCase()) {
        arr.push(ans[i]);
      }
    }
  }
  return arr;
}

function checkLastInput(tmpId, event) {
  var firstval = $("#" + event.target.id)
    .val()
    .substring(0, 1);
  var firstkeytype = returnType(firstval);
  return firstkeytype === "num" && parseInt(firstval) !== 0
    ? "valid"
    : "invalid";
}

function checkInBetween(tmpId, event) {
  // less than 2 - will be undefined !
  var totallen = $("#" + event.target.id).val().length;
  if (totallen === 2)
    var val = $("#" + event.target.id)
      .val()
      .substring(0, totallen);
  else if (totallen > 2)
    var val = $("#" + event.target.id)
      .val()
      .substring(1, totallen);
  return /^[a-zA-Z0-9 ]*$/.test(val) === false ? "invalid" : "valid"; // if not numbers/letters - invalid
}

function validateInputEvent(tmpId, event) {
  var r_data = event;
  var pressedKey = event.originalEvent["data"];
  var totallen = $("#" + event.target.id).val().length;
  var div_val = $("#" + event.target.id).val() * 1;
  var keyType = returnType(pressedKey);
  if (totallen === 1) {
    if (keyType === "char") {
      handleQuantityUi({
        data: {
          r_data: r_data,
          tmpId: tmpId,
          toEmpty: "none",
          msg: "Quantity must be numeric",
          type: false,
        },
      });
      return false;
    } else if (keyType === "num" && parseInt(pressedKey) === 0) {
      handleQuantityUi({
        data: {
          r_data: r_data,
          tmpId: tmpId,
          toEmpty: "none",
          msg: "Quantity should not be '0'",
          type: false,
        },
      });
      return false;
    }
    handleErrorUI(
      {
        data: {
          r_data: r_data,
          tmpId: tmpId,
        },
      },
      false
    );
    if (keyType === "spchar") {
      handleQuantityUi({
        data: {
          r_data: r_data,
          tmpId: tmpId,
          toEmpty: "none",
          msg: "Enter a valid Quantity",
        },
      });
      return false;
    }
    if (keyType === "backspace") {
      if (checkLastInput(tmpId, event) === "invalid") {
        var mssg =
          div_val === 0
            ? "Quantity should not be '0'"
            : "Enter a valid Quantity";
        handleQuantityUi({
          data: {
            r_data: r_data,
            tmpId: tmpId,
            toEmpty: "none",
            msg: mssg,
            type: false,
          },
        });
        return false;
      }
    }
    return true;
  } else {
    if (totallen === 0) return true;
    if (checkLastInput(tmpId, event) === "invalid") {
      var mssg =
        parseInt(pressedKey) === 0
          ? "Quantity should not be '0'"
          : "Enter a valid Quantity";

      handleQuantityUi({
        data: {
          r_data: r_data,
          tmpId: tmpId,
          toEmpty: "none",
          msg: mssg,
          type: false,
        },
      });
      return false;
    }
    if (keyType === "spchar") {
      handleQuantityUi({
        data: {
          r_data: r_data,
          tmpId: tmpId,
          toEmpty: "none",
          msg: "Enter a valid Quantity",
          type: false,
        },
      });
      return false;
    }
    if (keyType === "backspace") {
      if (checkInBetween(tmpId, event) === "invalid") {
        handleQuantityUi({
          data: {
            r_data: r_data,
            tmpId: tmpId,
            toEmpty: "none",
            msg: "Enter a valid Quantity",
            type: false,
          },
        });

        return false;
      }
      return true;
    }
    if (keyType === "char" || keyType === "num") {
      if (checkInBetween(tmpId, event) === "invalid") {
        handleQuantityUi({
          data: {
            r_data: r_data,
            tmpId: tmpId,
            toEmpty: "none",
            msg: "Enter a valid Quantity",
            type: false,
          },
        });
        return false;
      } else if (keyType === "char") {
        handleQuantityUi({
          data: {
            r_data: r_data,
            tmpId: tmpId,
            toEmpty: "lastChar",
            type: true,
            pressedKey: pressedKey,
          },
        });
        updateUtKey(tmpId, "input");
      }
    }
    handleErrorUI(
      {
        data: {
          r_data: r_data,
          tmpId: tmpId,
        },
      },
      false
    );
    return true;
  }
}

function returnType(pressedKey) {
  if (typeof pressedKey === "undefined" || pressedKey === null) {
    return "backspace";
  }
  var getcharCode = pressedKey.charCodeAt(0);
  if (
    (getcharCode >= 65 && getcharCode <= 90) ||
    (getcharCode >= 97 && getcharCode <= 122)
  ) {
    return "char";
  } else if (getcharCode >= 48 && getcharCode <= 57) {
    return "num";
  } else return "spchar";
}

/* ---------------CSS HANDLING-----------------------*/

function returnCharPos(typedChar, pressedKey) {
  var len = typedChar.length;
  for (var i = 0; i < len; i++) {
    if (typedChar.charAt(i) === pressedKey) {
      return i;
    }
  }
  return -1;
}

function handleQuantityUi(event) {
  if (event.data.toEmpty === "none") {
    ReqObj.Form[event.data.tmpId].QtUtError = true;
    handleErrorUI(event, true);
  }
  if (event.data.toEmpty === "lastChar") {
    var typedChar = $("#" + event.data.r_data.target.id).val();
    var len = $("#" + event.data.r_data.target.id).val().length;
    if (event.data.type === false) {
      $("#" + event.data.r_data.target.id).val(typedChar.substring(0, len - 1));
      ReqObj.Form[event.data.tmpId].QtUtError = true;
      handleErrorUI(event, true);
    } else {
      var pos = returnCharPos(typedChar, event.data.pressedKey);
      len = pos !== -1 ? pos : len;
      var toappend =
        event.data.tmpId.substr(0, 2) === "09" &&
          ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
          ? event.data.tmpId +
          "_" +
          (ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1)
          : event.data.tmpId;

      $("#" + event.data.r_data.target.id).val(typedChar.substring(0, len));
      $("#" + $(".unsug" + toappend).attr("id")).focus();
      if ($("#" + $(".unsug" + toappend).attr("id")).is("focus")) {
        $("#" + $(".unsug" + toappend).attr("id")).val(event.data.pressedKey);
      } else {
        $("#" + $(".unsug" + toappend).attr("id"))
          .focus()
          .click();
        $("#" + $(".unsug" + toappend).attr("id")).val(event.data.pressedKey);
      }
    }
  }
  if (event.data.todo === "highlight") {
    var tmpId = event.data.tmpId;
    var toappendhr =
      event.data.tmpId.substr(0, 2) === "09" &&
        ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
        ? event.data.tmpId +
        "_" +
        (ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1)
        : event.data.tmpId;
    var cls =
      isSSB(tmpId) && isnewSSB(tmpId)
        ? "qut_cus_active nb_cus_qt"
        : tmpId.substr(0, 2) === "01" &&
          isGlIdEven(tmpId) &&
          ReqObj.Form[tmpId].screenNumber === 0
          ? "qut_cus_active inEql_cus_active"
          : "qut_cus_active";
    $(".qtut" + toappendhr)
      .parent()
      .addClass(cls);
    $("#t" + event.data.tmpId + "qut_id").addClass(cls);
  }

  if (event.data.todo === "removeFocus") {
    var tmpId = event.data.tmpId;
    var cls =
      isSSB(tmpId) && isnewSSB(tmpId)
        ? "qut_cus_active nb_cus_qt"
        : tmpId.substr(0, 2) === "01" &&
          isGlIdEven(tmpId) &&
          ReqObj.Form[tmpId].screenNumber === 0
          ? "qut_cus_active inEql_cus_active"
          : "qut_cus_active";
    $("#t" + event.data.tmpId + "qut_id").removeClass(cls);
  }
}

function handleErrorUI(event, showError) {
  var toappend =
    event.data.tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
      ? event.data.tmpId +
      "_" +
      (ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1)
      : event.data.tmpId;
  var formType = ReqObj.Form[event.data.tmpId].formType.toLowerCase();
  var errorCls =
    formType === "bl"
      ? "redc"
      : "beerrp sper";
  if (IsChatbl(event.data.tmpId))
    showError
      ? addChatblError(event.data.tmpId, event.data.msg)
      : removechatblerror(event.data.tmpId);
  else if (showError === true) {
    $("#t" + toappend + "_validinev")
      .html(event.data.msg)
      .removeClass("bedsnone")
      .addClass(errorCls);
    $(".qtut" + toappend)
      .parent()
      .addClass("qut_cus_active");
    $("#" + event.data.r_data.target.id).removeClass("highlight-err");
    $("#t" + event.data.tmpId + "qut_id").removeClass("qut_cus_active");
  } else if (showError === false) {
    $("#t" + toappend + "_validinev")
      .html("")
      .addClass("bedsnone")
      .removeClass(errorCls);
    $("#" + event.data.r_data.target.id).removeClass("highlight-err");
  }
}

function handleQuantityUiErrorMsg(event) {
  if (IsChatbl(event.data.tmpId)) {
    addChatblError(event.data.tmpId, event.data.errorObject.msg);
  } else {
    var formType = ReqObj.Form[event.data.tmpId].formType.toLowerCase();
    var errorClass =
      formType === "enq"
        ? event.data.errorClass
        : "redc";
    if (
      event.data.option_type == "quantity" ||
      event.data.option_type == "quantity unit"
    ) {
      var toappend =
        event.data.tmpId.substr(0, 2) === "09" &&
          ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
          ? event.data.tmpId +
          "_" +
          (ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1)
          : event.data.tmpId;
      $("#t" + toappend + "_validinev")
        .html(event.data.errorObject.msg)
        .removeClass("bedsnone")
        .addClass(errorClass);
    } else if (event.data.option_type == "text") {
      var inputid = $(event.data.errorSelect).attr("id");
      $("#" + inputid + "_err").removeClass("bedsnone");
    } else {
      $(event.data.errorSelect + "_err").removeClass("bedsnone");
    }
    $(event.data.errorSelect).addClass("highlight-err");
    if (isSSB(event.data.tmpId)) $(event.data.errorSelect).focus();
    $(event.data.errorSelect)
      .off("click keyup")
      .on("click keyup", function () {
        event.data.option_type == "quantity unit"
          ? $("#t" + toappend + "_validinev").addClass("bedsnone")
          : event.data.option_type == "text"
            ? $("#" + inputid + "_err").addClass("bedsnone")
            : $(event.data.errorSelect + "_err").addClass("bedsnone");
        $(event.data.errorSelect).removeClass("highlight-err");
      });
  }
}
/* ---------------CSS HANDLING-----------------------*/

/* ---------------CSS HANDLING-----------------------*/

function onSelectQtUt(event) {
  ReqObj.Form[event.target.id.substring(1, 5)].IsqQtUtEvents["onselect"] = true;
  updateUtKey(event.target.id.substring(1, 5), "isq");
  updateQtUtFields(event);
}

function typeQuantitySuggester(tmpId, where) {
  var imeshcookie = imeshExist();
  var qtut_sugg = "";
  var toappend =
    tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
      ? tmpId + "_" + (ReqObj.Form[tmpId].FormSequence.StepCounter + 1)
      : tmpId;
  ReqObj.Form[tmpId].qtutsugg = false;
  if (typeof Suggester !== "undefined") {
    suggClass = IsChatbl(tmpId)
      ? IsChatBLInline(tmpId)
        ? "cus_qt smcbl_qt"
        : "cus_qt chatbl_qt"
      : isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? "cus_qt nb-cus-qt"
          : "cus_qt mb-cus-qt"
        : isBlInline(tmpId) ||
          (isGlIdEven(tmpId) &&
            tmpId.substr(0, 2) === "01" &&
            where === "from-validate")
          ? "cus_qt inEql_cus_qt"
          : isBlFirstfold(tmpId)
            ? imeshcookie == "" && currentISO() == "IN"
              ? "cus_qt inEql_cus_qtun"
              : "cus_qt inEql_cus_qtid"
            : "cus_qt";
    qtut_sugg = new Suggester({
      onSelect: onSelectQtUt,
      element: $(".qtut" + toappend).attr("id"),
      minStringLengthToFetchSuggestion: 1,
      updateCache: false,
      autocompleteClass: suggClass,
      minStringLengthToDisplaySuggestion: 1,
      source: [],
      postValUpd: false,
      tmpId: false,
      rowsToDisplay: "5",
      type: "custom",
    });
    ReqObj.Form[tmpId].qtutsugg = true;
  }
}

function updateoption(event) {
  var tmpId = event.target.id.substr(1, 4);
  updateOptionId(tmpId, event.target.id);
  updateUtKey(tmpId, "sugg");
}

function typeUnitSuggester(tmpId, where) {
  var imeshcookie = imeshExist();
  var unit_sugg = "";
  let arr = [];

  for (var i = 0; i < ReqObj.Form[tmpId].IsqArray.length; i++) {
    if (ReqObj.Form[tmpId].IsqArray[i].length === 2) {
      for (var j = 0; j < 2; j++) {
        if (ReqObj.Form[tmpId].IsqArray[i][j].IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit") {

          arr = ReqObj.Form[tmpId].IsqArray[i][j].IM_SPEC_OPTIONS_DESC.split("##");
        }
      }

    }
  }
  // console.log(arr);
  var toappend =
    tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
      ? tmpId + "_" + (ReqObj.Form[tmpId].FormSequence.StepCounter + 1)
      : tmpId;
  if (typeof Suggester !== "undefined") {
    suggClass = IsChatbl(tmpId)
      ? IsChatBLInline(tmpId)
        ? "cus_ut smcbl_ut"
        : "cus_ut chatbl_ut"
      : isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? "cus_ut nb-cus-ut"
          : "cus_ut mb-cus-ut"
        : isBlInline(tmpId) ||
          (isGlIdEven(tmpId) &&
            tmpId.substr(0, 2) === "01" &&
            where === "from-validate")
          ? "cus_ut inEql_cus_ut"
          : isBlFirstfold(tmpId)
            ? imeshcookie == "" && currentISO() == "IN"
              ? "cus_ut inEql_cus_utun"
              : "cus_ut inEql_cus_utid"
            : "cus_ut";
    row_num_ut = IsChatbl(tmpId) ? "3" : "5";
    unit_sugg = new Suggester({
      element: $(".unsug" + toappend).attr("id"),
      onSelect: updateoption,
      placeholder: "",
      classPlaceholder: "",
      source: arr,
      minStringLengthToFetchSuggestion: 1,
      updateCache: false,
      autocompleteClass: suggClass,
      type: "custom",
      minStringLengthToDisplaySuggestion: 1,
      rowsToDisplay: row_num_ut,
    });
    ReqObj.Form[tmpId].unitSuggester.push(unit_sugg);

  }
}

function MakeLabel(labelObj, descriptionHtml, tmpId) {
  if (IsChatbl(tmpId)) {
    return ChatBlMsgs(labelObj.QuestionDesc);
  } else if (isSSB(tmpId))
    return MakeSSBLabel(labelObj, descriptionHtml, tmpId);
  else if (isBlInline(tmpId)) {
    var label =
      isBlInlineFr(tmpId) && labelObj.flag === "1"
        ? "<label class='" +
        labelObj.lblClass +
        "' id='" +
        labelObj.labelId +
        "'"
        : "<label class='fs15 cl11' id='" + labelObj.labelId + "'";
    if (isSet(labelObj.questionId) && labelObj.questionId !== "")
      Label += "quesid='" + labelObj.questionId + "'";
    label += ">" + labelObj.QuestionDesc + "</label>";
    return label;
  } else {
    var lbdiv = labelObj["lblin"] === true ? "tllb pr" : "";
    var Label =
      "<div class='" +
      lbdiv +
      "'><label class='" +
      labelObj.lblClass +
      "' id='" +
      labelObj.labelId +
      "'";
    if (isSet(labelObj.questionId) && labelObj.questionId !== "")
      Label += "quesid='" + labelObj.questionId + "'";
    Label += ">" + labelObj.QuestionDesc + "</label>";
    if (isSet(descriptionHtml)) Label += descriptionHtml;
    Label += "</div>";
    return Label;
  }
}

function LabelForCheckAndRadio(labelObj, descriptionHtml, tmpId, HelpLabel) {
  if (IsChatbl(tmpId)) {
    return ChatBlMsgs(labelObj.QuestionDesc, labelObj.type);
  } else if (isSSB(tmpId)) {
    return SSBChkBxAndRadButLabel(labelObj, descriptionHtml, tmpId, HelpLabel);
  } else if (isBlInline(tmpId)) {
    return (
      "<label id=" +
      labelObj.labelId +
      " quesid='" +
      labelObj.questionId +
      "' class = 'fs15 cl11'>" +
      labelObj.QuestionDesc +
      "</label>"
    );
  } else {
    return (
      "<div class='beclr'></div><div class='be-dvtxt bewauto bepr tllb'><label id=" +
      labelObj.labelId +
      " quesid='" +
      labelObj.questionId +
      "' class='" +
      (labelObj.lblClass || "") +
      "' >" +
      labelObj.QuestionDesc +
      "</label>" +
      HelpLabel +
      descriptionHtml +
      "</div><div class='beclr'></div>"
    );
  }
}

/**
 *@description takes input parameter and returns the HTML for the different error blocks
 *
 *
 * @returns HTML for the error block
 */
function errorBlockFunction(errorObject, tmpId) {
  if (!isSet(errorObject) || $.isEmptyObject(errorObject)) return "";
  else {
    if (IsChatbl(tmpId)) {
      addChatblError(tmpId, errorObject.msg);
      return "";
    } else {
      return (
        "<div  class='be-erbx isq_error_block " +
        errorObject.error_block_class +
        "'><div data-role='content'>" +
        errorObject.msg +
        "</div><a class='be-erarw " +
        errorObject.anchor_class +
        "'  data-role='arrow'></a></div>"
      );
    }
  }
}

function Tooltip(inputType, desc) {
  var descriptionHtml = "";
  if (isSet(inputType) && isSet(desc) && desc !== "") {
    if (inputType.toLowerCase() === "text") {
      descriptionHtml = FullDescHtml({
        div1Class: "int-ct1 info_iconeqbl",
        div2Class: "blnewform_sprit inft",
        div3Class: "nwarN bedsnone full_desc Tp8",
        fullDesc: desc,
      });
    } else if (inputType.toLowerCase() === "select") {
      descriptionHtml = FullDescHtml({
        div1Class: "int-ct3 info_iconeqbl",
        div2Class: "blnewform_sprit inft",
        div3Class: "nwarN bedsnone full_desc Tp8",
        fullDesc: desc,
      });
    } else if (inputType.toLowerCase() === "radio") {
      descriptionHtml += FullDescHtml({
        div1Class: "int-ct1 info_iconeqbl",
        div2Class: "blnewform_sprit inft tn6",
        div3Class: "nwarN bedsnone full_desc",
        fullDesc: desc,
      });
    } else if (inputType.toLowerCase() === "check") {
      descriptionHtml += FullDescHtml({
        div1Class: "int-ct1 info_iconeqbl",
        div2Class: "blnewform_sprit inft tn6",
        div3Class: "nwarN bedsnone full_desc",
        fullDesc: desc,
      });
    }
    if (isSet(descriptionHtml)) return descriptionHtml;
    else return "";
  }
  return descriptionHtml;
}

/**
 *@description returns the textbox html for the ISQ
 *
 *
 * @returns HTML for the text block
 */

function TextBoxHTML(textboxObject, desc) {
  var descriptionHtml = "";
  if (isSet(desc) && desc !== "") {
    textboxObject.lblClass += " bedbtip";
    descriptionHtml = FullDescHtml({
      div1Class: "int-ct3 info_iconeqbl",
      div2Class: "blnewform_sprit inft",
      div3Class: "nwarN bedsnone full_desc Tp8",
      fullDesc: desc,
    });
  }
  var textHTML =
    "<div class='" +
    textboxObject.divClass +
    "'>" +
    MakeLabel(textboxObject, descriptionHtml) +
    TextBoxIp(textboxObject);

  return textHTML;
}

function returnFirstPrefilledUnit(tmpId) {
  if (
    isSet(ReqObj.Form[tmpId].userFilledIsq) &&
    isSet(ReqObj.Form[tmpId].userFilledIsq[1]) &&
    isSet(ReqObj.Form[tmpId].userFilledIsq[1].optionsValue) &&
    ReqObj.Form[tmpId].userFilledIsq[1].optionsValue !== ""
  ) {
    return handleSpecialQuotes(
      ReqObj.Form[tmpId].userFilledIsq[1].optionsValue
    );
  } else return "";
}

function TextBoxIp(textboxObject, addLabel, addvalue) {
  var invalue =
    isSet(addvalue) && addvalue === true
      ? isSet(textboxObject.ans) && textboxObject.ans != ""
        ? textboxObject.ans[0]
        : ReqObj.Form[textboxObject.inputId.substring(1, 5)].qutAnswers[0]
      : typeof textboxObject.ans == "string"
        ? textboxObject.ans
        : textboxObject.ans.length === 0
          ? ""
          : textboxObject.ans[0];
  invalue = handleSpecialQuotes(invalue);
  invalue =
    textboxObject.type === "ut" &&
      (invalue.toLowerCase() === "none" ||
        invalue.toLowerCase() === "other" ||
        invalue.toLowerCase() === "others")
      ? ""
      : invalue;
  var tmpId = textboxObject.inputId.substring(1, 5);
  var prefil = returnFirstPrefilledUnit(tmpId);
  invalue =
    textboxObject.type === "ut" &&
      typeof prefil !== "undefined" &&
      prefil !== ""
      ? prefil
      : invalue;
  invalue =
    textboxObject.type === "ut"
      ? invalue.charAt(0).toUpperCase() + invalue.slice(1)
      : invalue;
  if (textboxObject.QuestionDesc.toLowerCase() === "quantity unit") {
    ReqObj.Form[tmpId].isUnitPrefilled = invalue !== "" ? true : false;
    ReqObj.Form[tmpId].preFilledUnitDetail = {
      invalue: invalue,
      id: textboxObject.inputId,
    };
  }
  var inhtml =
    isSet(addLabel) && addLabel === true
      ? "<label id='" +
      textboxObject.labelId +
      "' class='" +
      textboxObject.lblClass +
      "'>" +
      textboxObject.QuestionDesc +
      "</label>"
      : "";
  var locprop = "";
  var isq_msg = textboxObject["QuestionDesc"].toLowerCase();
  if (
    isq_msg == "pickup location" ||
    isq_msg == "drop location" ||
    isq_msg == "pickup city" ||
    isq_msg == "drop city"
  ) {
    locprop =
      '" maxlength = "100" autocomplete = "off" role = "textbox" aria-autocomplete="list" aria-haspopup="true"';
    textboxObject.inputClass += " ui-autocomplete-input";
    ReqObj.Form[tmpId].locisqId.push(textboxObject.inputId);
  }
  return (
    inhtml +
    "<input type='text' class='" +
    textboxObject.inputClass +
    "' id='" +
    textboxObject.inputId +
    "' name='" +
    textboxObject.inputName +
    "' optionid = '" +
    textboxObject.optionId +
    "' maxlength='" +
    textboxObject.maxlength +
    "' autocomplete='off' value='" +
    invalue +
    "' role='textbox' placeholder = '" +
    textboxObject.placeholder +
    "'" +
    locprop +
    "/>"
  );
}

/**
 *@description returns the selectbox html for the ISQ
 *
 *
 * @returns HTML for the select block
 */
function SelectBox(SelectObject, desc) {
  var descriptionHtml = "";
  if (isSet(desc) && desc !== "") {
    SelectObject.lblClass += " bedbtip";
    descriptionHtml = FullDescHtml({
      div1Class: "int-ct3 info_iconeqbl",
      div2Class: "blnewform_sprit inft",
      div3Class: "nwarN bedsnone full_desc Tp8",
      fullDesc: desc,
    });
  }

  var selectbox =
    "<div class='" +
    SelectObject.divClass +
    "'>" +
    MakeLabel(SelectObject, descriptionHtml) +
    "<select class='" +
    SelectObject.selectClass +
    "'";
  if (typeof SelectObject.onchange !== "undefined" && SelectObject.onchange) {
    selectbox += " onchange = 'funcOth(id)'";
  }
  selectbox +=
    " name='" +
    SelectObject.selectName +
    "' id='" +
    SelectObject.selectId +
    "'><option value=''>" +
    SelectObject.optionValue +
    "</option>";
  return selectbox;
}

function SelectBoxIp(SelectObject, tmpId) {
  var element = IsChatbl(tmpId) ? "ul" : "select";
  var htmlofsel = "<" + element + " class='" + SelectObject.selectClass + "'";
  if (typeof SelectObject.onchange !== "undefined" && SelectObject.onchange) {
    htmlofsel += " onchange = 'funcOth(id)'";
  }
  htmlofsel +=
    " name='" +
    SelectObject.selectName +
    "' id='" +
    SelectObject.selectId +
    "'>";
  htmlofsel += IsChatbl(tmpId)
    ? "<li value='' disabled = 'true'>" + SelectObject.optionValue + "</li>"
    : "<option value=''>" + SelectObject.optionValue + "</option>";
  return htmlofsel;
}

/**
 *@description returns the others box  html for checkoox and radio box
 *
 *
 * @returns string
 */

function OthersBox(OtherBoxObject, tmpId) {
  var html = "<div class='" + OtherBoxObject.divClass + "'><input type='text'";
  html += IsChatbl(tmpId)
    ? "class='cbl_othinpt be-input isq_txtbx isq-st2'"
    : isSSB(tmpId)
      ? " class='be-input'"
      : " class='be-input isq_txtbx isq-st2' ";
  html +=
    " name='" +
    OtherBoxObject.inputName +
    "' id='" +
    OtherBoxObject.inputId +
    "' placeholder='Other Option' value='" +
    OtherBoxObject.ans +
    "'>";
  html += isSSB(tmpId)
    ? "</div>"
    : "<label for='" +
    OtherBoxObject.inputId +
    "' optionid = " +
    OtherBoxObject.optionId +
    "></label></div>";
  return html;
}

function FullDescHtml(fullDescObject) {
  return (
    "<div class='" +
    fullDescObject.div1Class +
    "'><div class='" +
    fullDescObject.div2Class +
    "'></div><div class='" +
    fullDescObject.div3Class +
    "'>" +
    fullDescObject.fullDesc +
    "</div></div>"
  );
}

function CheckBox(tmpId, CheckboxObject, errorObject) {
  var html =
    "<div class='" +
    CheckboxObject.divClass1 +
    "'>" +
    errorBlockFunction(errorObject) +
    "<input type='checkbox' class='" +
    CheckboxObject.inputClass +
    " ' name='" +
    CheckboxObject.templateId +
    "checkbox_name" +
    CheckboxObject.questionCount +
    "' id='" +
    CheckboxObject.templateId +
    "checkbox_name" +
    CheckboxObject.questionCount +
    "_option" +
    parseInt(CheckboxObject.i + 1) +
    "' value='" +
    CheckboxObject.option_desc +
    "'" +
    CheckboxObject.checked +
    "><label optionid=" +
    CheckboxObject.option_id +
    "  for='" +
    CheckboxObject.templateId +
    "checkbox_name" +
    CheckboxObject.questionCount +
    "_option" +
    parseInt(CheckboxObject.i + 1) +
    "' class='" +
    CheckboxObject.labelClass +
    "'>";
  html +=
    IsChatbl(tmpId) || isSSB(tmpId)
      ? ""
      : "<div class='bechk-in bebr4'><div class='" +
      CheckboxObject.divClass2 +
      "'></div></div>";
  html += isSSB(tmpId)
    ? CheckboxObject.option_desc + "</label></div>"
    : "<span class='" +
    CheckboxObject.spanClass +
    "' >" +
    CheckboxObject.option_desc +
    "</span></label></div>";
  return html;
}

function RadioBox(tmpId, RadioboxObject, errorObject) {
  var screen_no =
    tmpId.substr(0, 2) === "09" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
      ? ReqObj.Form[tmpId].FormSequence.StepCounter + 1
      : "";
  var toadd =
    screen_no !== ""
      ? RadioboxObject.templateId + "_" + screen_no
      : RadioboxObject.templateId;

  var RadioDiv =
    "<div class='" +
    RadioboxObject.divClass1 +
    "'>" +
    errorBlockFunction(errorObject) +
    "<input type='radio' class='" +
    RadioboxObject.inputClass +
    "' name='" +
    RadioboxObject.templateId +
    "radio_name" +
    RadioboxObject.questionCount +
    screen_no +
    "' id='" +
    toadd +
    "_radio_name" +
    RadioboxObject.questionCount +
    "_option" +
    parseInt(RadioboxObject.i + 1) +
    "' value='" +
    RadioboxObject.option_desc +
    "'" +
    RadioboxObject.checked +
    "><label optionid=" +
    RadioboxObject.option_id +
    " for='" +
    toadd +
    "_radio_name" +
    RadioboxObject.questionCount +
    "_option" +
    parseInt(RadioboxObject.i + 1);
  RadioDiv += isSSB(tmpId)
    ? "' class='" + ssbClass("radlbl", tmpId) + "'"
    : "' class='bepr'";
  if (isSet(RadioboxObject.cityFunc)) {
    RadioDiv += RadioboxObject.cityFunc;
  }
  RadioDiv += ">";
  RadioDiv +=
    IsChatbl(tmpId) || isSSB(tmpId)
      ? ""
      : "<div class='bechk-in'><div class='" +
      RadioboxObject.divClass2 +
      "'></div></div>";
  RadioDiv +=
    "<span class='" +
    RadioboxObject.spanClass +
    "' id='" +
    toadd +
    "_rad_chk" +
    RadioboxObject.questionCount +
    "_option" +
    parseInt(RadioboxObject.i + 1) +
    "' >" +
    RadioboxObject.option_desc +
    "</span></label></div>";
  return RadioDiv;
}

function StructureIsq(tmpId, user) {
  if (isSet(ReqObj.Form[tmpId].plsqArr) && ReqObj.Form[tmpId].plsqArr !== "") {
    var res = ReqObj.Form[tmpId].plsqArr.split("#");
    res = isSet(res) ? res : "";
    for (var counter = 0; counter !== res.length; counter++) {
      var ques_arr = res[counter].split(":");
      ques_arr[0] = trimVal(unescape(ques_arr[0]).toLowerCase());
      if (BlEnqGenerated(tmpId)) {
        ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]] = unescape(ques_arr[1]);
        if (
          isSet(ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]]) &&
          ques_arr[0] !== "preferred_location"
        ) {
          //to convert all the prefill isq in lower case
          ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]] =
            ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]].split(", ");
        }
      } else {
        var updatedIsq = unescape(ques_arr[1]);
        if (isSet(updatedIsq)) {
          updatedIsq = updatedIsq.split(", ");
          updatedIsq = isSet(updatedIsq) ? updatedIsq : "";
          if (updatedIsq.length === 1)
            ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]] = updatedIsq;
          else ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]] = [];
        }
      }

      if (ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]] instanceof Array) {
        for (
          var prefillIsqloop = 0;
          prefillIsqloop < ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]].length;
          prefillIsqloop++
        ) {
          ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]][prefillIsqloop] =
            trimVal(
              ReqObj.Form[tmpId].preFilledIsq[ques_arr[0]][prefillIsqloop]
            );
        }
      }
    }

    //run a loop here to lowercase all values
  }
  for (var i = 0; i < ReqObj.Form[tmpId].userFilledIsq.length; i++) {
    if (
      notEmpty(ReqObj.Form[tmpId].userFilledIsq[i].questionsDesc) &&
      notEmpty(ReqObj.Form[tmpId].userFilledIsq[i].optionsValue)
    ) {
      var answer = ReqObj.Form[tmpId].userFilledIsq[i].optionsValue.split(", ");
      answer = isSet(answer) ? answer : "";
      for (var j = 0; j < answer.length; j++) {
        if (isSet(answer[j])) answer[j] = trimVal(answer[j]);
      }
      ReqObj.Form[tmpId].preFilledIsq[
        ReqObj.Form[tmpId].userFilledIsq[i].questionsDesc.toLowerCase()
      ] = answer;
    }
  }
  if (ReqObj.Form[tmpId].preFilledIsq.quantity) {
    //quantity '0' check
    if (ReqObj.Form[tmpId].preFilledIsq.quantity[0][0] == "0") {
      ReqObj.Form[tmpId].preFilledIsq.quantity[0] = "";
      ReqObj.Form[tmpId].userFilledIsq[0].optionsValue = "";
    }
  }

  if (isSet(ReqObj.Form[tmpId].preFilledIsq["preferred_location"])) {
    var prefilled = ReqObj.Form[tmpId].preFilledIsq["preferred_location"];
    if (isSet(prefilled.match(/Local Area/))) {
      ReqObj.Form[tmpId].preFilledIsq["looking for suppliers"] = ["Local Only"];
    } else if (isSet(prefilled.match(/all over India can contact/))) {
      ReqObj.Form[tmpId].preFilledIsq["looking for suppliers"] = [
        "Anywhere in India",
      ];
    } else if (isSet(prefilled.match(/will/))) {
      ReqObj.Form[tmpId].preFilledIsq["looking for suppliers"] = [
        "Specific City",
      ];
    }
  }
}

function FillIsq(questionText, tmpId) {
  if (isSet(questionText)) {
    questionText = trimVal(questionText.toLowerCase());
    if (questionText === "quantity" || questionText === "quantity unit")
      return quantiyUnitPrefill(questionText, tmpId);
    var index = checkprop(questionText, tmpId);
    if (isSet(index)) {
      var value = ReqObj.Form[tmpId].preFilledIsq[index];
      delete ReqObj.Form[tmpId].preFilledIsq[index];
      return value;
    }
    return null;
  }
}

function quantiyUnitPrefill(questionText, tmpId) {
  if (ReqObj.Form[tmpId].preFilledIsq.hasOwnProperty(questionText)) {
    var value = ReqObj.Form[tmpId].preFilledIsq[questionText];
    delete ReqObj.Form[tmpId].preFilledIsq[questionText];
    return value;
  }
  return null;
}

function checkprop(questionText, tmpId) {
  var prop = Object.getOwnPropertyNames(ReqObj.Form[tmpId].preFilledIsq);
  for (var i = 0; i < prop.length; i++) {
    if (prop[i] !== "" && prop[i].toLowerCase().includes("usage") && questionText.toLowerCase().includes("age",0)) continue;   // usage-age autofill bug
    if (prop[i] !== "" && prop[i].includes(questionText)) return prop[i];
    if (
      questionText.toLowerCase().includes("usage") ||
      questionText.toLowerCase().includes("application")
    ) {
      if (
        prop[i] !== "" &&
        (prop[i].includes(questionText) || questionText.includes(prop[i]))
      )
        return prop[i];
    }
  }

  return null;
}

function SelBoxMSg(QuestionText, tmpId) {
  var defaultmsg =
    isImageVidEnq(tmpId) && ReqObj.Form[tmpId].FormSequence.StepCounter === 0
      ? "Unit"
      : "Select a Value";
  if (isSet(QuestionText)) {
    var QuestionTextMatch = trimVal(QuestionText.toLowerCase());
    if (QuestionTextMatch in SelectBoxStaticMsg) {
      var msg = SelectBoxStaticMsg[QuestionTextMatch];
      if (
        isSet(msg) &&
        isSet(tmpId) &&
        IsChatbl(tmpId) &&
        isSet(msg.chatbl) &&
        msg.chatbl !== ""
      ) {
        return msg.chatbl;
      } else {
        return isImageVidEnq(tmpId) &&
          ReqObj.Form[tmpId].FormSequence.StepCounter === 0
          ? msg.imgvidfrst
          : msg.default;
      }
    } else {
      return defaultmsg;
    }
  }
  return defaultmsg;
}

function getIsqQuestions(IsqObj, todo, tmpId) {
  // Object Position is necessary for classes
  //if (!isSet(ObjectPosition)) ObjectPosition = 0; // can be ignored here
  if (todo === "allquestions")
    ReqObj.Form[tmpId].Isq.getIsqQuestionString.push(
      IsqObj.IM_SPEC_MASTER_DESC
    );
  else if (todo === "current")
    ReqObj.Form[tmpId].Isq.currentQuestionString.push(
      IsqObj.IM_SPEC_MASTER_DESC
    );
}

function tov1(tmpId, tval) {
  var stval = tval.split(" ");
  var len = stval.length;
  ReqObj.Form[tmpId].cName.tov1 =
    stval[len - 1].toLowerCase() === "crore" ||
      (stval[len - 1].toLowerCase() === "lakh" && parseInt(stval[len - 2]) > 1)
      ? true
      : false;
}

function SelectBoxEvents(tmpId) {
  //(isSSB(tmpId) && isnewSSB(tmpId)) ? $("select.betextclr").parent().addClass("focused") :"";
  $("select.betextclr")
    .off("change click")
    .on("change click", function () {
      var SelBoxEl = $(this);
      if ($(this).val() === "") {
        SelBoxEl.css("color", "#9e9e9e");
        SelBoxEl.parent().siblings().children("label").removeClass("redc");
        SelBoxEl.parent().siblings().children(".isq_error_block").remove();
        SelBoxEl.parent()
          .siblings()
          .children(".be-input")
          .removeClass("highlight-err");
      } else {
        SelBoxEl.css("color", "#333");
        SelBoxEl.removeClass("highlight-err");
        SelBoxEl.siblings("label").removeClass("redc");
        SelBoxEl.siblings(".isq_error_block").remove();
      }
      if (
        !isEnq(tmpId) &&
        ReqObj.Form[$(this)[0].id.substring(1, 5)].cName.tov === true
      ) {
        tov1($(this)[0].id.substring(1, 5), $(this).val());
        onCName($(this)[0].id.substring(1, 5), true);
      }
    });
}

function InputBoxEvents(tmpId) {
  setTimeout(function () {
    $(".cbl_qunty").focus();
    isSet($(".cbl_isq_grp").children()[0])
      ? $(".cbl_isq_grp").children()[0].focus()
      : "";
  }, 1800);
  $(".cbl_qtut .cbl_unit .cbl_qtut")
    .off("click")
    .on("click", function () {
      removechatblerror(tmpId);
    });

  $(".inpt_errorbx")
    .off("click keyup")
    .on("click keyup", function () {
      var InputBoxEl = $(this);
      InputBoxEl.removeClass("highlight-err");
      InputBoxEl.siblings("label").removeClass("redc");

      InputBoxEl.siblings(".isq_error_block").remove();
      InputBoxEl.siblings("select.betextclr").removeClass("highlight-err");

      if (isSet(InputBoxEl.val()) && trimVal(InputBoxEl.val()) === "") {
        InputBoxEl.parent().siblings().children("label").removeClass("redc");
        InputBoxEl.parent().siblings().children(".isq_error_block").remove();
        InputBoxEl.parent()
          .siblings()
          .children(".be-input")
          .removeClass("highlight-err");
      }
    });
}

function InputBoxAutoFocus(tmpId) {
  var el = $("input[type=text]");
  var len = el.length;
  for (var i = 0; i < len; i++) {
    if ($(el[i]).hasClass("imgoneqty")) {
      var ele2 = $(el[i]).attr("id");
      $("#" + ele2).focus();
    }
  }
}

function IsqAlreadyPresent(tmpId, text) {
  if (
    isSet(tmpId) &&
    notEmpty(text) &&
    isSet(ReqObj.Form[tmpId].questionsDesc)
  ) {
    for (var i = 0; i < ReqObj.Form[tmpId].questionsDesc.length; i++) {
      if (
        text.toLowerCase() === ReqObj.Form[tmpId].questionsDesc[i].toLowerCase()
      )
        return i;
    }
  }
  return -1;
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

function GetAnswer(tmpId, type) {
  if (isSet(tmpId) && isSet(ReqObj.Form[tmpId].Isq.CurrentScreenAnswers)) {
    var Text = ReqObj.Form[tmpId].Isq.CurrentScreenAnswers;
    Text =
      Text !== "" && Text !== "Not Answered" && IsChatbl(tmpId)
        ? ReqObj.Form[tmpId].Isq.KeyQuestion + ": " + Text
        : Text;
    ReqObj.Form[tmpId].Isq.CurrentScreenAnswers = "";
    return Text;
  }
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

function returnValidateTypeError(optionValue, questionText) {
  if (questionText === "quantity") {
    if (parseInt(optionValue) === 0) return "1";
    if (isHindi(optionValue) === true || isAllNumbers(optionValue) === false)
      return "1";
  }
  if (questionText === "quantity unit") {
    if (
      isHindi(optionValue) === true ||
      /^[a-zA-Z0-9 ]*$/.test(optionValue) === false
    )
      return "1";
  }
  return "2";
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
  1: { name: "Verified Exporter", class: "equVe" }
};

function isPnsEnq(tmpId) {
  //PNS on enq form
  if (isSet(ReqObj.Form[tmpId].pnsNumber) && isSet(ReqObj.Form[tmpId].ctaName) && (ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call" || ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call_next" || ReqObj.Form[tmpId].ctaName.toLowerCase() == "click to call_pre" || ReqObj.Form[tmpId].ctaName.toLowerCase() == "view mob e"))
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
/*----------------------------------------------------------------------------------------------------------------------------------------------- */
/*
 * Usage :
 *
 *
 */

function PostBlEnqUpdate() {
  this.className = "PostBlEnqUpdate";
}
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

function FormSeq() {
  this.arraySeq = [];
  this.ServiceSequence = [];
  this.ServiceSequenceBlocked = [];
  this.FullServiceArray = [];
  this.OnCloseServiceArray = [];
  this.OnCloseStep = false;
  this.OnCloseCounter = -1;
  this.NextStepsShown = [];
  /* new addition */
  this._screenCounter = 0;
  this._stepCounter = -1;
  this.journey = {};
}
FormSeq.prototype.GetExistingObject = function (objectName, tmpId) {
  if (isSet(objectName) && isSet(tmpId) && isSet(ReqObj.Form[tmpId].UiArray)) {
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

FormSeq.prototype.FirstStepSequence = function (tmpId, where) {
  if (isSet(tmpId)) {
    var formType = isSet(ReqObj.Form[tmpId].formType) ? ReqObj.Form[tmpId].formType : "";
    if (tmpId.substring(0, 2) === "09" || IsChatbl(tmpId)) {
      //POPUPCHATBL
      var type = "popup";
    } else var type = "inline";
    SetUserDetails(where);
    var formType = isSet(ReqObj.Form[tmpId].formType) ? ReqObj.Form[tmpId].formType : ""; // remove this!
    /*---------------------------------------------- */
    this.StepCounter = -1;
    ReqObj.Form[tmpId].OnCloseStep = false;
    ReqObj.Form[tmpId].IsthroughClosebtn = false;
    ReqObj.Form[tmpId].isTNCShownOnFirstStep = false;
    ReqObj.Form[tmpId].flags["IsFirstStep"] = true;
    ReqObj.Form[tmpId].PrevAnsPrint = true;
    if (parseInt(ReqObj.Form[tmpId].disableRd) === 1) {
      ReqObj.Form[tmpId].flags.isDescDivShown = true;
    }
    //addBlLoader(tmpId, "center");
    if (IsChatbl(tmpId)) {
      setTimeout(function () {
        addBlLoader(tmpId, "left");
      }, 400);
    } else addBlLoader(tmpId, "center");
    switch (type.trim().toLowerCase()) {
      case "popup":
        if (formType.toLowerCase() === "bl") {
          this._blFlow(tmpId, where);
        } else if (IsChatbl(tmpId)) {
          this.BLChat(tmpId, where);
        } else {
          //this.Enqpopup(tmpId,where);
          this._enq(tmpId, where);
        } /* chat bl pop up to be added here formtype is BL only how to distinguish ?*/
        break;
      case "inline":
        if (isSSB(tmpId)) {
          this.BLSingleStep(tmpId, where);
        } else if (Bl04(tmpId)) {
          this._blFlow(tmpId, where);
        } else if (formType.toLowerCase() === "bl") {
          this._blFlow(tmpId, where);
        } else {
          this._enq(tmpId, where);
        }
        break;
    }
  }
};

/* add a function to create sequence for chat like BL */

function imeshExist() {
  var imeshcookie = usercookie.getCookie("ImeshVisitor");
  return imeshcookie !== "" ? imeshcookie : "";
}

function im_issExist() {
  var cookie = usercookie.getCookie("im_iss");
  return cookie !== "" ? cookie : "";
}

function v4iilexExist() {
  var cookie = usercookie.getCookie("v4iilex");
  return cookie !== "" ? cookie : "";
}

function iplocExist() {
  var iploccookie = usercookie.getCookie("iploc");
  return iploccookie !== "" ? iploccookie : "";
}

function ElExists(el) {
  if (notEmpty(el) && $("#" + el).length > 0) {
    return true;
  } else return false;
}

function CounterScreenId(tmpId, adder) {
  if (isSet(tmpId) && IsPrevBtnImplemented(tmpId)) {
    if (!isSet(adder)) adder = 0;
    var that = ReqObj.Form[tmpId].FormSequence;
    var elId = "t" + tmpId;
    var counter = parseInt(adder, 10);
    var TypeofScreen = {
      type: "",
      counter: 0,
    };
    var type = "";
    var onClose = "onCloseScreen";
    var screen = "screen";
    if (!ValidNumber(counter)) counter = 0;
    if (that.OnCloseCounter > -1) {
      counter += that.OnCloseCounter + 1;
      elId += onClose + counter;
      type = onClose;
    } else {
      if (adder === 1) {
        if (that.StepCounter < ReqObj.Form[tmpId].UiArray.length - 1) {
          counter += that.StepCounter + 1;
          elId += screen + counter;
          type = screen;
        } else {
          counter += that.OnCloseCounter + 1;
          elId += onClose + counter;
          type = onClose;
        }
      } else {
        counter += that.StepCounter + 1;
        elId += screen + counter;
        type = screen;
      }
    }

    return {
      elid: elId,
      type: type,
    };
  } else {
    return "";
  }
}

FormSeq.prototype.prepareToRender = function (
  tmpId,
  FormId,
  HtmlArray,
  HtmlContactArray,
  HtmlProdArray,
  component,
  arrlen
) {
  var IdToHide = "";
  if (isSet(component.Obj.idToAppend) && component.Obj.idToAppend !== "") {
    FormId = component.Obj.idToAppend;
  }
  if (isSet(component.Obj.idToHide) && component.Obj.idToHide !== "") {
    IdToHide = component.Obj.idToHide;
  }
  // console.log(array[i].Obj.idToAppend);
  if (typeof component.Obj.displayHtml === "function") {
    var FormIdSel =
      isSSB(tmpId) && !isnewSSB(tmpId) ? $("#t" + tmpId + FormId) : $(FormId);

    var ReceivedArray = component.Obj.displayHtml(tmpId);
    if (
      arrlen === 1 &&
      ReceivedArray.length === 1 &&
      ReceivedArray[0].length === 0
    ) {
      //if(tmpId.substring(0,2) === "04" && ReqObj.Form[tmpId].formType.toLowerCase() === "enq") ReqObj.Form[tmpId].FormSequence.NextStep(tmpId);
      if(IsChatBLInline(tmpId) && imeshExist() == "") 
      ReqObj.Form[tmpId].FormSequence.BLChatLogin(tmpId);  // new chat bl unidentified
      else if (IsChatbl(tmpId)) ReqObj.Form[tmpId].FormSequence.BLChatRd(tmpId);
    } else {
      if (!isSet(ReceivedArray)) ReceivedArray = [""];
      if (isSSB(tmpId)) {
        FormId === "_contact_detail"
          ? HtmlContactArray.push(ReceivedArray)
          : HtmlProdArray.push(ReceivedArray);
      } else if (isBlInlineFr(tmpId)) {
        FormId === "t" + tmpId + "_partition1"
          ? HtmlContactArray.push(ReceivedArray)
          : HtmlProdArray.push(ReceivedArray);
      } else HtmlArray.push(ReceivedArray);

      if (FormIdSel.hasClass("bedsnone")) {
        FormIdSel.removeClass("bedsnone");
      }
      if (isSet(IdToHide) && IdToHide !== "")
        $(IdToHide).css({
          display: "none",
        });

      return FormIdSel;
    }
  }
};

FormSeq.prototype.RenderUi = function (tmpId, ClassesforTracking, stepNumber) {
  if (isSet(tmpId)) {
    var array = [];
    var that = this;
    var counter = "";
    var type = CounterScreenId(tmpId, 0);
    var elId = type.elid;
    var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : (isInactiveBL(tmpId) && ispdp(tmpId)) ? "Post Buy Leads New" : "Post Buy Leads";
    //inactive changes

    array =
      that.OnCloseCounter > -1
        ? ReqObj.Form[tmpId].OnCloseArray[that.OnCloseCounter]
        : ReqObj.Form[tmpId].UiArray[that.StepCounter];
    if (
      array.length == 2 &&
      array[0].Obj.className === "RequirementDtl" &&
      array[1].Obj.className === "Isq"
    ) {
      var a = array[0];
      array[0] = array[1];
      array[1] = a;
    }
    ReqObj.Form[tmpId].currentScreen = "";
    if (IsChatbl(tmpId) && ReqObj.Form[tmpId].ischangeProduct) {
      $(".t" + tmpId + "_userInput").each(function () {
        $(this).remove();
      });

      chatblHideTransition(tmpId);
      ReqObj.Form[tmpId].PrevAnsPrint = false;
      ReqObj.Form[tmpId].ischangeProduct = false;
    }

    if (ReqObj.Form[tmpId].PrevAnsPrint)
      questionTransition(ReqObj.Form[tmpId].formType, tmpId);
    if (
      isImageVidEnq(tmpId) &&
      !pdpenqImage(tmpId) &&
      ReqObj.Form[tmpId].FormSequence._stepCounter > 0
    ) {
      $("#t" + tmpId + "_mcont").addClass("eqImSec");
      $("#t" + tmpId + "_thankDiv").addClass("eqImSec");
    }

    if (!ElExists(elId)) {
      var postDisplayStepTracking = "";
      var HtmlArray = [];
      var HtmlContactArray = [];
      var HtmlProdArray = [];
      var len = array.length;
      for (var i = 0; i < array.length; i++) {
        if (isSet(array[i].Obj)) {
          ReqObj.Form[tmpId].currentScreen += array[i].Obj.className;
          var FormId = isSSB(tmpId)
            ? getFormId(ConstructorName(array[i].Obj).toLowerCase())
            : isBlInlineFr(tmpId)
              ? getFormIdMisc(ConstructorName(array[i].Obj).toLowerCase(), tmpId)
              : "#t" + tmpId + "_bl_form";
          var FormIdSel = this.prepareToRender(
            tmpId,
            FormId,
            HtmlArray,
            HtmlContactArray,
            HtmlProdArray,
            array[i],
            len
          );
          if (isSet(array)) {
            if (i < array.length && i > 0) postDisplayStepTracking += "-";
            postDisplayStepTracking += ConstructorName(array[i].Obj);
          }
        }
      }
      if (!IsChatbl(tmpId)) {
        if (isSSB(tmpId)) {
          createHTMLSSB(array, tmpId, HtmlContactArray, HtmlProdArray, counter);
        } else if (isBlInlineFr(tmpId)) {
          RenderHtmlMisc(
            array,
            tmpId,
            [HtmlContactArray, HtmlProdArray],
            counter
          );
        } else RenderHtml(FormIdSel, HtmlArray, tmpId, counter);
      } else {
        if (isSet(HtmlArray) && HtmlArray.length !== 0) {
          var FormId = "#t" + tmpId + "_new_chatbl";
          var FormIdSelQ = $(FormId);
          var htmlQ =
            isSet(ReqObj.Form[tmpId].toAppendQues) &&
              ReqObj.Form[tmpId].toAppendQues
              ? HtmlArray[0][0] + HtmlArray[0][1]
              : HtmlArray[0][0];
          RenderHtml(FormIdSelQ, htmlQ, tmpId, counter);

          ischatblnextquestionasked =
            IsChatBLInline(tmpId) && isChatBlSequenceUpdated ? true : false;
          if (
            IsChatBLInline(tmpId) &&
            !(isSet(ReqObj.audioAdded) && ReqObj.audioAdded)
          ) {
            url = "//apps.imimg.com/js/chatbl_audio.mp3";
            if (appsServerName == "//dev-apps.imimg.com/")
              url = "//dev-apps.imimg.com/js/chatbl_audio.mp3";
            else if (appsServerName == "//stg-apps.imimg.com/")
              url = "//stg-apps.imimg.com/js/chatbl_audio.mp3";
            ReqObj.audio = new Audio(url);
            ReqObj.audioAdded = true;
          }
          setTimeout(function () {
            if (
              IsChatBLInline(tmpId) &&
              !ReqObj.Form[tmpId].fromUpdate &&
              !ReqObj.Form[tmpId].toCloseChatBL &&
              (ReqObj.Form[tmpId].isAutoOpen !== "true" ||
                ReqObj.Form[tmpId].aftrFrmOpnd == "true")
            ) {
              ReqObj.audio.play();
            } else if (ReqObj.Form[tmpId].isAutoOpen === "true") {
              ReqObj.Form[tmpId].aftrFrmOpnd = "true";
            }
            $(".cbl_ques").removeClass("cbl_vh");
            if (ReqObj.Form[tmpId].toAppendQues) {
              $(".t" + tmpId + "_userInput").removeClass("dn");
              $("#t" + tmpId + "_submitNo2")
                .parent()
                .removeClass("dn"); //chat bl bug
              ReqObj.Form[tmpId].toAppendQues = false;
            }
          }, 750);

          FormId = "#t" + tmpId + "_newblchatReply";
          var FormIdSelIn = $(FormId);
          var htmlA =
            isSet(ReqObj.Form[tmpId].toAppendQues) &&
              ReqObj.Form[tmpId].toAppendQues
              ? ""
              : HtmlArray[0][1];
          RenderHtml(FormIdSelIn, htmlA, tmpId, counter);
          setTimeout(function () {   // new chat bl unidentified
            $(".t" + tmpId + "_userInput").removeClass("dn");
          }, 1700);
          setTimeout(function () {   // new chat bl unidentified
            $(".t" + tmpId + "_userInput").removeClass("dn");
            if($("#t" + tmpId + "_tCond").hasClass("bedsnone")){
            IsChatBLInline(tmpId) && ischatblnextquestionasked
              ? $("#t" + tmpId + "_submit").removeAttr("disabled")
              : "";
            }
          }, 2500);
          if (IsChatBLInline(tmpId)) {
            // firefox  bug
                const Elem = (navigator.userAgent.indexOf('Firefox') !== -1) ? 1 : 0 ;
            // 
            if (ReqObj.Form[tmpId].toAppendQues) {
              $("#t" + tmpId + "_isqBoxInput").addClass("cbl_rds");
              // if ($("#t" + tmpId + "_typehere").children()[0])
              //   $("#t" + tmpId + "_typehere").children()[0].placeholder =
              //     "Choose an option above";
              if($("#t" + tmpId + "_typehere").children()[0]){
                $("#t" + tmpId + "_typehere").children()[0].placeholder = "Choose an option above";
                if(Elem){
                  $("#t" + tmpId + "_typehere").children().first().css("width","100%");
                }

              }
              $("#t" + tmpId + "_typehere")
                .removeClass("dn")
                .addClass("cbl_br10");
              $("#t" + tmpId + "_newblchatReply").addClass("dn");
            } else {
              $("#t" + tmpId + "_newblchatReply").removeClass("dn");
              $("#t" + tmpId + "_submitNo2")
                .parent()
                .addClass("dn"); //chat bl bug
              $("#t" + tmpId + "_typehere")
                .addClass("dn")
                .removeClass("cbl_br10");
            }
          }
        }
      }
      if (
        ((isSet(ReqObj.UserDetail["em"]) && ReqObj.UserDetail["em"] !== "") ||
          (isSSB(tmpId) &&
            isSet(ReqObj.Form[tmpId].UserInputs["Email"]) &&
            ReqObj.Form[tmpId].UserInputs["Email"] !== "")) &&
        $("#t" + tmpId + "_thnkemdiv").hasClass("cbl_vh")
      ) {
        isSSB(tmpId)
          ? $("#t" + tmpId + "_thnkemdiv")
            .addClass("mb-fs14 mb-mt15 mb-lh16")
            .removeClass("cbl_vh")
          : $("#t" + tmpId + "_thnkemdiv")
            .addClass("be-grbg")
            .removeClass("cbl_vh");
        var email = isSSB(tmpId)
          ? ReqObj.Form[tmpId].UserInputs["Email"]
          : ReqObj.UserDetail["em"];
        var html =
          "Verify your email <b>" +
          email +
          "</b> as suppliers are more likely to contact verified buyers.";
        $("#t" + tmpId + "_thnkemdiv").html(html);
      }

      //if(IsChatBLOverlay(tmpId))
      //$("#t" + tmpId + "_scroll").removeClass("cbl_srlIs");

      for (var i = 0; i < array.length; i++) {
        if (
          isSet(array[i].Obj) &&
          typeof array[i].Obj.defaultEvents === "function"
        )
          array[i].Obj.defaultEvents(tmpId, type);
        if (
          isSet(array[i].Obj) &&
          typeof array[i].Obj.handleButton === "function"
        )
          array[i].Obj.handleButton(tmpId);
        if (
          isSet(array[i].Obj) &&
          typeof array[i].Obj.handleHeading === "function"
        )
          array[i].Obj.handleHeading(tmpId);
      }

      imeshExist() !== "" || currentISO() === "IN"
        ? $("#t" + tmpId + "_gwrap").addClass("bedsnone")
        : $("#t" + tmpId + "_gwrap").removeClass("bedsnone");
      if (Enq04(tmpId) && imeshExist() !== "")
        $("#t" + tmpId + "_pdpPimg").removeClass("frUsr");

      HideSuggester();
      if (tmpId.substring(0, 2) === "09") {
        if (
          array.length === 0 &&
          currentISO() !== "IN" &&
          this.StepCounter === 0 &&
          isImageVidEnq(tmpId)
        )
          enqImghandleBuutton(tmpId);
        ReqObj.Form[tmpId].flags.isFlagSuggSet = false;
      }
      var iso = usercookie.getParameterValue(
        usercookie.getCookie("iploc"),
        "gcniso"
      );
      if (
        ReqObj.ipLoc.zoneISO === "IN" ||
        (iso !== "" && iso !== "IN") ||
        (ReqObj.ipLoc.zoneISO === "OTHER" && iso === "IN") ||
        ReqObj.ipLoc.callIpFlagSugg === true
      )
        callFlagSuggestor(tmpId, "load");
      if(!IsChatBLInline(tmpId))  // new chat bl unidentified
      ShowHideTNC(tmpId);
      IsChatBLInline(tmpId) && ischatblnextquestionasked
        ? $("#t" + tmpId + "_submit").attr("disabled", true)
        : "";

      IsChatbl(tmpId)
        ? setTimeout(function () {
          newchatblScroll("t" + tmpId + "_chatScroll", tmpId);
        }, 800)
        : scrollSmoothToBottom("t" + tmpId + "_chatScroll");

      IsChatbl(tmpId)
        ? setTimeout(function () {
          removeBLLoader(tmpId, "left");
        }, 750)
        : removeBLLoader(tmpId, "left");

      var TrackingClasses = ClassesforTracking + "|" + postDisplayStepTracking;
      if (IsChatbl(tmpId)) {
        ReqObj.Form[tmpId].classfortracking = TrackingClasses;
        if (IsChatBLInline(tmpId)) {
          ReqObj.Form[tmpId].source =
            isSet(ReqObj.Form[tmpId].isAutoOpen) &&
              ReqObj.Form[tmpId].isAutoOpen === "true"
              ? "From scroll"
              : "From click";
          ReqObj.Form[tmpId].classfortracking =
            TrackingClasses + "|" + ReqObj.Form[tmpId].source;
        }
      }
      if (this.StepCounter === 0 && IsChatbl(tmpId)) {
        var toappend = "";
        blenqGATracking(form_type, ReqObj.Form[tmpId].classfortracking, getEventLabel(), 0, tmpId); // 1 - why ?
        fireYandex(tmpId); // Yandex
        //console.log("on click chatbl");
      }
      if (tmpId.substr(0, 2) === "01") {
        blInlineTransition(tmpId);
        ReqObj.Form[tmpId].screenNumber += 1;
        if (isBlInline(tmpId)) {
          $("#t" + tmpId + "_belodr").removeAttr("style");
        }
      }

      if (tmpId.substr(0, 2) === "04") {
        ReqObj.Form[tmpId].screenNumber += 1;
      }

      if (!(this.StepCounter === 0 && tmpId.substring(0, 2) !== "09")) {
        if (
          stepNumber > 1 ||
          binaryArraySearch(
            ReqObj.Form[tmpId].TrackedDisplaySteps,
            stepNumber
          ) === -1
        ) {
          if (
            ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
            this.StepCounter === 0
          ) {
            if (ReqObj.Form[tmpId].pvTrackingFired === false)
              imInvokeRequestForGaCode(tmpId, "FormOpen:" + TrackingClasses);
            fireYandex(tmpId); // Yandex
          } else if (
            ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
            this.StepCounter === 0
          ) {
            fireYandex(tmpId); // Yandex
            blenqGATracking(form_type, TrackingClasses, getEventLabel(), 0, tmpId);
          } else
            blenqGATracking(form_type, TrackingClasses, getEventLabel(), 0, tmpId);

          ReqObj.Form[tmpId].TrackedDisplaySteps.push(stepNumber);
        }
      }
    } else {
      HideSuggester();
      removeBLLoader(tmpId, "left");
      modificationOnBack(tmpId);
      $("#" + elId).css("display", "block"); //
      if (isSet(array)) {
        for (var i = 0; i < array.length; i++) {
          ReqObj.Form[tmpId].currentScreen += array[i].Obj.className;
          if (
            isSet(array[i]) &&
            isSet(array[i].Obj) &&
            typeof array[i].Obj.EventIfScreenPresent === "function"
          )
            array[i].Obj.EventIfScreenPresent(tmpId);
        }
      }
      if (ReqObj.Form[tmpId].IsbackClicked) {
        var TrackingClasses = "Back_to_" + ClassesforTracking;
        if (IsChatbl(tmpId)) {
          ReqObj.Form[tmpId].classfortracking = TrackingClasses;
        }

        if (!(this.StepCounter === 0 && tmpId.substring(0, 2) !== "09")) {
          if (
            binaryArraySearch(
              ReqObj.Form[tmpId].BackwardDisplaySteps,
              stepNumber
            ) === -1
          ) {
            blenqGATracking(form_type, TrackingClasses, getEventLabel(), 0, tmpId); // 1 - why ?
            ReqObj.Form[tmpId].BackwardDisplaySteps.push(stepNumber);
          }
        }
      }

      return "";
    }
    setCountryName(tmpId);
  }
  return "";
};

FormSeq.prototype.ChatblTncSubmit = function (tmpId) {
  var that = this;
  $("#t" + tmpId + "_chatBL")
    .off("keypress.Submit")
    .on("keypress.Submit", function (event) {
      var keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode === 13) {
        if (isSet(event) && isSet(event.target)) {
          if (event.target.id === "t" + tmpId + "_tCondCheckBox") {
            beforeformsubmitaction(tmpId);
            ReqObj.Form[tmpId].isSkipOTPClicked =
              IsChatbl(tmpId) || isSSB(tmpId) ? false : "";
            that.FormSubmit(tmpId, event);
          }
        }
      }
    });
};

function beforeformsubmitaction(tmpId) {
  $("#t" + tmpId + "chngPrdDiv").addClass("dn");
  IsChatBLInline(tmpId)
    ? $("#t" + tmpId + "_submit").attr("disabled", true)
    : "";
}

function removechatblerror(tmpId) {
  $("#t" + tmpId + "verify_error").html("");
  $("#t" + tmpId + "cbl_bluline").removeClass("cbl_erred");
  $("#t" + tmpId + "verify_error").removeClass("cbl_errbg");
}

function addChatblError(tmpId, msg) {
  $("#t" + tmpId + "verify_error").html(msg);
  $("#t" + tmpId + "cbl_bluline").addClass("cbl_erred");
  $("#t" + tmpId + "verify_error").addClass("cbl_errbg");
}

FormSeq.prototype.ShowStep = function (tmpId) {
  if (isSet(tmpId)) {
    var that = this;
    var iso = currentISO();
    var stepNumber = parseInt(that.OnCloseCounter, 10) > -1 ? parseInt(this.StepCounter, 10) + 1 + (parseInt(that.OnCloseCounter, 10) + 1) : parseInt(this.StepCounter, 10) + 1;
    var ClassesforTracking = "DisplayStep|" + stepNumber;
    !isSet(ReqObj.CNSerCalled) || !ReqObj.CNSerCalled ? toCallMiniDetails(tmpId) : "";
    ReqObj.Form[tmpId].cName.isq = isSet(ReqObj.Form[tmpId].IsqArray) && ReqObj.Form[tmpId].IsqArray.length > 0 ? true : false;
    this.RenderUi(tmpId, ClassesforTracking, stepNumber);
    this.ChatblTncSubmit(tmpId);

    $("#t" + tmpId + "_changeProduct").off("click").on("click", function (event) {
      beforeformsubmitaction(tmpId);
      ReqObj.Form[tmpId].ischangeProduct = true;
      that.FireTracking(tmpId, event);
      that.BLChatProdName(tmpId);
    });

    $("#t0802_msgCls").on("click", function (event) {
      if (!isSet(ReqObj.popupClosed) || !ReqObj.popupClosed) {
        $("#t0802_msgDiv").addClass("bedsnone");
        $($("#scrollTop").children()[0]).removeClass("tpbCbl");
        pageType = "|PT=" + (isSet(ReqObj.Form[tmpId].pageType) ? ReqObj.Form[tmpId].pageType : "");
        blenqGATrackingMisc("Post Buy Leads", "popupClosed", getEventLabel(), 1, tmpId, "ctaName=msgPopup" + pageType);
        ReqObj.popupClosed = true;
      }
    });

    $(".cbl_txt").off("keyup").on("keyup", function () {
      if (isSet($(".cbl_txt").val()) && $(".cbl_txt").val().length === 0)
        $(".cbl_skip").removeClass("dn");
      else $(".cbl_skip").addClass("dn");
    });

    $(".cbl_radio")
      .off("click")
      .on("click", function (event) {
        var array = [];

        $(".t" + tmpId + "other_radiotemp")
          .off("click")
          .on("click", function (event) {
            if ($(this).hasClass("t" + tmpId + "be-radioboxtemp")) {
              $(this)
                .siblings()
                .each(function () {
                  if ($(this).parent().css("display") !== "none") {
                    isRadioOtherClicked(this);
                  }
                });
            }
          });

        $("input:checked").each(function () {
          $(this).hasClass("cbl_chekbx_btn") || $(this).hasClass("waschecked")
            ? array.push(this.id)
            : "";
        });
        $(".cbl_othinpt")
          .off("keyup")
          .on("keyup", function () {
            if (array.length === 0 && $(".cbl_othinpt").val() === "") {
              $(".cbl_skip").removeClass("dn");
            } else {
              $(".cbl_skip").addClass("dn");
            }
          });
        if (
          isSet($(".cbl_othinpt").val()) &&
          !$("#" + event.target.id).hasClass("cbl_othinpt")
        ) {
          if (array.length === 0 && $(".cbl_othinpt").val() === "") {
            $(".cbl_skip").removeClass("dn");
            $(".cbl_skip").removeClass("bedsnone");
          } else {
            $(".cbl_skip").addClass("dn");
          }
        } else if (!isSet($(".cbl_othinpt").val())) {
          if (array.length === 0) {
            $(".cbl_skip").removeClass("dn");
            $(".cbl_skip").removeClass("bedsnone");
          } else {
            $(".cbl_skip").addClass("dn");
          }
        }
      });

    $(".cbl_qtut")
      .off("keyup")
      .on("keyup", function () {
        if (
          isSet($(".cbl_qtut").val()) &&
          $(".cbl_qtut").val().length === 0 &&
          $(".cbl_qtut").val() === ""
        )
          $(".cbl_skip").removeClass("dn");
        else $(".cbl_skip").addClass("dn");
      });

    $("#t" + tmpId + "_blchatbody")
      .off("click")
      .on("click", function () {
        $(".cbl_selct_unit").addClass("dn");
        $(".cbl_sclBr").addClass("dn");
      });

    $(".cbl_unit")
      .off("focus", function (event) {
        $(".cbl_selct_unit").addClass("dn");
      })
      .on("focus", function (event) {
        var x = event.target.id;
        var count = x.charAt(x.length - 1);
        if ($("#t" + tmpId + "_selectDD" + count).prop("readonly")) {
          funcClick(event.currentTarget, tmpId, count);
        }
      });

    $(".t" + tmpId + "_radSubmit")
      .off("click")
      .on("click", function (event) {
        var imeshcookie = imeshExist();
        if (IsChatbl(tmpId))
          $("#t" + tmpId + "_submitNo2")
            .parent()
            .addClass("dn"); //chat bl bug
        var curEl = this;
        curEl = curEl.children[0];
        var name = $(curEl).attr("name");
        var isSelected = $(curEl).hasClass("waschecked");

        $("input[name='" + name + "']").each(function () {
          $(this).prop("checked", false).removeClass("waschecked");
          $(this).parent().removeClass("sl-box chksl");
          $(this).siblings("label").children(".bechk-in").children().hide();
        });
        $(curEl).prop("checked", true).addClass("waschecked");
        that.FormSubmit(tmpId, event);
      });
    $("#t" + tmpId + "_tCondCheckBox").removeAttr("onclick");

    $("#t" + tmpId + "_tCondCheckBox")
      .off("mousedown.Submit")
      .on("mousedown.Submit", function (event) {
        $(this).on("click", function (event) {
          event.preventDefault();
        });
        if ($("#t" + tmpId + "_tCondCheckBox").is(":checked"))
          $("#t" + tmpId + "_tCondCheckBox").prop("checked", false);
        else $("#t" + tmpId + "_tCondCheckBox").prop("checked", true);

        checkedTNC(tmpId);
      });

    $(".t" + tmpId + "_test1")
      .off("mousedown.Submit")
      .on("mousedown.Submit", function (event) {
        $(this).on("click", function (event) {
          event.preventDefault();
        });
        if ($("#t" + tmpId + "_tCondCheckBox").is(":checked"))
          $("#t" + tmpId + "_tCondCheckBox").prop("checked", false);
        else $("#t" + tmpId + "_tCondCheckBox").prop("checked", true);

        checkedTNC(tmpId);
      });

    $("#t" + tmpId + "_submit")
      .off("mousedown.Submit")
      .on("mousedown.Submit", function (event) {
        if (!$("#t" + tmpId + "_tCondCheckBox").is(":checked")) {
          //tcond highlight
          $(this).on("click", function (event) {
            event.preventDefault();
          });
          $("#t" + tmpId + "_tCond").addClass("tcond_bounce");
          setTimeout(function () {
            $("#t" + tmpId + "_tCond").removeClass("tcond_bounce");
          }, 1000);
        }

        var imeshCookie = imeshExist();
        if (imeshCookie === "" && !checkblockedUser()) {
          ReqObj.Form[tmpId].defSubmit.blurfired =
            ReqObj.Form[tmpId].defSubmit.loginfval !== "" &&
              ReqObj.Form[tmpId].defSubmit.loginfval.toLowerCase() !==
              $("#t" + tmpId + "_login_field")
                .val()
                .toLowerCase()
              ? false
              : ReqObj.Form[tmpId].defSubmit.blurfired;
          if (currentISO() === "IN" && tmpId.substring(0, 2) === "09") {
            ReqObj.Form[tmpId].defSubmit.blurfired = true;
            ReqObj.Form[tmpId].defSubmit.todo = true;
          }
          if (
            ReqObj.Form[tmpId].defSubmit.blurfired === false &&
            $("#t" + tmpId + "_login_field").length > 0 &&
            $("#t" + tmpId + "_login_field").val() !== "" &&
            $("#t" + tmpId + "_q_first_nm" + ReqObj.Form[tmpId].nec.classCount)
              .length > 0 &&
            $(
              "#t" + tmpId + "_q_first_nm" + ReqObj.Form[tmpId].nec.classCount
            ).val() === ""
          ) {
            ReqObj.Form[tmpId].defSubmit.todo = false;
            ReqObj.Form[tmpId].defSubmit.subfired = false;
            ReqObj.Form[tmpId].defSubmit.loginfval = $(
              "#t" + tmpId + "_login_field"
            ).val();
          } else ReqObj.Form[tmpId].defSubmit.todo = true;
        } else ReqObj.Form[tmpId].defSubmit.todo = true;
        ReqObj.Form[tmpId].defSubmit.eve = event;
        ReqObj.Form[tmpId].isSkipOTPClicked =
          IsChatbl(tmpId) || isSSB(tmpId) ? false : "";
        if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
        if (ReqObj.Form[tmpId].defSubmit.todo === true)
          that.FormSubmit(tmpId, event);
      });
    //chat bl bug
    $("#t" + tmpId + "_submitNo1")
      .off("click.Submit")
      .on("click.Submit", function (event) {
        ReqObj.Form[tmpId].isSkipOTPClicked = IsChatbl(tmpId) ? false : "";
        if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
        that.FormSubmit(tmpId, event);
      });

    //chat bl bug
    $("#t" + tmpId + "_submitNo2")
      .off("click.Submit")
      .on("click.Submit", function (event) {
        ReqObj.Form[tmpId].isSkipOTPClicked = IsChatbl(tmpId) ? false : "";
        if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
        that.FormSubmit(tmpId, event);
      });

    $("#t" + tmpId + "_skipOTP")
      .off("click")
      .on("click", function (event) {
        var form_type =
          ReqObj.Form[tmpId].formType === "Enq"
            ? "Send Enquiry"
            : "Post Buy Leads";
        ReqObj.Form[tmpId].isSkipOTPClicked = true;
        ReqObj.Form[tmpId].flags.isSkipOTPClicked = true;
        ReqObj.Form[tmpId].showotpstep = 1;
        if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
        blenqGATracking(form_type, "OTP1NotFilled", getEventLabel(), 1, tmpId);
        that.FormSubmit(tmpId, event);
      });

    $("#t" + tmpId + "_be-backbtn")
      .off("click")
      .on("click", function (event) {
        if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
        that.Back(tmpId, event);
      });

    $("#t" + tmpId + "_backarr")
      .off("click")
      .on("click", function (event) {
        if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
        that.Back(tmpId, event);
      });

    $("#t" + tmpId + "_skipOtpssb")
      .off("click")
      .on("click", function (event) {
        skipOTPSSB(tmpId, that, event);
      });

    $("#t" + tmpId + "_cntdiv").click(function (event) {
      controlDropDown(tmpId);
    });

    $("#t" + tmpId + "flag").click(function () {
      $("#t" + tmpId + "country_dropd .country_list").css("display", "none");
    });
    $("#t" + tmpId + "country_dropd").click(function () {
      $("#t" + tmpId + "flag .country_list").css("display", "none");
    });

    $("#t" + tmpId + "_bl_form")
      .off("keypress.Submit")
      .on("keypress.Submit", function (event) {
        /* enter func */ var keycode = event.keyCode
          ? event.keyCode
          : event.which;

        if (keycode === 13) {
          if (
            !(
              isSet(event) &&
              isSet(event.target) &&
              isSet(event.target.id) &&
              event.target.id === "t" + tmpId + "_reqBoxTemplates"
            )
          ) {
            if (!$("#t" + tmpId + "_submit").is(":disabled")) {
              $("#t" + tmpId + "_chatBL").off("keypress.Submit");
              if (isSSB(tmpId)) ReqObj.Form[tmpId].isEnterclicked = true;
              var imeshCookie = imeshExist();
              if (imeshCookie === "") {
                ReqObj.Form[tmpId].defSubmit.blurfired =
                  ReqObj.Form[tmpId].defSubmit.loginfval !== "" &&
                    ReqObj.Form[tmpId].defSubmit.loginfval.toLowerCase() !==
                    $("#t" + tmpId + "_login_field")
                      .val()
                      .toLowerCase()
                    ? false
                    : ReqObj.Form[tmpId].defSubmit.blurfired;
                if (
                  ReqObj.Form[tmpId].defSubmit.blurfired === false &&
                  $("#t" + tmpId + "_login_field").length > 0 &&
                  $("#t" + tmpId + "_login_field").val() !== "" &&
                  $(
                    "#t" +
                    tmpId +
                    "_q_first_nm" +
                    ReqObj.Form[tmpId].nec.classCount
                  ).length > 0 &&
                  $(
                    "#t" +
                    tmpId +
                    "_q_first_nm" +
                    ReqObj.Form[tmpId].nec.classCount
                  ).val() === ""
                ) {
                  ReqObj.Form[tmpId].defSubmit.todo = false;
                  ReqObj.Form[tmpId].defSubmit.subfired = false;
                  ReqObj.Form[tmpId].defSubmit.loginfval = $(
                    "#t" + tmpId + "_login_field"
                  ).val();
                }
              } else ReqObj.Form[tmpId].defSubmit.todo = true;
              ReqObj.Form[tmpId].defSubmit.eve = event;
              ReqObj.Form[tmpId].isEnterclicked = true;
              if (ReqObj.Form[tmpId].defSubmit.todo === true) {
                that.FormSubmit(tmpId, event);
              } else if (!that.FormSubmit(tmpId, event)) {
                that.ChatblTncSubmit(tmpId);
              }
            }
          }
        }
      });
    $("#t" + tmpId + "_newblchatReply")
      .off("keypress.Submit")
      .on("keypress.Submit", function (event) {
        /* enter func */ var keycode = event.keyCode
          ? event.keyCode
          : event.which;

        if (keycode === 13) {
          //x = "t" + tmpId + "_selectDD";
          // if(event.target.id === x){

          // }else{
          $("#t" + tmpId + "_blchatfooter").focus();

          if (!$("#t" + tmpId + "_submit").is(":disabled")) {
            $("#t" + tmpId + "_chatBL").off("keypress.Submit");
            if (IsChatbl(tmpId)) beforeformsubmitaction(tmpId);
            if (!that.FormSubmit(tmpId, event)) {
              //attach event
              that.ChatblTncSubmit(tmpId);
            }
          }
        }

        if (keycode === 9) {
        }
      });
    var NotSureEl = $("#t" + tmpId + "_notSure");
    if (NotSureEl.length > 0) {
      NotSureEl.off("click").on("click", function (event) {
        ReqObj.Form[tmpId].NotSure = true;
        ReqObj.Form[tmpId].PrevAnsPrint = true;
        that.FireTracking(tmpId, event);
        var ServiceArray = [];
        var counter = "";
        if (that.OnCloseCounter > -1) {
          counter = that.OnCloseCounter;

          ServiceArray = that.OnCloseServiceArray[counter];
        } else {
          counter = that.StepCounter;
          ServiceArray = that.FullServiceArray[counter];
        }
        that.MoveToNext(tmpId);

        formatServices(ServiceArray, tmpId);
        ServiceSeqGeneration(tmpId);
      });
    }

    if (ispdp(tmpId) && isImageVidEnq(tmpId) && isSet(ReqObj.Form[tmpId].isNewImage) && ReqObj.Form[tmpId].isNewImage === "1" && ReqObj.Form[tmpId].FormSequence._stepCounter > 0)
      $("#t" + tmpId + "_vcd").css({
        display: "none"
      });
  }
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

FormSeq.prototype.getStep = function (tmpId, isOnclose) {
  /*
      we assume that since getstep for onclose will only be called from onclosegetstep so
      if it is true specifically then only it is from on close sequence.
      */
  var that = this;
  if (isOnclose) {
    ReqObj.Form[tmpId].OnCloseStep = true;
    this.OnCloseCounter += 1;
    var CurrentUiArray = ReqObj.Form[tmpId].OnCloseArray;
    var counter = this.OnCloseCounter;
  } else {
    this.StepCounter += 1;
    var CurrentUiArray = ReqObj.Form[tmpId].UiArray;
    var counter = this.StepCounter;
  }
  if (isSet(CurrentUiArray)) {
    if (counter < CurrentUiArray.length) {
      if (IsChatbl(tmpId))
        that.ShowStep(
          tmpId
        ); //setTimeout(function () { that.ShowStep(tmpId); }, 350);
      else that.ShowStep(tmpId);
    }
  }
};

FormSeq.prototype.MakeSeq = function (Objconfig) {
  if (isSet(Objconfig)) {
    ReplaceObject(Objconfig.object, Objconfig.tmpId, this);
    if (Objconfig.object.isService) {
      AttachObject(Objconfig.object, Objconfig.tmpId);
    } else {
      if (typeof Objconfig.object.obj.hasHtml === "function")
        Objconfig.object.obj.hasHtml(Objconfig);
    }
  }
};

function ClearInlineBlTag(tmpId) {
  var InlineEl = $("#t" + tmpId + "_bl_form").parent();
  addDetachedFlag(tmpId);
  ReqObj.Form[tmpId].InlineformParentEl = InlineEl;
  ReqObj.Form[tmpId].InlineformHtml = InlineEl.html();
  InlineEl.html("");
}

FormSeq.prototype.InlineOpenForm = function (tmpId) {
  if (isSet(tmpId)) {
    var that = this;
    ClearInlineBlTag(tmpId);

    $("#t" + tmpId + "_enrichform_maindiv").html(GetPopUpHtml(tmpId)).css({
      display: "table",
    });

    // InlineDefault(tmpId);

    ReqObj.Form[tmpId].btn = $("#t" + tmpId + "_q_send_req_button").html();
    $("#t" + tmpId + "_q_send_req_button").html("");
    if ( ReqObj.Form[tmpId].formType.toLowerCase() === "bl" && isSet(ReqObj.Form[tmpId].displayImage) && ReqObj.Form[tmpId].displayImage === "" && isSet(ReqObj.Form[tmpId].zoomImage) && ReqObj.Form[tmpId].zoomImage === "" ) {
      ReqObj.Form[tmpId].displayImage = isSet(ReqObj.mcatImage) && ReqObj.mcatImage !== "" ? ReqObj.mcatImage : "";
    }

    // leftSideTransition(1, tmpId);

    // $("#t" + tmpId + "_hdg").text(ReturnCorrectVal(ReqObj.Form[tmpId].heading, StaticMessage()));
    OpenBLEnqPopup(tmpId);

    FormCloseButtons(tmpId);
  }
};

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