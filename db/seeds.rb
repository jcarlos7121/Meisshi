AdminUser.delete_all
AdminUser.create!([
  {email: "admin@meisshi.com", 
   password: 'meisshiadmin',
   password_confirmation: 'meisshiadmin'}
])
