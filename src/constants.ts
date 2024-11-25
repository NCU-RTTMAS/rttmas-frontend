// export const BACKEND_HOST_ORIGIN = window.location.origin.replace(':5173', '')
export const BACKEND_HOST_ORIGIN = window.location.origin.replace(':5173', '').replace(':8080', '')

export const API_URL = `${BACKEND_HOST_ORIGIN}:8080`
// export const API_URL = `https://rttmas.mwnl.ce.ncu.edu.tw`

export const SOCKETIO_URL = `${BACKEND_HOST_ORIGIN}/socket.io`

export const APP_TITLE = "RTTMAS"