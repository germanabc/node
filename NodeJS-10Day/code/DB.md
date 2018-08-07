# 常用命令

- SHOW DATABASES;               查看所有的数据库
- CREATE DATABASE 数据库名称;  创建数据库
- DROP DATABASE 数据库名称;    删除指定数据库
- USE 数据库名称;              切换到指定数据库
- SELECT DATABASE();           查看当前切换的数据库


## 增删改查

### 新增数据

```sql
INSERT INTO 表名 VALUES(列1值, 列2值, [列n值...]);
```

例如：向 users 表中插入一条数据：

```sql
INSERT INTO users VALUES(NULL, 'zhangsan', '123456', 1, 19);
```

```sql
INSERT INTO 表名(列名, 列名[,列名...]) VALUES(列值, 列值, [,列值...]);
```

INSERT INTO users(username, password) VALUES('lisi', 'abc123456');

```sql
-- 不指定列名按照表结构顺序添加数据
INSERT INTO users
  VALUES
   (
     NULL,
     'zhangsan',
     '123456',
     1,
     19
   );

-- 指定列名添加数据
INSERT INTO users(username, password) VALUES('lisi', 'abc123456');
```
