import ClientPage from './ClientPage';

export default function Page() {
  return (
    <>
      {/* 
        ===== SEMANTIC SSR LAYER FOR SEARCH ENGINES & AI CRAWLERS =====
        Rendered 100% on the server in initial HTML payload.
        Ensures Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, and Gemini
        can immediately parse full medical content without running JavaScript.
      */}
      <div className="sr-only" aria-hidden="true">
        <header>
          <h1>د. محمد كمال علي | Dr. Mohamed Kamal Ali</h1>
          <p>استشاري جراحة العظام والإصابات والطب الرياضي | Consultant Orthopedic, Trauma &amp; Sports Medicine Surgeon</p>
          <p>الحركة هي الحياة | Movement is Life</p>
          <p>الموقع الرسمي: https://www.drmohamedkamal.me/</p>
          <p>هاتف وحجز واتساب: +971 54 565 0678</p>
        </header>

        <main>
          {/* Chapter 1: Introduction */}
          <section id="ssr-intro">
            <h2>مقدمة ورسالة الدكتور — Introduction</h2>
            <p>
              «على مدار أكثر من 25 عاماً في جراحة العظام والإصابات، تخصصت في علاج الحالات المعقدة
              التي تؤثر في استقامة الأطراف ووظيفة المفاصل، مع اهتمام خاص بإعادة بناء الأطراف وتصحيح
              التشوهات وإطالة العظام. أؤمن أن الوصول إلى العلاج المناسب يبدأ بالتشخيص الدقيق والفهم
              المتكامل لحالة المريض.»
            </p>
            <p>
              &ldquo;With over 25 years of specialized experience in orthopedic and trauma surgery,
              my primary focus has been the treatment of complex conditions affecting limb alignment
              and joint function, with special emphasis on limb reconstruction, deformity correction,
              and bone lengthening. I believe the optimal outcome begins with rigorous diagnosis and
              deep understanding of each patient&rsquo;s clinical situation.&rdquo;
            </p>
          </section>

          {/* Chapter 2: Biography & Qualifications */}
          <section id="ssr-about">
            <h2>السيرة الذاتية والمؤهلات العلمية — Biography &amp; Credentials</h2>
            <p>
              أنا الدكتور محمد كمال علي، استشاري جراحة العظام والإصابات والطب الرياضي، وحاصل على زمالة
              المجلس الأوروبي لجراحة العظام والإصابات (EBOT). تمتد خبرتي المهنية لأكثر من 25 عاماً،
              عملت خلالها في مؤسسات طبية في مصر وألمانيا والسعودية وسلطنة عُمان ودولة الإمارات.
              أختص في إعادة بناء الأطراف، وتصحيح التشوهات العظمية، وإطالة الأطراف، وعلاج الكسور
              المعقدة وغير الملتئمة، إلى جانب جراحات المفاصل والإصابات الرياضية. وقد أجريت خلال
              مسيرتي أكثر من 500 عملية ناجحة في إعادة بناء الأطراف وحالات الإطالة.
            </p>

            <h3>المؤهلات العلمية:</h3>
            <ul>
              <li>بكالوريوس الطب والجراحة — جامعة عين شمس، القاهرة، مصر (MBBCh)</li>
              <li>ماجستير جراحة العظام — جامعة عين شمس، مصر (MSc Orthopedics)</li>
              <li>أطروحة الدكتوراه في جراحة العظام — جامعة عين شمس، مصر (MD Orthopedic Surgery)</li>
              <li>زمالة جراحة العظام — جامعة دوسلدورف، ألمانيا (Fellowship, University of Düsseldorf)</li>
              <li>زمالة المجلس الأوروبي لجراحة العظام والإصابات (EBOT) — عام 2012</li>
              <li>زميل الكلية الملكية للجراحين في أيرلندا (FRCSI)</li>
            </ul>

            <h3>المسيرة المهنية والخبرات القيادية:</h3>
            <ul>
              <li>1996 - 2001: طبيب مقيم جراحة العظام بمستشفيات جامعة عين شمس بالقاهرة</li>
              <li>2001 - 2004: زميل جراحة العظام بجامعة دوسلدورف بألمانيا</li>
              <li>2004 - 2008: أخصائي جراحة العظام بمستشفى الملك فهد بالمملكة العربية السعودية</li>
              <li>2008 - 2012: استشاري جراحة العظام ووحدة إعادة بناء الأطراف بمستشفى خولة بسلطنة عُمان</li>
              <li>2012 - 2015: أستاذ زائر لجراحة العظام بكلية الخليج الطبية بعجمان</li>
              <li>2015 - 2018: المدير الطبي لمستشفى أمينة بعجمان</li>
              <li>2018 - 2021: استشاري أول لجراحة العظام بمراكز طبية متعددة بالإمارات</li>
              <li>2021 - حتى الآن: استشاري جراحة العظام بمستشفى دار الكمال بالشارقة ومركز العلاج الطبي بعجمان</li>
            </ul>
          </section>

          {/* Chapter 3: 16 Clinical Subspecialties */}
          <section id="ssr-specialties">
            <h2>التخصصات الجراحية الـ 16 — 16 Surgical Subspecialties</h2>
            <ol>
              <li>
                <strong>إعادة بناء الأطراف بالمثبتات الخارجية:</strong>
                تطويل العظام وعلاج التشوهات المعقدة والكسور غير الملتئمة باستخدام تقنيات إليزاروف والإطارات الحلقية.
              </li>
              <li>
                <strong>تصحيح التشوهات بالإطارات سداسية المحاور (Hexapod):</strong>
                تعديل الانحرافات العظمية ثلاثية الأبعاد بدقة حاسوبية متناهية باستخدام نظام تايلور المكاني (Taylor Spatial Frame).
              </li>
              <li>
                <strong>إطالة الأطراف التجميلية والعلاجية:</strong>
                علاج قصر القامة وتفاوت أطوال الطرفين الناتج عن أسباب خلقية أو بعد الإصابات.
              </li>
              <li>
                <strong>تصحيح تقوس الساقين والركبتين:</strong>
                علاج حالات تقوس الساقين للداخل (Genu Varum) وللخارج (Genu Valgum) لاستعادة استقامة المحور الميكانيكي وتخفيف الحمل على المفاصل.
              </li>
              <li>
                <strong>علاج الكسور غير الملتئمة والملتئمة بشكل معيب:</strong>
                إعادة تهيئة مواقع الكسور المستعصية واستعادة التئام العظام الطبيعي بطرق جراحية متقدمة.
              </li>
              <li>
                <strong>استبدال مفصل الركبة الكلي والجزئي:</strong>
                جراحة استبدال مفصل الركبة لمرضى الخشونة المتقدمة وتآكل الغضاريف لاستعادة الحركة دون ألم.
              </li>
              <li>
                <strong>استبدال مفصل الورك:</strong>
                استبدال مفصل الحوض لعلاج الخشونة والكسور المتقدمة وتلف المفصل.
              </li>
              <li>
                <strong>مناظير الركبة وإصابات الغضاريف:</strong>
                إصلاح الغضاريف الهلالية وتنظيف المفصل بالمنظار الجراحي طفيف التوغل.
              </li>
              <li>
                <strong>منظار الكاحل الجراحي:</strong>
                تشخيص وعلاج آلام الكاحل المزمنة وتكلسات المفصل بالمنظار الدقيق.
              </li>
              <li>
                <strong>إعادة بناء الرباط الصليبي (ACL):</strong>
                ترميم وإعادة بناء أربطة الركبة المتضررة لدى الرياضيين باستخدام أحدث تقنيات المنظار.
              </li>
              <li>
                <strong>تثبيت الكسور المعقدة والمضاعفة:</strong>
                إصلاح وتثبيت كسور الأطراف والحوض المعقدة وحالات الحوادث المتعددة.
              </li>
              <li>
                <strong>الطب الرياضي وإصابات الملاعب:</strong>
                علاج تمزق الأربطة والأوتار وإعادة تأهيل الرياضيين للعودة الآمنة للمنافسة.
              </li>
              <li>
                <strong>جراحة وتشوهات القدم والكاحل:</strong>
                تصحيح اعوجاج إبهام القدم (Hallux Valgus)، القدم المسطحة (Flatfoot)، وتشوهات الأصابع.
              </li>
              <li>
                <strong>جراحات الكتف والمرفق:</strong>
                علاج خلع الكتف المتكرر، تمزقات أوتار الكفة المدورة، وتيبس المرفق.
              </li>
              <li>
                <strong>جراحة عظام الأطفال:</strong>
                متابعة وعلاج تشوهات العظام الخلقية وخلع الورك الولادي وتفاوت الأطراف عند الأطفال.
              </li>
              <li>
                <strong>أورام وكيسات العظام الحميدة:</strong>
                استئصال الكيسات العظمية والأورام الحميدة وإعادة ملء الفراغات بالطُعوم العظمية.
              </li>
            </ol>
          </section>

          {/* Chapter 4: Clinical Philosophy & Diagnosis */}
          <section id="ssr-diagnosis">
            <h2>نهج التشخيص والتقييم السريري — Diagnostic Philosophy</h2>
            <p>
              لا يعتمد اختيار العلاج على نتائج الأشعة وحدها، بل على الفحص السريري الدقيق وطبيعة الأعراض
              وتأثيرها في جودة حياة المريض ومستواه الحركي. نركز في تقييم حالات الأطراف والمفاصل على تحليل
              المحور الميكانيكي، وقياس تفاوت أطوال الأطراف، وتقييم حركة المفاصل وثباتها، بما يضمن بناء
              خطة علاجية مخصصة لكل مريض.
            </p>
          </section>

          {/* Chapter 5: Hospitals & Locations */}
          <section id="ssr-locations">
            <h2>مواقع العيادات والمستشفيات — Clinic Locations &amp; Hospital Appointments</h2>
            <article>
              <h3>الشارقة — مستشفى دار الكمال (خيار المستشفى)</h3>
              <p>Dar Al Kamal Hospital — Sharjah, United Arab Emirates</p>
              <p>مخصص للعمليات الجراحية المتقدمة وحالات التنويم واستشارات المستشفى.</p>
              <p>الهاتف والواتساب: +971 54 565 0678</p>
            </article>

            <article>
              <h3>عجمان — مركز العلاج الطبي (خيار العيادة / المركز الطبي)</h3>
              <p>Medical Treatment Center (Elaj Medical Center) — Ajman, United Arab Emirates</p>
              <p>مخصص للاستشارات السريرية والفحص الأولي ومتابعة الحالات بعد الجراحة.</p>
              <p>الهاتف والواتساب: +971 54 565 0678</p>
            </article>
          </section>

          {/* Chapter 6: Booking Information */}
          <section id="ssr-booking">
            <h2>احجز استشارتك الطبية — Book Your Consultation</h2>
            <p>
              يسعدني استقبالكم لتقييم حالتكم ومراجعة الفحوص والتقارير الطبية بدقة لتحديد الخطة العلاجية الأنسب لحالتكم.
            </p>
            <p>
              للحجز المباشر عبر الهاتف أو الواتساب: <a href="tel:+971545650678">+971 54 565 0678</a> | 
              <a href="https://wa.me/971545650678">واتساب د. محمد كمال علي</a>
            </p>
          </section>
        </main>

        <footer>
          <p>© 2026 د. محمد كمال علي — استشاري جراحة العظام والإصابات والطب الرياضي — جميع الحقوق محفوظة.</p>
          <p>www.drmohamedkamal.me</p>
        </footer>
      </div>

      {/* 
        ===== NO-SCRIPT FALLBACK =====
        If a search crawler or user has JavaScript disabled, render a clean,
        beautifully formatted HTML layout directly in the browser.
      */}
      <noscript>
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ fontSize: '2rem', color: '#60a5fa', marginBottom: '0.5rem' }}>د. محمد كمال علي — Dr. Mohamed Kamal Ali</h1>
          <p style={{ fontSize: '1.25rem', color: '#93c5fd' }}>استشاري جراحة العظام والإصابات والطب الرياضي | زمالة المجلس الأوروبي EBOT</p>
          <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
            خبرة أكثر من 25 عاماً وأكثر من 500 عملية ناجحة في إعادة بناء الأطراف وتصحيح التشوهات وإطالة العظام واستبدال المفاصل — الشارقة وعجمان، الإمارات العربية المتحدة.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <a href="https://wa.me/971545650678" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#10b981', color: 'white', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>
              حجز موعد عبر واتساب: 0678 565 54 971+
            </a>
          </div>
        </div>
      </noscript>

      {/* 
        ===== CLIENT-SIDE HIGH-END INTERACTIVE APPLICATION =====
        Loads the luxury hospital tour, video background, GSAP animations, 
        interactive condition selectors, and booking modals.
      */}
      <ClientPage />
    </>
  );
}
