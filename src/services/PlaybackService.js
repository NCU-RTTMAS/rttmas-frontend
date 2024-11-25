import { httpClient } from '@/http'


export default class PlaybackService {
    
    queryObjectPlayback(objectType, targetIdentifier, startTime, endTime) {
        const queryParams = {
            object_type: objectType,
            target_identifier: targetIdentifier,
            start_time: startTime,
            end_time: endTime,
        }

        return httpClient.get("playback", { params: queryParams })
    }

    queryAvailableObjects(query) {
        const queryParams = {
            query: query,
        }
        return httpClient.get("playback/objects", { params: queryParams })
    }
}