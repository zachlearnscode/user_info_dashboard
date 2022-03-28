export default class User {
  constructor(name, username, email, street, suite, city, zip_code, phone, website, company_name, company_motto) {
    this.name = name,
    this.username = username,
    this.email = email,
    this.address = {},
    this.address.street = street,
    this.address.suite = suite,
    this.address.city = city,
    this.address.zipcode = zip_code,
    this.phone = phone,
    this.website = website,
    this.company = {},
    this.company.name = company_name,
    this.company.catchPhrase = company_motto
  }
}