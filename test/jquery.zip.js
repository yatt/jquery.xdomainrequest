/**
 * jQuery.zip
 * jQuery Plugin - zip inflation/deflation
 *
 * @author yatt/brainfs http://d.hatena.ne.jp/yatt/ http://twitter.com/brainfs
 * @version 0.0.1
 * @updated 2011-06-23
 *
 * @see https://github.com/hinassan/zipjs/
 * @see http://javascript.g.hatena.ne.jp/edvakf/20100607/1275931930
 * @see http://nyamadandan.blogspot.com/2011/05/ieee795.html
 *
 * *****************************************************************************
 * sample:
 * $.get('/archive.zip', function(archive){ // or fetch from external domain..
 *      for (var i in archive.files){
 *          var file = archive.files[i]
 *
 *          console.log(file.name)
 *          console.log(file.filesize)
 *          console.log(file.inflate())
 *
 *      }
 *  })
 *
 * $.ajax({
 *     url: '/xdomain.php?url=http%3A//example.com/archive/201106.zip&param=1',
 *     dataType: 'zip',
 *     success: function(zip){
 *         console.log(zip.name)
 *     }
 * })
 *
 * *****************************************************************************
 */


/* -----------------------------------------------
 * inner module for handling zip file
 * -----------------------------------------------
 */
(function($){
(function(G){function A(){this.list=this.next=null}function E(){this.n=this.b=this.e=0;this.t=null}function l(a,d,s,b,c,t){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var q=Array(this.BMAX+1),p,f,n,m,g,h,e,i=Array(this.BMAX+1),k,l,x,w=new E,v=Array(this.BMAX);m=Array(this.N_MAX);var y,r=Array(this.BMAX+1),u,o,z;z=this.root=null;for(g=0;g<q.length;g++)q[g]=0;for(g=0;g<i.length;g++)i[g]=0;for(g=0;g<v.length;g++)v[g]=null;for(g=0;g<m.length;g++)m[g]=0;for(g=0;g<r.length;g++)r[g]=0;p=d>256?a[256]:this.BMAX;k=a;l=0;g=d;do q[k[l]]++,l++;while(--g>0);if(q[0]==d)this.root=null,this.status=this.m=0;else{for(h=1;h<=this.BMAX;h++)if(q[h]!=0)break;e=h;t<h&&(t=h);for(g=this.BMAX;g!=0;g--)if(q[g]!=0)break;n=g;t>g&&(t=g);for(u=1<<h;h<g;h++,u<<=1)if((u-=q[h])<0){this.status=2;this.m=t;return}if((u-=q[g])<0)this.status=2,this.m=t;else{q[g]+=u;r[1]=h=0;k=q;l=1;for(x=2;--g>0;)r[x++]=h+=k[l++];k=a;g=l=0;do if((h=k[l++])!=0)m[r[h]++]=g;while(++g<d);d=r[n];r[0]=g=0;k=m;l=0;m=-1;y=i[0]=0;x=null;for(o=0;e<=n;e++)for(a=q[e];a-- >0;){for(;e>y+i[1+m];){y+=i[1+m];m++;o=(o=n-y)>t?t:o;if((f=1<<(h=e-y))>a+1){f-=a+1;for(x=e;++h<o;){if((f<<=1)<=q[++x])break;f-=q[x]}}y+h>p&&y<p&&(h=p-y);o=1<<h;i[1+m]=h;x=Array(o);for(f=0;f<o;f++)x[f]=new E;z=z==null?this.root=new A:z.next=new A;z.next=null;z.list=x;v[m]=x;if(m>0)r[m]=g,w.b=i[m],w.e=16+h,w.t=x,h=(g&(1<<y)-1)>>y-i[m],v[m-1][h].e=w.e,v[m-1][h].b=w.b,v[m-1][h].n=w.n,v[m-1][h].t=w.t}w.b=e-y;l>=d?w.e=99:k[l]<s?(w.e=k[l]<256?16:15,w.n=k[l++]):(w.e=c[k[l]-s],w.n=b[k[l++]-s]);f=1<<e-y;for(h=g>>y;h<o;h+=f)x[h].e=w.e,x[h].b=w.b,x[h].n=w.n,x[h].t=w.t;for(h=1<<e-1;(g&h)!=0;h>>=1)g^=h;for(g^=h;(g&(1<<y)-1)!=r[m];)y-=i[m],m--}this.m=i[1];this.status=u!=0&&n!=1?1:0}}}function d(a){for(;H<a;){var d=I,e;e=J.length==N?-1:J.charCodeAt(N++)&255;I=d|e<<H;H+=8}}function e(a){return I&Y[a]}function n(a){I>>=a;H-=a}function K(a,l,s){var b,c,t;if(s==0)return 0;for(t=0;;){d(r);c=B.list[e(r)];for(b=c.e;b>16;){if(b==99)return-1;n(c.b);b-=16;d(b);c=c.t[e(b)];b=c.e}n(c.b);if(b==16)u&=i-1,a[l+t++]=C[u++]=c.n;else{if(b==15)break;d(b);k=c.n+e(b);n(b);d(F);c=R.list[e(F)];for(b=c.e;b>16;){if(b==99)return-1;n(c.b);b-=16;d(b);c=c.t[e(b)];b=c.e}n(c.b);d(b);L=u-c.n-e(b);for(n(b);k>0&&t<s;)k--,L&=i-1,u&=i-1,a[l+t++]=C[u++]=C[L++]}if(t==s)return s}D=-1;return t}function a(a,i,s){var b,c,k,q,p,f,o,m=Array(316);for(b=0;b<m.length;b++)m[b]=0;d(5);f=257+e(5);n(5);d(5);o=1+e(5);n(5);d(4);b=4+e(4);n(4);if(f>286||o>30)return-1;for(c=0;c<b;c++)d(3),m[S[c]]=e(3),n(3);for(;c<19;c++)m[S[c]]=0;r=7;c=new l(m,19,19,null,null,r);if(c.status!=0)return-1;B=c.root;r=c.m;q=f+o;for(b=k=0;b<q;)if(d(r),p=B.list[e(r)],c=p.b,n(c),c=p.n,c<16)m[b++]=k=c;else if(c==16){d(2);c=3+e(2);n(2);if(b+c>q)return-1;for(;c-- >0;)m[b++]=k}else{c==17?(d(3),c=3+e(3),n(3)):(d(7),c=11+e(7),n(7));if(b+c>q)return-1;for(;c-- >0;)m[b++]=0;k=0}r=Z;c=new l(m,f,257,T,U,r);if(r==0)c.status=1;if(c.status!=0)return-1;B=c.root;r=c.m;for(b=0;b<o;b++)m[b]=m[b+f];F=$;c=new l(m,o,0,V,W,F);R=c.root;F=c.m;if(F==0&&f>257)return-1;if(c.status!=0)return-1;return K(a,i,s)}function o(){C==null&&(C=Array(2*i));H=I=u=0;D=-1;M=!1;k=L=0;B=null}function v(o,v,s){var b,c;for(b=0;b<s;){if(M&&D==-1)break;if(k>0){if(D!=aa)for(;k>0&&b<s;)k--,L&=i-1,u&=i-1,o[v+b++]=C[u++]=C[L++];else{for(;k>0&&b<s;)k--,u&=i-1,d(8),o[v+b++]=C[u++]=e(8),n(8);k==0&&(D=-1)}if(b==s)break}if(D==-1){if(M)break;d(1);e(1)!=0&&(M=!0);n(1);d(2);D=e(2);n(2);B=null;k=0}switch(D){case 0:c=o;var t=v+b,q=s-b,p=void 0,p=H&7;n(p);d(16);p=e(16);n(16);d(16);if(p!=(~I&65535))c=-1;else{n(16);k=p;for(p=0;k>0&&p<q;)k--,u&=i-1,d(8),c[t+p++]=C[u++]=e(8),n(8);k==0&&(D=-1);c=p}break;case 1:if(B!=null)c=K(o,v+b,s-b);else a:{c=o;t=v+b;q=s-b;if(O==null){for(var f=void 0,p=Array(288),f=void 0,f=0;f<144;f++)p[f]=8;for(;f<256;f++)p[f]=9;for(;f<280;f++)p[f]=7;for(;f<288;f++)p[f]=8;P=7;f=new l(p,288,257,T,U,P);if(f.status!=0){alert("HufBuild error: "+f.status);c=-1;break a}O=f.root;P=f.m;for(f=0;f<30;f++)p[f]=5;zip_fixed_bd=5;f=new l(p,30,0,V,W,zip_fixed_bd);if(f.status>1){O=null;alert("HufBuild error: "+f.status);c=-1;break a}X=f.root;zip_fixed_bd=f.m}B=O;R=X;r=P;F=zip_fixed_bd;c=K(c,t,q)}break;case 2:c=B!=null?K(o,v+b,s-b):a(o,v+b,s-b);break;default:c=-1}if(c==-1){if(M)return 0;return-1}b+=c}return b}function z(a,d){var e=v(d,0,d.length);if(e>0){var b="";for(j=0;j<e;j++)b+=String.fromCharCode(d[j]);a.write(b)}return e}var i=32768,aa=0,Z=9,$=6,C,u,O=null,X,P,I,H,D,M,k,L,B,R,r,F,J,N,Y=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],T=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],U=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],V=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],W=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],Q={};if(typeof module=="object"){module.exports=Q;var ba=require("fs")}else G.JSInflate=Q;Q.inflate=function(a){var d,e,b;o();J=a;N=0;d=Array(1024);for(a="";(e=v(d,0,d.length))>0;)for(b=0;b<e;b++)a+=String.fromCharCode(d[b]);J=null;return a};Q.inflateStream=function(a,d,e){var b,c;o();J=a;c=N=0;var i=ba.createWriteStream(d);b=Array(1024);var k=0;i.on("drain",function(){k=z(i,b);k>0?c+=k:(J=null,e(c))});c+=z(i,b)}})(this);(function(){var G="　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／\～∥｜…‥‘’“”（）〔〕［］｛｝〈〉《》「」『』【】＋－±× ÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓~0b∈∋⊆⊇⊂⊃∪∩~08∧∨￢⇒⇔∀∃~0b∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬~07Å‰♯♭♪†‡¶~04◯~2a０１２３４５６７８９~07ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ~07ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ~04ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん~26ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミ ムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ~08ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ~08αβγδεζηθικλμνξοπρστυφχψω~2xАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ~0fабвгдеёжзийклмн опрстуфхцчшщъыьэюя~0d─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂~rk亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭~1v院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円 園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改~1v魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫 橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄~1v機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救 朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈~1v掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨 劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向~1v后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降 項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷~1v察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止 死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周~1v宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳 準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾~1v拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨 逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線~1v繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻 操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只~1v叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄 逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓~1v邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬 凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入~1v如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅 楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美~1v鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷 斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋~1v法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆 摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒~1v諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲 沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯~1v蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕".replace(/~(..)/g,function(A,E){return Array(parseInt(E,36)+1).join(" ")});String.prototype.sjis2utf16=function(){return this.replace(/[?-?]./g,function(A){A=A.charCodeAt(0)<<8|A.charCodeAt(1);return G.charAt(A-33089)})}})(this);(function(G){function A(){this.files={};this.directories={};this.record=null}function E(){}function l(a){this.version=a.read_int16();this.bitFlag=a.read_int16();this.method=a.read_int16();this.fileTime=a.read_int16();this.fileDate=a.read_int16();this.crc32=a.read_int();this.size=a.read_int();this.fileSize=a.read_int();this.nameLength=a.read_int16();this.extraLength=a.read_int16();this.name=a.read_text(this.nameLength);this.extra=a.read_ascii(this.extraLength);this.data=a.read(this.size)}function d(a){this.version=a.read_int16();this.extVersion=a.read_int16();this.bitFlag=a.read_int16();this.method=a.read_int16();this.fileTime=a.read_int16();this.fileDate=a.read_int16();this.crc32=a.read_int();this.size=a.read_int();this.fileSize=a.read_int();this.nameLength=a.read_int16();this.extraLength=a.read_int16();this.commentLength=a.read_int16();this.diskNumberStart=a.read_int16();this.attributes=a.read_int16();this.extAttributes=a.read_int();this.headerOffset=a.read_int();this.name=a.read_text(this.nameLength);this.extra=a.read_text(this.extraLength);this.comment=a.read_text(this.commentLength)}function e(a){this.bytes=a;this.length=a.length}function n(a){for(var a=new e(a),o={file:67324752,header:134695760,directory:33639248,record:101010256},n=new A,z;!a.eos();){var i=a.read_int(4);if(i==o.file)z=new l(a),n.files[z.name]=z;else if(i==o.header)z.header=new l.Header(a);else if(i==o.directory)i=new d(a),n.directories[i.name]=i;else if(i==o.record)i=new d.Record(a),n.record=i;else throw"Invalid ZIP header.";}delete a;delete byes;return n}function K(a,d){var e=new XMLHttpRequest;e.open("GET",a);e.onload=function(){for(var a=e.responseText,i=[],l=0;l<a.length;l++)i.push(a.charCodeAt(l)&255);d(n(i))};e.overrideMimeType("text/plain;charset=x-user-defined");e.send(null)}G.Zip||(G.Zip={inflate:n,inflate_file:K});E.prototype={version:0,bitFlag:0,method:0,fileTime:0,fileDate:0,crc32:0,size:0,fileSize:0,nameLength:0,extraLength:0,name:null,extra:null,modified:function(){return new Date(1980+(this.fileDate>>9),(this.fileDate>>5&15)-1,this.fileDate&31,this.fileTime>>11,this.fileTime>>5&60)}};l.prototype=new E;l.prototype.data=null;l.prototype.header=null;l.prototype.inflate=function(){var a=String.fromCharCode.apply(null,this.data);return this.method==0?a:JSInflate.inflate(a)};l.Header=function(a){this.crc32=a.read_int();this.size=a.read_int();this.fileSize=this.read_int()};l.Header.prototype={crc32:0,size:0,fileSize:0};d.prototype=new E;d.prototype.extVersion=0;d.prototype.commentLength=null;d.prototype.comment=null;d.prototype.diskNumberStart=0;d.prototype.attributes=0;d.prototype.extAttributes=0;d.prototype.headerOffset=0;d.prototype.record=null;d.Record=function(a){this.diskNumber=a.read_int16();this.startNumber=a.read_int16();this.diskLength=a.read_int16();this.length=a.read_int16();this.directorySize=a.read_int();this.offset=a.read_int();this.commentLength=a.read_int16();this.comment=a.read_text(this.commentLength)};d.Record.prototype={diskNumber:0,startNumber:0,diskLength:0,length:0,directorySize:0,offset:0,commentLength:0,comment:null};e.prototype={position:0,eos:function(){return this.position>=this.length},read:function(a){var d=this.bytes.slice(this.position,this.position+a);this.position+=a;return d},read_ascii:function(a){return String.fromCharCode.apply(null,this.read(a))},read_text:function(a){a=this.read_ascii(a);return a.sjis2utf16?a.sjis2utf16():a},read_int:function(){var a=this.read(4);return a[0]|a[1]<<8|a[2]<<16|a[3]<<24},read_int16:function(){var a=this.read(2);return a[0]|a[1]<<8}}})($);


function unpack(blob)
{
    var bytes = []
    for (i = 0; i < blob.length; i++)
        bytes[i] = blob.charCodeAt(i) & 0xff
    return bytes
}

/* -----------------------------------------------
 * extend jQuery object
 * -----------------------------------------------
 */
$.extend({
    zip: {
        inflate: function(bytes) {
            return jQuery.Zip.inflate(bytes)
        },
        unpack: function(blob) {
            return unpack(blob)
        }
    }
        
})

/* -----------------------------------------------
 * ajax request extension
 * -----------------------------------------------
 * if ajax dataType option is 'zip', then inflate data
 * before success method is called
 */
$.ajaxSetup({
    accepts: {zip: 'application/zip'},
    contents: {zip: /zip/},
    converters: {
        'text zip': function(blob){
            var bytes = []
            for (var i = 0; i < blob.length; i++)
                bytes.push(blob.charCodeAt(i) & 0xff)
            return jQuery.Zip.inflate(bytes)
        }
    },
})


//
// override jQuery.ajax
// if ajax 'dataType' option value is 'zip', then
// force mimetype as 'text/plain; charset=x-user-defined'
//
$.ajax = (function(ajax){
    return function(option){
        // process if datatype is zip
        if (!option.dataType && option.url.split('?')[0].match(/\.zip$/))
            option.dataType = 'zip'
        
        if (option.dataType == 'zip'){
            option.beforeSend = (function(callback){
                return function(xhr){
                    xhr.overrideMimeType('text/plain; charset=x-user-defined')
                    callback(xhr)
                }
            })(option.beforeSend || function(xhr){})
        }
        
        return ajax.apply(this, arguments)
    }
})($.ajax)

//
})(jQuery)


