import { configureStore , combineReducers} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';
// import persistReducer from 'redux-persist/es/persistReducer';
import themReducer from './theme/themeSlice'
const rootReducer=combineReducers({
    user:userReducer,
    theme:themReducer
})
const persisConfig={
    key:root,
    storage,
    version:1
}
const persistedReducer= persistReducer(persisConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultmiddleWare)=>getDefaultmiddleWare({serializableCheck:false})
})
export const persistor= persistStore(store)