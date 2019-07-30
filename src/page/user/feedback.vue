<template>
    <div class="feedback">
        <div class="header">
            <publicHeader :title="suggestion.title"></publicHeader>
        </div>
        <div class="content">
            <div class="textarea">
                <textarea v-model="advice" :placeholder="suggestion.please_leave" maxlength="200" @blur="keepContent"></textarea>
                <div class="imgList" v-if="showImg"><span v-for="(item, index) in imgList" :key="index"><img src="" alt=""></span></div>
                <!-- <div class="uploadImg">
                    <el-upload action="https://img.hzxindakeji.com/" multiple :limit="limitNum" list-type="picture-card" :before-upload="uploadImg" :on-success="successUpload" :on-error="errorUpload" :on-exceed="removeUpload" :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div> -->
            </div>
            <div class="areacode" @click="setCode">
                <img src="../../assets/icons/goto@2x.png" alt="">
                <span>{{suggestion.country_code}}</span>
                <span>+{{areaCode}}</span>
            </div>
            <div class="phone">
                <span>{{suggestion.tel}}</span>
                <input type="number" v-model="tel">
            </div>
            <div class="btn" @click="submit">
                <div>{{suggestion.submit}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import publicHeader from "../../components/public_header.vue";
import store from "../../store";
export default {
  name: "feedback",
  data() {
    return {
      advice: "",
      areaCode: "",
      tel: "",
      userInformation: {},
      imgList: [],
      limitNum: 9,
      showImg: false,
      imgData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      }
    };
  },
  components: { publicHeader },
  computed: {
    suggestion() {
      let suggestion = this.$t("suggestion");
      return suggestion;
    }
  },
  mounted() {
    let userInformation = localStorage.getItem("userInformation");
    this.userInformation = JSON.parse(userInformation);
    let areaCodes = sessionStorage.getItem("area_code");
    if (areaCodes) {
      this.areaCode = JSON.parse(areaCodes);
    } else if (userInformation) {
      this.areaCode = this.userInformation.globalCode;
    } else {
      this.areaCode = 63;
    }
    this.tel = this.userInformation.tel;
    let advice = sessionStorage.getItem("advice");
    if (advice) {
      this.advice = advice;
    }
  },
  methods: {
    setCode() {
      this.$router.push("/phone_area");
    },

    // removeUpload(file, fileList) {
    //     console.log(file, fileList);
    //     let warntext = this.$t('order.detail.alert.uploadImgLim')
    //     this.toast.warning(warntext)
    // },
    // handleRemove(file, fileList) {
    //     console.log(file, fileList)
    //     if (file.status=='success') {
    //        if (fileList.length === 8) {
    //            setTimeout(()=>{
    //             document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'inline-block'
    //           },300)
    //        }
    //     }

    // },
    // uploadImg(file) {
    //     console.log(file)
    //     const loading = this.$loading({
    //         lock: true,
    //         text: '拼命加载中......',
    //         spinner: 'el-icon-loading',
    //         background: 'rgba(0, 0, 0, 0.4)'
    //     });
    //     if (file) {
    //         loading.close();
    //     }
    // },
    // errorUpload(err, file, fileList) {
    //     console.log('111111111',err)
    //     let errortext = this.$t('order.detail.errorImg')
    //     this.toast.warning(errortext)
    // },

    // successUpload(file, fileList) {
    //     if (fileList.status=='success') {
    //         this.imgList.push(fileList)
    //         if (this.imgList.length===9) {
    //             document.getElementsByClassName('el-upload--picture-card')[0].style.display = 'none'
    //         }
    //     }
    // },
    keepContent() {
      sessionStorage.setItem("advice", this.advice);
    },
    isEmojiCharacter(substring) {
      for (var i = 0; i < substring.length; i++) {
        var hs = substring.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
          if (substring.length > 1) {
            var ls = substring.charCodeAt(i + 1);
            var uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000;
            if (0x1d000 <= uc && uc <= 0x1f77f) {
              return true;
            }
          }
        } else if (substring.length > 1) {
          var ls = substring.charCodeAt(i + 1);
          if (ls == 0x20e3) {
            return true;
          }
        } else {
          if (0x2100 <= hs && hs <= 0x27ff) {
            return true;
          } else if (0x2b05 <= hs && hs <= 0x2b07) {
            return true;
          } else if (0x2934 <= hs && hs <= 0x2935) {
            return true;
          } else if (0x3297 <= hs && hs <= 0x3299) {
            return true;
          } else if (
            hs == 0xa9 ||
            hs == 0xae ||
            hs == 0x303d ||
            hs == 0x3030 ||
            hs == 0x2b55 ||
            hs == 0x2b1c ||
            hs == 0x2b1b ||
            hs == 0x2b50
          ) {
            return true;
          }
        }
      }
    },
    submit() {
      if (!this.tel) {
        let telErrors = this.$t("registered.tel_err");
        this.toast.error(telErrors);
        return;
      } else if (!this.advice) {
        let textErrors = this.$t("suggestion.please_leave_proposal");
        this.toast.error(textErrors);
        return;
      } else if (this.isEmojiCharacter(this.advice)) {
        let textErrors = this.$t("suggestion.emoticons");
        this.toast.error(textErrors);
        return;
      }
      store
        .dispatch("feedbackApi", {
          phonePre: this.areaCode,
          phone: this.tel,
          content: this.advice,
          picture: this.imgList,
          source: 2
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            let successText = this.$t("suggestion.submnit_success");
            this.toast.success(successText);
            this.advice = "";
            sessionStorage.removeItem("advice");
            this.$router.push("/user");
          } else {
            this.toast.error(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.feedback {
  height: 100%;
  .header {
    border-bottom: 1px solid #dddddd;
    position: fixed;
    width: 100%;
    height: 7%;
    top: 0;
    min-height: 40px;
    z-index: 1;
  }
  .textarea {
    background: #fff;
    margin-top: 12px;
    padding-bottom: 20px;
    // border-bottom: 1px solid #DDDDDD;
    textarea {
      width: 100%;
      border: none;
      resize: none;
      outline: none;
      height: 90px;
      padding: 15px;
      font-size: 15px;
    }
  }
  .clearfix {
    margin-left: 15px;
    list-style: none;
    .up {
      width: 80px;
      height: 80px;
      background: #f0f0f0;
      border: 1px dashed #dddddd;
      img {
        position: absolute;
        top: 19px;
        left: 19px;
      }
      input {
        opacity: 0;
        -ms-filter: "alpha(opacity=0)";
        width: 80px;
        height: 80px;
      }
    }
  }
  .areacode {
    margin-top: 10px;
    background: #fff;
    padding: 15px 30px 15px 15px;
    color: #333;
    position: relative;
    span {
      &:last-child {
        float: right;
      }
    }
    img {
      width: 13px;
      position: absolute;
      top: 20px;
      right: 15px;
    }
  }
  .phone {
    background: #fff;
    margin-top: 10px;
    padding: 15px;
    color: #333;
    position: relative;
    input {
      width: 60%;
      border: none;
      text-align: right;
      position: absolute;
      right: 15px;
    }
  }
  .btn {
    margin: 50px auto;
    width: 93%;
    div {
      border: none;
      background: #ff644c;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      border-radius: 4px;
    }
  }
  .uploadImg {
    margin-left: 15px;
  }
  .content {
    height: 93%;
    overflow-y: auto;
    position: fixed;
    top: 7%;
    width: 100%;
  }
}
// @media screen and (max-width: 329px) {
//     .feedback {
//         .phone {
//             input{
//                 width: 76%;
//             }
//         }
//     }
// }
</style>
