import React from 'react';
import '../index.css';
import { Route, BrowserRouter, Switch, useHistory } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import Footer from './Footer'
import CurrentUserContext from '../contexts/CurrentUserContext'
import api from '../utils/api';
import EditProfilePopup from './EditeProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditeAvatarPopup'
import Register from './Register'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import auth from '../utils/auth'
function App() {
  const history = useHistory()
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([])
  function handleConfirmDeleteClick() {
    setIsConfirmPopupOpen(true)
  }
  function handleCardLike(cardId) {
    api.likeCard(cardId).then((newCard) => {
      const newCards = cards.map((item) => item._id === cardId ? newCard : item)
      setCards(newCards);
    }).catch(err => console.error(err))
  }
  function handleAddPlaceClick(item) {
    api.createCard(item).then((item) => {
      setCards([item, ...cards])
    }).catch(err => console.error(err))
  }
  function onLogin(email, password) {
    auth.getLogin(email, password)
      .then(() => {
        console.log(email, password)
        setIsLoggedIn(true)
        console.log(history)
        history.push('/')
      }).catch(err => console.log(err))
  }
  function onRegister(email, password) {
    auth.getRegister(password, email).then(() => {
      history.push('/signin');
    }).catch((err) => {
      console.log(err)
    });
  }
  function onSignOut() {
    localStorage.removeItem('jwt')
    setIsLoggedIn(false)
    history.push('/signin')
  }
  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      auth.checkToken(jwt).then((res) => {
        if(res) {
          setIsLoggedIn(true)
          history.push('/')
          setEmail(res.data.email)
        }
      })
    }
  }
  function handleCardDislike(cardId) {
    api.dislikeCard(cardId).then((newCard) => {
      const newCards = cards.map((item) => item._id === cardId ? newCard : item)
      setCards(newCards);
    }).catch(err => console.error(err))
  }
  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then(() => {
      const newCards = cards.filter(item => item._id !== cardId)
      setCards(newCards);
    }).catch(err => console.error(err))
  }
  function handleUpdateUser(item) {
    api.editInformation(item).then((item) => {
      setCurrentUser({ ...currentUser, name: item.name, about: item.about })
    }).catch(err => console.error(err))
  }
  function handleUpdateAvatar(item) {
    api.editAvatar(item).then((item) => {
      setCurrentUser({ ...currentUser, avatar: item.avatar })
    }).catch(err => console.error(err))
  }
  function closePopups() {
    setIsProfilePopupOpen(false)
    setIsAddPopupOpen(false)
    setIsAvatarPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setSelectedCard({})
  }
  function handleEditProfileClick() {
    setIsProfilePopupOpen(true)
  }
  function handleAddCardClick() {
    setIsAddPopupOpen(true)
  }
  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }
  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="page">
        <BrowserRouter>
          <Header setOnSIgnOut={onSignOut} onTokenCheck={handleTokenCheck} />
          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddCardClick}
              onConfirmDelete={handleConfirmDeleteClick}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              onCardDislike={handleCardDislike}
              cardsMap={cards}
              setingCards={setCards}
              onCurrentUser={setCurrentUser}
              editProfileisOpen={isProfilePopupOpen}
              addCardisOpen={isAddPlacePopupOpen}
              editAvatarIsOpen={isEditAvatarPopupOpen}
              confirmDeleteIsOpen={isConfirmPopupOpen}
              component={Main}
            />
            <Route path="/signin">
              <Login setOnLogin={onLogin} />
            </Route>
            <Route path="/signup">
              <Register setOnRegister={onRegister} />
            </Route>
          </Switch>
        </BrowserRouter>
        <ImagePopup onClose={closePopups} isOpen={selectedCard.link} link={selectedCard.link} name={selectedCard.name} />
        <EditProfilePopup
          isOpen={isProfilePopupOpen}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closePopups}
          onAddPlace={handleAddPlaceClick}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closePopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm name="popup_confirm" isOpen={isConfirmPopupOpen} title="Вы уверены?"
          children={
            <>
            </>
          }
          onClose={closePopups} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
