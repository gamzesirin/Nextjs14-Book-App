import Credentials from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Mock veri olarak bir kullanıcı tanımlıyoruz
                const user = {'id': 1, 'email': 'gamze@gmail.com', 'password': '123'}
                
                // Kullanıcının girdiği bilgileri mock veri ile karşılaştırıyoruz
                if (user.email === credentials.email && user.password === credentials.password) {
                    return user // Eğer bilgiler eşleşirse kullanıcıyı döndürüyoruz
                } else {
                    return null // Eşleşme yoksa null döndürüyoruz
                }
            }
        })
    ],
    callbacks: {
        async jwt(token, user) {
            // JWT oluşturulurken kullanıcı bilgilerini token'a ekliyoruz
            if (user) {
                token.user = user
            }
            return token
        },
        async session(session, user) {
            // Oturum oluşturulurken kullanıcı bilgilerini session'a ekliyoruz
            session.user = user.user
            return session
        }
    },
    pages: {
        signIn: '/auth/login', // Özel giriş sayfasının yolunu belirtiyoruz
    },
    secret: process.env.NEXTAUTH_SECRET, // JWT imzalamak için kullanılacak gizli anahtarı belirliyoruz
    session: {
        strategy: 'jwt', // Oturum yönetimi için JWT stratejisini kullanıyoruz
    }
}