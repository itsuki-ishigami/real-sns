const router = require("express").Router();
const Post = require("../models/Post"); //const Post = mongoose.model("post", PostSchema);と同じ
const User = require("../models/User");

//投稿を作成する
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    }catch(err){
        return res.status(500).json(err);
    }
});

//投稿を更新する
router.put("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            // await Post.updateOne(　<-　Post（コレクション全体）だから条件がいる
            //     { _id: req.params.id },　<-　条件を自分で指定
            //     {$set: {　　　　　　　　　<- {$set: req.body}だとuserIdが書き換えられる可能性がある
            //         desc: req.body.desc,
            //         img: req.body.img,　<-　bodyに記述がなかった場合、undifinedで上書きされる
            //     },
            // });
            const updateData = {};
            if (req.body.desc) updateData.desc = req.body.desc;
            if (req.body.img) updateData.img = req.body.img;

            await post.updateOne({ //post（1件のインスタンス）だから条件はいらない
                $set: updateData
            });

            return res.status(200).json("投稿編集に成功しました");
        }else{
            return res.status(403).json("あなたはほかの人の投稿を編集できません");
        }
    }catch(err){
        return res.status(500).json(err);
    }
});

//特定の投稿を削除する
router.delete("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            return res.status(200).json("投稿削除に成功しました");
        }else{
            return res.status(403).json("あなたはほかの人の投稿を削除できません");
        }
    }catch(err){
        return res.status(500).json(err);
    }
});

//投稿を取得する
router.get("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    }catch(err){
        return res.status(500).json(err);
    }
});

//特定の投稿にいいねを押す
router.put("/:id/like", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        //まだ投稿にいいねが押されていなかったら
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({
                $push: {
                    likes: req.body.userId,
                },
            });
            return res.status(200).json("投稿にいいねを押しました");
        //投稿にすでにいいねが押されていたら
        }else{
            //いいねしているユーザーIDを取り除く
            await post.updateOne({
                $pull: {
                    likes: req.body.userId,
                },
            });
            return res.status(403).json("投稿へのいいねを外しました");
        }
    }catch(err){
        return res.status(500).json(err);
    }
});

//タイムラインの投稿を取得
router.get("/timeline/:userId", async (req, res) => {
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        //自分がフォローしている友達の投稿内容を全て取得する
        const friendPosts  = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId});
            })
        );
        return res.status(200).json(userPosts.concat(...friendPosts)); //friendsPostは二重配列だからスプレッド構文を使う
    }catch(err){
        return res.status(500).json(err);
    }
});

//プロフィール専用のタイムライン
router.get("/profile/:username", async (req, res) => {
    try{
        const user = await User.findOne({username: req.params.username});
        const posts = await Post.find({userId: user._id});
        return res.status(200).json(posts);
    }catch(err){
        return res.status(500).json(err);
    }
});


module.exports = router;