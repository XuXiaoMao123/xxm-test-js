# 表单验证类（FormValidator）

## 概述

`FormValidator` 类用于确保输入数据的有效性。支持自定义验证规则、错误提示和异步验证。

## 版权信息

版权所有 © 2024 xxm

## 类签名

```typescript
/** * 表单验证类，用于确保输入数据的有效性。
 * 支持自定义验证规则、错误提示和异步验证。
 * @example
 * const validator = new FormValidator();
 * validator.addRule('username', (value) => value.length >= 3, '用户名至少需要 3 个字符');
 * validator.addRule('username', (value) => /^[a-zA-Z0-9_]+$/.test(value), '用户名只能包含字母、数字和下划线');
 * const result = await validator.validateField('username', 'ab');
 * console.log(result); // { isValid: false, errors: ['用户名至少需要 3 个字符', '用户名只能包含字母、数字和下划线'] }
 *
 */
class FormValidator {
  private rules: { [field: string]: ((value: any) => boolean | Promise<boolean>)[] } = {};
  private errorMessages: { [field: string]: string[] } = {};
}
```

## 方法

### addRule()

为指定字段添加自定义验证规则。

**参数**：

- `field` - 要验证的字段名。
- `rule` - 验证规则函数，返回布尔值或 Promise<布尔值>。
- `message` - 验证失败时的错误提示信息。
  **示例**：

```typescript
const validator = new FormValidator();
validator.addRule(
  'email',
  (value) => /^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(value),
  '请输入有效的邮箱地址'
);
```

### validateField()

验证指定字段的值。

**参数**：

- `field` - 要验证的字段名。
- `value` - 要验证的值。

**返回值**：
包含验证结果和错误信息的对象。

**示例**：

```typescript
const validator = new FormValidator();
validator.addRule('age', (value) => typeof value === 'number' && value >= 18, '必须年满 18 岁');
const result = await validator.validateField('age', 16);
console.log(result); // { isValid: false, errors: ['必须年满 18 岁'] }
```

### validateForm()

验证整个表单。

**参数**：

- `formData` - 包含表单字段和值的对象。

**返回值**：
包含每个字段验证结果和错误信息的数组。

**示例**：

```typescript
const validator = new FormValidator();
validator.addRule('username', (value) => value.length >= 3, '用户名至少需要 3 个字符');
validator.addRule('password', (value) => value.length >= 6, '密码至少需要 6 个字符');
const formData = { username: 'ab', password: '123' };
const result = await validator.validateForm(formData);
console.log(result); // [
// { field: 'username', isValid: false, errors: ['用户名至少需要 3 个字符'] },
// { field: 'password', isValid: false, errors: ['密码至少需要 6 个字符'] }
//]
```

### addPhoneRule()

添加常用的手机号验证规则。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的手机号'。

### addEmailRule()

添加常用的邮箱验证规则。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的邮箱地址'。

### addIDCardRule()

添加常用的身份证验证规则。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的身份证号码'。

### addURLRule()

添加常用的 URL 验证规则。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的 URL'。

**示例**：

```typescript
const validator = new FormValidator();
validator.addURLRule('website', '请输入有效的网站地址');
const result = await validator.validateField('website', 'https://example.com');
console.log(result); // { isValid: true, errors: [] }
```

### addNumberRangeRule()

添加常用的数字范围验证规则。

**参数**：

- `field` - 要验证的字段名。
- `min` - 最小值。
- `max` - 最大值。
- `message` - 验证失败时的错误提示信息，默认为 '数值必须在 {min} 到 {max} 之间'。

### addPostalCodeRule()

添加常用的邮政编码验证规则。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的邮政编码'。

### addUsernameRule()

添加常用的用户名格式验证规则。允许字母、数字、下划线，长度 3 到 20 个字符。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '用户名必须由 3 到 20 个字母、数字或下划线组成'。

### addIPv4Rule()

添加常用的 IPv4 地址验证规则。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的 IPv4 地址'。

### addDateRule()

添加常用的日期格式验证规则。支持 YYYY-MM-DD、YYYY/MM/DD 或 YYYY.MM.DD 格式。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的日期格式（YYYY-MM-DD、YYYY/MM/DD 或 YYYY.MM.DD）'。

### addIPv6Rule()

添加常用的 IPv6 地址验证规则。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的 IPv6 地址'。

### addCreditCardRule()

添加常用的信用卡号验证规则。支持 Visa、MasterCard、American Express 等常见信用卡号。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的信用卡号'。

### addMACRule()

添加常用的 MAC 地址验证规则。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的 MAC 地址'。

### addBankCardRule()

添加常用的银行卡号验证规则。简单验证长度为 12 到 19 位数字。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的银行卡号'。

### addSocialCreditCodeRule()

添加常用的社会信用代码验证规则。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的社会信用代码'。

### addLicensePlateRule()

添加常用的车牌号验证规则。支持普通燃油车和新能源车号牌。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的车牌号'。

### addQQRule()

添加常用的 QQ 号验证规则。QQ 号通常为 5 到 11 位数字。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的 QQ 号'。

### addWeChatRule()

添加常用的微信号验证规则。微信号以字母开头，允许 6 到 20 位字母、数字、下划线和减号。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的微信号'。

### addPasswordStrengthRule()

添加常用的密码强度验证规则。密码至少 8 位，包含大小写字母、数字和特殊字符中的至少三种。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '密码至少 8 位，需包含大小写字母、数字和特殊字符中的至少三种'。

### addChineseNameRule()

添加常用的中文姓名验证规则。允许 2 到 4 个中文字符。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '请输入有效的中文姓名'。

### addFileExtensionRule()

添加文件扩展名验证规则。

**参数**：

- `field` - 要验证的字段名。
- `extensions` - 允许的文件扩展名数组。
- `message` - 验证失败时的错误提示信息，默认为 '文件格式不支持'。

**返回值**：
无返回值，该方法直接将验证规则添加到验证器中。

### addRequiredRule()

添加必填字段验证规则。

**参数**：

- `field` - 要验证的字段名。
- `message` - 验证失败时的错误提示信息，默认为 '此字段为必填项'。
  **返回值**：无返回值，该方法直接将验证规则添加到验证器中。

### addMaxLengthRule()

添加最大长度验证规则。

**参数**：

- `field` - 要验证的字段名。
- `maxLength` - 最大长度。
- `message` - 验证失败时的错误提示信息，默认为 '长度不能超过 {maxLength} 个字符'。

**返回值**：
无返回值，该方法直接将验证规则添加到验证器中。

### addMinLengthRule()

添加最小长度验证规则。

**参数**：

- `field` - 要验证的字段名。
- `minLength` - 最小长度。
- `message` - 验证失败时的错误提示信息，默认为 '长度不能小于 {minLength} 个字符'。

**返回值**：
无返回值，该方法直接将验证规则添加到验证器中。

## 示例用法

```typescript
const validator = new FormValidator();
validator.addRule('username', (value) => value.length >= 3, '用户名至少需要 3 个字符');
validator.addRule(
  'username',
  (value) => /^[a-zA-Z0-9_]+$/.test(value),
  '用户名只能包含字母、数字和下划线'
);
const result = await validator.validateField('username', 'ab');
console.log(result); // { isValid: false, errors: ['用户名至少需要 3 个字符', '用户名只能包含字母、数字和下划线'] }
```

## 适用场景

- 表单验证：在用户提交表单时，确保输入数据的有效性。

## 总结

- `FormValidator` 类是一个方便的工具，它可以帮助我们验证表单数据的有效性，支持自定义验证规则和常用验证规则。

## 引入

- 要在使用的项目中使用 `FormValidator` 类，您可以单独引入：

```typescript
import { FormValidator } from 'xxm-test-js';
```

## 贡献

- 希望这个文档对你有所帮助！如果有任何问题或需要进一步的信息，请随时联系。
