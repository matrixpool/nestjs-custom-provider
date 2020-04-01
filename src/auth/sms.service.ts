import * as _SMS from '@alicloud/pop-core';
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';

@Injectable()
export class SmsService extends _SMS {
  private logger: Logger;

  constructor(
  ) {
    super({
      accessKeyId: 'LTAI4FwFRBMPvTiGuus6X1o9',
      accessKeySecret: '1ei9JzsBTXhL8THfesT1Rhv6Y1FiVm',
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25'
    });
    this.logger = new Logger();
  }

  /**
   * 发送短信验证码
   */
  async send(): Promise<any> {
    const req = {
      RegionId: 'cn-chengdu',
      SignName: '优客来享',
      TemplateCode: 'SMS_186950016',
      TemplateParam: JSON.stringify({
        code: '123456',
      }),
      PhoneNumbers: '18908184119',
    };

    /**
     * 当向同一手机发送短信验证码过于频繁，会导致异常
     * 目前短信系统设置的是每分钟不超过5条短信
     */
    try {
      const result: any = await this.request('SendSms', req, {
        method: 'POST',
      });
      if (result.Code === 'OK') {
        return true;
      } else {
        this.logger.error(result);
        throw new ServiceUnavailableException();
      }
    } catch (err) {
      this.logger.error(err);
      throw new ServiceUnavailableException(err);
    }
  }
}
