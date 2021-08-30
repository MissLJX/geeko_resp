<%@page import="com.amour.wanna.core.common.SpringPropertyResourceReader"%>
<%@page import="com.amour.wanna.shop.utils.LangUtil"%>
<%@page import="com.amour.wanna.shop.utils.WebVersionUtils"%>
<%@page import="com.amour.wanna.shop.v9.common.V"%>
<%@ page import="java.util.*" %>
<%@ page import="com.amour.utils.JackJson" %>
<%@ page import="org.apache.commons.collections.Predicate" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<fmt:setLocale value="<%=LangUtil.getLanguage()%>"/>

<%
	Map<String, Object> moduleConfig = PageUtils.getConfig("M1511");
	Map<String, Object> moduleTheme = (Map<String, Object>)moduleConfig.get("theme");
	Map<String, Object> topFixed = (Map<String, Object>)moduleTheme.get("topFixed");
	boolean isApp = StringUtils.isNotBlank(request.getParameter("isApp"));
	if(topFixed == null){
		topFixed = new HashMap<>();
	}
	if(isApp){
		String lang = request.getHeader("accept-language");
		String currency = request.getHeader("currency");
		if(StringUtils.isNotEmpty(lang)){
			try{
				Cookie cookie = new Cookie("lang", lang);
				cookie.setMaxAge(30*24*60*60*1000);
				cookie.setPath("/");
				response.addCookie(cookie);
			}catch (Exception e){}
		}
		if(StringUtils.isNotEmpty(currency)){
			Cookie cookie = new Cookie("currency", currency);
			cookie.setMaxAge(30*24*60*60*1000);
			cookie.setPath("/");
			response.addCookie(cookie);
		}
	}
%>


<!DOCTYPE html>
<fmt:bundle basename="geekoi18n">
	<html>
	<head>
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />
		<title><%=SpringPropertyResourceReader.getString("site.config.label") %> Raffle - free coupon and credits</title>
		<meta name="referrer" content="no-referrer-when-downgrade">
		<meta name="description" content="Play the <%=SpringPropertyResourceReader.getString("site.config.label") %> Holiday raffle for your chance to win coupons for $5, 15% and $50 off your purchases. Come and join us!">
		<link rel="stylesheet" type="text/css" href="${ctx}/resources/css/v3Site/msite.css">
		<link rel="stylesheet" type="text/css"
			  href="${ctx}/resources/css/v3Site/window.css?v=<%=WebVersionUtils.V%>">
		<link rel="stylesheet" type="text/css"
			  href="${ctx}/resources/css/v3Site/msite-index.css?v=<%=WebVersionUtils.V%>">

		<style>
			.i-response-products>.i-product{
				width: 20%;
				padding: 20px 10px;
			}

			.i-landing-navi{
				background-color: <%=topFixed.get("secondaryBackColor")%>;
			}

			.i-landing-navi .__nav.active {
				background-color: <%=topFixed.get("backColor")%>;
				color: <%=topFixed.get("fontColor")%>;
			}

			.i-landing-navi .__nav{
				color: <%=topFixed.get("secondaryFontColor")%>;
				background-color: <%=topFixed.get("secondaryBackColor")%>;
			}

			.xi-landing-product {
				background-color: transparent;
			}


			.xi-landing-product figure figcaption{
				margin-top: 3px;
				padding-left: 0px;
			}

			.i-patrick-title{
				text-align: center;
			}

			.i-patrick-title a{
				font-size: 18px;
				color: #f86735;
				text-transform: uppercase;
				position: relative;
				z-index: 1;
				text-decoration: none;
				font-family: SlatePro-Medium;
			}

			.i-patrick-title a::after{
				content: '';
				display: inline-block;
				height: 7px;
				background-color: #fff9ac;
				position: absolute;
				z-index: -1;
				bottom: 0;
				left: 0;
				width: 100%;
			}

			.x-black-off{
				background-color:  #ee7fb3;
			}


			.__index_timer .date-num{
				background-color: #222;
				color: #fff;
				width: 30px;
				height: 30px;
				text-align: center;
				line-height: 30px;
				display: inline-block;
				border-radius: 4px;
			}

			.__index_timer .date-doted{
				margin-left: 2px;
				margin-right: 2px;
			}


			.__flashtitle .__hd .iconfont{
				color: rgb(248, 220, 136);
				font-size: 18px;
			}

			.__flashtitle .__hd .__title{
				font-size: 18px;
				margin-left: 5px;
			}

			.flexslider-container{

			}

			.flexslider-container .slides> li{
				padding-left: 5px;
				padding-right: 5px;
			}

			.i-list-off{
				width: 32px;
				height: 16px;
				background: #fed157;
				text-align: center;
				font-size: 12px;
				color: #222;
				line-height: 16px;
				padding-top: 0;
			}


			<%
            	if(isApp){
            %>
			.x-list-group-1 > .headercontainer > .__hd{
				top:37px;
			}
			<%
            	}
			%>


			.xi-list-friday > .__hd{
				padding-left: 0;
				padding-right: 0;
				margin-bottom: 20px;
			}

			.xi-list-friday .__tabs > .__tab{
				background-color: #fff;
				border: none;
				line-height: 32px;
				font-size: 12px;
				height: 32px;
				font-family: SlatePro;
			}
		</style>
		<style>
			@font-face{
				font-family: "Zurich";
				src: url(https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/ttf/Zurich__Black_BT.ttf);
			}
			@font-face {
				font-family: "MOS_black";
				src: url('https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/ttf/MADE+Outer+Sans+Black+PERSONAL+USE.otf');
			}
			@font-face{
				font-family: "MOS_regular";
				src: url("https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/ttf/MADE+Outer+Sans+Regular+PERSONAL+USE.otf");
			}
			.wid-mask {
		        position: fixed;
		        width: 100%;
		        height: 100%;
		        top: 0;
		        left: 0;
		        background-color: rgba(0, 0, 0, 0.4);
		        z-index: 150;
		      }
		  .__good_luck  .__contaier   .__goluck{
	            width: 100px;
	            line-height: 35px;
	            border-radius: 5px;
	            font-size: 16px;
	            color: white;
	            cursor: pointer;
	            background: black;
	            text-align: center;
		     }
		  .__good_luck .__back_pink {
			    width: 295px;
			    height: 295px;
			    border-radius: 50%;
			    margin: 0 auto;
			    background: #fedadb;
			    position: fixed;
			    left: calc(50% - 147.5px);
			    top: calc(50% - 147.5px);
		  }
		  .__top_more{
		  		/* top: calc(50% - 200px) !important; */
		  }
		  .__good_luck .__contaier .__luck .__cicle_box {
			    width: 270px;
			    height: 270px;
			    border-radius: 50%;
			    position: relative;
			    margin: 0 auto;
			    top: 12px;
			    overflow: hidden;
			    background: white;
		  }
		        
		  .__good_luck .__contaier .__luck .__cicle {
			    width: 270px;
			    height: 270px;
			    border-radius: 50%;
			    position: absolute;
			    overflow:hidden;
		  }
		        
		  .__good_luck .__cicle_box .__cicle .__left {
			    width: 135px;
			    height: 270px;
			    position: absolute;
			    overflow: hidden;
			    font-size: 18px;
		  }
		       
		  .__good_luck .__cicle_box .__cicle .__part {
			    width: 135px;
			    height: 270px;
			    position: absolute;
		  }
		  
		  .__good_luck .__cicle_box .__cicle .__left .__part .__word {
			    position: relative;
			    left: 25px;
			    top: 37px;
			    transform: rotate(-30deg);
			    font-weight: bold;
			    text-align: center;
		  }
		  
		  
		  .__good_luck  .__cicle_box  .__cicle  .__left   #circle1{
		            background: #e04040;
		   }
		   
		  .__good_luck  .__cicle_box  .__cicle  .__left   #circle1 #word1{
		            color: white;
		  }
		  
		  .__good_luck  .__cicle_box  .__cicle  .__left   #circle2{
		            background: white;
		            transform: rotate(-60deg);
		            transform-origin: 100% 50%;
		   }
		   
		  .__good_luck  .__cicle_box  .__cicle  .__left   #circle3{
		            background: #e04040;
		            transform: rotate(-120deg);
		            transform-origin: 100% 50%;
		   }
		   
		   .__good_luck  .__cicle_box  .__cicle  .__left   #circle3 #word3{
		            color: white;
		    }
		    
		  .__good_luck .__cicle_box .__cicle .__right {
		    width: 135px;
		    height: 270px;
		    position: absolute;
		    left: 135px;
		    overflow: hidden;
		    font-size: 18px;
		   }
		   
		  .__good_luck .__cicle_box .__cicle .__right .__part .__word {
		    position: relative;
		    top: 62px;
		    left: 26px;
		    transform: rotate(30deg);
		  }
		  .__word{
		  	width:100%;
		  }
		  
		  .__good_luck  .__cicle_box  .__cicle  .__right  #circle4{
		            background: white;
		    }
		    
		  .__good_luck  .__cicle_box  .__cicle  .__right  #circle5{
		            background: #e04040;
		            transform: rotate(60deg);
		            transform-origin: 0 50%;
		  }
		  .__good_luck  .__cicle_box  .__cicle  .__right  #circle5 #word5{
		            color: white;
		  
		   }
		   
		  .__good_luck .__cicle_box  .__cicle  .__right  #circle6{
		            background: white;
		            transform: rotate(120deg);
		            transform-origin: 0 50%;
		   }
		   
		 .__good_luck .__cicle_box .__start {
		    width: 80px;
		    height: 80px;
		    line-height: 62px;
		    border: solid 10px black;
		    background: white;
		    border-radius: 50%;
		    position: absolute;
		    top: 36%;
		    left: 37%;
		    color: black;
		    text-align: center;
		    font-weight: bold;
		    font-size: 1.5em;
		    cursor: pointer;
		    /* box-sizing: border-box; */
		   }
		  
		  .__good_luck .__cicle_box .__wait {
		    width: 80px;
		    height:80px;
		    line-height: 62px;
		    border: solid 10px black;
		    background: white;
		    border-radius: 50%;
		    position: absolute;
		    top: 36%;
		    left: 37%;
		    color: black;
		    text-align: center;
		    font-weight: bold;
		    font-size: 1.5em;
		    display: none;
		  }
		

			
			/* 转盘 --------------------------------------------------------------------------------------------------------- */
			.activity_main_box{
			    width: 100%;
			    height: 710px;
			    margin: 0 auto;
			    background-image: url(https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021-8-2-lucky-circle-m-back.jpg);
			    background-size: 100% 100%;
			    display: flex;
			    align-items: center;
			    justify-content: center;
			    flex-direction: column;
			    display: inline-block;
			}
			.luck_rotate_circle{
			    display: flex;
			    align-items: center;
			    justify-content: center;
			    flex-direction: column;
			    margin-bottom: 43px;
			}
			.lucky_rotate_circle_title{
			    width: 100%;
			    min-height: 100px;
			    margin-bottom: 28px;
			    text-align: center;
			}
			.leftTxt{
			    font-family: MOS_black;
			    font-size: 35px;
			    font-weight: normal;
			    font-stretch: normal;
			    line-height: 36px;
			    letter-spacing: 0px;
			    color: #f9368e;
			    margin-top: 14px;
			    margin-bottom: 0px;
			    
			}
			.rightTxt{
			    font-family: MOS_regular;
				font-size: 20px;
				font-weight: 600;
				font-stretch: normal;
				line-height: 29px;
				letter-spacing: 0px;
				color: #ffffff;
			}
			/* 转盘--------------------------------------------------------------------------------------------------------------------- */
			.lucky_rotate_circle_box{
			    width: 260px;
			    height: 260px;
			    margin: 0 auto;
			    background-color: #e74734;
			    border-radius: 50%;
			    overflow: hidden;
			    position: relative;
			    
			}
			.lucky_rotate_circle{
			    margin: 0 auto;
			    margin-top: calc(50% - 113px);
			    width: 229px;
			    height: 229px;
			    border: 8px solid #d73121;
			    background-color: #fff;
			    border-radius: 100%;
			    position: relative;
			    transform: rotate(var(--rotateToDeg));
			}
			.lucky_rotate_circle > li {
			    display: block;
			    width: 150px;
			    height: 214px;
			    /* border: 1px solid; */
			    text-align: center;
			    position: absolute;
			    left: calc(50% - 75px);
			}
			.lucky_rotate_circle > li > .text{
			    /* width: 63px; */
				height: 29px;
				font-family: Zurich;
				font-size: 24px;
				font-weight: normal;
				font-stretch: normal;
				line-height: 29px;
				letter-spacing: 0px;
				color: #000000;
			    margin-top: 16px;
			    text-align: center;
			    transform-origin: center;
			}
			.lucky_rotate_circle > li > .text > div:nth-child(2){
			    /* width: 57px; */
				height: 16px;
				font-family: Zurich;
				font-size: 14px;
				font-weight: normal;
				font-stretch: normal;
				line-height: 16px;
				letter-spacing: 0px;
				color: #000000;
			    font-weight: 600;
			}
			.lucky_rotate_circle > li:nth-child(1){
			    transform: rotate(0deg);
			}
			.lucky_rotate_circle > li:nth-child(2){
			    transform: rotate(72deg);
			}
			.lucky_rotate_circle > li:nth-child(3){
			    transform: rotate(144deg);
			}
			.lucky_rotate_circle > li:nth-child(4){
			    transform: rotate(216deg);
			}
			.lucky_rotate_circle > li:nth-child(5){
			    transform: rotate(288deg);
			}
			.goBtn{
		        width: 50px;
			    height: 50px;
			    border: 8px solid #d73121;
			    position: absolute;
			    top: calc(50% - 25px);
			    left: calc(50% - 25px);
			    border-radius: 25px;
			    text-align: center;
			    line-height: 35px;
			    font-weight: 600;
			}
			.point{
			    position: absolute;
			    top: -29px;
			    left: 11px;
			}
			.point > img {
				width: 12px;
			}
			.lucky_rotate_circle_box > .addAnimation{
			    transition: all var(--rotateTime) ease-in-out;
			    transform: rotate(var(--rotateToDeg)) !important;
			}
			.addAnimation{
			    transition: all var(--rotateTime) ease-in-out;
			    transform: rotate(var(--rotateToDeg)) !important;
			}
			
			/* 规则框---------------------------------------------------------------------------------------------------------------------------- */
			.rules_info_box{
			    width: 100%;
			    margin-top: 13px;
			    margin: 0 auto;
			}
			.rules_line_one{
			    margin: 0 auto;
			    width: 93.5%;
			    position: relative;
			    text-align: center;
			}
			.winnerInfoBox{
			    width: 93.5%;
			    height: 40px;
			    margin: 0 auto;
			    /* border: 1px solid; */
			    margin-bottom: 12px;
			    border-radius: 20px;
			    background: rgba(255,255,255,0.2);
			}
			#winnerSwiper {
			    width: 90%;
			    margin: 0 auto;
			    height: 40px;
			    line-height: 40px;
			    overflow: hidden;
			}  
			#winnerSwiper .swiper-wrapper .swiper-slide{
			    display: flex;
			    align-items: center;
			    justify-content: space-between;
			    font-family: Roboto;
				font-size: 12px;
				font-weight: normal;
				font-stretch: normal;
				line-height: 14px;
				letter-spacing: 0px;
				color: #ffffff;
				white-space: nowrap;
			}
			#winnerSwiper .swiper-wrapper .swiper-slide div{
			    display: flex;
			    align-items: center;
			    white-space: nowarp;
			}
			#winnerSwiper .swiper-wrapper .swiper-slide img{
			    /* border: 1px solid; */
			    display: inline-block;
			    width: 25px;
			    height: 21px;
			    margin-right: 11px;
			}
			
			.chancesNumBox{
			    width: 100%;
			    text-align: center;
			    font-family: Roboto;
				font-size: 16px;
				font-weight: 600;
				font-stretch: normal;
				line-height: 19px;
				letter-spacing: 0px;
				color: #000000;
			    margin-bottom: 16px;
			}
			.chancesNum{
			    font-family: Roboto;
				font-size: 16px;
				font-weight: normal;
				font-stretch: normal;
				line-height: 19px;
				letter-spacing: 0px;
				color: #fbff0d;
			}
			.myPrice{
			    position: absolute;
			    top: 0;
			    right: 0;
			    display: flex;
			}
			.myPriceIcon{
			    width: 22px;
			    height: 14px;
			    margin-right: 4px;
			    /* border:1px solid; */
			}
			.myPriceTxt{
			    font-family: Roboto;
				font-size: 12px;
				font-weight: normal;
				font-stretch: normal;
				line-height: 14px;
				letter-spacing: 0px;
				color: #ffffff;
			    border-bottom: 1px solid #fff;
			    cursor: pointer;
			}
			
			.rulesBox{
			    width: 93.5%;
			    height: 190px;
			    background-color: #fff;
			    border-radius: 10px;
			    /* padding: 23px; */
			    /* padding-top: 16px; */
			    margin: 0 auto;
			    overflow: hidden;
			}
			.rulesTabBox{
			    width: 90%;
			    display: flex;
			    align-items: flex-start;
			    justify-content: space-around;
			    font-family: Roboto;
			    font-size: 14px;
			    font-weight: normal;
			    font-stretch: normal;
			    line-height: 16px;
			    letter-spacing: 0px;
			    color: #000000;
			    margin: 0 auto;
			    margin-top: 16px;
			    cursor: pointer;
			}
			.rulesTabBox > div{
			    padding-left: 5px;
			    padding-right: 5px;
			}
			.tabClick{
			    border-bottom: 2px solid #000;
			    padding-bottom: 3px;
			    font-weight: bolder;
			}
			.rulesContentBox{
			    overflow: hidden;
			    overflow-y: scroll;
			    /* border: 1px solid; */
			    width: 90%;
			    height: 127px;
			    padding-right: 5px;
			    margin: 0 auto;
			    margin-top: 12px;
			    -webkit-overflow-scrolling: touch;
			}
			/*定义整体的宽度*/
		    .rulesContentBox::-webkit-scrollbar {
		      width: 6px;
		    }
		    /*定义滚动条轨道*/
		    .rulesContentBox::-webkit-scrollbar-track {
		      border-radius: 5px;
		    }
		    /*定义滑块*/
		    .rulesContentBox::-webkit-scrollbar-thumb {
		      	width: 6px;
		      	border-radius: 3px;
				background-color: #cccccc;
		    }
			.rulesItem{
			    display: flex;
			    align-items: flex-start;
			    justify-content: flex-start;
			    /* margin-bottom: 11px; */
			    cursor: pointer;
			}
			
			.rulesIndex{
			    font-family: Zurich;
			    font-size: 18px;
			    font-stretch: normal;
			    line-height: 21px;
			    letter-spacing: 0px;
			    color: #000000;
			    margin-right: 10px;
			    font-weight: 600;
			    font-style: italic;
			}
			.rulesContent{
			    font-family: Roboto;
			    font-size: 14px;
			    font-weight: normal;
			    font-stretch: normal;
			    line-height: 16px;
			    letter-spacing: 0px;
			    color: #000000;
			    margin-top: 4px;
			    flex-grow: 1;
			    line-height: 16px;
			}
			.rulesContent > div > img {
			    display: block;
			    width: 70px;
			    height: 70px;
			    margin-top: 8px;
			    background-color: #eee;
			}
			.rulesContent > .downloadBtn{
			    width: 100px;
				height: 26px;
			    background-color: #000;
			    color: #fff;
			    text-align: center;
			    line-height: 26px;
			    border-radius: 13px;
			    overflow: hidden;
			    font-family: Roboto;
				font-size: 12px;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0px;
				color: #ffffff;
			    /* margin-top: -8px; */
			    padding: 0 3px;
			}
			.rulesContent > .positionBox > .contentTxt > .contentInfo{
			    font-family: Roboto;
			    font-size: 13px;
			    font-weight: normal;
			    font-stretch: normal;
			    line-height: 16px;
			    letter-spacing: 0px;
			    color: #666666;
			    margin-top: 2px;
			}
			.rulesContent > .positionBox > .contentImgBox{
			    display: flex;
			    align-items: center;
			    justify-content: flex-start;
			    margin-top: 8px;
			}
			.rulesContent > .positionBox > .contentImgBox > div{
			    cursor: pointer;
			    width: 30px;
			    height: 30px;
			    border-radius: 50%;
			    /* background-color: #000; */
			    margin-top: 3px;
			    overflow: hidden;
			}
			.rulesContent > .positionBox > .contentImgBox > div > img{
			    display: block;
			    width: 30px;
			    height: 30px;
			    border-radius: 50%;
			    /* background-color: #000; */
			    /* margin-top: 3px; */
			    overflow: hidden;
			}
			.rulesContent > .positionBox > .contentImgBox > div:nth-child(2){
			    background-color: #000;
			}
			.rulesContent > .positionBox > .contentImgBox > div:nth-child(2) > img{
			    width: 20px;
			    height: 20px;
			    margin: 5px auto;
			}
			.rulesContent > .positionBox > .contentImgBox > div:not(:last-child){
			    margin-right: 16px;
			}
			.rulesContent > .positionBox > .contentBtnBox{
			    cursor: pointer;
			    border-radius: 14px;
			    width: 110px;
			    height: 28px;
			    line-height: 28px;
			    text-align: center;
			    background-color: #000;
			    font-family: Roboto;
			    font-size: 12px;
			    font-weight: normal;
			    font-stretch: normal;
			    letter-spacing: 0px;
			    color: #ffffff;
			    margin-top: 12px;
			}
			.rulesContent b{
				font-weight: 600;
				border-bottom: 2px solid;
				cursor: pointer;
				display: inline-block;
			}
			
			
			
			/* 蒙板---------------------------------------------------------------------------------- */
			.afterPlayMask{
			    position: fixed;
			    top: 0;
			    left: 0;
			    width: 100%;
			    height: 100vh;
			    background-color: rgba(0,0,0,0.8);
			    z-index: 15;
			}
			.afterPlayImgBox{
			    width: 260px;
			    height: 260px;
			    margin: 0 auto;
			    margin-top: 40px;
			    /* border: 1px solid #eee; */
			    position: relative;
			    display: flex;
			    align-items: flex-end;
			    justify-content: center;
			}
			.showImg{
			    /* width: 156px; */
			    width: 217px;
			    /* height: 156px; */
			    margin-bottom: -76px;
			}
			.noChancesImg{
				width: 217px;
			}
			.freeCardImg{
				width: 220px;
			}
			.closeImg{
			    position: absolute;
			    top: 75px;
			    right: 9px;
			    width: 25px;
			    height: 25px;
			    cursor: pointer;
			}
			.afterPlayMaskTxt{
			    width: 260px;
			    margin: 0 auto;
			    margin-top: 13px;
			    margin-bottom: 21px;
			    text-align: center;
			    font-family: Roboto;
				font-size: 14px;
				font-weight: normal;
				font-stretch: normal;
				line-height: 18px;
				letter-spacing: 0px;
				color: #ffffff;
			}
			.reciviedPoints{
			    font-size: 28px;
			    font-weight: 600;
			    margin-top: 10px;
			}
			.afterPlayBtn{
			    width: 170px;
			    height: 36px;
			    border-radius: 18px;
			    text-align: center;
			    line-height: 36px;
			    margin: 0 auto;
			    margin-bottom: 12px;
			    font-family: Roboto;
			    font-size: 14px;
			    font-weight: 600;
			    font-stretch: normal;
			    letter-spacing: 0px;
			    color: #212121;
			    background-color: #fff;
			    cursor: pointer;
			    white-space: nowrap;
			    padding: 0 7px;
			}
			.goshopping, .continue{
			    background-color: #da2b2b;
			    color: #fff;
			}
			.minSpend{
				margin-top:15px;
			}
			.freeShippingCardTxt{
				font-size: 30px;
			    line-height: 35px;
			    margin-bottom:14px;
			    text-align: center;
			}
			
			
			/* 老转盘 */
			.__luck{
				width: 240px;
			    height: 240px;
			    position: relative;
			    display: inline-block;
			    /* border: 10px solid #e72034; */
			    border-radius: 50%;
			    font-family: Zurich;
			    /* box-shadow: 0px 0px 0px 10px #e84634; */
			    display:none;
			}
		  .__luck .__cicle_box {
			   width: 240px;
			    height: 240px;
			    border-radius: 50%;
			    position: absolute;
			    top: 0;
			    left: 0;
			    /* top: 12px; */
			    /* overflow: hidden; */
			    background: white;
			    z-index: 1;
			    transform: rotate(-22.5deg);
		  }
		  .__luck .__cicle_box > img{
		  		width: 320px;
			    /* height: 280px; */
			    position: absolute;
			    top: -40px;
			    left: -40px;
			    transform: rotate(22.5deg);
			    z-index:-1;
		  } 
		        
		  .__luck .__cicle {
			    width: 240px;
			    height: 240px;
			    border-radius: 50%;
			    position: absolute;
			    overflow: hidden;
		  }
		        
		  .__cicle_box .__cicle .__left {
			    width: 120px;
			    height: 240px;
			    position: absolute;
			    overflow: hidden;
			    font-size: 18px;
		  }
		       
		  .__cicle_box .__cicle .__part {
			    width: 120px;
			    height: 240px;
			    position: absolute;
		  }
		  .__cicle_box .__cicle .__left .__part:nth-child(odd){
		  		background: #fff0c9;
		  }
		  .__cicle_box .__cicle .__left .__part:nth-child(even){
		  		background: #fdbf84;
		  }
		  .__cicle_box .__cicle .__right .__part:nth-child(odd){
		  		background: #fdbf84;
		  }
		  .__cicle_box .__cicle .__right .__part:nth-child(even){
		  		background: #fff0c9;
		  }
		  
		  .__cicle_box .__cicle .__left .__part .__word {
			    position: relative;
			    left: 26px;
			    top: 23px;
			    transform: rotate(-22.5deg);
			    font-weight: bold;
			    text-align: center;
		  }
		  
		  .__cicle_box  .__cicle  .__left   #circle0{
		            /* background: #fff7f3; */
		            color: #4b5056;
		   }
		  .__cicle_box  .__cicle  .__left   #circle1{
		            /* background: #fff7f3; */
		            transform: rotate(-45deg);
		            transform-origin: 100% 50%;
		   }
		   
		  .__cicle_box  .__cicle  .__left   #circle1 #word1{
		            color: #4b5056;
		  }
		  
		  .__cicle_box  .__cicle  .__left   #circle2{
		            /* background: #ffe0d7; */
		            transform: rotate(-90deg);
		            transform-origin: 100% 50%;
		            color: #4b5056;
		   }
		   
		  .__cicle_box  .__cicle  .__left   #circle3{
		            /* background: #ffc0b4; */
		            transform: rotate(-135deg);
		            transform-origin: 100% 50%;
		   }
		   
		  .__cicle_box  .__cicle  .__left   #circle3 #word3{
		            color: #4b5056;
		    }
		    
		  .__cicle_box .__cicle .__right {
		   		    width: 120px;
				    height: 240px;
				    position: absolute;
				    left: 120px;
				    overflow: hidden;
				    font-size: 18px;
				    /* border: 1px solid; */
		   }
		   
		  .__cicle_box .__cicle .__right .__part .__word {
		    	position: relative;
			    left: -26px;
			    top: 23px;
			    transform: rotate( 22.5deg);
			    font-weight: bold;
			    text-align: center;
		  }
		  .__word{
		  	width:100%;
		  }
		  
		  .__cicle_box  .__cicle  .__right  #circle4{
		            /* background: #ffc0b4; */
		            color: #4b5056;
		    }
		    
		  .__cicle_box  .__cicle  .__right  #circle5{
		           /*  background: #ffe0d7; */
		            transform: rotate(45deg);
		            transform-origin: 0 50%;
		  }
		  .__cicle_box  .__cicle  .__right  #circle5 #word5{
		            color: #4b5056;
		  
		   }
		   
		  .__cicle_box  .__cicle  .__right  #circle6{
		            /* background: #fff7f3; */
		            transform: rotate(90deg);
		            transform-origin: 0 50%;
		            color: #4b5056;
		   }
		   .__cicle_box  .__cicle  .__right  #circle7{
		            /* background: #fff7f3; */
		            transform: rotate(135deg);
		            transform-origin: 0 50%;
		            color: #4b5056;
		   }
		   
		 .__cicle_box .__start {
		    width: 51px;
		    height: 51px;
		    line-height: 40px;
		    border: solid 5px #d73121;
		    background: #ea5041;
		    border-radius: 50%;
		    position: absolute;
		    top: calc(50% - 25px);
		    left: calc(50% - 25px);
		    color: #fff;
		    text-align: center;
		    font-weight: bold;
		    font-size: 1.5em;
		    cursor: pointer;
		    transform: rotate(22.5deg);
		   }
		  
		  .__cicle_box .__wait {
		    width: 51px;
		    height: 51px;
		    /* line-height: 42px;
		    border: solid 5px #d73121;
		    background: #ea5041;
		    border-radius: 50%; */
		    position: absolute;
		    top: calc(50% - 25px);
		    left: calc(50% - 25px);
		    color: #fff;
		    text-align: center;
		    font-weight: bold;
		    font-size: 16px;
		    cursor: pointer;
		    transform: rotate( 22.5deg);
		  }
		  .__cicle_box .__wait > img{
		  	width: 65px;
		    position: absolute;
		    top: -22px;
		    left: -7px;
		  }
		  .__cicle_box .__sanjiaoA {
			width: 20px;
		    height: 20px;
		    position: absolute;
		    top: calc(50% - 37px);
		    left: calc(50% + 4px);
		    background: url(https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/2021-07-27-lucky-circle-p-jiao.png) no-repeat;
		    transform: rotate( 22.5deg );
		    background-size: 80%;
		   }
		   
		   // my prizes 页面
		   .myPrizesPage{
	            background-color: #f6f6f6;
	            min-height: 100vh;
	            width: 100%;
	            margin: 0 auto;
	        }
	        #myPrizesPage{
	        	background-color: #f6f6f6;
	            min-height: 100vh;
	            width: 100%;
	            margin: 0 auto;
	            position: fixed;
	            top: 0;
	            left: 0;
	            z-index: 30;
	        }
	        .myPrizesContentBox{
	        	height: calc(100vh - 44px);
			    overflow: hidden;
			    overflow-y: scroll;
			    -webkit-overflow-scrolling: touch;
	        }
	        .myPrizesPage .pageHeader{
	            width: 100%;
	            height: 44px;
	            text-align: center;
	            line-height: 44px;
	            position: relative;
	            font-family: Roboto;
	            font-size: 16px;
	            font-weight: 600;
	            font-stretch: normal;
	            letter-spacing: 0px;
	            color: #212121;
	            background-color: #fff;
	            border-bottom: 1px solid #e2e2e2;
	        }
	        .myPrizesPage .pageHeader > .myPrizesBack {
	            /* width: 11px;
	            height: 18px; */
	            position: absolute;
	            /* top: 13px; */
	            left: 12px;
	            /*border: 1px solid;*/
	        }
	        .myPrizesPage .infoContentBox > ul{
	            display: block;
	            background-color: #fff;
	        }
	        .myPrizesPage .infoContentBox > ul > li {
	            list-style: none;
	            display: flex;
	            align-items: center;
	            justify-content: space-between;
	            height: 60px;
	            font-family: Roboto;
	            font-size: 14px;
	            font-weight: normal;
	            font-stretch: normal;
	            line-height: 60px;
	            letter-spacing: 0px;
	            color: #000000;
	            margin: 0 auto;
	            border-bottom: 1px solid #f6f6f6;
	            width: 93.5%;
	        }
	        .myPrizesPage .infoContentBox > ul > li > .getPoints{
	            font-family: Roboto;
	            font-size: 12px;
	            font-weight: 600;
	            font-stretch: normal;
	            line-height: 16px;
	            letter-spacing: 0px;
	            color: #e64444;
	            display: flex;
	            align-items: center;
	            justify-content: flex-start;
	        }
	        .myPrizesPage .infoContentBox > ul > li > .getPoints > img{
	            width: 22px;
	            height: 23px;
	            /* background-color: #eee; */
	            margin-right: 8px;
	        }
	        .myPrizesPage .infoContentBox > ul > li > .getDate {
	            font-family: Roboto;
	            font-size: 12px;
	            font-weight: normal;
	            font-stretch: normal;
	            line-height: 16px;
	            letter-spacing: 0px;
	            color: #666666;
	        }
	        .myPrizesPage .myPrizesInfo{
	            font-family: Roboto;
	            font-size: 12px;
	            font-weight: normal;
	            font-stretch: normal;
	            line-height: 14px;
	            letter-spacing: 0px;
	            color: #999999;
	            width: 93.5%;
	            margin: 0 auto;
	            margin-bottom: 30px;
	        }
	        .myPrizesPage .myPrizesInfo > div {
	            margin: 20px 0 14px 0;
	        }
	        .myPrizesPage .myPrizesInfo > div > strong{
	            color: #e64444;
	        }
	        .myPrizesPage .myPrizesInfo > a{
	            color: #5e7ded;
	        }
	        .myPrizesPage .infoContentBox > .mine{
	            height: 54px;
	            margin-bottom: 12px;
	        }
	        .myPrizesPage .infoContentBox > .mine > li{
	            margin-bottom: 10px;
	            margin-top: 5px;
	        }
	        
	        /* exchange页面 */
	        .getMorePage{
	            background-color: #fff;
	            min-height: 100vh;
	            margin: 0 auto;
	        }
	        #getMorePage{
	            background-color: #fff;
	            min-height: 100vh;
	            width: 100%;
	            margin: 0 auto;
	            position: fixed;
	            top: 0;
	            left: 0;
	            z-index: 30;
	        }
	        .getMorePage .pageHeader{
	            width: 100%;
	            height: 44px;
	            text-align: center;
	            line-height: 44px;
	            position: relative;
	            font-family: Roboto;
	            font-size: 16px;
	            font-weight: 600;
	            font-stretch: normal;
	            letter-spacing: 0px;
	            color: #212121;
	            background-color: #fff;
	            border-bottom: 1px solid #e2e2e2;
	        }
	        .getMorePage .pageHeader > .back {
	            /* width: 11px;
	            height: 18px; */
	            position: absolute;
	            /* top: 13px; */
	            left: 12px;
	            /*border: 1px solid;*/
	        }
	        .getMorePage .rulesItem{
	            display: flex;
	            align-items: flex-start;
	            justify-content: flex-start;
	            margin-bottom: 11px;
	            cursor: pointer;
	            width: 93.6%;
	            margin:0 auto;
	            height: 126px;
	        }
	        .getMorePage .rulesItem:not(:last-child){
	            border-bottom: 1px solid #f2f2f2;
	        }
	
	        .getMorePage .rulesIndex{
	            font-family: Zurich;
	            font-size: 18px;
	            font-weight: normal;
	            font-stretch: normal;
	            line-height: 21px;
	            letter-spacing: 0px;
	            color: #000000;
	            margin-right: 10px;
	            font-weight: 600;
	            margin-top: 20px;
	        }
	        .getMorePage .rulesContent{
	            font-family: Roboto;
	            font-size: 14px;
	            font-weight: normal;
	            font-stretch: normal;
	            line-height: 16px;
	            letter-spacing: 0px;
	            color: #000000;
	            flex-grow: 1;
	            line-height: 16px;
	            font-weight: 600;
	            margin-top: 23px;
	        }
	        .getMorePage .rulesContent > div > img {
	            display: block;
	            width: 70px;
	            height: 70px;
	            margin-top: 8px;
	            background-color: #eee;
	        }
	        .getMorePage .rulesContentDown{
	            display: flex;
	            align-items: flex-start;
	            justify-content: space-between;
	        }
	        .getMorePage .rulesContent > .downloadBtn{
	            width: 100px;
	            height: 26px;
	            background-color: #000;
	            color: #fff;
	            text-align: center;
	            line-height: 26px;
	            border-radius: 13px;
	            overflow: hidden;
	            font-family: Roboto;
	            font-size: 12px;
	            font-weight: normal;
	            font-stretch: normal;
	            letter-spacing: 0px;
	            color: #ffffff;
	            margin-top: -8px;
	            padding: 0 3px;
	        }
	        .getMorePage .rulesContent > .positionBox > .contentTxt > .contentInfo{
	            font-family: Roboto;
	            font-size: 13px;
	            font-weight: normal;
	            font-stretch: normal;
	            line-height: 16px;
	            letter-spacing: 0px;
	            color: #666666;
	            margin-top: 2px;
	        }
	        .getMorePage .rulesContent > .positionBox > .contentImgBox{
	            display: flex;
	            align-items: center;
	            justify-content: flex-start;
	            margin-top: 8px;
	        }
	        .getMorePage .rulesContent > .positionBox > .contentImgBox > div{
	            cursor: pointer;
	            width: 30px;
	            height: 30px;
	            border-radius: 50%;
	            /* background-color: #000; */
	            margin-top: 3px;
	            overflow: hidden;
	        }
	        .getMorePage .rulesContent > .positionBox > .contentImgBox > div > img{
	            display: block;
	            width: 30px;
	            height: 30px;
	            border-radius: 50%;
	            /* background-color: #000; */
	            /* margin-top: 3px; */
	            overflow: hidden;
	        }
	        .getMorePage .rulesContent > .positionBox > .contentImgBox > div:nth-child(2){
	            background-color: #000;
	        }
	        .getMorePage .rulesContent > .positionBox > .contentImgBox > div:nth-child(2) > img{
	            width: 20px;
	            height: 20px;
	            margin: 5px auto;
	        }
	        .getMorePage .rulesContent > .positionBox > .contentImgBox > div:not(:last-child){
	            margin-right: 16px;
	        }
	        .getMorePage .rulesContent > .positionBox > .contentBtnBox{
	            cursor: pointer;
	            border-radius: 14px;
	            width: 110px;
	            height: 28px;
	            line-height: 28px;
	            text-align: center;
	            background-color: #000;
	            font-family: Roboto;
	            font-size: 12px;
	            font-weight: normal;
	            font-stretch: normal;
	            letter-spacing: 0px;
	            color: #ffffff;
	            margin-top: 12px;
	        }
	        
	        // 积分兑换弹框
			.exchangeMask{
				position: fixed;
			    top: 0;
			    left: 0;
			    width: 100%;
			    height: 100vh;
			    background-color: rgba(0,0,0,0.8);
			    z-index: 15;
			    display: flex;
			    align-items: center;
			    justify-content: center;
			}
			.exchangeClassBox{
				position: fixed;
			    top: 0;
			    left: 0;
			    width: 100%;
			    height: 100vh;
			    background-color: rgba(0,0,0,0.8);
			    z-index: 31;
			    display: flex;
			    align-items: center;
			    justify-content: center;
			}
			.exchangeMask .exchangeBox{
				width: 250px;
			    height: 210px;
			    background: #fff;
			    border-radius: 8px;
			    position:relative;
			    text-align: center;
			}
			.exchangeMask .exchangeBox .closeImg{
				position: absolute;
			    top: -34px;
			    right: -14px;
			}
			.exchangeMask .exchangeBox .exchangeTitle{
				font-family: Roboto;
			    font-weight: 600;
			    font-stretch: normal;
			    letter-spacing: 0px;
			    color: #212121;
			    width: 151px;
			    height: 36px;
			    font-size: 16px;
			    line-height: 19px;
			    margin: 0 auto;
			    margin-top: 20px;
			}
			.exchangeMask .exchangeBox .userPoints{
			    margin-top: 16px;
			    width: 250px;
			    height: 21px;
			    text-align: center;
			    font-family: Roboto;
			    font-size: 18px;
			    font-weight: 600;
			    font-stretch: normal;
			    line-height: 21px;
			    letter-spacing: 0px;
			    color: #5f97ed;
			}
			.exchangeMask .exchangeBox .exchangeRules{
				font-family: Roboto;
			    font-size: 14px;
			    font-weight: normal;
			    font-stretch: normal;
			    line-height: 19px;
			    letter-spacing: 0px;
			    color: #212121;
			    margin-top: 11px;
			}
			.exchangeMask .exchangeBox .exchangeSubmit{
				width: 160px;
			    height: 36px;
			    background: #da2b2b;
			    border-radius: 18px;
			    line-height: 36px;
			    /* color: #fff; */
			    margin: 0 auto;
			    margin-top: 20px;
			    font-family: Roboto;
			    font-size: 14px;
			    font-weight: normal;
			    font-stretch: normal;
			    /* line-height: 19px; */
			    letter-spacing: 0px;
			    color: #ffffff;
			    cursor: pointer;
			}
			
			
			@font-face {
			  font-family: 'iconfont';  /* Project id 384296 */
			  src: url('//at.alicdn.com/t/font_384296_hyeeafv2ple.woff2?t=1627626329519') format('woff2'),
			       url('//at.alicdn.com/t/font_384296_hyeeafv2ple.woff?t=1627626329519') format('woff'),
			       url('//at.alicdn.com/t/font_384296_hyeeafv2ple.ttf?t=1627626329519') format('truetype');
			}
			.shippingIcon{
				width:24px;
				/* height: 18px; */
				font-size: 20px;
				color: #000;
			}
			.quanIcon{
				width: 24px;
				/* height: 15px; */
				font-size: 20px;
				color: #000;
			}
			
			/* 新exchange mask */
			.newExchange{
				position: fixed;
			    top: 0;
			    left: 0;
			    width: 100%;
			    height: 100vh;
			    background-color: rgba(0,0,0,0.8);
			    z-index: 15;
			    display: flex;
			    align-items: center;
			    justify-content: center;
			}
			.newExchangeClass{
				/* position: fixed;
			    top: 0;
			    left: 0;
			    width: 100%;
			    height: 100vh;
			    background-color: rgba(0,0,0,0.8);
			    z-index: 15;
			    display: flex;
			    align-items: center;
			    justify-content: center; */
			}
			.newExchangeBox{
				width: 250px;
			    background: #fff;
			    border-radius: 5px;
			    padding: 24px 15px 18px;
			    position: relative;
			}
			.newExchangeBox .closeImg{
				position: absolute;
			    top: -20px;
			    right: -35px;
			    width: 25px;
			    height: 25px;
			    cursor: pointer;
			}
			.newExchange .rulesItem{
				display: flex;
			    align-items: flex-start;
			    justify-content: flex-start;
			    margin-bottom: 11px;
			}
			.newExchange .rulesItem .rulesIndex{
				font-family: Zurich;
			    font-size: 18px;
			    font-weight: 600;
			    font-stretch: normal;
			    line-height: 21px;
			    letter-spacing: 0px;
			    color: #000000;
			    margin-right: 10px;
			    font-style: italic;
			}
			.newExchange .rulesItem .rulesContent{
				font-family: Roboto;
			    font-size: 14px;
			    font-weight: 500;
			    font-stretch: normal;
			    line-height: 16px;
			    letter-spacing: 0px;
			    color: #000000;
			    margin-top: 3px;
			    flex-grow: 1;
			    line-height: 16px;
			}
			.newExchange .rulesItem .rulesContent .downloadBtn{
				width: 150px;
			    height: 36px;
			    background-color: #000;
			    color: #fff;
			    text-align: center;
			    line-height: 36px;
			    border-radius: 18px;
			    overflow: hidden;
			    font-family: Roboto;
			    font-size: 12px;
			    font-weight: normal;
			    font-stretch: normal;
			    letter-spacing: 0px;
			    color: #ffffff;
			    margin-top: 7px;
			    padding: 0 3px;
			}
			.newExchange .rulesItem .rulesContent > img{
				display: block;
			    width: 80px;
			    height: 80px;
			    margin-top: 12px;
			    margin-bottom: 12px;
			}
			.newExchange .rulesItem .rulesContent .contentInfo{
				font-family: Roboto;
			    font-size: 12px;
			    font-weight: normal;
			    font-stretch: normal;
			    line-height: 16px;
			    letter-spacing: 0px;
			    color: #666666;
			    /* margin-top: 4px; */
			    line-height: 16px;
			}
			.newExchange .rulesItem .rulesContent .contentBtnBox{
				cursor: pointer;
			    border-radius: 18px;
			    width: 150px;
			    height: 36px;
			    line-height: 36px;
			    text-align: center;
			    background-color: #da2b2b;
			    font-family: Roboto;
			    font-size: 12px;
			    font-weight: normal;
			    font-stretch: normal;
			    letter-spacing: 0px;
			    color: #ffffff;
			}
			.newExchange .rulesItem .rulesContent .contentPointBox{
				font-family: Roboto;
			    font-size: 14px;
			    font-weight: 600;
			    font-stretch: normal;
			    line-height: 24px;
			    letter-spacing: 0px;
			    color: #da2b2b;
			}
			
			.noExchange{
				background: #999 !important;
			}
			
			.messageMask{
			    position: fixed;
			    top: 0;
			    left: 0;
			    width: 100%;
			    height: 100vh;
			    background-color: rgba(0,0,0,0.8);
			    z-index: 15;
			    display: flex;
			    align-items: center;
			    justify-content: center;
			}
			.messageBox{
				position: relative;
			    min-width: 80%;
			    min-height: 80px;
			    background: #fff;
			    padding: 15px;
			    border-radius: 5px;
			}
			.messageCloseImg{
				width: 25px;
			    height: 25px;
			    position: absolute;
			    top: -40px;
			    right: -20px;
			}
			.messageTxt{
				font-family: SlatePro;
			    font-size: 14px;
			    font-weight: normal;
			    font-stretch: normal;
			    letter-spacing: 0px;
			    color: #222222;
			}
			
			// JGG
			.JGG_box{
				height: 300px;
		    	width: 300px;
		    	background: #fff; 
		    }
		    .JGG_line{
		    	width: 300px;
		    	height: 100px;
		    	border: 1px solid;
		    	display: flex;
		    	justify-content: space-around;
		    	align-items: center;
		    }
		    .JGG_item{
		    	width: 80px;
			    height: 100%;
			    border: 1px solid;
			    display: flex;
			    align-items: center;
			    justify-content: center;
			    flex-direction: column;
			    flex:1;
		    }
		    .JGG_start{
				border-radius: 50%;
				cursor: pointer;
			}
			.JGG_stop{
				background: skyblue;
			}

			.xi-list-friday .__tabs6{
				display: inline-flex;
				width: auto;
			}

			.swiper-container{
				text-align: center;
			}
		</style>
		<script type="text/javascript">
			var ctx = "${ctx}";
			document.ctx = ctx;
			window.wid = "${header.wid}";
			window.accessToken = "${header.accessToken}";
			var isApp = <%=isApp%>;
		</script>

		<%
			String path = request.getContextPath();
			String serverPath = request.getServerName()+path+"/";
			String basePath = "http://"+serverPath;
			String sslPath = "https://"+serverPath;
		%>

		<script type="text/javascript">
			var basePath = '<%=basePath%>';
			var sslPath = '<%=sslPath%>';
			var currentPage = "Raffle Box";
		</script>

		<%@ include file="scripts/headerincluder.jsp" %>

		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
					m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

			ga('create', '<%=SpringPropertyResourceReader.getString("site.config.google.gaid") %>', 'auto');
			ga('require', 'ec');
			ga('send', 'pageview');

		</script>
	</head>

	<body>
	<div class="m-switch">
		<%@ include file="menu.jsp" %>
		<div class="m-switch-right">

			<%
				if(!isApp){
					%>
						<%@ include file="header.jsp" %>
					<%
				}
			%>



			<div class="m-main">




				<%
					if(moduleConfig != null){
						Map<String, Object> theme = (Map<String, Object>) moduleConfig.get("theme");

				%>
				<div>
					<%
						List<Map<String, Object>> modules = (List<Map<String, Object>>)moduleConfig.get("modules");
						if(CollectionUtils.isNotEmpty(modules)){
							CollectionUtils.filter(modules, new Predicate() {
								@SuppressWarnings("unchecked")
								@Override
								public boolean evaluate(Object object) {
									Map<String, Object> map = (Map<String, Object>)object;
									Boolean show = (Boolean)map.get("show");
									return show !=null && show;
								}
							});

							modules.sort(new java.util.Comparator<Map<String, Object>>() {
								@Override
								public int compare(Map<String, Object> o1, Map<String, Object> o2) {
									int sort1 = (Integer)o1.get("sort");
									int sort2 = (Integer)o2.get("sort");
									return sort1 - sort2;
								}

							});

							int position = 1;
							for(Map<String, Object> module: modules){
								module.put("showIcon", true);
								module.put("pageTitle", "Lottery");
								module.put("sort", position++);
								EventTrackUtils.EventResource er = new EventTrackUtils.EventResource(module);

					%>
					<div  id="<%=module.get("id")%>" class="module" style="padding-top: <%=module.get("marginTop")%>;<%=module.get("style")%>">
						<%
							if("images-2".equals(module.get("type"))){
								String paramJson = JackJson.fromObjectToJson(module);
								String paramBase = PageUtils.encode(paramJson);
						%>

						<jsp:include page="cache/modules/images-2.jsp">
							<jsp:param value="<%=paramBase %>" name="params"/>
						</jsp:include>

						<%
						}else if("banner-4".equals(module.get("type"))){
							String paramJson = JackJson.fromObjectToJson(module);
							String paramBase = PageUtils.encode(paramJson);
						%>
						<jsp:include page="cache/modules/banner-4.jsp">
							<jsp:param value="<%=paramBase %>" name="params"/>
						</jsp:include>
						<%
						}else if("landing-discounts".equals(module.get("type"))){
							String paramJson = JackJson.fromObjectToJson(module);
							String paramBase = PageUtils.encode(paramJson);
						%>
						<jsp:include page="cache/modules/landing-discounts.jsp">
							<jsp:param value="<%=paramBase %>" name="params"/>
						</jsp:include>
						<%
						}else if("list-friday-5".equals(module.get("type"))){
							String paramJson = JackJson.fromObjectToJson(module);
							String paramBase = PageUtils.encode(paramJson);
						%>
						<jsp:include page="cache/modules/list-friday-5.jsp">
							<jsp:param value="<%=paramBase %>" name="params"/>
						</jsp:include>
						<%
						}else if("list-friday-7".equals(module.get("type"))){
							String paramJson = JackJson.fromObjectToJson(module);
							String paramBase = PageUtils.encode(paramJson);
						%>
						<jsp:include page="cache/modules/list-friday-7.jsp">
							<jsp:param value="<%=paramBase %>" name="params"/>
						</jsp:include>
						<%
						}else if("list-landing-1".equals(module.get("type"))){
							String paramJson = JackJson.fromObjectToJson(module);
							String paramBase = PageUtils.encode(paramJson);
						%>
						<jsp:include page="cache/modules/list-landing-1.jsp">
							<jsp:param value="<%=paramBase %>" name="params"/>
						</jsp:include>
						<%
						}else if("list-landing-2".equals(module.get("type"))){
							String paramJson = JackJson.fromObjectToJson(module);
							String paramBase = PageUtils.encode(paramJson);
						%>
						<jsp:include page="cache/modules/list-landing-2.jsp">
							<jsp:param value="<%=paramBase %>" name="params"/>
						</jsp:include>
						<%
						}else if("list-landing-3".equals(module.get("type"))){
							String paramJson = JackJson.fromObjectToJson(module);
							String paramBase = PageUtils.encode(paramJson);
						%>
						<jsp:include page="cache/modules/list-landing-3.jsp">
							<jsp:param value="<%=paramBase %>" name="params"/>
						</jsp:include>
						<%
						}else if("new-1".equals(module.get("type"))){
							String paramJson = JackJson.fromObjectToJson(module);
							String paramBase = PageUtils.encode(paramJson);
						%>
						<jsp:include page="cache/modules/new-1.jsp">
							<jsp:param value="<%=paramBase %>" name="params"/>
						</jsp:include>
						<%
						}else if("list-group-1".equals(module.get("type"))){
							String paramJson = JackJson.fromObjectToJson(module);
							String paramBase = PageUtils.encode(paramJson);
						%>
						<jsp:include page="cache/modules/list-group-1.jsp">
							<jsp:param value="<%=paramBase %>" name="params"/>
						</jsp:include>
						<%
						}else if("top-fixed-1".equals(module.get("type"))){
						%>
						<jsp:include page="cache/modules/top-fixed-1.jsp">
							<jsp:param value="M1511" name="message"/>
						</jsp:include>
						<%
						}else if("list-flash".equals(module.get("type"))){
							String paramJson = JackJson.fromObjectToJson(module);
							String paramBase = PageUtils.encode(paramJson);
						%>
						<jsp:include page="cache/modules/list-flash.jsp">
							<jsp:param value="<%=paramBase %>" name="params"/>
						</jsp:include>
						<%
						}else if("flash-group".equals(module.get("type"))){
							String paramJson = JackJson.fromObjectToJson(module);
							String paramBase = PageUtils.encode(paramJson);
						%>
						<jsp:include page="cache/modules/flash-group.jsp">
							<jsp:param value="<%=paramBase %>" name="params"/>
						</jsp:include>
						<%
						}else if("lottery".equals(module.get("type"))){
								%>
						<div class="luckyCirclePage">
							<div class="activity_main_box" id="luckyCircle">
								
								<!-- 转盘 -->
								<div class="luck_rotate_circle">
									<div class="lucky_rotate_circle_title">
										<div class="leftTxt"><fmt:message key="CM1036"/></div>
										<div class="rightTxt"><fmt:message key="CM1037"/></div>
									</div>
									<div class="__luck">
										<div class="__cicle_box" >
											<div class="__cicle"></div>
											<!-- <div class="__sanjiaoA"></div> -->
												<%-- <div class="__start"><fmt:message key="CM0932"/></div> --%>
											<div class="__wait">
												<img alt="" src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021-8-2-lucky-circle-m-point.png"/>
											</div>
											<img alt="" src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021-8-2-lucky-circle-m-outline.png">
										</div>
										<div class="__sanjiaoB"></div>
									</div>
									<div class="JGG_box" id="JGG_box">
										<div class="JGG_play_box">
											<!-- <div class="JGG_line">
												<div class="JGG_item JGG_index_0 JGG_stop">1</div>
												<div class="JGG_item JGG_index_1">2</div>
												<div class="JGG_item JGG_index_2">3</div>
											</div>	
											<div class="JGG_line">
												<div class="JGG_item JGG_index_7">8</div>
												<div class="JGG_item JGG_start">GO</div>
												<div class="JGG_item JGG_index_3">4</div>
											</div>
											<div class="JGG_line">
												<div class="JGG_item JGG_index_6">7</div>
												<div class="JGG_item JGG_index_5">6</div>
												<div class="JGG_item JGG_index_4">5</div>
											</div> -->
										</div>
									</div>
									
								</div>

								<!-- rules & info -->
								<div class="rules_info_box">
									<div class="rules_line_one">
										<!-- 有多少次机会 -->
										<div class="chancesNumBox">
											<fmt:message key="CM1038"/>
											<span class="chancesNum">1</span>
											<fmt:message key="CM1039"/>
										</div>

										<div class="myPrice">
											<img class="myPriceIcon" src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021-07-27-lucky-circle-gift.png" alt="">
											<!-- <span class="myPriceIcon iconfont">&#xe6c9;</span> -->
											<span class="myPriceTxt"><fmt:message key="CM1081"/></span>
										</div>

									</div>

									<div class="winnerInfoBox" >
										<div id="winnerSwiper" class="swiper-container">
											<div class="swiper-wrapper">

											</div>
										</div>
									</div>

									<!-- rules -->
									<div class="rulesBox">
										<div class="rulesTabBox">
											<div class="tabClick" value="howDoIPlay"><fmt:message key="CM1040"/></div>
											<div value="rules"><fmt:message key="CM1041"/></div>
										</div>
										<div class="rulesContentBox how">
											<div class="rulesItem " id="how1">
												<div class="rulesIndex">1.</div>
												<div class="rulesContent"><fmt:message key="CM1042"/></div>
											</div>
											
											<%-- <div class="rulesItem">
												<div class="rulesIndex notInApp">2.</div>
												<div class="rulesIndex inApp" style="display:none">2.</div>
												<div class="rulesContent">
													<fmt:message key="CM1044"/>
												</div>
											</div> --%>
											<div class="rulesItem">
												<div class="rulesIndex">2.</div>
												<div class="rulesContent rulesContentDown">
													<div><fmt:message key="CM1044"/><span class="notInApp"><fmt:message key="CM1043"/></span></div>
													<div class="downloadBtn notInApp">
														<fmt:message key="CM1082"/>
													</div>
												</div>
											</div>
											<div class="rulesItem">
												<div class="rulesIndex">3.</div>
												<div class="rulesContent"><fmt:message key="CM1045"/></div>
											</div>

											<!-- <div class="rulesItem">
                                                <div class="rulesIndex notInApp">5.</div>
                                                <div class="rulesIndex inApp" style="display:none">4.</div>
                                                <div class="rulesContent">
                                                    <div class="positionBox">
                                                        <div class="contentTxt">
                                                            <div class="contentTitle share">
                                                                Share the link with your friends (<span>0</span>/2)
                                                            </div>
                                                            <div class="contentInfo">
                                                                ask them to click the link earn 1 more chance ,up to 2 times a day
                                                            </div>
                                                        </div>
                                                        <div class="contentImgBox">
                                                            <div data-platform="facebook">
                                                                <img src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021_07_23_lucky_circle_fb.png" alt="">
                                                            </div>
                                                            <div data-platform="ins">
                                                                <img src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021_07_23_lucky_circle_ins.png" alt="">
                                                            </div>
                                                            <div data-platform="tiktok">
                                                                <img src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021_07_23_lucky_circle_tiktok.png" alt="">
                                                            </div>
                                                            <div data-platform="youtube">
                                                                <img src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021_07_23_lucky_circle_youtube.png" alt="">
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div> -->
											<div class="rulesItem">
												<div class="rulesIndex">4.</div>
												<div class="rulesContent">
													<div class="positionBox">
														<div class="contentTxt">
															<div class="contentTitle exchange">
																<fmt:message key="CM1046"/> (<span>0</span>/2)
															</div>
															<div class="contentInfo">
																<fmt:message key="CM1047"/>
															</div>
														</div>
														<div class="contentBtnBox">
															<fmt:message key="CM1077"/>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="rulesContentBox rule" style="display:none;">
											<div class="rulesItem" id="rule1">
												<div class="rulesIndex">1.</div>
												<div class="rulesContent">
													<fmt:message key="CM1048"/>
												</div>
											</div>
											<div class="rulesItem">
												<div class="rulesIndex">2.</div>
												<div class="rulesContent">
													<fmt:message key="CM1049"/>
												</div>
											</div>

											<div class="rulesItem">
												<div class="rulesIndex">3.</div>
												<div class="rulesContent">
													<fmt:message key="CM1050"/> <b><fmt:message key="CM1051"/></b> <fmt:message key="CM1052"/> <strong"><fmt:message key="CM1053"/></strong> <fmt:message key="CM1054"/>
												</div>
											</div>
											<div class="rulesItem">
												<div class="rulesIndex">4.</div>
												<div class="rulesContent">
													<fmt:message key="CM1057"/>
												</div>
											</div>
											<div class="rulesItem">
	                                            <div class="rulesIndex">5.</div>
	                                            <div class="rulesContent">
													<fmt:message key="CM1056"/>
	                                            </div>
	                                        </div>
											<div class="rulesItem">
												<div class="rulesIndex">6.</div>
												<div class="rulesContent">
													
													<fmt:message key="CM1058"/>
												</div>
											</div>
											<!-- <div class="rulesItem">
                                                <div class="rulesIndex">6.</div>
                                                <div class="rulesContent">
                                                    This Cash Voucher are applicable to deduct  the  PRICE only, Vouchers are only allowed to use once per check out.  Kindly make sure your order met the minimum purchase before using this Cash Voucher.
                                                </div>
                                            </div> -->
											<div class="rulesItem">
												<div class="rulesIndex">7.</div>
												<div class="rulesContent">
													
													<fmt:message key="CM1055"/>
												</div>
											</div>
											<div class="rulesItem">
												<div class="rulesIndex">8.</div>
												<div class="rulesContent">
													<fmt:message key="CM1059">
                                                    <fmt:param value='<%=SpringPropertyResourceReader.getString("site.config.domain")%>'/>
                                                </fmt:message>
												</div>
											</div>
										</div>

									</div>
								</div>


							</div>

							<!-- 点击go之后的弹出蒙版 -->
							<div class="afterPlayMask" style="display: none;">
								<div class="afterPlayImgBox">
									<img class="showImg" src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021-07-27-lucky-circle-m-congratulation.png" alt="">
									<img class="noChancesImg" style="display:none;" src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021-07-27-lucky-circle-m-erro.png" alt="">
									<img class="freeCardImg" style="display:none;" src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021-07-28-lucky-circle-p-free-shipping.png" alt=""/>
									<img class="closeImg" src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021-07-27-lucky-circle-delete.png" alt="">
								</div>
								<!-- 文字 -->
								<div class="afterPlayMaskTxt noChances" style="display: none;">
									<div><fmt:message key="CM1065"/></div>
									<div><fmt:message key="CM1066"/></div>
								</div>
								<!-- 恭喜获得积分 -->
								<div class="afterPlayMaskTxt congratulation" style="display: none;">
									<div><fmt:message key="CM1067"/></div>
									<div class="reciviedPoints"><span>20 POINTS</span></div>
								</div>
								<!-- 恭喜获得满减券 -->
								<div class="afterPlayMaskTxt fullMinus" style="display: none;">
									<div><fmt:message key="CM1067"/></div>
									<div class="reciviedPoints"><span>$20</span></div>
									<div class="minSpend"><fmt:message key="CM1068"/> <span>$59</span></div>
								</div>
								<!-- // 恭喜获得免邮卡 -->
								<div class="afterPlayMaskTxt freeShippingCard" >
									<div class="freeShippingCardTxt"><fmt:message key="CM1083"/></div>
									<div><fmt:message key="CM1069"/></div>
								</div>
								<!-- 点击转盘未登录 -->
								<div class="afterPlayMaskTxt noLogin" style="display:none;">
									<div><fmt:message key="CM1070"/></div>
								</div>
								<!-- 点击其他需要登录的按钮 -->
								<div class="afterPlayMaskTxt noLoginOther" style="display:none;">
									<div><fmt:message key="CM1071"/></div>
								</div>
								<!-- 每天次数用完提示 -->
								<div class="afterPlayMaskTxt noExchangeChances" style="display:none;">
									<div><fmt:message key="CM1085"/></div>
									<div><fmt:message key="CM1086"/></div>
								</div>
								<div class="afterPlayBtnBox">
									<div class="afterPlayBtn doItAgain"><fmt:message key="CM1072"/></div>
									<div class="afterPlayBtn getMore" style="display: none;"><fmt:message key="CM1073"/></div>
									<div class="afterPlayBtn goshopping"><fmt:message key="CM1074"/></div>
									<div class="afterPlayBtn continue" style="display:none;"><fmt:message key="CM1075"/></div>
								</div>

							</div>
							<!-- 积分兑换弹框 -->
							<div class="exchangeMask" style="display:none;">
								<div class="exchangeClassBox">
									<div class="exchangeBox">
										<img class="closeImg" src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021-07-27-lucky-circle-delete.png" alt="">
										<div class="exchangeTitle">
											<fmt:message key="CM1076"/>
										</div>
										<div class="userPoints">
											<fmt:message key="CM1078"/>
											<span>20</span>
										</div>
										<div class="exchangeRules">
											<fmt:message key="CM1079"/>
										</div>
										<div class="exchangeSubmit">
											<fmt:message key="CM1077"/>
										</div>
									</div>
								</div>

							</div>
							<!-- exchange弹框 -->
							<div class="newExchange" style="display:none;">
	                        	<div class="newExchangeClass">
	                        		<div class="newExchangeBox">
	                        			<img class="closeImg" src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021-07-27-lucky-circle-delete.png" alt="">
		                                <div class="rulesItem notInApp" >
		                                     <div class="rulesIndex">1.</div>
		                                     <div class="rulesContent">
		                                         <div><fmt:message key="CM1043"/></div>
		                                         <div class="downloadBtn">
													<fmt:message key="CM1082"/>
												 </div>
		                                     </div>
		                                 </div>
		                                 <div class="rulesItem">
		                                 	 <div class="rulesIndex inApp">1.</div>
		                                     <div class="rulesIndex notInApp">2.</div>
		                                     <div class="rulesContent">
		                                         <div class="positionBox">
		                                             <div class="contentTxt">
		                                                 <div class="contentTitle exchange">
		                                                     <fmt:message key="CM1046"/> (<span>0</span>/2)
		                                                 </div>
		                                                 <div class="contentInfo">
		                                                     <fmt:message key="CM1047"/>
		                                                 </div>
		                                             </div>
		                                             <div class="contentPointBox userPoints">
		                                             	<fmt:message key="CM1078"/>
                                        				<span>20</span>
		                                             </div>
		                                             <div class="contentBtnBox">
		                                                	<fmt:message key="CM1077"/>
		                                             </div>
		                                         </div>
		                                     </div>
		                                 </div>
	                        		</div>
	                            </div>
	                        </div>
	                        
	                        <!-- 提示弹框 -->
	                        <div class="messageMask" style="display:none;">
	                        	<div class="messageBox">
	                   	        	<img class="messageCloseImg" src="https://s3.us-west-2.amazonaws.com/image.chic-fusion.com/chicme/2021_07_23/images/2021-07-27-lucky-circle-delete.png" alt="">
	                        		<div class="messageTxt">
	                        			
	                        		</div>
	                        	</div>
	                        	
	                        </div>
						</div>
								<%
						}
						%>
					</div>
					<%
							}
						}
					%>
				</div>
				<%
					}
				%>

				<%@ include file="footer.jsp"%>
			</div>
			<div class="s-d-mask s-hide"></div>
		</div>
	</div>
	<div class="myPrizesPage" style="display:none;">
		<div id="myPrizesPage" class="MP">
			<div class="pageHeader notInApp">
				<span class="myPrizesBack iconfont">&#xe693;</span>
				<div><fmt:message key="CM1081"/></div>
			</div>
			<div class="myPrizesContentBox">
				<div class="infoContentBox">
					<ul class="myPrizesUl">
	
					</ul>
				</div>
				<div class="myPrizesInfo">
					<div>
						<fmt:message key="CM1052"/>
						<strong><fmt:message key="CM1053"/></strong>
						<fmt:message key="CM1054"/>
					</div>
	
					<fmt:message key="CM1063"/> <a class="toNewPage" href="javascript:;"><fmt:message key="CM1064"/></a>.
				</div>
			</div>
			
		</div>

	</div>
	<div class="getMorePage" style="display:none;">
		<div id="getMorePage">
			<div class="pageHeader notInApp">
				<span class="back iconfont">&#xe693;</span>
				<div><fmt:message key="CM1080"/></div>
			</div>
			<div class="rulesItem how">
				<div class="rulesIndex">1.</div>
				<div class="rulesContent">
					<div class="positionBox">
						<div class="contentTxt">
							<div class="contentTitle exchange">
								<fmt:message key="CM1046"/> (<span>0</span>/2)
							</div>
							<div class="contentInfo">
								<fmt:message key="CM1047"/>
							</div>
						</div>
						<div class="contentBtnBox">
							<fmt:message key="CM1077"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<script src='${ctx}/resources/js/v3Site/commons/version.js'></script>
	<script src='${ctx}/resources/js/v3Site/commons/Wanna.js'></script>
	<script src='${ctx}/resources/js/v3Site/commons/handler.js'></script>
	<%@ include file="scripts/header.jsp" %>


	<script>
		window.appDomain = '<%=SpringPropertyResourceReader.getString("site.config.app.appstore.domain")%>'
	</script>

	<script src='${ctx}/resources/js/v3Site/page/rafflebox.js'></script>


	<script>
		// 跳转到应用商城
		function goToLink(){
			var appType = detectVersion();
			if(appType.isIOS){
				window.location.href = 'https://apps.apple.com/us/app/chic-me-best-shopping-deals/id<%=SpringPropertyResourceReader.getString("site.config.app.appstore.id") %>';
			}else{
				window.location.href = 'https://play.google.com/store/apps/details?id=<%=SpringPropertyResourceReader.getString("site.config.app.googleplay.id") %>';
			}
		}
	</script>

	<script>
		$('#landing-discounts').flexslider({
			animation: "slide",
			slideshow:false,
			directionNav:false,
			controlNav:false,
			animationLoop: false,
			itemWidth: window.innerWidth/2.2,
			itemMargin: 10
		});

		var $flex = $('.index-listing.flexslider').flexslider({
			animation: "slide",
			slideshow:false,
			directionNav:false,
			controlNav:false,
			animationLoop: false,
			itemWidth: window.innerWidth/2.2,
			itemMargin: 10
		});

		var mySwiper = new Swiper ('#landing-nav', {
			// 设置显示水平还是垂直的发那个像
			direction: 'horizontal', // 垂直切换选项
			// 设置正常一页显示几个
			slidesPerView: 'auto',
			// 间隔的距离 margin-right：10px
			// spaceBetween: 5,
			roundLengths : true,
		})

		new Swiper('.banner-4', {
			slidesPerView: 1.6,
			spaceBetween: 12
		})


		new Swiper('#newin1', {
			slidesPerView: 'auto',
			spaceBetween: 0
		})

		new Swiper('#grouptabs', {
			slidesPerView: 'auto',
			spaceBetween: 15
		})

		new Swiper('.flashswiper',{
			slidesPerView: 3.4,
			spaceBetween: 10,
		})

		new Swiper('#listFriday',{
			slidesPerView: 'auto',
			spaceBetween: 10,
		})

		new Swiper('#listFriday2',{
			slidesPerView: 'auto',
			spaceBetween: 18,
		})

		new Swiper('#groupFlashTab',{
			slidesPerView: 'auto',
		})

		$('.ninimour-black-friday').on('click', '.__tab', function(){
			var $this = $(this);
			var $parent = $this.parents('.ninimour-black-friday')
			var collectionId = $this.data('collection');
			$(this).addClass('active').siblings().removeClass('active');
			$parent.find('.__firday_products[data-collection="'+collectionId+'"]').addClass('active').siblings().removeClass('active');


			$flex.resize()


		});
	</script>

	<script>
		var groupLoadMap = {}
		function fetchGroup(collectionId, groupId, scroll){
			$('#group-btn-'+groupId).hide();
			var loader = groupLoadMap[groupId]
			if(!loader){
				loader = new ProductLoader({
					container:$('#group-products-'+groupId,),
					url:ctx + '/product/{skip}/{limit}/'+collectionId+'/c/show',
					type: 'Recommandation',
					column: 'collection@'+collectionId,
					limit: 18,
					skip: 0,
					data: {
					}
				});
				loader.load(false, function(products){
					if(products && products.length > 0){
						$('#group-btn-'+groupId).show();
					}else{
						$('#group-btn-'+groupId).hide();
					}
				})
				groupLoadMap[groupId] = loader
			}else{
				if(scroll){
					loader.load(false, function(products){
						if(products && products.length > 0){
							$('#group-btn-'+groupId).show();
						}else{
							$('#group-btn-'+groupId).hide();
						}
					})
				}
			}
		}

		$(function(){
			var $grouptabs = $('#grouptabclicks')
			if($grouptabs.length > 0){
				var groupId = $grouptabs.children('span').eq(0).data('group')
				var collectionId = $grouptabs.children('span').eq(0).data('collection')
				$('.groupbody[data-group="'+groupId+'"]').show().siblings().hide();
				fetchGroup(collectionId, groupId);
			}

			$grouptabs.on('click', 'span', function(){
				var $this = $(this)
				var groupId = $this.data('group');
				var collectionId = $this.data('collection');
				$this.addClass('active').siblings().removeClass('active');
				$('.groupbody[data-group="'+groupId+'"]').show().siblings().hide();
				fetchGroup(collectionId, groupId);
			})

		})

		window.fetchList = function(collectionId, groupId){
			fetchGroup(collectionId, groupId, true);
		}
	</script>

	<script>
		$(function (){
			$('#landing-nav a').click(function(){
				$("#landing-nav a.active").removeClass("active");
				$(this).addClass("active");

				$('html, body').stop().animate({
					scrollTop: $($(this).attr('href')).offset().top - 120
				}, 300);

				$('.module').addClass('clicked')

				setTimeout(function(){
					$('.module').removeClass('clicked')
				}, 400)

				return false;
			});

			function getPerDate(date){
				var month = date.getMonth()
				var day = date.getDate()
				var hour = date.getHours()
				var minutes = date.getMinutes()

				function getStr(str){
					return str >=10 ? str: ('0'+ str)
				}

				return getStr(month+1) + '/' + getStr(day)+ ' '+ getStr(hour)+':'+getStr(minutes)
			}


			var firstModule = $($('#landing-nav a').attr('href'))[0]


			var $longDate = $('.long-date');
			var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟

			$longDate.each(function(){
				var $this = $(this);
				var startDate = Number($this.data('start'));
				var targetStart = new Date(startDate - offset_GMT * 60 * 1000);

				var endDate = Number($this.data('end'));
				var targetEnd = new Date(endDate - offset_GMT * 60 * 1000);

				$this.html(getPerDate(targetStart) + ' - ' + getPerDate(targetEnd));
			});

			var $modules = $('.module');
			var lastModule = $modules[$modules.length-1];

			var ninimournavcontainer = $('#ninimournavcontainer')[0]
			var headercontainer = $('.headercontainer')[0]
			$(window).scroll(function(e){
				var scrollTop = $(window).scrollTop(),
						scrollHeight = $(document).height(),
						windowHeight = $(window).height();




				if(ninimournavcontainer){
					var rect = ninimournavcontainer.getBoundingClientRect();
					if(rect.top <= Number(ninimournavcontainer.getAttribute("data-top"))){
						$('#ninimour-landing-navi').addClass('fixed');
					}else{
						$('#ninimour-landing-navi').removeClass('fixed');
					}
				}

				if(headercontainer){
					var headercontainerrect = headercontainer.getBoundingClientRect();
					if(headercontainerrect.top <= 44){
						$(headercontainer).children().addClass('fixed');
					}else{
						$(headercontainer).children().removeClass('fixed');
					}
				}


				var nav_length = $('#landing-nav .swiper-slide').length;

				$('.module:not(.clicked)').each(function(){
					var moduleRect = $(this)[0].getBoundingClientRect();
					var id = $(this).attr('id')
					if(moduleRect.top >0 & moduleRect.top < 150){
						if($("#landing-nav a[href='#"+id+"']").length){
							$("#landing-nav a.active").removeClass("active");
							$("#landing-nav a[href='#"+id+"']").addClass("active");

							var nav_index = $("#landing-nav a[href='#"+id+"']").data('index');
							if(nav_index != undefined && (nav_length- nav_index) >= 3){
								var nav_index_width = $("#landing-nav a[href='#"+id+"']").parent().width();
								$('#landing-nav > .swiper-wrapper').css({'transform':'translate3d(-'+(nav_index * nav_index_width)+'px, 0px, 0px)','transition':' all 300ms ease 0s'});
							}
						}

					}
				})

			});
		});
	</script>



	<script type="text/javascript">
		var google_tag_params = {
			ecomm_pagetype: 'other'
		};
	</script>
	<script type="text/javascript">
		/* <![CDATA[ */
		var google_conversion_id = <%=SpringPropertyResourceReader.getString("site.config.google.conversion.id") %>;
		var google_custom_params = window.google_tag_params;
		var google_remarketing_only = true;
		/* ]]> */
	</script>
	<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
	</script>

	<script>
	
	</script>
	<noscript>
		<div style="display:inline;">
			<img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/<%=SpringPropertyResourceReader.getString("site.config.google.conversion.id") %>/?value=0&amp;guid=ON&amp;script=0"/>
		</div>
	</noscript>
	<%@include file="../other-rtbhouse.jsp"%>

	</body>
	</html>
</fmt:bundle>