/*
  ========================================
  ملف JavaScript لموقع تليد وجديد
  ========================================
  يحتوي على جميع الوظائف التفاعلية
  مثل البحث والتصفية والأنميشن
*/

// ========================================
// 1. متغيرات عامة
// ========================================
// هنا نحفظ المتغيرات التي نستخدمها في كل الموقع

// متغير يحتوي على الفئة المختارة حالياً
let currentCategory = 'all';

// متغير يحتوي على نص البحث الحالي
let currentSearchTerm = '';

// ========================================
// 2. وظيفة البحث عن المنتجات
// ========================================
// هذه الوظيفة تبحث عن المنتجات بناءً على اسمها

function searchProducts() {
  // الحصول على قيمة حقل البحث
  const searchInput = document.getElementById('searchInput');
  currentSearchTerm = searchInput.value.toLowerCase(); // تحويل النص إلى أحرف صغيرة
  
  // تطبيق التصفية (البحث والفئة معاً)
  filterProducts();
}

// ========================================
// 3. وظيفة التصفية حسب الفئة
// ========================================
// هذه الوظيفة تصفي المنتجات حسب الفئة المختارة

function filterByCategory(category) {
  // تحديث الفئة الحالية
  currentCategory = category;
  
  // تحديث الأزرار (إضافة وإزالة الفئة النشطة)
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    // إزالة الفئة النشطة من جميع الأزرار
    btn.classList.remove('active');
    
    // إضافة الفئة النشطة للزر المختار
    if (btn.textContent.trim() === category || 
        (category === 'all' && btn.textContent.includes('جميع'))) {
      btn.classList.add('active');
    }
  });
  
  // تطبيق التصفية
  filterProducts();
}

// ========================================
// 4. وظيفة التصفية الرئيسية
// ========================================
// هذه الوظيفة تصفي المنتجات بناءً على الفئة والبحث معاً

function filterProducts() {
  // الحصول على جميع بطاقات المنتجات
  const products = document.querySelectorAll('.product-card');
  
  // متغير لحساب عدد المنتجات المعروضة
  let visibleCount = 0;
  
  // المرور على كل منتج
  products.forEach(product => {
    // الحصول على فئة المنتج
    const productCategory = product.getAttribute('data-category');
    
    // الحصول على اسم المنتج
    const productName = product.getAttribute('data-name').toLowerCase();
    
    // التحقق من تطابق الفئة
    const categoryMatch = currentCategory === 'all' || productCategory === currentCategory;
    
    // التحقق من تطابق البحث
    const searchMatch = productName.includes(currentSearchTerm);
    
    // إذا تطابقت الفئة والبحث، إظهار المنتج
    if (categoryMatch && searchMatch) {
      product.style.display = 'block';
      visibleCount++;
    } else {
      // وإلا، إخفاء المنتج
      product.style.display = 'none';
    }
  });
  
  // الحصول على رسالة عدم وجود نتائج
  const noResults = document.getElementById('noResults');
  
  // إذا لم يكن هناك منتجات مرئية، إظهار الرسالة
  if (visibleCount === 0) {
    noResults.style.display = 'block';
  } else {
    // وإلا، إخفاء الرسالة
    noResults.style.display = 'none';
  }
}

// ========================================
// 5. وظيفة الانتقال السلس عند تحميل الصفحة
// ========================================
// هذه الوظيفة تشغل الأنميشن عند تحميل الصفحة

window.addEventListener('load', function() {
  // إضافة فئة الأنميشن للعناصر
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.animation = 'fadeInDown 1s ease-out';
  }
});

// ========================================
// 6. وظيفة معالجة مفتاح الإدخال (Enter) في البحث
// ========================================
// عندما يضغط المستخدم على Enter، سيتم البحث

document.addEventListener('DOMContentLoaded', function() {
  // الحصول على حقل البحث
  const searchInput = document.getElementById('searchInput');
  
  // إضافة حدث الاستماع لمفتاح الإدخال
  if (searchInput) {
    searchInput.addEventListener('keypress', function(event) {
      // التحقق من أن المفتاح المضغوط هو Enter
      if (event.key === 'Enter') {
        searchProducts(); // تشغيل وظيفة البحث
      }
    });
    
    // إضافة حدث الاستماع لكل كتابة في حقل البحث
    searchInput.addEventListener('input', function() {
      searchProducts(); // تشغيل البحث الفوري
    });
  }
});

// ========================================
// 7. وظيفة سلس التمرير للروابط
// ========================================
// عندما ينقر المستخدم على رابط، سيتم التمرير السلس

document.addEventListener('DOMContentLoaded', function() {
  // الحصول على جميع الروابط الداخلية
  const links = document.querySelectorAll('a[href^="#"]');
  
  // المرور على كل رابط
  links.forEach(link => {
    // إضافة حدث الاستماع للنقر
    link.addEventListener('click', function(e) {
      // منع السلوك الافتراضي
      e.preventDefault();
      
      // الحصول على معرف العنصر المستهدف
      const targetId = this.getAttribute('href');
      
      // الحصول على العنصر المستهدف
      const targetElement = document.querySelector(targetId);
      
      // إذا كان العنصر موجوداً
      if (targetElement) {
        // التمرير السلس إليه
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// ========================================
// 8. وظيفة إضافة تأثير عند التمرير على المنتجات
// ========================================
// هذا يضيف تأثيرات بصرية عند التمرير على المنتجات

document.addEventListener('DOMContentLoaded', function() {
  // الحصول على جميع بطاقات المنتجات
  const productCards = document.querySelectorAll('.product-card');
  
  // المرور على كل بطاقة
  productCards.forEach(card => {
    // إضافة حدث الاستماع عند التمرير
    card.addEventListener('mouseenter', function() {
      // إضافة تأثير الظل والرفع (تم تعريفه في CSS)
      this.style.transform = 'translateY(-8px)';
    });
    
    // إضافة حدث الاستماع عند مغادرة التمرير
    card.addEventListener('mouseleave', function() {
      // إزالة التأثير
      this.style.transform = 'translateY(0)';
    });
  });
});

// ========================================
// 9. وظيفة تحديث أزرار الفئات عند التحميل
// ========================================
// هذا يضمن أن الزر الأول (جميع المنتجات) نشط عند التحميل

document.addEventListener('DOMContentLoaded', function() {
  // تشغيل التصفية الأولية
  filterProducts();
});

// ========================================
// 10. وظيفة إضافة منتج جديد (اختيارية)
// ========================================
// إذا أردت إضافة منتج جديد برمجياً، يمكنك استخدام هذه الوظيفة

function addProduct(name, category, price, description, imageUrl) {
  // الحصول على حاوية المنتجات
  const container = document.getElementById('productsContainer');
  
  // إنشاء عنصر div جديد لبطاقة المنتج
  const newProduct = document.createElement('div');
  newProduct.className = 'product-card';
  newProduct.setAttribute('data-category', category);
  newProduct.setAttribute('data-name', name);
  
  // ملء البطاقة بالمحتوى
  newProduct.innerHTML = `
    <div class="product-image">
      <img src="${imageUrl}" alt="${name}">
    </div>
    <div class="product-info">
      <h3 class="product-name">${name}</h3>
      <p class="product-description">${description}</p>
      <p class="product-price">${price} ريال</p>
      <span class="product-category" style="display:none;">${category}</span>
      <a href="https://wa.me/966536655941?text=مرحباً، أرغب في الاستفسار عن منتج: ${name}" 
         target="_blank" 
         class="whatsapp-btn">
        💬 استفسر عبر واتساب
      </a>
    </div>
  `;
  
  // إضافة البطاقة الجديدة إلى الحاوية
  container.appendChild(newProduct);
  
  // تطبيق التصفية لإظهار المنتج الجديد
  filterProducts();
}

// ========================================
// 11. وظيفة تسجيل الأخطاء (للتصحيح)
// ========================================
// هذا يساعد في تصحيح الأخطاء إذا حدثت

console.log('✅ تم تحميل ملف JavaScript بنجاح');
console.log('📱 الموقع جاهز للاستخدام');
