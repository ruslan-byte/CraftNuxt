import{r as c,c as r,a as t,v as g,x as a,y as l,j as s,k as f,o as u,z as p}from"./entry.0fe3983a.js";import{_ as h}from"./logo.5369b065.js";const y={class:"main"},v={class:"section-login"},x={class:"section-login__container container"},b=t("img",{class:"section-login__logo",src:h,alt:""},null,-1),k=t("div",{class:"section-login__text-box"},[t("h1",{class:"section-login__title"},"Вкус путешествия с «Крафт»"),t("p",{class:"section-login__text"},"Покупайте продукцию «Крафт» и получайте призы")],-1),D=["onSubmit"],V=t("p",{class:"section-login__form-text"},"Укажите дату своего рождения для входа на сайт",-1),w={class:"section-login__form-grid"},M={key:0,class:"section-login__age-alert"},T=t("svg",{class:"section-login__age-alert-icon"},[t("use",{"xlink:href":"#info-thin"})],-1),U=t("p",{class:"section-login__age-alert-text"},"Извините, просматривать данный сайт могут только совершеннолетние посетители",-1),A=[T,U],B=t("button",{class:"button button--orange section-login__form-button",type:"submit"},"Войти",-1),j={__name:"login",setup(I){let e=c({day:"01",mounth:"01",year:"2000"}),i=c(!1);function d(){i.value||(m(new Date(e.value.year,e.value.mounth,e.value.day))?(localStorage.setItem("isOldUser",!0),p("/")):i.value=!0)}function m(_){return Math.ceil(Math.abs(new Date().getTime()-_.getTime())/(1e3*3600*24))/365>18}return(_,o)=>(u(),r("main",y,[t("section",v,[t("div",x,[b,k,t("form",{class:"section-login__form",onSubmit:g(d,["prevent"])},[V,t("div",w,[a(t("input",{class:"section-login__form-input",type:"text","onUpdate:modelValue":o[0]||(o[0]=n=>s(e).day=n)},null,512),[[l,s(e).day]]),a(t("input",{class:"section-login__form-input",type:"text","onUpdate:modelValue":o[1]||(o[1]=n=>s(e).mounth=n)},null,512),[[l,s(e).mounth]]),a(t("input",{class:"section-login__form-input",type:"text","onUpdate:modelValue":o[2]||(o[2]=n=>s(e).year=n)},null,512),[[l,s(e).year]])]),s(i)?(u(),r("div",M,A)):f("",!0),B],40,D)])])]))}};export{j as default};
