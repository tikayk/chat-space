# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|

### Association
- has_many :groups
- has_many :messages
- has_many :groups_users


## groupssテーブル

|Column|Type|Options|
|------|----|-------|
|group|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|comments_id|integer|null: false, foreign_key: true|

### Association
- has_many :users
- has_many :groups_users
- has_many :messages


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text||
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :groups
