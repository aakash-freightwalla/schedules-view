(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,function(e,t,a){e.exports=a.p+"static/media/chevron-left.a55ce707.svg"},function(e,t,a){e.exports=a.p+"static/media/chevron-right.ddd882ba.svg"},function(e,t,a){e.exports=a(32)},,,,,,function(e,t,a){},,,function(e,t,a){},,function(e,t,a){},,function(e,t,a){},,function(e,t,a){},,function(e,t,a){},,function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(10),s=a.n(i),o=(a(19),a(3)),l=a(4),c=a(6),u=a(5),m=a(7),d=a(1),f=a.n(d),v={sourcePort:{portName:"Nhava Sheva Port",portCountry:"India"},destinationPort:{portName:"Felixstowe Port",portCountry:"United Kingdom"},type:"FCL",container:1,incoTerms:"EXPORT-CNG"};function p(e,t){return Math.floor(e+Math.random()*(t-e))}function h(e){var t=f()();return Array.from({length:e},function(){var e=f()(t.format("DD-MM-YYYY"),"DD-MM-YYYY").add(3,"days"),a=e.add(p(10,20),"days");return function(e,t){var a=e.toISOString(),n=p(1,5),r=e.clone().add(t,"days").toISOString();return{travelDate:a,travelDays:t,rate:{rateCurrency:"USD",rate:575,rateType:"20'"},deliveryDate:r,transhipment:"Direct",routeDetails:{routing:"Direct Shipment",vesselDepartureDate:a,srcPort:"Nhava Sheva Port, India",containers:[{type:"size_20",weight:23}],carrier:"ECON SHIPPING",dstPort:"Felixstowe Port, United Kingdom",portOpenDate:e.clone().subtract(n+3,"days").toISOString(),ensCutoffDateTime:e.clone().subtract(n+2,"days").toISOString(),docCutoffDateTime:e.clone().subtract(n+1,"days").toISOString(),portCutoffDateTime:e.clone().subtract(n,"days").toISOString(),vesselArrivalDate:r},costDetails:{totalCost:53225,totalCostCurrency:"INR",details:[{title:"Origin Terminal Charges",cost:[{rateCurrency:"INR",baseCost:9e3,baseCurrency:"INR",costType:"20'",description:"Factory THC",rate:9e3},{rateCurrency:"INR",baseCost:250,baseCurrency:"INR",costType:"20'",description:"Seal Charges",rate:250},{rateCurrency:"INR",baseCost:2500,baseCurrency:"INR",costType:"BL",description:"BL Fee",rate:2500}]},{title:"Shipping Line (ECON SHIPPING)",cost:[{rateCurrency:"USD",baseCost:40825,baseCurrency:"INR",costType:"20'",description:"Freight",rate:575}]},{title:"Coordination",cost:[{rateCurrency:"INR",baseCost:650,baseCurrency:"INR",costType:"20'",description:"Coordination Fees",rate:650}]}],notes:[{type:"free_days",message:"Detention free days subject to approval from shipping line."},{type:"terminal",message:"Terminal charges are estimated."},{type:"rate_expiry",message:"Rate'valid until 2018-12-31."},{type:"currency",message:"Currency exchange used is 1 USD = 71 INR. Final rate subject to fluctuations in currency exchange."}]}}}(function(e,t){var a=t.diff(e,"days"),n=Math.floor(Math.random()*a);return e.add(n,"days")}(e,a),p(10,25))}).sort(function(e,t){var a=e.travelDate,n=t.travelDate,r=f()(a),i=f()(n);return r.isAfter(i)?1:r.isBefore(i)?-1:0})}var y=a(8),g=a(2);a(22);var b=function(e){var t=e.sourcePort,a=e.destinationPort,n=e.type,i=e.container,s=e.incoTerms,o=[{title:t.portName,subtitle:t.portCountry,className:"source"},{title:"\u2192",subtitle:null,className:"to"},{title:a.portName,subtitle:a.portCountry,className:"destination"},{title:n,subtitle:"Type",className:"type"},{title:i,subtitle:"Container",className:"container"},{title:s,subtitle:"INCO Terms",className:"inco"}];return r.a.createElement("div",{className:"summary"},o.map(function(e,t){var a=e.title,n=e.subtitle,i=e.className;return r.a.createElement("div",{className:["partial",i].join(" "),key:t},r.a.createElement("div",{className:"title"},a),n&&r.a.createElement("div",{className:"subtitle"},n))}),r.a.createElement("div",{className:"partial action"},r.a.createElement("button",{className:"themed secondary modify"},"Modify"),r.a.createElement("button",{className:"themed primary search"},"Search")))},C=[{label:"List View",value:"COST"},{label:"Schedules View",value:"SCHEDULE"}],N=(a(24),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).onResize=a.onResize.bind(Object(g.a)(Object(g.a)(a))),a.state={selected:0},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.onResize)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.onResize)}},{key:"render",value:function(){var e=this,t=this.state.selected;return r.a.createElement("div",{className:"mode-toggle"},C.map(function(a,n){var i=a.label,s=a.value,o=["mode-option"];return t===n&&o.push("selected"),r.a.createElement("button",{key:n,value:s,className:o.join(" "),onClick:e.onOptionSelected(n)},i)}))}},{key:"onOptionSelected",value:function(e){var t=this;return function(a){var n=a.target.value;t.state.selected!==e&&(t.setState({selected:e}),(0,t.props.onSelectionChange)(n))}}},{key:"onResize",value:function(){if(1===this.state.selected){var e=window.innerWidth,t=this.props.onSelectionChange;if(e<768&&t){this.setState({selected:0}),t(C[0].value)}}}}]),t}(n.Component)),E=(a(26),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).onToggleDetails=a.onToggleDetails.bind(Object(g.a)(Object(g.a)(a))),a.state={showDetails:!1},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state.showDetails,t=this.props.viewType,a=["sailing-option"],n=["mobile","detail-toggle"];return e?(a.push("details-visible"),n.push("hide")):n.push("show"),r.a.createElement("div",{className:a.join(" ")},this.renderOfferPrice(),"COST"===t?this.renderCostView():this.renderScheduleView(),e&&this.renderDetails(),r.a.createElement("div",{className:n.join(" "),onClick:this.onToggleDetails(!e)},e?"Hide Details":"Show Details"))}},{key:"renderOfferPrice",value:function(){var e=this.props.costDetails,t=e.totalCost,a=e.totalCostCurrency;return r.a.createElement("div",{className:"sailing-price"},r.a.createElement("div",{className:"price"},a.toLocaleString()," ",t),r.a.createElement("button",{className:"themed primary"},"Select"),r.a.createElement("div",{className:"detail-toggle show",onClick:this.onToggleDetails(!0)},"Show Details"))}},{key:"renderCostView",value:function(){var e=this.props,t=e.travelDate,a=e.travelDays,n=e.rate,i=e.transhipment,s=e.deliveryDate,o=e.routeDetails,l=o.srcPort,c=o.dstPort,u=o.carrier,m=[{title:f()(t).format("MMM Do"),subtitle:l,column:"Date of Sailing",className:"departure"},{title:"".concat(a," Days"),subtitle:i,column:"Sailing Days",className:"routing"},{title:"".concat(n.rateCurrency," ").concat(n.rate),subtitle:u,column:"Freight Per ".concat(n.rateType),className:"rate"},{title:f()(s).format("MMM Do"),subtitle:c,column:"Delivery Date",className:"delivery"}];return r.a.createElement("div",{className:"cost-view"},m.map(function(e,t){var a=e.title,n=e.subtitle,i=e.column,s=e.className;return[r.a.createElement("div",{key:"label-".concat(t),className:["label",s].join(" ")},i),r.a.createElement("div",{key:"value-".concat(t),className:["column",s].join(" ")},r.a.createElement("div",{className:"title"},a),r.a.createElement("div",{className:"subtitle"},n))]}))}},{key:"renderCalenderBackground",value:function(){var e=this.props.calender;return r.a.createElement("div",{className:"background"},e.map(function(e,t){var a=["day"];return 0===e.day&&a.push("sunday"),r.a.createElement("div",{key:t,className:a.join(" ")},"\xa0")}))}},{key:"renderTimelineInfo",value:function(e){return r.a.createElement("div",{className:"info"},e.reduce(function(e,t,a){var n=t.start,i=t.end;return n.mark&&e.push(r.a.createElement("div",{key:"start-".concat(a),className:"content start",style:{left:"".concat(100*n.offset,"%")}},n.date.format(n.format),r.a.createElement("br",null),n.text)),i.mark&&e.push(r.a.createElement("div",{key:a,className:"content end",style:{right:"".concat(100*i.offset,"%")}},i.date.format(i.format),r.a.createElement("br",null),i.text)),e},[]))}},{key:"renderTimeline",value:function(e){return r.a.createElement("div",{className:"timeline"},e.map(function(e,t){var a=e.start,n=e.end,i=e.className,s=e.content,o=["blocks",i];return r.a.createElement("div",{key:t,className:o.join(" "),style:{left:"".concat(100*a.offset,"%"),right:"".concat(100*n.offset,"%")}},s)}))}},{key:"renderScheduleView",value:function(){var e=this.getComputedMarks();return r.a.createElement("div",{className:"schedule-view"},this.renderCalenderBackground(),r.a.createElement("div",{className:"timeline-container"},this.renderTimelineInfo(e),this.renderTimeline(e)))}},{key:"renderDetails",value:function(){return r.a.createElement("div",{className:"details"},r.a.createElement("div",{className:"content"},r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, consectetur corporis dolor dolore ea incidunt, ipsam iste molestiae neque nisi, quae rem ut veniam! Harum id quae temporibus. Optio, ratione."),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, consectetur corporis dolor dolore ea incidunt, ipsam iste molestiae neque nisi, quae rem ut veniam! Harum id quae temporibus. Optio, ratione."),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, consectetur corporis dolor dolore ea incidunt, ipsam iste molestiae neque nisi, quae rem ut veniam! Harum id quae temporibus. Optio, ratione.")),r.a.createElement("div",{className:"detail-toggle hide",onClick:this.onToggleDetails(!1)},"Hide Details"))}},{key:"getComputedMarks",value:function(){var e=this.props,t=e.calender,a=e.travelDays,n=e.routeDetails,r=t.length,i=(t.length,t[0].reference),s=t[t.length-1].reference,o=f()(n.portCutoffDateTime),l=f()(n.vesselDepartureDate),c=f()(n.vesselArrivalDate),u=[{start:{date:o,offset:-1,mark:!0,text:"Port Cutoff",format:"Do MMM"},end:{date:c,offset:-1,mark:!1},className:"complete-block",content:""},{start:{date:l,offset:-1,mark:!0,text:"Shipment Starts",format:"Do MMM"},end:{date:c,offset:-1,mark:!0,text:"Shipment Arrives",format:"Do MMM"},className:"sailing-block",content:"".concat(a," Days")}];return u.forEach(function(e){var a=e.start,n=e.end;a.date.isBefore(i,"day")?(a.mark=!1,a.offset=0):a.offset=a.date.diff(i,"days"),a.offset=a.offset/r,n.date.isAfter(s,"day")?(n.mark=!1,n.offset=t.length-1):n.offset=n.date.diff(i,"days"),n.offset=1-(n.offset+1)/r}),u}},{key:"onToggleDetails",value:function(e){var t=this;return function(){return t.setState({showDetails:e})}}}]),t}(n.Component));E.defaultProps={viewType:"COST"};var D=E;function k(e,t){return Array.from({length:7*t},function(t,a){var n=e.clone().add(a,"days");return{day:n.day(),date:n.date(),reference:n}})}var O=a(11),S=a.n(O),w=a(12),j=a.n(w),T=(a(28),function(e){function t(e){var a;Object(o.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).onModeChange=a.onModeChange.bind(Object(g.a)(Object(g.a)(a))),a.onCalenderChange=a.onCalenderChange.bind(Object(g.a)(Object(g.a)(a))),a.changeCalender=a.changeCalender.bind(Object(g.a)(Object(g.a)(a)));var n=e.sailings,r=e.margin,i=f.a.min(n.map(function(e){var t=e.routeDetails;return f()(t.portCutoffDateTime)})),s=f.a.max(n.map(function(e){var t=e.routeDetails;return f()(t.vesselArrivalDate)}));return i.subtract(r,"days"),s.add(r,"days"),s.subtract(3,"weeks"),a.state={viewType:"COST",earliest:i,latest:s,calender:k(i,4)},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.summary;return r.a.createElement("div",{className:"search-page"},r.a.createElement("h2",{className:"title"},"Search Result"),r.a.createElement(b,e),r.a.createElement("div",{className:"action-container"},r.a.createElement("div",{className:"filter"},"Filter View"),r.a.createElement("div",{className:"pricing-history"},"Pricing History"),r.a.createElement(N,{onSelectionChange:this.onModeChange})),this.renderContent())}},{key:"renderContent",value:function(){var e=this,t=this.props.sailings,a=this.state,n=a.calender,i=a.viewType;return r.a.createElement("div",{className:"sailings"},this.renderHeader(n),t.map(function(t,a){return r.a.createElement(D,Object.assign({key:a,viewType:i,calender:n,changeCalender:e.changeCalender},t))}))}},{key:"renderHeader",value:function(e){var t=null,a="";return"COST"===this.state.viewType?(t=this.renderTableHeader(),a="cost-view-header"):(t=this.renderCalender(e),a="schedule-view-header"),r.a.createElement("div",{className:"sailing-header"},r.a.createElement("div",{className:"blank"},"\xa0"),r.a.createElement("div",{className:["headers",a].join(" ")},t))}},{key:"renderTableHeader",value:function(){var e=Object(y.a)(this.props.sailings,1)[0].rate;return[{title:"Date of Sailing",className:"departure"},{title:"Sailing Days",className:"routing"},{title:"Freight Per ".concat(e.rateType),className:"rate"},{title:"Delivery Date",className:"delivery"}].map(function(e,t){var a=e.title,n=e.className;return r.a.createElement("div",{key:t,className:["column",n].join(" ")},a)})}},{key:"renderCalender",value:function(e){var t=this;return e.map(function(e,a){var n=e.date,i=e.day,s=e.reference,o=["day"],l=null;return 0===a?(o.push("icon","left"),l=[r.a.createElement("img",{key:"left",alt:"left",className:"icon",src:S.a,onClick:t.onCalenderChange({offset:-1,unit:"weeks"})}),r.a.createElement("span",{key:"month",className:"month left"},s.format("MMMM, YY"))]):27===a?(o.push("icon","right"),l=[r.a.createElement("img",{key:"right",alt:"right",className:"icon",src:j.a,onClick:t.onCalenderChange({offset:1,unit:"weeks"})}),r.a.createElement("span",{key:"month",className:"month right"},s.format("MMMM, YY"))]):(0===i&&o.push("sunday"),l=n),r.a.createElement("div",{key:a,className:o.join(" ")},l)})}},{key:"onModeChange",value:function(e){this.setState({viewType:e})}},{key:"changeCalender",value:function(e){var t=e.offset,a=e.unit,n=this.state,r=n.earliest,i=n.latest,s=Object(y.a)(n.calender,1)[0],o=s.reference.clone();o.add(t,a),(o=f.a.max(f.a.min(o,i),r)).isSame(s.reference,"day")||this.setState({calender:k(o,4)})}},{key:"onCalenderChange",value:function(e){var t=this;return function(){return t.changeCalender(e)}}}]),t}(n.Component));T.defaultProps={margin:1};var M=T,I=(a(30),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"sidebar"},r.a.createElement("span",null,"L"),r.a.createElement("span",null,"A"),r.a.createElement("span",null,"B"),r.a.createElement("span",null,"C"),r.a.createElement("span",null,"D")),r.a.createElement(M,{summary:v,sailings:h(5)}))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[13,2,1]]]);
//# sourceMappingURL=main.168f7610.chunk.js.map