using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[Serializable]
public class RankItem {
    public string team;
    public int score;
    public string sign;

    public RankItem() {}

    public RankItem(string team, int score)
    {
        this.team = team;
        this.score = score;
    }
}
