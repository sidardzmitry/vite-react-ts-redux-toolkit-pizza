import{f as x,u,e as g,r as j,j as s,H as v,B as k,N as w,g as d,h as N}from"./index-CDZWrgAU.js";import{L as t,I as l}from"./Label-BzSwzRyy.js";const y="_register__wrapper_17yn6_1",$="_form_17yn6_9",b="_form__fields_17yn6_14",E="_link_17yn6_23",S="_link__text_17yn6_29",L="_link__btn_17yn6_35",R="_error_17yn6_43",e={register__wrapper:y,form:$,form__fields:b,link:E,link__text:S,link__btn:L,error:R},Y=()=>{const o=x(),a=u(),{jwt:_,registerErrorMessage:c}=g(r=>r.user);j.useEffect(()=>{_&&o("/")},[_,o]);const m=async r=>{r.preventDefault(),a(d.clearLoginError()),a(d.clearRegisterError());const n=r.target,{email:i,password:h,name:f}=n;await p(i.value,h.value,f.value)},p=async(r,n,i)=>{a(N({email:r,password:n,name:i}))};return s.jsxs("div",{className:`${e.register__wrapper}`,children:[s.jsx(v,{children:"Sing in"}),c&&s.jsx("h3",{className:`${e.error}`,children:c}),s.jsxs("form",{className:`${e.form}`,onSubmit:m,children:[s.jsxs("div",{className:`${e.form__fields}`,children:[s.jsx(t,{htmlFor:"email",children:"Your email"}),s.jsx(l,{id:"email",name:"email",placeholder:"Email"})]}),s.jsxs("div",{className:`${e.form__fields}`,children:[s.jsx(t,{htmlFor:"password",children:"Your password"}),s.jsx(l,{id:"password",name:"password",placeholder:"Password"})]}),s.jsxs("div",{className:`${e.form__fields}`,children:[s.jsx(t,{htmlFor:"password",children:"Your name"}),s.jsx(l,{id:"name",name:"name",placeholder:"Name"})]}),s.jsx(k,{appearance:"big",children:"Sing in"})]}),s.jsxs("div",{className:`${e.link}`,children:[s.jsx("div",{className:`${e.link__text}`,children:"Do you have account?"}),s.jsx(w,{to:"/auth/login",className:`${e.link__btn}`,children:"Enter"})]})]})};export{Y as Register,Y as default};
