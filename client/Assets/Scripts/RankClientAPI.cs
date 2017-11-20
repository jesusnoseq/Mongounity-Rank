using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using System.Text;
using Jesusnoseq.Util;


namespace Jesusnoseq.TeamRank
{
    public delegate void OnTeamRanksCompleteCallBack(RankItem[] teamRanks);

    [RequireComponent(typeof(RequestManager))]
    public class RankClientAPI : MonoBehaviour
    {
        private RequestManager requestManager;
        [SerializeField]
        private string endPointURL;
        [SerializeField]
        private string salt = "Your salt";

        private void Start()
        {
            requestManager = GetComponent<RequestManager>();
        }

        public void RequestTeamRanks(OnTeamRanksCompleteCallBack callback)
        {
            requestManager.Get(endPointURL, (result) => {
                RankItem[] ranks = JsonHelper.FromJson<RankItem>(result);
                callback(ranks);
            });
        }

        public void PostRanks(string team, int score)
        {
            RankItem rank = new RankItem(team, score);
            rank.sign = Utility.SHA256(salt + team + score, Encoding.UTF8);

            string jsonData = JsonUtility.ToJson(rank);

            requestManager.Post(endPointURL, jsonData, (result) => {
                Debug.Log("Result: "+ result);
            });
        }
    }
}