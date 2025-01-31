<template>
  <RouterView />
</template>

<style lang="scss">
* {box-sizing: border-box;}
html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}
html{height:100%}
body{line-height:1}
ol,ul{list-style:none}
blockquote,q{quotes:none}
blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}
table{border-collapse:collapse;border-spacing:0}


@font-face {
  font-family: "SuisseIntlMedium";
  src: url('@/assets/fonts/SuisseIntl-Medium-J78oFWRb.otf') format('opentype');
}

@font-face {
  font-family: "SuisseIntlRegular";
  src: url('@/assets/fonts/SuisseIntl-Regular-BzoWxrQg.otf') format('opentype');
}

#app {
  font-family: "SuisseIntlRegular", sans-serif;
  font-weight: 400;
  color: #fff;
  font-size: clamp(0.75rem, 0.625rem + 0.63vw, 1.188rem);
  line-height: 1;
}

body {
  &._menu-is-opened {
    overflow-y: hidden;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  overflow: hidden;

  position: relative;
}

.content {
  flex: 1 0 auto;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;

  @media(max-width: 768px) {
    padding: 0 15px;
  }
}

.btn {
  display: inline-block;
  width: 287px;
  padding: 19px 40px;
  text-decoration: none;
  border: none;
  text-align: center;
  font-size: 22px;
  background-color: $primary-color;
  cursor: pointer;
  color: #fff;

  @media(max-width: 768px) {
    font-size: 14px;
    width: 170px;
    padding: 13px 20px;
  }
}

.gradient-text {
  background: linear-gradient(90deg, #FF02A9 -5.48%, #91017D 14.37%, #B0017C 25.72%, #640183 47.83%, #9C0191 78.46%, #FF0EBA 107.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #000;
}

.h2-heading {
  font-size: clamp(1.75rem, 0.75rem + 5vw, 5.25rem);
  letter-spacing: calc(-1 * (clamp(2.375rem, 0.941rem + 7.17vw, 7.313rem) / 100 * 4));

  &.dark {
    color: $colored-text;
  }
}

</style>
