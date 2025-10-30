// ============================================
// BOOK DATA
// ============================================

// const booksData = [
//   {
//     id: 1,
//     title: "The Midnight Library",
//     author: "Matt Haig",
//     language: "English",
//     category: "Fiction",
//     description: "A dazzling novel about all the choices that go into a life well lived.",
//     publishDate: "2020",
//     cover: "📚",
//     comments: [
//       { author: "Sarah M.", date: "2024-01-15", text: "A beautiful and thought-provoking read!" },
//       { author: "John D.", date: "2024-01-10", text: "Absolutely loved this book. Highly recommended!" },
//     ],
//   },
//   {
//     id: 2,
//     title: "The Seven Husbands of Evelyn Hugo",
//     author: "Taylor Jenkins Reid",
//     language: "English",
//     category: "Romance",
//     description: "A reclusive Hollywood icon finally tells her story in this captivating novel.",
//     publishDate: "2017",
//     cover: "💕",
//     comments: [{ author: "Emma L.", date: "2024-01-12", text: "Couldn't put it down!" }],
//   },
//   {
//     id: 3,
//     title: "Dune",
//     author: "Frank Herbert",
//     language: "English",
//     category: "Science",
//     description: "An epic science fiction novel set on the desert planet Arrakis.",
//     publishDate: "1965",
//     cover: "🌍",
//     comments: [],
//   },
//   {
//     id: 4,
//     title: "The Hobbit",
//     author: "J.R.R. Tolkien",
//     language: "English",
//     category: "Fantasy",
//     description: "A fantasy adventure about a hobbit's unexpected journey.",
//     publishDate: "1937",
//     cover: "🧙",
//     comments: [{ author: "Michael R.", date: "2024-01-08", text: "A classic that never gets old!" }],
//   },
//   {
//     id: 5,
//     title: "Crime and Punishment",
//     author: "Fyodor Dostoevsky",
//     language: "Russian",
//     category: "Fiction",
//     description: "A psychological novel exploring guilt, morality, and redemption.",
//     publishDate: "1866",
//     cover: "📖",
//     comments: [],
//   },
//   {
//     id: 6,
//     title: "War and Peace",
//     author: "Leo Tolstoy",
//     language: "Russian",
//     category: "History",
//     description: "An epic novel set during the Napoleonic Wars.",
//     publishDate: "1869",
//     cover: "⚔️",
//     comments: [{ author: "Anna K.", date: "2024-01-05", text: "A masterpiece of literature!" }],
//   },
//   {
//     id: 7,
//     title: "The Alchemist",
//     author: "Paulo Coelho",
//     language: "French",
//     category: "Adventure",
//     description: "A philosophical novel about following your dreams.",
//     publishDate: "1988",
//     cover: "✨",
//     comments: [],
//   },
//   {
//     id: 8,
//     title: "Les Misérables",
//     author: "Victor Hugo",
//     language: "French",
//     category: "History",
//     description: "An epic tale of love, justice, and redemption in 19th century France.",
//     publishDate: "1862",
//     cover: "🎭",
//     comments: [{ author: "Pierre D.", date: "2024-01-03", text: "Absolutely magnificent!" }],
//   },
//   {
//     id: 9,
//     title: "The Sorrows of Young Werther",
//     author: "Johann Wolfgang von Goethe",
//     language: "German",
//     category: "Romance",
//     description: "A tragic love story that influenced a generation.",
//     publishDate: "1774",
//     cover: "💔",
//     comments: [],
//   },
//   {
//     id: 10,
//     title: "Faust",
//     author: "Johann Wolfgang von Goethe",
//     language: "German",
//     category: "Poetry",
//     description: "A dramatic poem about a scholar's deal with the devil.",
//     publishDate: "1808",
//     cover: "🔮",
//     comments: [],
//   },
//   {
//     id: 11,
//     title: "O'zbek Xalq Dostoni",
//     author: "Unknown",
//     language: "Uzbek",
//     category: "Poetry",
//     description: "Traditional Uzbek folk poetry and tales.",
//     publishDate: "Ancient",
//     cover: "🎵",
//     comments: [],
//   },
//   {
//     id: 12,
//     title: "Navoi's Divan",
//     author: "Alisher Navoi",
//     language: "Uzbek",
//     category: "Poetry",
//     description: "Classical Uzbek poetry collection.",
//     publishDate: "1500",
//     cover: "📜",
//     comments: [],
//   },
//   {
//     id: 13,
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     language: "English",
//     category: "Fiction",
//     description: "A classic American novel about wealth and love.",
//     publishDate: "1925",
//     cover: "🥂",
//     comments: [{ author: "Robert T.", date: "2024-01-01", text: "A timeless classic!" }],
//   },
//   {
//     id: 14,
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     language: "English",
//     category: "Fiction",
//     description: "A powerful story about racial injustice and moral growth.",
//     publishDate: "1960",
//     cover: "🐦",
//     comments: [],
//   },
//   {
//     id: 15,
//     title: "1984",
//     author: "George Orwell",
//     language: "English",
//     category: "Science",
//     description: "A dystopian novel about totalitarianism and surveillance.",
//     publishDate: "1949",
//     cover: "👁️",
//     comments: [],
//   },
// ]

// ============================================
// FILTER STATE
// ============================================

let currentLanguageFilter = "all"
let currentCategoryFilter = "all"
let currentSearchQuery = ""

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  updateLogoutLink()
  initializeCursorProximityEffects()
})

// ============================================
// NAVIGATION
// ============================================

function initializeNavigation() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
      })
    })
  }
}

function updateLogoutLink() {
  const logoutLink = document.getElementById("logoutLink")
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  if (logoutLink) {
    if (isLoggedIn) {
      logoutLink.style.display = "inline-block"
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("userEmail")
        localStorage.removeItem("userName")
        window.location.href = "index.html"
      })
    } else {
      logoutLink.style.display = "none"
    }
  }
}

// ============================================
// BOOK DISPLAY FUNCTIONS
// ============================================

function displayBooks(books) {
  const booksGrid = document.getElementById("booksGrid")
  if (!booksGrid) return

  booksGrid.innerHTML = ""

  if (books.length === 0) {
    booksGrid.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No books found matching your criteria.</p>'
    return
  }

  books.forEach((book) => {
    const bookCard = createBookCard(book)
    booksGrid.appendChild(bookCard)
  })
}

function createBookCard(book) {
  const card = document.createElement("div")
  card.className = "book-card"
  card.innerHTML = `
        <div class="book-cover">${book.cover}</div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <div class="book-meta">
                <span class="book-tag">${book.language}</span>
                <span class="book-tag">${book.category}</span>
            </div>
            <p class="book-description">${book.description}</p>
            <div class="book-actions">
                <a href="detail.html?id=${book.id}" class="btn btn-primary btn-small">View Details</a>
            </div>
        </div>
    `
  return card
}

function displayAllBooks() {
  displayBooks(booksData)
}

// ============================================
// FILTERING FUNCTIONS
// ============================================

function filterBooks() {
  let filtered = booksData

  // Apply language filter
  if (currentLanguageFilter !== "all") {
    filtered = filtered.filter((book) => book.language === currentLanguageFilter)
  }

  // Apply category filter
  if (currentCategoryFilter !== "all") {
    filtered = filtered.filter((book) => book.category === currentCategoryFilter)
  }

  // Apply search filter
  if (currentSearchQuery) {
    const query = currentSearchQuery.toLowerCase()
    filtered = filtered.filter(
      (book) => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query),
    )
  }

  displayBooks(filtered)
}

// ============================================
// EVENT LISTENERS FOR FILTERS
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Language filter buttons
  const languageButtons = document.querySelectorAll('[data-filter="language"]')
  languageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all language buttons
      languageButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")
      // Update filter
      currentLanguageFilter = this.dataset.value
      filterBooks()
    })
  })

  // Category filter buttons
  const categoryButtons = document.querySelectorAll('[data-filter="category"]')
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all category buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")
      // Update filter
      currentCategoryFilter = this.dataset.value
      filterBooks()
    })
  })

  // Search input
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      currentSearchQuery = this.value
      filterBooks()
    })
  }

  // Display books on homepage
  const booksGrid = document.getElementById("booksGrid")
  if ((booksGrid && window.location.pathname.includes("index.html")) || window.location.pathname === "/") {
    displayBooks(booksData)
  }
})

// ============================================
// BOOK DETAIL PAGE
// ============================================

function displayBookDetail() {
  const urlParams = new URLSearchParams(window.location.search)
  const bookId = Number.parseInt(urlParams.get("id")) || 1
  const book = booksData.find((b) => b.id === bookId)

  if (!book) {
    window.location.href = "index.html"
    return
  }

  const bookDetail = document.getElementById("bookDetail")
  if (bookDetail) {
    bookDetail.innerHTML = `
            <div class="detail-grid">
                <div class="detail-cover">${book.cover}</div>
                <div class="detail-info">
                    <h1>${book.title}</h1>
                    <div class="detail-meta">
                        <div class="meta-item">
                            <span class="meta-label">Author:</span>
                            <span class="meta-value">${book.author}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Language:</span>
                            <span class="meta-value">${book.language}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Category:</span>
                            <span class="meta-value">${book.category}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Published:</span>
                            <span class="meta-value">${book.publishDate}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="detail-description">
                <h2>About This Book</h2>
                <p>${book.description}</p>
            </div>
        `
  }

  // Display comments
  const commentsList = document.getElementById("commentsList")
  if (commentsList) {
    if (book.comments.length === 0) {
      commentsList.innerHTML =
        '<p style="text-align: center; color: #666;">No comments yet. Be the first to comment!</p>'
    } else {
      commentsList.innerHTML = book.comments
        .map(
          (comment) => `
                <div class="comment">
                    <div class="comment-author">${comment.author}</div>
                    <div class="comment-date">${comment.date}</div>
                    <div class="comment-text">${comment.text}</div>
                </div>
            `,
        )
        .join("")
    }
  }
}

function initializeCursorProximityEffects() {
  const interactiveElements = document.querySelectorAll(".book-card, .filter-btn, .btn, .nav-link")

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX
    const mouseY = e.clientY

    interactiveElements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      const elementCenterX = rect.left + rect.width / 2
      const elementCenterY = rect.top + rect.height / 2

      const distance = Math.sqrt(Math.pow(mouseX - elementCenterX, 2) + Math.pow(mouseY - elementCenterY, 2))

      const proximityThreshold = 150

      if (distance < proximityThreshold) {
        const intensity = 1 - distance / proximityThreshold

        // Apply color shift for light blue elements
        if (element.classList.contains("filter-btn") || element.classList.contains("btn")) {
          const hslShift = intensity * 15
          element.style.filter = `hue-rotate(${hslShift}deg) brightness(${1 + intensity * 0.1})`
        }

        // Apply subtle scale effect
        element.style.transform = `scale(${1 + intensity * 0.05})`
      } else {
        element.style.filter = "none"
        element.style.transform = ""
      }
    })
  })
}
