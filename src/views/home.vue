<template>
  <page style="height: 100vh; overflow: hidden">
    <div slot="head" class="page-head-default">
      <img src="../assets/imgs/menu.png" alt="" @click="isMenuView = true" />
      {{ title }}
    </div>
    <div>
      <div class="home-warp" v-if="isScan && cabinet && !isBtns">
        <div class="home-warp-main">
          <div class="home-warp-block"></div>
          <div class="home-warp-cont">
            <div class="home-warp-title">
              <svg
                style="padding-right: 15px;"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="30"
                viewBox="0 0 20.509 30.799"
              >
                <g
                  id="Group_211"
                  data-name="Group 211"
                  transform="translate(-9619.135 -8759.906)"
                >
                  <circle
                    id="Ellipse_86"
                    data-name="Ellipse 86"
                    cx="27.755"
                    cy="27.755"
                    r="27.755"
                    transform="translate(9619.135 8759.906)"
                    fill="#131719"
                  />
                  <path
                    id="Path_399"
                    data-name="Path 399"
                    d="M9654.474,8778.079l-5.375-.84c-.031-.006-.063-.012-.1-.016l-.107-.017a.8.8,0,0,0-.167-.006c-.073,0-.148,0-.224,0l-9.226.473a2.655,2.655,0,0,0-2.52,2.652v14.194a2.649,2.649,0,0,0,2.385,2.642l9.226.946c.09.009.18.013.27.013.032,0,.064,0,.1,0,.016,0,.03,0,.047,0h.883a2.921,2.921,0,0,0,1.4-.358l4.283-2.252a3.24,3.24,0,0,0,1.67-2.835v-11.625A2.994,2.994,0,0,0,9654.474,8778.079Zm-16.233,16.442v-14.194a1.172,1.172,0,0,1,1.113-1.173l9.227-.474c.021,0,.042,0,.062,0a1.108,1.108,0,0,1,.206.02l.024,0a1.176,1.176,0,0,1,.943,1.15v15.614a1.177,1.177,0,0,1-1.3,1.169l-9.225-.945A1.172,1.172,0,0,1,9638.24,8794.521Zm17.3-1.844a1.753,1.753,0,0,1-.893,1.532l-3.406,1.79a2.613,2.613,0,0,0,.055-.533v-15.614a2.649,2.649,0,0,0-.119-.791l3.069.48a1.522,1.522,0,0,1,1.294,1.511Z"
                    fill="#00cdfc"
                  />
                  <rect
                    id="Rectangle_197"
                    data-name="Rectangle 197"
                    width="4.177"
                    height="13.836"
                    rx="2.088"
                    transform="translate(9644.802 8812.869)"
                    fill="#131719"
                  />
                </g>
              </svg>

              <span><strong>{{ cabinet.shopname }}</strong></span>
            </div>
            <div class="home-warp-jifei">
              <!-- <span>{{cabinet.currencyName}}{{cabinet.jifei}}</span>/{{cabinet.jifeiDanwei}}{{i18n.minute}} -->
              <span>{{ cabinet.jifei }} Fils</span>/{{ i18n.minute }}
            </div>
            <div class="home-warp-row">{{ shopDesc }}</div>
            <div class="home-warp-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 102.535 89.327"
              >
                <g
                  id="Group_242"
                  data-name="Group 242"
                  transform="translate(-10147.715 -9428.059)"
                >
                  <g id="Group_216" data-name="Group 216">
                    <path
                      id="Path_404"
                      data-name="Path 404"
                      d="M10185.436,9517.385a6.707,6.707,0,0,1-.7-.036l-30.827-3.162a6.879,6.879,0,0,1-6.194-6.861V9459.9a6.9,6.9,0,0,1,6.545-6.889l30.825-1.581a6.9,6.9,0,0,1,7.251,6.889v52.17a6.9,6.9,0,0,1-6.9,6.9Zm-.6-1.031a5.9,5.9,0,0,0,6.5-5.866v-52.17a5.9,5.9,0,0,0-6.2-5.891l-30.825,1.581a5.9,5.9,0,0,0-5.6,5.891v47.427a5.885,5.885,0,0,0,5.3,5.868Z"
                      fill="#7f7f7f"
                    />
                  </g>
                  <g id="Group_217" data-name="Group 217">
                    <path
                      id="Path_405"
                      data-name="Path 405"
                      d="M10188.86,9517.386h-2.951v-1h2.951a6.813,6.813,0,0,0,3.289-.85l14.275-7.5a7.849,7.849,0,0,0,4.038-6.863v-38.841a7.051,7.051,0,0,0-5.992-7l-18.64-2.913.155-.988,18.639,2.913a8.047,8.047,0,0,1,6.838,7.989v38.841a8.856,8.856,0,0,1-4.562,7.743l-14.277,7.5A7.787,7.787,0,0,1,10188.86,9517.386Z"
                      fill="#7f7f7f"
                    />
                  </g>
                  <g id="Group_241" data-name="Group 241">
                    <g id="Group_218" data-name="Group 218">
                      <path
                        id="Path_406"
                        data-name="Path 406"
                        d="M10156.3,9479.556a1.642,1.642,0,0,1-1.644-1.643v-4.383a1.724,1.724,0,0,1,1.64-1.705l10.133-.406a1.553,1.553,0,0,1,1.143.437,1.73,1.73,0,0,1,.517,1.246v4.668a1.706,1.706,0,0,1-1.647,1.746l-10.134.04Zm10.19-7.638h-.042l-10.132.406a1.217,1.217,0,0,0-1.16,1.205v4.383a1.142,1.142,0,0,0,1.144,1.143h0l10.134-.04a1.2,1.2,0,0,0,1.149-1.246V9473.1a1.212,1.212,0,0,0-.364-.886A1.047,1.047,0,0,0,10166.493,9471.918Z"
                        fill="#7f7f7f"
                      />
                    </g>
                    <g id="Group_219" data-name="Group 219">
                      <path
                        id="Path_407"
                        data-name="Path 407"
                        d="M10172.745,9479.49a1.577,1.577,0,0,1-1.118-.471,1.824,1.824,0,0,1-.524-1.288v-4.744a1.788,1.788,0,0,1,1.641-1.821l10.132-.405a1.523,1.523,0,0,1,1.1.428,1.9,1.9,0,0,1,.557,1.37v5.031a1.771,1.771,0,0,1-1.648,1.86l-10.133.04Zm10.188-8.23h-.039l-10.133.405a1.284,1.284,0,0,0-1.159,1.321v4.744a1.324,1.324,0,0,0,.378.935,1.082,1.082,0,0,0,.765.324h.006l10.133-.04a1.272,1.272,0,0,0,1.15-1.36v-5.031a1.4,1.4,0,0,0-.4-1.01A1,1,0,0,0,10182.934,9471.26Z"
                        fill="#7f7f7f"
                      />
                    </g>
                    <g id="Group_220" data-name="Group 220">
                      <path
                        id="Path_408"
                        data-name="Path 408"
                        d="M10166.493,9488.3h-.062l-10.133-.382a1.719,1.719,0,0,1-1.64-1.7v-4.383a1.645,1.645,0,0,1,1.647-1.646h0l10.134.017a1.7,1.7,0,0,1,1.648,1.742v4.668a1.737,1.737,0,0,1-.517,1.249A1.555,1.555,0,0,1,10166.493,9488.3Zm-10.187-7.614a1.145,1.145,0,0,0-1.147,1.146v4.383a1.215,1.215,0,0,0,1.16,1.2l10.132.382a.944.944,0,0,0,.775-.3,1.221,1.221,0,0,0,.364-.889v-4.668a1.2,1.2,0,0,0-1.149-1.242l-10.133-.017Z"
                        fill="#7f7f7f"
                      />
                    </g>
                    <g id="Group_221" data-name="Group 221">
                      <path
                        id="Path_409"
                        data-name="Path 409"
                        d="M10182.932,9488.918h-.057l-10.132-.383a1.783,1.783,0,0,1-1.641-1.817v-4.745a1.83,1.83,0,0,1,.523-1.289,1.587,1.587,0,0,1,1.124-.473h0l10.133.016a1.768,1.768,0,0,1,1.649,1.859v5.029a1.9,1.9,0,0,1-.557,1.372A1.5,1.5,0,0,1,10182.932,9488.918Zm-10.182-8.208a1.091,1.091,0,0,0-.771.328,1.326,1.326,0,0,0-.376.934v4.745a1.279,1.279,0,0,0,1.159,1.317l10.133.383a.943.943,0,0,0,.736-.29,1.406,1.406,0,0,0,.4-1.013v-5.029a1.272,1.272,0,0,0-1.15-1.359l-10.132-.016Z"
                        fill="#7f7f7f"
                      />
                    </g>
                    <g id="Group_222" data-name="Group 222">
                      <path
                        id="Path_410"
                        data-name="Path 410"
                        d="M10166.55,9496.981a1.139,1.139,0,0,1-.129-.006l-10.133-.826a1.8,1.8,0,0,1-1.629-1.763V9490a1.575,1.575,0,0,1,1.662-1.585l10.132.462a1.781,1.781,0,0,1,1.638,1.8v4.668a1.67,1.67,0,0,1-.52,1.232A1.494,1.494,0,0,1,10166.55,9496.981Zm-.088-.5a1.028,1.028,0,0,0,.771-.262,1.16,1.16,0,0,0,.358-.865v-4.668a1.277,1.277,0,0,0-1.161-1.3l-10.133-.462a1.076,1.076,0,0,0-1.138,1.085v4.383a1.294,1.294,0,0,0,1.17,1.265Z"
                        fill="#7f7f7f"
                      />
                    </g>
                    <g id="Group_223" data-name="Group 223">
                      <path
                        id="Path_411"
                        data-name="Path 411"
                        d="M10182.985,9498.323c-.04,0-.08,0-.12,0l-10.133-.827a1.869,1.869,0,0,1-1.63-1.878v-4.745a1.761,1.761,0,0,1,.526-1.271,1.506,1.506,0,0,1,1.135-.429l10.134.461a1.852,1.852,0,0,1,1.637,1.919v5.03a1.835,1.835,0,0,1-.559,1.353A1.453,1.453,0,0,1,10182.985,9498.323Zm-.079-.5a.976.976,0,0,0,.73-.257,1.331,1.331,0,0,0,.4-.985v-5.03a1.349,1.349,0,0,0-1.161-1.419l-10.132-.461a1.094,1.094,0,0,0-.767.29,1.26,1.26,0,0,0-.372.91v4.745a1.362,1.362,0,0,0,1.171,1.38Z"
                        fill="#7f7f7f"
                      />
                    </g>
                    <g id="Group_224" data-name="Group 224">
                      <path
                        id="Path_412"
                        data-name="Path 412"
                        d="M10166.608,9505.748a1.5,1.5,0,0,1-.2-.013l-10.132-1.271a1.9,1.9,0,0,1-1.619-1.823v-4.383a1.51,1.51,0,0,1,1.672-1.522l10.133.905a1.871,1.871,0,0,1,1.627,1.864v4.668a1.61,1.61,0,0,1-.521,1.215A1.441,1.441,0,0,1,10166.608,9505.748Zm-.136-.509a.954.954,0,0,0,.766-.227,1.1,1.1,0,0,0,.353-.84V9499.5a1.36,1.36,0,0,0-1.172-1.365l-10.133-.906a1.048,1.048,0,0,0-.8.259,1.021,1.021,0,0,0-.327.766v4.383a1.38,1.38,0,0,0,1.181,1.327Z"
                        fill="#7f7f7f"
                      />
                    </g>
                    <g id="Group_225" data-name="Group 225">
                      <path
                        id="Path_413"
                        data-name="Path 413"
                        d="M10183.038,9507.81a1.462,1.462,0,0,1-.185-.011l-10.133-1.271a1.964,1.964,0,0,1-1.618-1.938v-4.745a1.7,1.7,0,0,1,.529-1.255,1.483,1.483,0,0,1,1.144-.383l10.133.905a1.942,1.942,0,0,1,1.626,1.979v5.03a1.766,1.766,0,0,1-.561,1.334A1.407,1.407,0,0,1,10183.038,9507.81Zm-.122-.507a.9.9,0,0,0,.727-.223,1.266,1.266,0,0,0,.392-.959v-5.03a1.436,1.436,0,0,0-1.171-1.481l-10.133-.905a.976.976,0,0,0-.762.254,1.2,1.2,0,0,0-.366.886v4.745a1.45,1.45,0,0,0,1.182,1.442Z"
                        fill="#7f7f7f"
                      />
                    </g>
                    <g id="Group_238" data-name="Group 238">
                      <g id="Group_227" data-name="Group 227">
                        <g id="Group_226" data-name="Group 226">
                          <path
                            id="Path_414"
                            data-name="Path 414"
                            d="M10177.273,9459.666h-.5v-.9a2.349,2.349,0,0,1,2.014-2.375l1.138-.1.043.5-1.139.1a1.841,1.841,0,0,0-1.556,1.877Z"
                            fill="#7f7f7f"
                          />
                        </g>
                      </g>
                      <g id="Group_229" data-name="Group 229">
                        <g id="Group_228" data-name="Group 228">
                          <path
                            id="Path_415"
                            data-name="Path 415"
                            d="M10181.486,9464.478l-.028-.5.709-.038a1.8,1.8,0,0,0,1.549-1.876v-1.176h.5v1.176a2.306,2.306,0,0,1-2.021,2.376Z"
                            fill="#7f7f7f"
                          />
                        </g>
                      </g>
                      <g id="Group_231" data-name="Group 231">
                        <g id="Group_230" data-name="Group 230">
                          <path
                            id="Path_416"
                            data-name="Path 416"
                            d="M10178.719,9464.627a1.849,1.849,0,0,1-1.28-.516,2.215,2.215,0,0,1-.665-1.613v-1.146h.5v1.146a1.714,1.714,0,0,0,.509,1.25,1.341,1.341,0,0,0,1.012.377l1.139-.063.027.5-1.138.063C10178.787,9464.627,10178.753,9464.627,10178.719,9464.627Z"
                            fill="#7f7f7f"
                          />
                        </g>
                      </g>
                      <g id="Group_233" data-name="Group 233">
                        <g id="Group_232" data-name="Group 232">
                          <path
                            id="Path_417"
                            data-name="Path 417"
                            d="M10184.216,9459.155h-.5v-.922a1.734,1.734,0,0,0-.522-1.286,1.3,1.3,0,0,0-.991-.342l-.709.061-.042-.5.708-.061a1.768,1.768,0,0,1,1.373.472,2.241,2.241,0,0,1,.684,1.654Z"
                            fill="#7f7f7f"
                          />
                        </g>
                      </g>
                      <g id="Group_234" data-name="Group 234">
                        <path
                          id="Path_418"
                          data-name="Path 418"
                          d="M10178.467,9460.121a.439.439,0,0,1-.3-.119.5.5,0,0,1-.151-.358v-1.491a.5.5,0,0,1,.446-.509l1.345-.106a.457.457,0,0,1,.333.115.484.484,0,0,1,.153.359v1.5a.5.5,0,0,1-.448.508h0l-1.344.1Zm1.326-2.109-1.291.13.014,1.5,1.271-.117Zm.015,1.513h0Z"
                          fill="#7f7f7f"
                        />
                      </g>
                      <g id="Group_235" data-name="Group 235">
                        <path
                          id="Path_419"
                          data-name="Path 419"
                          d="M10181.144,9459.928a.434.434,0,0,1-.3-.12.485.485,0,0,1-.152-.359v-1.508a.5.5,0,0,1,.445-.51l1.346-.107a.423.423,0,0,1,.333.115.493.493,0,0,1,.152.361v1.519a.5.5,0,0,1-.449.51l-1.343.1Zm1.325-2.128-1.291.129.015,1.52,1.271-.116Z"
                          fill="#7f7f7f"
                        />
                      </g>
                      <g id="Group_236" data-name="Group 236">
                        <path
                          id="Path_420"
                          data-name="Path 420"
                          d="M10178.472,9462.942a.445.445,0,0,1-.307-.122.5.5,0,0,1-.149-.356v-1.492a.5.5,0,0,1,.448-.506l1.345-.093a.425.425,0,0,1,.333.119.484.484,0,0,1,.151.357v1.5a.5.5,0,0,1-.452.507l-1.343.083Zm1.321-2.093-1.293.114.016,1.5,1.272-.1Z"
                          fill="#7f7f7f"
                        />
                      </g>
                      <g id="Group_237" data-name="Group 237">
                        <path
                          id="Path_421"
                          data-name="Path 421"
                          d="M10181.145,9462.777a.438.438,0,0,1-.3-.12.5.5,0,0,1-.151-.36v-1.508a.5.5,0,0,1,.447-.508l1.346-.093a.438.438,0,0,1,.333.119.5.5,0,0,1,.15.36v1.518a.5.5,0,0,1-.45.509h0l-1.344.082Zm1.324-2.109-1.293.111.017,1.518,1.271-.1Zm.018,1.528h0Z"
                          fill="#7f7f7f"
                        />
                      </g>
                    </g>
                    <g id="Group_239" data-name="Group 239">
                      <path
                        id="Path_422"
                        data-name="Path 422"
                        d="M10166.111,9460.321l-.012-.5,4.295-.108.012.5Z"
                        fill="#7f7f7f"
                      />
                    </g>
                    <g id="Group_240" data-name="Group 240">
                      <rect
                        id="Rectangle_201"
                        data-name="Rectangle 201"
                        width="6.282"
                        height="0.5"
                        transform="translate(10166.105 9461.834)"
                        fill="#7f7f7f"
                      />
                    </g>
                  </g>
                </g>
                <g
                  id="Group_246"
                  data-name="Group 246"
                  transform="translate(-10147.715 -9428.059)"
                >
                  <g id="Group_243" data-name="Group 243">
                    <path
                      id="Path_423"
                      data-name="Path 423"
                      d="M10214.868,9507.937l-.114-.993a39.02,39.02,0,0,0,30.126-56.7l.887-.461a40.019,40.019,0,0,1-30.9,58.154Z"
                      fill="#39d85b"
                    />
                  </g>
                  <g id="Group_245" data-name="Group 245">
                    <g id="Group_244" data-name="Group 244">
                      <path
                        id="Path_424"
                        data-name="Path 424"
                        d="M10220.951,9501.746a.5.5,0,0,1-.062.7l-5.855,4.922,6.936,3.226a.5.5,0,1,1-.422.907l-7.647-3.557a.5.5,0,0,1-.111-.837l6.457-5.428a.5.5,0,0,1,.706.063Z"
                        fill="#39d85b"
                      />
                    </g>
                  </g>
                </g>
                <g
                  id="Group_250"
                  data-name="Group 250"
                  transform="translate(-10147.715 -9428.059)"
                >
                  <g id="Group_247" data-name="Group 247">
                    <path
                      id="Path_425"
                      data-name="Path 425"
                      d="M10175.854,9449.8l-.881-.473a40.017,40.017,0,0,1,58.324-13.824l-.576.816a39.019,39.019,0,0,0-56.867,13.48Z"
                      fill="#39d85b"
                    />
                  </g>
                  <g id="Group_249" data-name="Group 249">
                    <g id="Group_248" data-name="Group 248">
                      <path
                        id="Path_426"
                        data-name="Path 426"
                        d="M10224.64,9435.987a.5.5,0,0,1,.521-.48l7.644.3-2.963-7.053a.5.5,0,1,1,.922-.388l3.268,7.776a.5.5,0,0,1-.481.693l-8.428-.327a.507.507,0,0,1-.265-.089A.5.5,0,0,1,10224.64,9435.987Z"
                        fill="#39d85b"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              {{ i18n.feature_1 }}
            </div>
            <div class="home-warp-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 108.095 109.765"
              >
                <g
                  id="Group_214"
                  data-name="Group 214"
                  transform="translate(-9679.309 -9660.045)"
                >
                  <path
                    id="Path_402"
                    data-name="Path 402"
                    d="M9751.963,9769.81h-37.215a9.013,9.013,0,0,1-9-9v-81.056a9.014,9.014,0,0,1,9-9h37.215a9.014,9.014,0,0,1,9,9v81.056A9.013,9.013,0,0,1,9751.963,9769.81Zm-37.215-98.061a8.012,8.012,0,0,0-8,8v81.056a8.011,8.011,0,0,0,8,8h37.215a8.011,8.011,0,0,0,8-8v-81.056a8.012,8.012,0,0,0-8-8Z"
                    fill="#7f7f7f"
                  />
                </g>
                <g
                  id="Group_215"
                  data-name="Group 215"
                  transform="translate(-9679.309 -9660.045)"
                >
                  <path
                    id="Path_403"
                    data-name="Path 403"
                    d="M9748.319,9759.047h-29.077a1,1,0,0,1,0-2h29.077a1,1,0,0,1,0,2Z"
                    fill="#7f7f7f"
                  />
                </g>
                <g
                  id="Group_251"
                  data-name="Group 251"
                  transform="translate(-9679.309 -9660.045)"
                >
                  <path
                    id="Path_427"
                    data-name="Path 427"
                    d="M9733.356,9727.374a13.283,13.283,0,1,1,13.281-13.282A13.3,13.3,0,0,1,9733.356,9727.374Zm0-25.565a12.283,12.283,0,1,0,12.281,12.283A12.3,12.3,0,0,0,9733.356,9701.809Z"
                    fill="#00cdfc"
                  />
                </g>
                <g
                  id="Group_252"
                  data-name="Group 252"
                  transform="translate(-9679.309 -9660.045)"
                >
                  <path
                    id="Path_428"
                    data-name="Path 428"
                    d="M9733.356,9737.9a23.8,23.8,0,1,1,23.8-23.8A23.832,23.832,0,0,1,9733.356,9737.9Zm0-46.859a23.055,23.055,0,1,0,23.054,23.055A23.082,23.082,0,0,0,9733.356,9691.037Z"
                    fill="#00cdfc"
                  />
                </g>
                <g
                  id="Group_253"
                  data-name="Group 253"
                  transform="translate(-9679.309 -9660.045)"
                >
                  <path
                    id="Path_429"
                    data-name="Path 429"
                    d="M9733.356,9749.256a35.164,35.164,0,1,1,35.163-35.164A35.2,35.2,0,0,1,9733.356,9749.256Zm0-69.828a34.664,34.664,0,1,0,34.663,34.664A34.7,34.7,0,0,0,9733.356,9679.428Z"
                    fill="#00cdfc"
                  />
                </g>
                <g
                  id="Group_254"
                  data-name="Group 254"
                  transform="translate(-9679.309 -9660.045)"
                >
                  <path
                    id="Path_430"
                    data-name="Path 430"
                    d="M9733.356,9768.139a54.047,54.047,0,1,1,54.047-54.047A54.109,54.109,0,0,1,9733.356,9768.139Zm0-107.844a53.8,53.8,0,1,0,53.8,53.8A53.858,53.858,0,0,0,9733.356,9660.295Z"
                    fill="#00cdfc"
                  />
                </g>
              </svg>
              {{ i18n.feature_2 }}
            </div>
            <div class="home-warp-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="30"
                viewBox="0 0 55.221 99.061"
              >
                <g
                  id="Group_212"
                  data-name="Group 212"
                  transform="translate(-9705.745 -9434.872)"
                >
                  <path
                    id="Path_400"
                    data-name="Path 400"
                    d="M9751.963,9533.933h-37.215a9.013,9.013,0,0,1-9-9v-81.056a9.014,9.014,0,0,1,9-9h37.215a9.014,9.014,0,0,1,9,9v81.056A9.013,9.013,0,0,1,9751.963,9533.933Zm-37.215-98.061a8.012,8.012,0,0,0-8,8v81.056a8.011,8.011,0,0,0,8,8h37.215a8.011,8.011,0,0,0,8-8v-81.056a8.012,8.012,0,0,0-8-8Z"
                    fill="#7f7f7f"
                  />
                </g>
                <g
                  id="Group_213"
                  data-name="Group 213"
                  transform="translate(-9705.745 -9434.872)"
                >
                  <path
                    id="Path_401"
                    data-name="Path 401"
                    d="M9748.319,9523.17h-29.077a1,1,0,0,1,0-2h29.077a1,1,0,0,1,0,2Z"
                    fill="#ff8b00"
                  />
                </g>
              </svg>
              {{ i18n.feature_3 }}
            </div>
          </div>
          <div class="home-warp-btn" v-if="cabinet.chongzhi === 'Y'">
            <div class="btn btn" @click="onSubmit">{{ i18n.submit }}</div>
          </div>
          <div class="home-warp-btn" v-else>
            <div class="home-warp-tips">
              <img src="../assets/imgs/icon_info.png" alt="" />
              <span>{{ shopTips3 }}</span>
            </div>
            <div class="btn" @click="onBorrow">{{ i18n.borrow }}</div>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- <img class="home-bg" src="../assets/imgs/bg.png" alt="" /> -->
        <div class="home-foot">
          <div class="home-btns">
            <a
              v-if="system === 'ios'"
              style="background: #000;"
              :href="appleUrl"
            >
              <img src="../assets/imgs/apple.png" alt="" />
              <p><span>App Store</span></p>
            </a>
            <a v-else style="background: #000;" :href="googleUrl">
              <img src="../assets/imgs/google.png" alt="" />
              <span>Google Play</span>
            </a>
            <a
              v-if="code"
              @click="onCode"
              style="background: #fff; color: #000; border: 1px solid #000;"
            >
              <span>{{ i18n.goborrow }}</span>
            </a>
            <!-- <a
              @click="goNearby"
              style="background: #fff; color: #000; border: 1px solid #000;"
            >
              <span>{{ i18n.nearby }}</span>
            </a> -->
          </div>
          <!-- <div class=" btn" @click="goNearby">{{ i18n.nearby }} ></div> -->
        </div>
      </div>
      <popup-warp v-model="isMenuView" dialogTransition="slide-left">
        <menu-side></menu-side>
      </popup-warp>
    </div>
  </page>
</template>

<script>
import { PopupWarp } from '../components/popup'
import { MenuSide } from '../components/menu'
import { mapState } from 'vuex'
import { QR_CODE, ZH_CODE, ORDER_TEMP } from '../apis/cabinet'
import { WECHAT_MP_PRE_PAY, ALIPAY_PRE_PAY } from '../apis/payment'
import { USER_INFO } from '../apis/user'
import wxMixin from '../mixins/wx'
import alipayMixin from '../mixins/alipay'
export default {
  mixins: [wxMixin, alipayMixin],
  components: {
    PopupWarp,
    MenuSide
  },
  computed: {
    ...mapState(['qrcode', 'zhcode', 'cabinet', 'browser', 'user', 'system']),
    i18n () {
      return this.$t('home')
    },
    i18nMsg () {
      return this.$t('msg')
    },
    title () {
      return process.env.VUE_APP_NAME
    },
    code () {
      return this.qrcode || this.zhcode
    },
    scanUrl () {
      if (this.qrcode) {
        return `${QR_CODE}?id=${this.qrcode}`
      }
      if (this.zhcode) {
        return `${ZH_CODE}/${this.zhcode}`
      }
      return ''
    },
    banner () {
      return this.cabinet && this.cabinet.shoplogo
        ? `background-image: url(${this.cabinet.shoplogo});`
        : ''
    },
    shopDesc () {
      return `${this.i18n.price_info}`.format(this.cabinet)
    },
    shopTips1 () {
      return `${this.i18n.tips_1}`.format(this.cabinet)
    },
    shopTips2 () {
      return `${this.i18n.tips_2}`.format(this.cabinet)
    },
    shopTips3 () {
      return `${this.i18n.tips_3}`.format(this.cabinet)
    },
    amount () {
      if (this.cabinet) {
        return (this.cabinet.yajin - this.cabinet.myyue).toFixed(2)
      } else {
        return 0
      }
    },
    appleUrl () {
      return process.env.VUE_APP_APP_STORE
    },
    googleUrl () {
      return process.env.VUE_APP_GOOGLE_PLAY
    }
  },
  data () {
    return {
      isMenuView: false,
      isScan: false,
      isBtns: false
    }
  },
  methods: {
    onScan () {
      if (!this.scanUrl) return
      this.$loading(true)
      this.$post(
        this.scanUrl,
        {},
        resp => {
          this.$loading(false)
          this.$store.commit('cabinet', {
            qrcode: this.code,
            ...resp
          })
          this.isScan = true
        },
        error => {
          this.$loading(false)
          this.$toast(error)
        }
      )
    },
    onSubmit () {
      this.$router.push({
        path: '/confirm',
        query: { price: this.amount, payType: 'YJ' }
      })
    },
    onBorrow () {
      this.$loading(true)
      this.$post(
        `${ORDER_TEMP}/${this.cabinet.qrcode}/paypal`,
        {},
        resp => {
          this.$loading(false)
          console.log(resp)
          if (resp.orderid) {
            this.$router.push(`/result?tradeNo=${resp.orderid}`)
          } else {
            this.$confirm({
              title: this.i18n.msg_fail_title,
              content: this.i18n.msg_fail_content,
              showCancel: false
            })
          }
        },
        error => {
          this.$loading(false)
          this.$toast(error)
        }
      )
    },
    onWechatPay (event) {
      this.$loading(true)
      console.log('event', event)
      const vm = this
      this.$post(
        `${WECHAT_MP_PRE_PAY}/${this.cabinet.qrcode}`,
        {
          amount: this.amount,
          formId: event.detail.formId || ''
        },
        resp => {
          this.$loading(false)
          console.log('wechat pre pay', resp)
          const data = resp.data
          wx.chooseWXPay({
            timestamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success: function (res) {
              vm.$router.push(`/result?tradeNo=${data.out_trade_no}`)
            },
            fail: function (res) {
              console.log('wxpay fail', res)
              vm.$toast(res.errMsg)
            }
          })
        },
        error => {
          console.log('wechat pre pay error', error)
          this.$loading(false)
          this.$toast(error)
        }
      )
    },
    onAlipay (event) {
      this.$loading(true)
      console.log('event', event)
      const vm = this
      this.$post(
        `${ALIPAY_PRE_PAY}/${this.cabinet.qrcode}`,
        {
          amount: this.amount
        },
        resp => {
          this.$loading(false)
          console.log('alipay', resp)
          const data = resp.data
          ap.tradePay(
            {
              orderStr: data
            },
            res => {
              if (res.resultCode === 9000) {
                vm.$router.push(`/result?tradeNo=${data.out_trade_no}`)
              } else {
                console.log('alipay fail', res)
                vm.$toast(res.resultCode)
              }
            }
          )
        },
        error => {
          console.log('alipay error', error)
          this.$loading(false)
          this.$toast(error)
        }
      )
    },
    loadUser () {
      this.$get(
        USER_INFO,
        {},
        resp => {
          if (resp.user) {
            this.$store.commit('user', resp.user)
          } else {
            this.$confirm({
              title: this.i18n.msg_fail_title,
              content: this.i18n.msg_fail_user,
              confirmText: this.i18nMsg.retry,
              cancelText: this.i18nMsg.cancel
            }).then(() => {
              this.loadUser()
            })
          }
        },
        error => {
          this.$confirm({
            title: this.i18n.msg_fail_title,
            content: this.i18nMsg.error,
            confirmText: this.i18nMsg.retry,
            cancelText: this.i18nMsg.cancel
          }).then(() => {
            this.loadUser()
          })
          console.log(error)
        }
      )
    },
    onAppStore () {
      window.location.href = process.env.VUE_APP_APP_STORE
    },
    onGooglePlay () {
      window.location.href = process.env.VUE_APP_GOOGLE_PLAY
    },
    onCode () {
      if (this.user) {
        this.isBtns = false
        this.loadUser()
        this.onScan()
      } else {
        this.$router.push('/login')
      }
    },
    goNearby () {
      this.$router.push('./google_map')
    }
  },
  created () {
    if (this.browser === 'wechat') {
      this.loadWXScript(['chooseWXPay'])
    } else if (this.browser === 'alipay') {
      this.loadAlipayScript()
    } else {
      this.isBtns = true
    }
    if (!this.isBtns && this.code) {
      this.loadUser()
      this.onScan()
    }
  }
}
</script>

<style lang="less">
.home-warp {
  &-main {
    width: 95%;
    height: calc(100vh - 300px);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 40px 40px 0 0;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  }
  &-block {
    display: flex;
    justify-content: center;
    align-items: center;
    &::after {
      content: " ";
      height: 8px;
      width: 80px;
      margin: 20px;
      border-radius: 4px;
      background: #cccccc;
    }
  }
  &-cont {
    padding: 0 48px;
  }
  &-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
  &-jifei {
    padding: 60px 0 20px;
    font-size: 36px;
    font-weight: 600;
    span {
      font-size: 60px;
    }
  }
  &-row {
    display: flex;
    font-size: 24px;
    line-height: 32px;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 0;
    color: #999999;
    img {
      width: 28px;
      height: 28px;
      margin-right: 10px;
    }
  }
  &-btn {
    position: fixed;
    left: 48px;
    right: 48px;
    bottom: 48px;
    button {
      width: 100%;
      border: none;
      padding: 0;
      margin: 0;
    }
  }
  &-tips {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 40px;
    font-size: 28px;
    color: #666666;
    padding: 20px 0;
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }
}
.home-bg {
  width: 100%;
  height: 100vh;
}
.home-btns {
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 40px;
  justify-content: center;
  flex-direction: row;
  text-align: center;
  z-index: -1;
  a {
    text-decoration: none;
    width: 30%;
    flex: 1;
    margin: 20px;
    background: #000000;
    color: #ffffff;
    padding: 20px 0;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }
}
.go-code {
  text-align: center;
  color: #67c23a;
  text-decoration: underline;
  padding: 10px 0 30px;
}
.home-foot {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  .nearby {
    position: absolute;
    bottom: 170px;
    right: 20px;
    color: #fff;
    text-decoration: underline;
    text-align: center;
  }
}
</style>
