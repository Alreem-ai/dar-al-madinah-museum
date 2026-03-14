import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isArabic = locale === 'ar';

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="museum-card overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* About Us Column */}
          <div className="md:w-1/2 p-8 lg:p-12 ltr:border-r rtl:border-l border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
              {isArabic ? 'من نحن' : 'About Us'}
            </h2>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              {isArabic ? 'رؤيتنا وتاريخنا' : 'Our Mission & History'}
            </h3>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              {isArabic 
                ? 'يعد المتحف من أهم معالم المدينة، فهو أول متحف يعرض الإرث الحضاري الإسلامي بطرق إبداعية. افتتح المتحف سنة 2011م للعمل على المحافظة على الآثار الإسلامية والمعمارية والنقوش التاريخية ليتصل حاضر الأمة بماضيها.' 
                : 'The museum is one of the most important landmarks in Medina, as it is the first museum to display the Islamic civilizational heritage in creative ways. It opened in 2011 to work on preserving Islamic antiquities and architectural history.'}
            </p>
            
            {/* Image Placeholder */}
            <div className="w-full h-64 bg-slate-100 flex items-center justify-center rounded">
              <span className="text-slate-400">Image</span>
            </div>
          </div>
          
          {/* Contact Us Column */}
          <div className="md:w-1/2 p-8 lg:p-12 bg-slate-50">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
              {isArabic ? 'اتصل بنا' : 'Contact Us'}
            </h2>
            
            <div className="space-y-6">
              {/* Get in touch */}
              <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
                <Phone className="text-slate-400 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-slate-800">{isArabic ? 'تواصل معنا' : 'Get in Touch'}</h4>
                  <p className="text-sm text-slate-600 mt-1">+966 5X XXX XXXX</p>
                </div>
              </div>
              
              {/* Contact Form Placeholder */}
              <div className="pb-4 border-b border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-3">{isArabic ? 'نموذج التواصل' : 'Contact Form'}</h4>
                <div className="space-y-3">
                  <input type="text" placeholder={isArabic ? 'الاسم' : 'Name'} className="w-full text-sm p-2 border border-slate-300 rounded" />
                  <input type="email" placeholder={isArabic ? 'البريد الإلكتروني' : 'Email'} className="w-full text-sm p-2 border border-slate-300 rounded" />
                  <textarea placeholder={isArabic ? 'رسالتك' : 'Message'} className="w-full text-sm p-2 border border-slate-300 rounded h-20"></textarea>
                  <button className="bg-slate-600 text-white px-4 py-2 rounded text-sm hover:bg-slate-700 transition">
                    {isArabic ? 'إرسال' : 'Submit'}
                  </button>
                </div>
              </div>

              {/* Location Map */}
              <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
                <MapPin className="text-slate-400 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-slate-800">{isArabic ? 'موقعنا' : 'Location Map'}</h4>
                  <a href="https://maps.app.goo.gl/AS88ixWjvBm1JpV37" target="_blank" rel="noopener noreferrer" className="text-sm text-gold-600 hover:underline flex items-center gap-1 mt-1">
                    {isArabic ? 'عرض على خرائط جوجل' : 'View on Google Maps'}
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
                <Mail className="text-slate-400 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-slate-800">{isArabic ? 'البريد الإلكتروني' : 'Email'}</h4>
                  <p className="text-sm text-slate-600 mt-1">info@daralmadinah.com</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
