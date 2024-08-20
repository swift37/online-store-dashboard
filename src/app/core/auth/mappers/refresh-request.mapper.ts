import { RefreshRequest } from '../models/refresh-request.model';
import { RefreshRequest as RefreshRequestDTO } from './../../services/api/api.client';

export class RefreshRequestMapper {
  public static toDTO(refreshRequest: RefreshRequest): RefreshRequestDTO {
    return {
      userId: refreshRequest.userId,
      refreshToken: refreshRequest.refreshToken,
    };
  }
}
