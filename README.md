# 🇹🇭 Thai License Plate Score Checker

A Thai-language web application for checking and rating vehicle license plate driving behavior scores.

## 🚀 Features

- **Search License Plates**: Search by prefix, number, and province
- **View Scores**: See total driving behavior scores and latest comments
- **Vote System**: Rate driving behavior from -10 to +10 with comments
- **Daily Voting Limit**: One vote per user per license plate per day using FingerprintJS
- **Add New Plates**: Create new license plate entries if not found
- **Thai Language**: Complete Thai language interface
- **Mobile-First**: Responsive design with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js + React + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Fingerprinting**: FingerprintJS
- **Styling**: Tailwind CSS with Thai fonts

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd thai-license-checker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   DATABASE_URL=your_supabase_database_url
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

### License Table
- `id`: Unique identifier
- `prefix`: Thai letters (e.g., "กข")
- `number`: Numeric part (e.g., "1234")
- `province`: Thai province name
- `votes`: Related votes

### Vote Table
- `id`: Unique identifier
- `licenseId`: Reference to license
- `score`: Rating from -10 to +10
- `comment`: Optional comment
- `userFingerprint`: User identification
- `createdAt`: Timestamp

## 🎯 Usage

1. **Search**: Enter license plate details (prefix, number, province)
2. **View Results**: See total score and latest comment
3. **Vote**: Rate driving behavior and add comments
4. **Add New**: Create new license plate entries if not found

## 🔧 API Endpoints

- `GET /api/licenses/search` - Search for license plates
- `POST /api/licenses` - Create new license plate
- `POST /api/votes` - Submit a vote
- `GET /api/votes/check` - Check if user can vote

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Add environment variables
3. Deploy

### Database (Supabase)
1. Create a new Supabase project
2. Run the Prisma migrations
3. Configure RLS policies if needed

## 📱 Mobile Support

The application is fully responsive and optimized for mobile devices with:
- Touch-friendly interface
- Optimized form inputs
- Mobile-first design approach

## 🔒 Security Features

- **Fingerprint-based voting limits**: Prevents multiple votes per day
- **Input validation**: Server-side validation for all inputs
- **SQL injection protection**: Using Prisma ORM
- **Rate limiting**: Built-in protection against abuse

## 🌟 Future Enhancements

- [ ] CAPTCHA integration
- [ ] User authentication with Supabase Auth
- [ ] Image upload for driving incidents
- [ ] Leaderboard of worst offenders
- [ ] Push notifications
- [ ] Advanced analytics dashboard

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.
