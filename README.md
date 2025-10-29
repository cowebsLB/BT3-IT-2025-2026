# BT3 IT Course Website

A modern, animated website for the BT3 IT Study Course at ETSTC, featuring a beautiful design with smooth animations, responsive mobile navigation, dynamic features, and student collaboration tools.

## 🌟 Features

### Design & User Experience
- **Modern Webflow-style Design**: Beautiful gradient backgrounds, animated elements, and smooth transitions
- **Light/Dark Mode Toggle**: Floating theme switcher with glassmorphism effects and persistent preferences
- **Responsive Mobile Navigation**: Hamburger menu with sidebar that works seamlessly on mobile devices
- **Smooth Animations**: Scroll-triggered reveals, floating elements, and interactive hover effects
- **Glassmorphism Effects**: Modern backdrop blur and transparency effects throughout
- **Gradient Text & Backgrounds**: Eye-catching gradient animations with smooth color transitions
- **Performance Optimized**: Reduced animations on low-end devices, respects `prefers-reduced-motion`

### Pages
- **Home (`index.html`)**: Hero section, student spotlights, and quick links
- **Subjects (`pages/subjects.html`)**: Dynamic listing with real-time search functionality
- **Subject Details (`pages/subject.html`)**: Individual subject pages with query parameter validation
- **Gallery (`pages/gallery.html`)**: Dynamic photo gallery that loads from JSON configuration
- **Student Resources (`pages/resources.html`)**: Study materials, links, and downloadable files with previews
- **Chat (`pages/chat.html`)**: Student chat/forum page ready for Supabase integration

### Mobile Features
- **Hamburger Menu**: Transforms to X icon when opened with smooth animations
- **Sidebar Navigation**: Slides in from the right with gradient background
- **Background Scroll Lock**: Prevents scrolling when sidebar is open
- **Click Outside to Close**: Intuitive UX for closing the sidebar
- **Keyboard Support**: Escape key closes sidebar and modals

### Advanced Features
- **Subject Search**: Real-time search bar to quickly find subjects by name or description
- **Dynamic Gallery**: Automatically loads images from JSON configuration file
- **Document Previews**: Preview PDFs, images, and text files before downloading
- **URL Validation**: Prevents broken URLs with query parameter validation
- **Empty States**: Friendly "coming soon" messages for sections without content
- **Dark Mode**: Full dark theme support with smooth theme switching

## 📁 Project Structure

```
BT3 IT COURSE/
│
├── index.html                 # Home page
├── css/
│   └── main.css              # Main stylesheet with animations
├── js/
│   └── main.js               # Shared JavaScript utilities
├── pages/
│   ├── subjects.html         # Subject listing page
│   ├── subject.html          # Dynamic subject detail page
│   ├── gallery.html          # Gallery page
│   └── resources.html        # Student resources page
├── assets/
│   ├── icons/                # Icon files
│   ├── images/               # Image files (hero images, gallery photos, etc.)
│   └── gallery-config.json   # Gallery images configuration file
├── js/
│   ├── main.js               # Shared utilities and dark mode handler
│   ├── gallery.js            # Dynamic gallery loader
│   └── docs-preview.js       # Document preview functionality
└── docs/                      # Course materials organized by subject
    ├── Assemblage/
    ├── math/
    ├── methodology/
    ├── PAS (OS)/
    └── resaux (network)/
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for testing)

### Installation

1. **Clone or Download** this repository to your local machine

2. **Open the Website**
   - Option 1: Simply open `index.html` in your web browser
   - Option 2: Use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the Website**
   - Navigate to `http://localhost:8000` in your browser
   - Or open `index.html` directly

## 🎨 Design System

### Colors
- **Primary Blue**: `#2563eb`
- **Primary Dark**: `#1e40af`
- **Accent Purple**: `#7c3aed`
- **Accent Cyan**: `#06b6d4`
- **Gradients**: Blue to Purple to Cyan
- **Dark Mode**: Slate color palette with full theme support

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Fallback**: System fonts (San Francisco, Segoe UI, etc.)

### Animations
- **Fade In Up**: Elements fade in while moving up
- **Floating**: Subtle vertical movement animation
- **Gradient Shift**: Animated gradient backgrounds (15-20s cycles)
- **Scroll Reveal**: Elements animate in on scroll with Intersection Observer
- **Performance**: Automatically reduced on mobile and respects `prefers-reduced-motion`

## 📱 Mobile Navigation

The hamburger menu is automatically enabled on screens smaller than 768px:

- **Hamburger Icon**: Shows on mobile devices
- **Sidebar**: Slides in from the right with gradient background
- **Interactive States**:
  - Hamburger transforms to X when menu is open
  - Background scrolling is disabled when sidebar is open
  - Click outside or press Escape to close
  - Links automatically close sidebar on click

## 🔧 Customization

### Adding Subjects

To add a new subject to the course:

1. Create a new folder in `docs/` with your subject name
2. Update the `subjects` array in `pages/subjects.html`:
   ```javascript
   const subjects = [
       // ... existing subjects
       {
           name: 'New Subject',
           folder: 'new-subject-folder',
           description: 'Description of the new subject.',
           icon: '📚'
       }
   ];
   ```
3. Update the `subjects` object in `pages/subject.html` with the same information

### Adding Gallery Images (Dynamic)

The gallery now automatically loads images from a JSON configuration file:

1. Add image files to `assets/images/` folder (jpg, png, webp supported)
2. Edit `assets/gallery-config.json`:
   ```json
   {
     "images": [
       {
         "src": "assets/images/your-photo.jpg",
         "alt": "Photo description",
         "title": "Photo Title",
         "description": "Optional longer description",
         "category": "classes"
       }
     ]
   }
   ```
3. The gallery will automatically render your images with hover effects and lightbox functionality

**Note**: If `gallery-config.json` doesn't exist, the gallery will show a friendly "Coming Soon" message.

### Adding Document Previews

To enable preview functionality for downloadable files:

1. Add the `data-document-preview` attribute to any download link:
   ```html
   <a href="docs/file.pdf" data-document-preview="docs/file.pdf" download>
     Download PDF
   </a>
   ```
2. A "Preview" button will automatically appear next to the link
3. Supported formats:
   - **PDFs**: Embedded iframe preview
   - **Images**: Direct image preview (jpg, png, gif, webp)
   - **Text files**: Text preview (.txt, .md)
   - **Other formats**: Shows friendly message prompting download

### Enabling Dark Mode

Dark mode is available via a floating toggle button (bottom-right corner):
- Theme preference is saved in localStorage
- Persists across page navigations
- Smooth transitions between themes
- All components support dark mode automatically

### Modifying Styles

All styles are in `css/main.css`. Key custom properties:
- `--primary-blue`: Main blue color
- `--accent-purple`: Purple accent
- `--gradient-blue`: Main gradient pattern

### Changing Animations

Animation timings and effects can be adjusted in `css/main.css`:
- `@keyframes` definitions control animation behavior
- Transition durations can be modified for faster/slower effects

## 📄 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Issues & Limitations

- **Gallery**: Requires `assets/gallery-config.json` file and images in `assets/images/` folder. Falls back to "Coming Soon" if config is missing.
- **Document Previews**: PDF previews require CORS-enabled servers for cross-origin files. Local files work fine.
- **Chat**: Currently shows "Coming Soon" page - requires Supabase setup for full functionality.
- **Subject Content**: Course materials need to be added to `docs/` folders by instructors.
- **Performance**: Animations automatically reduce on mobile devices and respect accessibility preferences.
- **Browser Support**: Some advanced features (backdrop-filter) may not work in older browsers, but fallbacks are provided.

## 📝 Features & Functionality

### ✅ Implemented Features
- ✅ Dynamic gallery with JSON configuration
- ✅ Real-time subject search
- ✅ Light/dark mode toggle with persistence
- ✅ Document preview system (PDF, images, text)
- ✅ Mobile hamburger menu with sidebar
- ✅ Query parameter validation
- ✅ Empty state messaging
- ✅ Performance optimizations
- ✅ Chat/forum page structure
- ✅ Smooth animations and transitions

### 🚀 Future Enhancements
- [ ] Implement Supabase integration for chat functionality
- [ ] Add subject content rendering from `docs/` folders
- [ ] Implement file upload for gallery
- [ ] Add language/i18n support
- [ ] Add student dashboard/login functionality
- [ ] Real-time notifications
- [ ] Advanced search filters
- [ ] Bookmark/favorite subjects

## 🛠️ Technical Details

### JavaScript Modules
- **`js/main.js`**: Core utilities, dark mode handler, query parameter helpers
- **`js/gallery.js`**: Dynamic gallery loader with lightbox functionality
- **`js/docs-preview.js`**: Document preview system for PDFs and files

### Configuration Files
- **`assets/gallery-config.json`**: Gallery image configuration (optional)
- **LocalStorage**: Stores user theme preference (`theme: 'light' | 'dark'`)

### Browser APIs Used
- **Intersection Observer**: For scroll-triggered animations
- **LocalStorage**: For theme persistence
- **Fetch API**: For loading gallery configuration
- **URLSearchParams**: For query parameter handling

### Performance Features
- Lazy image loading
- Reduced animations on mobile (`prefers-reduced-motion` support)
- `will-change` hints for GPU acceleration
- Optimized animation durations for older devices

## 🤝 Contributing

This is a student project for BT3 IT Course at ETSTC. To contribute:

1. Make your changes
2. Test thoroughly on multiple devices and browsers
3. Ensure mobile navigation works correctly
4. Test dark mode functionality
5. Verify search and preview features work
6. Update this README if adding new features
7. Keep the code clean and well-commented

## 📧 Contact

For questions about the course or website:
- **Email**: itcourse@etstc.edu
- **Telegram**: [ETSTC Student Community](https://t.me/joinchat/ETSTC-StudentCommunity)

## 📜 License

© 2024 BT3 IT Course, ETSTC. All rights reserved.

## 🙏 Acknowledgments

- **ETSTC**: For providing the course framework
- **Tailwind CSS**: For utility-first CSS framework
- **Google Fonts**: For Inter font family
- **Students**: For feedback and contributions

---

## 📚 Quick Reference

### File Structure Key Points
- **Gallery Images**: `assets/images/` + `assets/gallery-config.json`
- **Course Materials**: `docs/[subject-name]/`
- **JavaScript**: `js/` folder contains all interactive functionality
- **Styles**: `css/main.css` contains all custom styles and animations

### Common Tasks

**Add a gallery image:**
1. Place image in `assets/images/`
2. Add entry to `assets/gallery-config.json`
3. Refresh page

**Enable document preview:**
1. Add `data-document-preview="path/to/file"` to download link
2. Preview button appears automatically

**Change theme:**
- Click the floating button (bottom-right) or toggle in code via `localStorage.setItem('theme', 'dark')`

**Add searchable subject:**
1. Update subjects array in `pages/subjects.html`
2. Update subjects object in `pages/subject.html`
3. Add folder to `docs/`

---

**Built with ❤️ for BT3 IT Course Students**

#   B T 3 - I T - 2 0 2 5 - 2 0 2 6  
 