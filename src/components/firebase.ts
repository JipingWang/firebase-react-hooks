import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: "AIzaSyAk0794OsQuDuoEdUfF9nUM_zD17lfRXEE",
	authDomain: "codedamn-socialapp.firebaseapp.com",
	databaseURL: "https://codedamn-socialapp.firebaseio.com",
	projectId: "codedamn-socialapp",
	storageBucket: "codedamn-socialapp.appspot.com",
	messagingSenderId: "263473733320"
}

class Firebase {
	auth: app.auth.Auth;
	db: app.firestore.Firestore;
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email: string, password: string) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name: string, email: string, password: string) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser!.updateProfile({
			displayName: name
		})
	}

	addQuote(quote: any) { //to-do
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise((resolve:any) => { //to-do
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser!.uid}`).get() //todo
		return quote.get('quote')
	}
}

export default new Firebase()