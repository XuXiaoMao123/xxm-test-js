/**
 * 表单验证类，用于确保输入数据的有效性。
 * 支持自定义验证规则、错误提示和异步验证。
 * @example
 * ```typescript
 * const validator = new FormValidator();
 * validator.addRule('username', (value) => value.length >= 3, '用户名至少需要 3 个字符');
 * validator.addRule('username', (value) => /^[a-zA-Z0-9_]+$/.test(value), '用户名只能包含字母、数字和下划线');
 * const result = await validator.validateField('username', 'ab');
 * console.log(result); // { isValid: false, errors: ['用户名至少需要 3 个字符', '用户名只能包含字母、数字和下划线'] }
 * ```
 */
class FormValidator {
  private rules: { [field: string]: ((value: unknown) => boolean | Promise<boolean>)[] } = {};
  private errorMessages: { [field: string]: string[] } = {};

  /**
   * 为指定字段添加验证规则。
   * @param field - 要验证的字段名。
   * @param rule - 验证规则函数，返回布尔值或 Promise<布尔值>。
   * @param message - 验证失败时的错误提示信息。
   * @example
   * ```typescript
   * const validator = new FormValidator();
   * validator.addRule('email', (value) => typeof value === 'string' && /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,})$/i.test(value), '请输入有效的邮箱地址');
   * ```
   */
  addRule(field: string, rule: (value: unknown) => boolean | Promise<boolean>, message: string) {
    if (!this.rules[field]) {
      this.rules[field] = [];
      this.errorMessages[field] = [];
    }
    this.rules[field].push(rule);
    this.errorMessages[field].push(message);
  }

  /**
   * 验证指定字段的值。
   * @param field - 要验证的字段名。
   * @param value - 要验证的值。
   * @returns 包含验证结果和错误信息的对象。
   * @example
   * ```typescript
   * const validator = new FormValidator();
   * validator.addRule('age', (value) => typeof value === 'number' && value >= 18, '必须年满 18 岁');
   * const result = await validator.validateField('age', 16);
   * console.log(result); // { isValid: false, errors: ['必须年满 18 岁'] }
   * ```
   */
  async validateField(
    field: string,
    value: unknown
  ): Promise<{ isValid: boolean; errors: string[] }> {
    const rules = this.rules[field] || [];
    const messages = this.errorMessages[field] || [];
    const errors: string[] = [];

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const result = await rule(value);
      if (!result) {
        errors.push(messages[i]);
      }
    }

    return { isValid: errors.length === 0, errors };
  }

  /**
   * 验证整个表单。
   * @param formData - 包含表单字段和值的对象。
   * @returns 包含每个字段验证结果和错误信息的数组。
   * @example
   * ```typescript
   * const validator = new FormValidator();
   * validator.addRule('username', (value) => value.length >= 3, '用户名至少需要 3 个字符');
   * validator.addRule('password', (value) => value.length >= 6, '密码至少需要 6 个字符');
   * const formData = { username: 'ab', password: '123' };
   * const result = await validator.validateForm(formData);
   * console.log(result); // [ { field: 'username', isValid: false, errors: ['用户名至少需要 3 个字符'] }, { field: 'password', isValid: false, errors: ['密码至少需要 6 个字符'] } ]
   * ```
   */
  async validateForm(formData: {
    [field: string]: unknown;
  }): Promise<{ field: string; isValid: boolean; errors: string[] }[]> {
    const results: { field: string; isValid: boolean; errors: string[] }[] = [];
    for (const field in this.rules) {
      const { isValid, errors } = await this.validateField(field, formData[field]);
      results.push({ field, isValid, errors });
    }
    return results;
  }

  /**
   * 添加常用的手机号验证规则。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的手机号'。
   */
  addPhoneRule(field: string, message: string = '请输入有效的手机号') {
    this.addRule(
      field,
      (value) => typeof value === 'string' && /^1[3-9]\d{9}$/.test(value),
      message
    );
  }

  /**
   * 添加常用的邮箱验证规则。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的邮箱地址'。
   */
  addEmailRule(field: string, message: string = '请输入有效的邮箱地址') {
    this.addRule(
      field,
      (value) =>
        typeof value === 'string' &&
        /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,})$/i.test(value),
      message
    );
  }

  /**
   * 添加常用的身份证验证规则。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的身份证号码'。
   */
  addIDCardRule(field: string, message: string = '请输入有效的身份证号码') {
    this.addRule(
      field,
      (value) =>
        typeof value === 'string' &&
        /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(value),
      message
    );
  }

  /**
   * 添加常用的 URL 验证规则。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的 URL'。
   * @example
   * ```typescript
   * const validator = new FormValidator();
   * validator.addURLRule('website', '请输入有效的网站地址');
   * const result = await validator.validateField('website', 'https://example.com');
   * console.log(result); // { isValid: true, errors: [] }
   * ```
   */
  addURLRule(field: string, message: string = '请输入有效的 URL') {
    this.addRule(
      field,
      (value) =>
        typeof value === 'string' &&
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,})([\w .-]*)*\/?$/i.test(value),
      message
    );
  }

  /**
   * 添加常用的数字范围验证规则。
   * @param field - 要验证的字段名。
   * @param min - 最小值。
   * @param max - 最大值。
   * @param message - 验证失败时的错误提示信息，默认为 '数值必须在 {min} 到 {max} 之间'。
   */
  addNumberRangeRule(
    field: string,
    min: number,
    max: number,
    message: string = `数值必须在 ${min} 到 ${max} 之间`
  ) {
    this.addRule(
      field,
      (value) => typeof value === 'number' && value >= min && value <= max,
      message
    );
  }

  /**
   * 添加常用的邮政编码验证规则。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的邮政编码'。
   */
  addPostalCodeRule(field: string, message: string = '请输入有效的邮政编码') {
    this.addRule(
      field,
      (value) => typeof value === 'string' && /^[1-9]\d{5}$/.test(value),
      message
    );
  }

  /**
   * 添加常用的用户名格式验证规则。
   * 允许字母、数字、下划线，长度 3 到 20 个字符。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '用户名必须由 3 到 20 个字母、数字或下划线组成'。
   */
  addUsernameRule(
    field: string,
    message: string = '用户名必须由 3 到 20 个字母、数字或下划线组成'
  ) {
    this.addRule(
      field,
      (value) => typeof value === 'string' && /^[a-zA-Z0-9_]{3,20}$/.test(value),
      message
    );
  }

  /**
   * 添加常用的 IPv4 地址验证规则。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的 IPv4 地址'。
   */
  addIPv4Rule(field: string, message: string = '请输入有效的 IPv4 地址') {
    this.addRule(
      field,
      (value) =>
        typeof value === 'string' &&
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
          value
        ),
      message
    );
  }

  /**
   * 添加常用的日期格式验证规则。
   * 支持 YYYY-MM-DD 格式。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的日期格式（YYYY-MM-DD）'。
   */
  addDateRule(
    field: string,
    message: string = '请输入有效的日期格式（YYYY-MM-DD、YYYY/MM/DD 或 YYYY.MM.DD）'
  ) {
    this.addRule(
      field,
      (value) =>
        typeof value === 'string' &&
        /^\d{4}[-/.](0[1-9]|1[0-2])[-/.](0[1-9]|[12]\d|3[01])$/.test(value),
      message
    );
  }

  /**
   * 添加常用的 IPv6 地址验证规则。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的 IPv6 地址'。
   */
  addIPv6Rule(field: string, message: string = '请输入有效的 IPv6 地址') {
    this.addRule(
      field,
      (value) =>
        typeof value === 'string' &&
        /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/.test(
          value
        ),
      message
    );
  }

  /**
   * 添加常用的信用卡号验证规则。
   * 支持 Visa、MasterCard、American Express 等常见信用卡号。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的信用卡号'。
   */
  addCreditCardRule(field: string, message: string = '请输入有效的信用卡号') {
    this.addRule(
      field,
      (value) =>
        typeof value === 'string' &&
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(
          value
        ),
      message
    );
  }

  /**
   * 添加常用的 MAC 地址验证规则。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的 MAC 地址'。
   */
  addMACRule(field: string, message: string = '请输入有效的 MAC 地址') {
    this.addRule(
      field,
      (value) =>
        typeof value === 'string' && /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(value),
      message
    );
  }

  /**
   * 添加常用的银行卡号验证规则。
   * 简单验证长度为 12 到 19 位数字。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的银行卡号'。
   */
  addBankCardRule(field: string, message: string = '请输入有效的银行卡号') {
    this.addRule(field, (value) => typeof value === 'string' && /^\d{12,19}$/.test(value), message);
  }

  /**
   * 添加常用的社会信用代码验证规则。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的社会信用代码'。
   */
  addSocialCreditCodeRule(field: string, message: string = '请输入有效的社会信用代码') {
    this.addRule(
      field,
      (value) =>
        typeof value === 'string' &&
        /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(value),
      message
    );
  }

  /**
   * 添加常用的车牌号验证规则。
   * 支持普通燃油车和新能源车号牌。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的车牌号'。
   */
  addLicensePlateRule(field: string, message: string = '请输入有效的车牌号') {
    this.addRule(
      field,
      (value) =>
        typeof value === 'string' &&
        /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF][A-HJ-NP-Z0-9][0-9]{4})|(?:[0-9]{6}))$/.test(
          value
        ),
      message
    );
  }

  /**
   * 添加常用的 QQ 号验证规则。
   * QQ 号通常为 5 到 11 位数字。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的 QQ 号'。
   */
  addQQRule(field: string, message: string = '请输入有效的 QQ 号') {
    this.addRule(
      field,
      (value) => typeof value === 'string' && /^[1-9]\d{4,10}$/.test(value),
      message
    );
  }

  /**
   * 添加常用的微信号验证规则。
   * 微信号以字母开头，允许 6 到 20 位字母、数字、下划线和减号。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的微信号'。
   */
  addWeChatRule(field: string, message: string = '请输入有效的微信号') {
    this.addRule(
      field,
      (value) => typeof value === 'string' && /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(value),
      message
    );
  }

  /**
   * 添加常用的密码强度验证规则。
   * 密码至少 8 位，包含大小写字母、数字和特殊字符中的至少三种。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '密码至少 8 位，需包含大小写字母、数字和特殊字符中的至少三种'。
   */
  addPasswordStrengthRule(
    field: string,
    message: string = '密码至少 8 位，需包含大小写字母、数字和特殊字符中的至少三种'
  ) {
    this.addRule(
      field,
      (value) => {
        if (typeof value !== 'string') return false;
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);
        const conditions = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
        return value.length >= 8 && conditions >= 3;
      },
      message
    );
  }

  /**
   * 添加常用的中文姓名验证规则。
   * 允许 2 到 4 个中文字符。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '请输入有效的中文姓名'。
   */
  addChineseNameRule(field: string, message: string = '请输入有效的中文姓名') {
    this.addRule(
      field,
      (value) => typeof value === 'string' && /^[一-龥]{2,4}$/.test(value),
      message
    );
  }

  // 添加文件扩展名验证
  /**
   * 添加文件扩展名验证规则。
   * @param field - 要验证的字段名。
   * @param extensions - 允许的文件扩展名数组。
   * @param message - 验证失败时的错误提示信息，默认为 '文件格式不支持'。
   * @returns 无返回值，该方法直接将验证规则添加到验证器中。
   */
  addFileExtensionRule(field: string, extensions: string[], message: string = '文件格式不支持') {
    // 转义扩展名中的特殊字符
    const escapedExtensions = extensions.map((ext) => ext.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    // 构造正则表达式
    const pattern = new RegExp(`^(?!.*\\..*\\.)[^.]*\\.(${escapedExtensions.join('|')})$`, 'i');
    // 添加校验规则
    this.addRule(field, (value) => typeof value === 'string' && pattern.test(value), message);
  }

  /**
   * 添加必填字段验证规则。
   * @param field - 要验证的字段名。
   * @param message - 验证失败时的错误提示信息，默认为 '此字段为必填项'。
   * @returns 无返回值，该方法直接将验证规则添加到验证器中。
   */
  addRequiredRule(field: string, message: string = '此字段为必填项') {
    this.addRule(
      field,
      (value) => {
        if (typeof value === 'string') return value.trim() !== '';
        if (Array.isArray(value)) return value.length > 0;
        return value !== undefined && value !== null;
      },
      message
    );
  }

  /**
   * 添加最大长度验证规则。
   * @param field - 要验证的字段名。
   * @param maxLength - 最大长度。
   * @param message - 验证失败时的错误提示信息，默认为 '长度不能超过 {maxLength} 个字符'。
   * @returns 无返回值，该方法直接将验证规则添加到验证器中。
   */
  addMaxLengthRule(
    field: string,
    maxLength: number,
    message: string = `长度不能超过 ${maxLength} 个字符`
  ) {
    this.addRule(
      field,
      (value) => {
        if (typeof value === 'string') return value.length <= maxLength;
        if (Array.isArray(value)) return value.length <= maxLength;
        return true; // 对于其他类型，不进行长度验证
      },
      message
    );
  }
  /**
   * 添加最小长度验证规则。
   * @param field - 要验证的字段名。
   * @param minLength - 最小长度。
   * @param message - 验证失败时的错误提示信息，默认为 '长度不能小于 {minLength} 个字符'。
   * @returns 无返回值，该方法直接将验证规则添加到验证器中。
   */
  addMinLengthRule(
    field: string,
    minLength: number,
    message: string = `长度不能小于 ${minLength} 个字符`
  ) {
    this.addRule(
      field,
      (value) => {
        if (typeof value === 'string') return value.length >= minLength;
        if (Array.isArray(value)) return value.length >= minLength;
        return true; // 对于其他类型，不进行长度验证
      },
      message
    );
  }
}

export { FormValidator };
