/**
 * Created by shao_ on 2018/1/10.
 */

var YAHOO, I13N_Conf, YWA_Global_Conf;
YAHOO = YAHOO || {};
YAHOO.ywa = YAHOO.ywa || {};
if (YAHOO.ywa.I13N === undefined) {
    YAHOO.ywa.I13N = (function () {
        var ExternalConf, InternalConf, Public, modulePriorities, projectPersistence, getPersistence,
            getPersistenceValue, setPersistenceValue, prerenderQueue, getCookie, setCookie, deleteCookie,
            isDocVisibilityEqualsTo, ehDocVisibilityChange, initialize, initializeConfig, initializeSecureFlag,
            initializeEndpoints, initializePageSettings, handlePageLevelPersistence, correctBeaconDescriptor,
            cloneProperties, generateBeaconDescriptors, generateEnvironmentalBeaconTrunk, generateBeaconTrunk,
            fireOneBeacon;
        modulePriorities = ["core"];
        projectPersistence = {};
        prerenderQueue = [];
        getPersistence = function (projectId) {
            if (projectPersistence[projectId] === undefined) {
                projectPersistence[projectId] = {};
            }
            return projectPersistence[projectId];
        };
        getPersistenceValue = function (projectId, propertyName) {
            var persistence;
            persistence = getPersistence(projectId);
            return persistence[propertyName];
        };
        setPersistenceValue = function (projectId, propertyName, value) {
            var persistence;
            persistence = getPersistence(projectId);
            persistence[propertyName] = value;
        };
        getCookie = function (cookieName) {
            var start, end, dc, pos;
            dc = document.cookie || "";
            pos = dc.indexOf(cookieName + "=");
            if (pos !== -1) {
                start = pos + cookieName.length + 1;
                end = dc.indexOf(";", start);
                if (end === -1) {
                    end = dc.length;
                }
                return dc.substring(start, end);
            }
            return "";
        };
        setCookie = function (cookieConfig) {
            var expiry, cookie, d;
            if (arguments.length < 1) {
                return;
            }
            if (cookieConfig.name === undefined) {
                return;
            }
            cookieConfig.value = (cookieConfig.value !== undefined ? cookieConfig.value : "true");
            cookieConfig.domain = (cookieConfig.domain !== undefined ? cookieConfig.domain : "");
            cookieConfig.path = (cookieConfig.path !== undefined ? cookieConfig.path : "/");
            cookieConfig.expiryOffset = (cookieConfig.expiryOffset !== undefined ? cookieConfig.expiryOffset : 180);
            d = new Date();
            d.setTime(d.getTime() + (cookieConfig.expiryOffset * 1000));
            expiry = ((cookieConfig.expiryOffset >= 0) ? "; expires=" + d.toGMTString() : "; expires=Thu, 01-Jan-1970 00:00:01 GMT");
            cookie = cookieConfig.name + "=" + cookieConfig.value + expiry + "; path=" + cookieConfig.path + ((cookieConfig.domain !== "") ? ("; domain=" + cookieConfig.domain) : (""));
            document.cookie = cookie;
        };
        deleteCookie = function (cookieName, cookieDomain, cookiePath) {
            setCookie({name: cookieName, value: "", expiryOffset: -1, domain: cookieDomain, path: cookiePath});
        };
        isDocVisibilityEqualsTo = function (v) {
            if (v !== "visible" && v !== "hidden" && v !== "preview" && v !== "prerender") {
                return false;
            }
            return ((document.webkitVisibilityState !== undefined && document.webkitVisibilityState === v) || (document.visibilityState !== undefined && document.visibilityState === v));
        };
        ehDocVisibilityChange = function () {
            var idx, bul;
            if (!InternalConf.isInPrerenderPhase) {
                return;
            }
            for (idx = 0, bul = prerenderQueue.length; idx < bul; idx += 1) {
                fireOneBeacon(prerenderQueue[idx]);
            }
            InternalConf.isInPrerenderPhase = false;
        };
        initializeConfig = function () {
            if (I13N_Conf === undefined || I13N_Conf === null) {
                if (YWA_Global_Conf === undefined || YWA_Global_Conf === null) {
                    ExternalConf = {};
                } else {
                    ExternalConf = YWA_Global_Conf.i13n || {};
                }
            } else {
                ExternalConf = I13N_Conf;
            }
            InternalConf = {};
        };
        initializeSecureFlag = function () {
            try {
                InternalConf.secure = (document.location.href.indexOf("https:") >= 0);
            } catch (e) {
                InternalConf.secure = false;
            }
        };
        initializeEndpoints = function () {
            var rgxpYahooCom, extConfEP, intConfEP, endpointKey, secureEndPoint, nonSecureEndPoint, endPointCfg;
            rgxpYahooCom = /yahoo\.com\/[a-zA-Z-0-9]*\.pl$/gi;
            InternalConf.endPoints = {
                SP: {
                    nonSecure: "sp.analytics.yahoo.com/sp.pl",
                    secure: "sp.analytics.yahoo.com/sp.pl"
                }
            };
            extConfEP = ExternalConf.endPoints;
            intConfEP = InternalConf.endPoints;
            if (extConfEP) {
                for (endpointKey in extConfEP) {
                    if (extConfEP.hasOwnProperty(endpointKey) && !(intConfEP.hasOwnProperty(endpointKey))) {
                        endPointCfg = extConfEP[endpointKey];
                        if (typeof endPointCfg === "string" && endPointCfg !== "") {
                            secureEndPoint = endPointCfg;
                        }
                        if (typeof endPointCfg === "object") {
                            if (typeof endPointCfg.secure === "string" && endPointCfg.secure !== "") {
                                secureEndPoint = endPointCfg.secure;
                            }
                            if (typeof endPointCfg.nonSecure === "string" && endPointCfg.nonSecure !== "") {
                                nonSecureEndPoint = endPointCfg.nonSecure;
                            }
                        }
                        if (typeof secureEndPoint === "string" && secureEndPoint.match(rgxpYahooCom) !== null) {
                            intConfEP[endpointKey] = {
                                secure: secureEndPoint,
                                nonSecure: nonSecureEndPoint || secureEndPoint
                            };
                        }
                        secureEndPoint = undefined;
                    }
                }
            }
        };
        initializePageSettings = function () {
            InternalConf.pageEncoding = document.charset || document.characterSet || "";
            if (ExternalConf.pageEncoding !== undefined && ExternalConf.pageEncoding !== "") {
                InternalConf.pageEncoding = ExternalConf.pageEncoding;
            }
            InternalConf.isInPrerenderPhase = isDocVisibilityEqualsTo("prerender");
            if (document.attachEvent) {
                document.attachEvent("webkitvisibilitychange", ehDocVisibilityChange);
                document.attachEvent("visibilitychange", ehDocVisibilityChange);
            }
            if (document.addEventListener) {
                document.addEventListener("webkitvisibilitychange", ehDocVisibilityChange, false);
                document.addEventListener("visibilitychange", ehDocVisibilityChange, false);
            }
        };
        initialize = function () {
            initializeConfig();
            initializeSecureFlag();
            initializeEndpoints();
            initializePageSettings();
        };
        handlePageLevelPersistence = function (beaconDescriptor) {
            var persistenceKeys, idx, pkl;
            if (beaconDescriptor.projectId === undefined) {
                return;
            }
            persistenceKeys = ["documentName", "url", "referrer"];
            for (idx = 0, pkl = persistenceKeys.length; idx < pkl; idx += 1) {
                try {
                    setPersistenceValue(beaconDescriptor.projectId, persistenceKeys[idx], beaconDescriptor.properties[persistenceKeys[idx]]);
                } catch (ignore) {
                }
            }
        };
        correctBeaconDescriptor = function (beaconDescriptor) {
            var props, persistence;
            if (beaconDescriptor.projectId === undefined) {
                return;
            }
            persistence = getPersistence(beaconDescriptor.projectId);
            props = beaconDescriptor.properties;
            if (props.documentName === undefined) {
                props.documentName = persistence.documentName || document.title;
            }
            if (props.url === undefined) {
                if (!document.URL) {
                    if (!document.location.href) {
                        if (window.location.href) {
                            props.url = window.location.href;
                        } else {
                            props.url = "";
                        }
                    } else {
                        props.url = document.location.href;
                    }
                } else {
                    props.url = document.URL;
                }
                props.url = persistence.url || props.url;
            }
            if (props.referrer === undefined) {
                props.referrer = persistence.referrer || document.referrer || "";
            }
        };
        cloneProperties = function (properties) {
            var clone, propertyName;
            clone = {};
            for (propertyName in properties) {
                if (properties.hasOwnProperty(propertyName)) {
                    clone[propertyName] = properties[propertyName];
                }
            }
            return clone;
        };
        generateBeaconDescriptors = function (beaconDescriptors) {
            var descriptors, convertStringPidToPidList, convertPidListToProjectList, convertProjectListToBeaconList,
                purgeInvalidDescriptors;
            convertStringPidToPidList = function () {
                var bdProjects;
                bdProjects = beaconDescriptors.projects;
                if (typeof bdProjects !== "string") {
                    return;
                }
                try {
                    bdProjects = bdProjects.join("|");
                } catch (ignore) {
                }
                if (typeof bdProjects === "string") {
                    beaconDescriptors.projects = bdProjects.replace(",", "|").split("|");
                }
            };
            convertPidListToProjectList = function () {
                var idx, pl, pid, bdProjects;
                bdProjects = beaconDescriptors.projects;
                for (idx = 0, pl = bdProjects.length; idx < pl; idx += 1) {
                    if (typeof bdProjects[idx] === "string") {
                        pid = bdProjects[idx];
                        bdProjects[idx] = {projectId: pid, coloId: "SP"};
                    }
                }
            };
            convertProjectListToBeaconList = function () {
                var idx, pl, descriptor;
                for (idx = 0, pl = beaconDescriptors.projects.length; idx < pl; idx += 1) {
                    descriptor = beaconDescriptors.projects[idx];
                    descriptor.coloId = descriptor.coloId || "SP";
                    if (descriptor.properties === undefined) {
                        descriptor.properties = cloneProperties(beaconDescriptors.properties);
                    }
                    descriptors.push(descriptor);
                }
            };
            purgeInvalidDescriptors = function () {
                var idx, descriptor;
                for (idx = beaconDescriptors.length - 1; idx >= 0; idx -= 1) {
                    descriptor = beaconDescriptors[idx];
                    if (descriptor.projectId === undefined) {
                        beaconDescriptors.splice(idx, 1);
                    }
                }
            };
            if (beaconDescriptors.projects && beaconDescriptors.properties) {
                descriptors = [];
                convertStringPidToPidList();
                convertPidListToProjectList();
                convertProjectListToBeaconList();
                beaconDescriptors = descriptors;
                delete beaconDescriptors.projects;
                delete beaconDescriptors.properties;
            }
            purgeInvalidDescriptors();
            return beaconDescriptors;
        };
        generateEnvironmentalBeaconTrunk = function () {
            var trunks, date;
            trunks = [];
            date = new Date();
            date.ywaStandardTimezoneOffset = (function () {
                var january, july;
                january = new Date(new Date().getFullYear(), 0, 1);
                july = new Date(new Date().getFullYear(), 6, 1);
                return Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
            }());
            trunks.push("&d=" + encodeURIComponent(date.toGMTString()));
            trunks.push("&n=" + encodeURIComponent(parseInt(date.getTimezoneOffset() / 60, 10) + (date.getTimezoneOffset() < date.ywaStandardTimezoneOffset ? "d" : "")));
            return trunks.join("");
        };
        generateBeaconTrunk = function (beaconDescriptor) {
            var trunks, endPoints, endpoint;
            trunks = [];
            endPoints = InternalConf.endPoints;
            endpoint = endPoints[beaconDescriptor.coloId] || endPoints.SP;
            trunks.push((InternalConf.secure ? "https://" + endpoint.secure : "http://" + endpoint.nonSecure));
            trunks.push("?a=" + encodeURIComponent(beaconDescriptor.projectId));
            trunks.push("&jsonp=" + encodeURIComponent("YAHOO.ywa.I13N.handleJSONResponse"));
            if (!getPersistenceValue(beaconDescriptor.projectId, "isPageViewTracked")) {
                trunks.push(generateEnvironmentalBeaconTrunk());
            }
            return trunks.join("");
        };
        fireOneBeacon = function (beaconDescriptor) {
            var scriptElement, scriptUrl;
            if (isDocVisibilityEqualsTo("prerender")) {
                prerenderQueue.push(beaconDescriptor);
                return;
            }
            scriptUrl = Public.getBeaconUrl(beaconDescriptor);
            if (scriptUrl === undefined) {
                return;
            }
            scriptElement = document.createElement("script");
            scriptElement.type = "application/javascript";
            scriptElement.id = "ywa-" + (new Date().getTime()) + "-" + Math.floor(Math.random() * 1000000);
            scriptElement.className = "ywa-" + beaconDescriptor.projectId;
            scriptElement.defer = true;
            scriptElement.src = scriptUrl;
            setPersistenceValue(beaconDescriptor.projectId, "isPageViewTracked", true);
            document.body.appendChild(scriptElement);
        };
        Public = {
            modules: {}, version: "1.0", fireBeacon: function (beaconConfigs) {
                var beaconDescriptors, idx, bdl;
                beaconDescriptors = generateBeaconDescriptors(beaconConfigs);
                for (idx = 0, bdl = beaconDescriptors.length; idx < bdl; idx += 1) {
                    correctBeaconDescriptor(beaconDescriptors[idx]);
                    handlePageLevelPersistence(beaconDescriptors[idx]);
                    fireOneBeacon(beaconDescriptors[idx]);
                }
            }, handleJSONResponse: function (response) {
                var idx1, idx2, pl1, pl2, project, piggyback, img, scr;
                if (typeof response === "string") {
                    try {
                        response = JSON.parse(response);
                    } catch (e) {
                        response = undefined;
                    }
                }
                if (response === undefined || response === null || typeof response !== "object" || response.length === undefined) {
                    return;
                }
                for (idx1 = 0, pl1 = response.length; idx1 < pl1; idx1 += 1) {
                    project = response[idx1];
                    if (project.projectId !== undefined && project.piggybacks !== undefined) {
                        for (idx2 = 0, pl2 = project.piggybacks.length; idx2 < pl2; idx2 += 1) {
                            piggyback = project.piggybacks[idx2];
                            if (piggyback.type === "js") {
                                scr = document.createElement("script");
                                scr.type = "application/javascript";
                                scr.defer = true;
                                scr.src = piggyback.url;
                                document.body.appendChild(scr);
                            }
                            if (piggyback.type === "img" || piggyback.type === "rmx") {
                                img = new Image();
                                img.src = piggyback.url;
                                document.body.appendChild(img);
                            }
                            if (piggyback.type === "js_script") {
                                scr = document.createElement("script");
                                scr.type = "application/javascript";
                                scr.defer = true;
                                var node = document.createTextNode(piggyback.url);
                                scr.appendChild(node);
                                document.body.appendChild(scr);
                            }
                        }
                    }
                }
            }, getBeaconUrl: function (beaconDescriptor) {
                var moduleParams, idx, mpl, paramsLength, mods, modName, queryString, moduleParam;
                if (beaconDescriptor.projectId === undefined || beaconDescriptor.projectId === null || beaconDescriptor.projectId === "") {
                    return undefined;
                }
                moduleParams = [];
                mods = YAHOO.ywa.I13N.modules;
                beaconDescriptor.properties.pageEncoding = beaconDescriptor.properties.pageEncoding || InternalConf.pageEncoding;
                for (idx = 0, mpl = modulePriorities.length; idx < mpl; idx += 1) {
                    modName = modulePriorities[idx];
                    if (mods.hasOwnProperty(modName)) {
                        try {
                            moduleParams = moduleParams.concat(mods[modName].getQueryParams(beaconDescriptor.properties));
                        } catch (e) {
                            if (e.faultCode) {
                                return undefined;
                            }
                        }
                    }
                }
                queryString = [];
                for (idx = 0, paramsLength = moduleParams.length; idx < paramsLength; idx += 1) {
                    moduleParam = moduleParams[idx];
                    if (moduleParam.name && moduleParam.value) {
                        queryString.push(moduleParam.name + "=" + encodeURIComponent(moduleParam.value));
                    }
                }
                queryString = queryString.join("&");
                return generateBeaconTrunk(beaconDescriptor) + "&" + queryString;
            }
        };
        initialize();
        return Public;
    }());
    YAHOO.ywa.I13N.modules.core = (function () {
        var Public;
        Public = {
            getQueryParams: function (beaconParameters) {
                var paramMap, priorityMap, idx, pl, propertyName, params;
                if (!beaconParameters.pixelId) {
                    throw {message: "Mandatory property is missing: pixelId", faultCode: -1};
                }
                paramMap = {
                    documentName: "b",
                    documentGroup: "c",
                    url: "f",
                    referrer: "e",
                    pageEncoding: "enc",
                    pixelId: ".yp"
                };
                priorityMap = ["documentName", "pixelId", "documentGroup", "url", "referrer", "pageEncoding"];
                params = [];
                for (idx = 0, pl = priorityMap.length; idx < pl; idx += 1) {
                    propertyName = priorityMap[idx];
                    if (beaconParameters.hasOwnProperty(propertyName) && paramMap.hasOwnProperty(propertyName) && beaconParameters[propertyName] !== "") {
                        params.push({name: paramMap[propertyName], value: beaconParameters[propertyName]});
                    }
                }
                var isIfarme = false;
                try {
                    isIfarme = (window.self !== window.top);
                } catch (e) {
                    isIfarme = true;
                }
                if (isIfarme) {
                    params.push({name: "isIframe", value: 1});
                }
                var qstrings = beaconParameters.qstrings;
                for (var prop in qstrings) {
                    if (qstrings.hasOwnProperty(prop)) {
                        params.push({name: prop, value: qstrings[prop]});
                    }
                }
                return params;
            },
        };
        return Public;
    }());
}