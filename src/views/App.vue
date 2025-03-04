<template>
  <metainfo>
    <template v-slot:title></template>
  </metainfo>
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

@font-face { font-family: "SuisseIntlMedium"; src: url('@/assets/fonts/SuisseIntl-Medium-J78oFWRb.otf') format('opentype'); }
@font-face { font-family: "SuisseIntlRegular"; src: url('@/assets/fonts/SuisseIntl-Regular-BzoWxrQg.otf') format('opentype'); }

body { width: 100%; }

#app {
  font-family: "SuisseIntlRegular", sans-serif;
  font-weight: 400;
  color: #fff;
  font-size: clamp(0.75rem, 0.625rem + 0.63vw, 1.188rem);
  line-height: 1;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.content {
  flex: 1 0 auto;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;

  @media(max-width: 768px) { padding: 0 15px; }
}

a {
  text-decoration: none;
  @media (hover: hover) and (pointer: fine) { &:hover { color: $primary-color; } }
}

input[type="checkbox"], input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  position: relative;

  min-width: 14px;
  max-width: 14px;
  min-height: 14px;
  max-height: 14px;
  
  margin: 0 7px 3px 0;
  background: #fff;
  border: 1px solid $light-colored-text;
  border-radius: 0;
  cursor: pointer;

  @media (max-width: 768px) {
    min-width: 12px;
    max-width: 12px;
    min-height: 12px;
    max-height: 12px;
  }

  &::after {
    content: "✓";
    font-size: 12px;
    line-height: 12px;
    position: absolute;
    top: 1px;
    left: 1px;
    display: none;
    color: $primary-color;

    @media (max-width: 768px) {
      font-size: 10px;
      line-height: 10px;
    }
  }

  &:checked {
    background: #fff;

    &::after {
      display: block;
    }
  }
}

.btn {
  position: relative;
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

  &.thin {
    padding: 10px 30px;
  }

  &._loading {
    cursor: not-allowed;
    opacity: 0.6;
    color: $primary-color;

    &::after {
      content: "";
      position: absolute;
      top: calc(50% - 15px);
      left: calc(50% - 12.5px);
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top: 3px solid white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      transform: translate(-50%, -50%);
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: $primary-color;
        color: $primary-color;
        opacity: 0.6;
      }
    }
  }

  @media(max-width: 768px) {
    font-size: 14px;
    width: 170px;
    padding: 13px 20px;

    &.thin {
      padding: 8px 20px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: $hover-btn-color;
      transition: background-color .2s;
      color: #fff;
    }
  }
}

.gradient-text {
  background: linear-gradient(90deg, #FF02A9 -5.48%, #91017D 14.37%, #B0017C 25.72%, #640183 47.83%, #9C0191 78.46%, #FF0EBA 107.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #000;
}

.page-heading {
  font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);
  padding: 110px 0 20px 0;
  border-bottom: 2px solid $light-colored-text;
  color: $colored-text;

  @media (max-width: 920px) {
    padding: 60px 0 10px 0;
  }
}

.h2-heading {
  font-size: clamp(1.75rem, 0.75rem + 5vw, 5.25rem);
  letter-spacing: calc(-1 * (clamp(2.375rem, 0.941rem + 7.17vw, 7.313rem) / 100 * 4));

  &.dark {
    color: $colored-text;
  }
}

._incart {
  &::after {
    content: "В корзине";
    position: absolute;
    top: 5px;
    left: 5px;
    color: #fff;
    font-size: 12px;
    line-height: 12px;
    padding: 2px 5px;
    border-radius: 4px;
    background-color: $secondary-color;
  }
}

.form {
  .agreement-error {
    margin: 5px 0 0 0;
    display: inline-block;
    background-color: #E50000;
    padding: 6px 10px;
    font-size: 15px;
    color: #fff;
  }
}

.form-item {
  margin: 0 0 15px 0;
  font-size: 22px;
  font-size: clamp(0.875rem, 0.693rem + 0.91vw, 1.375rem);

  position: relative;

  &.agreement { 
    font-size: clamp(0.75rem, 0.659rem + 0.45vw, 1rem);

    input[type="checkbox"] {
      min-width: 22px;
      max-width: 22px;
      min-height: 22px;
      max-height: 22px;

      @media (max-width: 768px) {
        min-width: 14px;
        max-width: 14px;
        min-height: 14px;
        max-height: 14px;
      }

      &::after {
        font-size: 18px;
        line-height: 18px;
        top: 2px;
        left: 4px;
        font-weight: 600;
        color: $colored-text;

        @media (max-width: 768px) {
          top: 0;
          left: 1px;
          line-height: 12px;
          font-size: 12px;
        }
      }
    }
  }

  &.high {
    input {
      @media (max-width: 768px) {
        & {
          padding: 20px 0 !important;
        }
      }
    }
  }

  label {
    display: flex;
    align-items: center;
    gap: 4px;
    color: $light-colored-text;
    font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);
  }

  a { color: $primary-color; }

	&__form-elem-box {
    border-bottom: 1px solid $light-colored-text;

    select, textarea, input[type="text"] {
      width: 100%;
      border: none;
      background: none;
      padding: 0 0 15px 0;
      font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);

      @media (max-width: 768px) {
        padding: 0 0 5px 0;
      }

      &:focus-visible, &:focus {
        border: none;
        outline: none;
      }

      &::placeholder {
        color: $light-colored-text;
        font-size: clamp(0.875rem, 0.693rem + 0.91vw, 1.375rem);
      }

      &._error::placeholder {
        color: $err-text;
      }
    }

    select {
      appearance: none;

      font-size: clamp(0.875rem, 0.732rem + 0.71vw, 1.375rem);
      color: $light-colored-text;

      option {
        font-size: clamp(0.75rem, 0.679rem + 0.36vw, 1rem);
      }
    }

    textarea {
      font-size: inherit;
      letter-spacing: inherit;
      font-family: inherit;
      font-weight: normal;

      resize: none;
    }

    &.select {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 20%;
        right: 15px;
        border: 10px solid transparent;
        border-top: 14px solid $primary-color;

        pointer-events: none;

        @media (max-width: 768px) {
          top: 16%;
          border: 8px solid transparent;
          border-top: 12px solid $primary-color;
        }
      }
    }

    &.checkbox {
      display: flex;
      align-items: center;
      border-bottom: none;
      margin: 0 0 15px 0;
      font-size: clamp(0.75rem, 0.679rem + 0.36vw, 1rem);

      @media (max-width: 768px) {
        margin: 0 0 5px 0;
      }
    }
	}

	&__hint {
    font-size: clamp(0.75rem, 0.679rem + 0.36vw, 1rem);
    color: $light-colored-text;

    margin: 5px 0 0 0;
	}

  &__error {
    font-size: clamp(0.75rem, 0.679rem + 0.36vw, 1rem);
    color: $err-text;

    margin: 5px 0 0 0;
  }

  &__custom-placeholder {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    color: $light-colored-text;
    font-size: clamp(0.875rem, 0.693rem + 0.91vw, 1.375rem);

    @media (max-width: 768px) {
      bottom: 5px;
    }
  }
}

</style>