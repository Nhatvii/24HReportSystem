using _24HReportSystemData.Constants;
using _24HReportSystemData.Global;
using _24HReportSystemData.Models;
using _24HReportSystemData.Parameters;
using _24HReportSystemData.Response;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.ML;
using Microsoft.ML.Data;
using Microsoft.ML.Trainers;
using ReportSystemData.Repositories;
using ReportSystemData.Service.Base;
using ReportSystemData.ViewModel.Comment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

using Microsoft.Extensions.Configuration;
using System.IO;
using Microsoft.Data.SqlClient;

namespace ReportSystemData.Service
{
    public partial interface ICommentService : IBaseService<Comment>
    {
        List<Comment> GetAllComment(CommentParameters commentParameters);
        Comment GetCommentByID(string id);
        Task<SuccessResponse> CreateCommentAsync(CreateCommentViewModel comment);
        SuccessResponse UpdateComment(UpdateCommentViewModel comment);
        SuccessResponse DeleteComment(string id);
        string RetrainData();
    }
    public partial class CommentService : BaseService<Comment>, ICommentService
    {
        private readonly IMapper _mapper;
        private readonly IAccountService _accountService;
        public readonly int d = 256;
        public CommentService(DbContext context, IMapper mapper, ICommentRepository repository, IAccountService accountService) : base(context, repository)
        {
            _dbContext = context;
            _mapper = mapper;
            _accountService = accountService;
        }
        public List<Comment> GetAllComment(CommentParameters commentParameters)
        {
            var cmt = Get().Where(c => c.IsDelete == false).OrderByDescending(p => p.CreateTime).Include(c => c.User).ThenInclude(c => c.AccountInfo).ToList();
            if (commentParameters.PostId != null)
            {
                cmt = cmt.Where(c => c.PostId.Equals(commentParameters.PostId)).ToList();
            }
            if(commentParameters.UserId != null)
            {
                cmt = cmt.Where(c => c.UserId.Equals(commentParameters.UserId)).ToList();
            }
            return cmt;
        }
        public Comment GetCommentByID(string id)
        {
            if (!string.IsNullOrEmpty(id) || !(id.Equals("string")))
            {
                var cmt = Get().Where(r => r.CommentId.Equals(id)).Include(c => c.Post).Include(c => c.User).ThenInclude(c => c.AccountInfo).FirstOrDefault();
                return cmt;
            }
            throw new ErrorResponse("Bình luận không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public async Task<SuccessResponse> CreateCommentAsync(CreateCommentViewModel comment)
        {
            var account = _accountService.GetAccountByID(comment.UserId);
            if (account == null)
            {
                throw new ErrorResponse("Tài khoản không tồn tại!!!", (int)HttpStatusCode.NotFound);
            }
            if (comment.CommentTitle.Length > 100)
            {
                throw new ErrorResponse("Bình luận phải bé hơn 100 từ!!!", (int)HttpStatusCode.Conflict);
            }
            if (comment.CommentTitle.Length < 16)
            {
                throw new ErrorResponse("Bình luận phải lớn hơn 16 từ!!!", (int)HttpStatusCode.Conflict);
            }
            //if (CheckBadWords(comment.CommentTitle.ToLower()))
            //{
            //    throw new ErrorResponse("Vui lòng không bình luận từ ngữ phản cảm!!!", (int)HttpStatusCode.Conflict);
            //}
            //Load sample data
            var sampleData = new _24HReportSystemData.BadwordFilterMLModel.ModelInput()
            {
                Text = $@"{comment.CommentTitle}",
            };

            //Load model and predict output
            var result = _24HReportSystemData.BadwordFilterMLModel.Predict(sampleData);
            double totalScore01 = result.Score[0] + result.Score[1];

            if ( (totalScore01 < result.Score[2]) || result.Score[1] > 0.3 || result.Score[2] > 0.29)
            {
                throw new ErrorResponse("Bình luận của bạn chứa từ ngữ phản cảm hoặc mang ý nghĩa thù địch!!!", (int)HttpStatusCode.Conflict);
            }

            var checkDupl = Get().Where(p => p.CommentTitle.Equals(comment.CommentTitle) && p.UserId.Equals(comment.UserId) && p.PostId.Equals(comment.PostId)).FirstOrDefault();
            if(checkDupl != null)
            {
                throw new ErrorResponse("Bình luận trong bài viết này của bạn bị trùng!!!", (int)HttpStatusCode.Conflict);
            }
            var cmt = _mapper.Map<Comment>(comment);
            cmt.CommentId = Guid.NewGuid().ToString();
            cmt.CreateTime = DateTime.Now;
            cmt.Status = CommentConstants.STATUS_COMMENT_NEW;
            await CreateAsyn(cmt);
            return new SuccessResponse((int)HttpStatusCode.OK, cmt.CommentId);
        }

        public SuccessResponse UpdateComment(UpdateCommentViewModel comment)
        {
            var cmt = Get().Where(c => c.CommentId.Equals(comment.CommentId)).FirstOrDefault();
            if (cmt != null)
            {
                if (comment.CommentTitle.Length > 100)
                {
                    throw new ErrorResponse("Bình luận phải bé hơn 100 từ!!!", (int)HttpStatusCode.Conflict);
                }
                if (comment.CommentTitle.Length < 16)
                {
                    throw new ErrorResponse("Bình luận phải lớn hơn 16 từ!!!", (int)HttpStatusCode.Conflict);
                }
                var sampleData = new _24HReportSystemData.BadwordFilterMLModel.ModelInput()
                {
                    Text = $@"{comment.CommentTitle}",
                };

                //Load model and predict output
                var result = _24HReportSystemData.BadwordFilterMLModel.Predict(sampleData);
                //MLContext mlContext = new MLContext();
                //DatabaseLoader loader = mlContext.Data.CreateDatabaseLoader<HouseData>();
                double totalScore01 = result.Score[0] + result.Score[1];

                if ((totalScore01 < result.Score[2]) || result.Score[1] > 0.3 || result.Score[2] > 0.29)
                {
                    throw new ErrorResponse("Bình luận của bạn chứa từ ngữ phản cảm hoặc mang ý nghĩa thù địch!!!", (int)HttpStatusCode.Conflict);
                }
                cmt.CommentTitle = comment.CommentTitle;
                if (comment.Status == 1) { cmt.Status = CommentConstants.STATUS_COMMENT_NEW; }
                if (comment.Status == 2) { cmt.Status = CommentConstants.STATUS_COMMENT_PENDING; }
                if (comment.Status == 3) { cmt.Status = CommentConstants.STATUS_COMMENT_APPROVE; }
                if (comment.Status == 4) { cmt.Status = CommentConstants.STATUS_COMMENT_DENIED; }
                Update(cmt);
                return new SuccessResponse((int)HttpStatusCode.OK, "Cập nhật thành công");
            }
            throw new ErrorResponse("Bình luận không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public SuccessResponse DeleteComment(string id)
        {
            var cmt = Get().Where(r => r.CommentId.Equals(id)).FirstOrDefault();
            if (cmt != null)
            {
                cmt.IsDelete = true;
                Update(cmt);
                return new SuccessResponse((int)HttpStatusCode.OK, "Xóa thành công");
            }
            throw new ErrorResponse("Bình luận không tồn tại!!!", (int)HttpStatusCode.NotFound);
        }
        public string RetrainData()
        {
            var context = new MLContext();
            DatabaseLoader loader = context.Data.CreateDatabaseLoader<CommentBadword>();
            //string connectionString = @"Data Source=.\SQLEXPRESS;Initial Catalog=24HReportSystem;UserID=sa;Password=nhatvi1801;Integrated Security=True;Connect Timeout=30";
            string connectionString = GetDbConnection();

            string sqlCommand = "SELECT Text, Label_ID FROM Comment_Badword";

            DatabaseSource dbSource = new DatabaseSource(SqlClientFactory.Instance, connectionString, sqlCommand);
            var data = loader.Load(dbSource);
            var preview = data.Preview();
            //_24HReportSystemData.BadwordFilterMLModel.RetrainPipeline(data);

           // var loader = context.Data.CreateDatabaseLoader<CommentBadword>();

            // var connectionString = GetDbConnection();

            // var sqlCommand = "Select `Text`, Label_ID From Comment_Badword";

            // var dbSource = new DatabaseSource(SqlClientFactory.Instance, connectionString, sqlCommand);

            //var data = loader.Load(dbSource);

            // var set = context.Data.TrainTestSplit(data, testFraction: 0.2, samplingKeyColumnName: null);
            // var trainingData = set.TrainSet;
            // var testData = set.TestSet;

            // var pipeline = context.Transforms
            //    .Conversion.MapValueToKey(outputColumnName: "Label", inputColumnName: "Text")
            //    .Append(context.Transforms.Concatenate("Text", "Label_ID"))
            //    .Append(context.MulticlassClassification.Trainers.OneVersusAll(context.BinaryClassification.Trainers.AveragedPerceptron("Label", "Features", numberOfIterations: 10))
            //    .Append(context.Transforms.Conversion.MapKeyToValue("PredictedLabel")));
            // //var pipeline = context.Transforms.Concatenate("Text", "Label_ID").Append(context.Transforms.NormalizeMinMax("label"));
            // //Console.WriteLine("=============== Starting 10 fold cross validation ===============");
            // //var crossValResults = context.MulticlassClassification.CrossValidate(data: trainingData, estimator: pipeline, numberOfFolds: 10, labelColumnName: "Label");
            // //var metricsInMultipleFolds = crossValResults.Select(r => r.Metrics);
            // //var microAccuracyValues = metricsInMultipleFolds.Select(m => m.MicroAccuracy);
            // //var microAccuracyAverage = microAccuracyValues.Average();
            // //var macroAccuracyValues = metricsInMultipleFolds.Select(m => m.MacroAccuracy);
            // //var macroAccuracyAverage = macroAccuracyValues.Average();
            // //var logLossValues = metricsInMultipleFolds.Select(m => m.LogLoss);
            // //var logLossAverage = logLossValues.Average();
            // //var logLossReductionValues = metricsInMultipleFolds.Select(m => m.LogLossReduction);
            // //var logLossReductionAverage = logLossReductionValues.Average(); Console.WriteLine($"*************************************************************************************************************");

            // //Console.WriteLine($"*       Metrics Multi-class Classification model      ");
            // //Console.WriteLine($"*------------------------------------------------------------------------------------------------------------");
            // //Console.WriteLine($"*       Average MicroAccuracy:   {microAccuracyAverage:0.###} ");
            // //Console.WriteLine($"*       Average MacroAccuracy:    {macroAccuracyAverage:0.###} ");
            // //Console.WriteLine($"*       Average LogLoss:          {logLossAverage:#.###} ");
            // //Console.WriteLine($"*       Average LogLossReduction: {logLossReductionAverage:#.###} ");
            // //Console.WriteLine($"*************************************************************************************************************");
            // //Console.WriteLine($"Training process is starting. {DateTime.Now.ToLongTimeString()}");
            // var model = pipeline.Fit(trainingData);
            // //var model = context.Transforms.DropColumns("SamplingKeyColumn").Fit(trainingData);
            // Console.WriteLine($"Training process has finished. {DateTime.Now.ToLongTimeString()}");
            // var predictionEngine = context.Model.CreatePredictionEngine<CommentBadword, DiabetesMLPrediction>(model);

            // var badword = new CommentBadword()
            // {
            //     Text = "Đụ má mày",
            //     LabelId = 3
            // };

            // var prediction = predictionEngine.Predict(badword);
            // Console.WriteLine($"Diabetes? {prediction.Text} | Prediction: {(Convert.ToBoolean(prediction.Prediction) ? "Yes" : "No")} | Probability: {prediction.Probability} ");
            // Console.WriteLine("Saving the model");
            // context.Model.Save(model, trainingData.Schema, "MLModel.zip");
            // return ($"Diabetes? {prediction.Text} | Prediction: {(Convert.ToBoolean(prediction.Prediction) ? "Yes" : "No")} | Probability: {prediction.Probability} ");
            return "";
        }
        public class DiabetesMLPrediction : CommentBadword
        {
            [ColumnName("PredictedLabel")]
            public float Prediction { get; set; }

            public float Probability { get; set; }

            public float[] Score { get; set; }
        }
        private string GetDbConnection()
        {
            var builder = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            return builder.Build().GetConnectionString("ReportSystemConnection");
        }
        //public bool CheckBadWords(string input)
        //{
        //    ReadCSV readCsv = new ReadCSV();
        //    readCsv.Url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQse0qvsvPJaksx8w6h9GOBxEr8eMxluSLZafiLvHdeSGf5vNrjI1gZMjlvWDE0de0VFa8BsxZmov-l/pub?output=csv";
        //    List<string> words = new List<string>();
        //    string content = readCsv.CsvContent().ToString();
        //    string[] arrContent = content.Split(';');
        //    for (int i = 0; i < arrContent.Length - 1; i++)
        //    {
        //        words.Add(arrContent[i]);
        //    }
        //    int q = 101;
        //    foreach (var item in words)
        //    {
        //        int M = item.Length;
        //        int N = input.Length;
        //        int i, j;
        //        int p = 0; 
        //        int t = 0; 
        //        int h = 1;

        //        for (i = 0; i < M - 1; i++)
        //            h = (h * d) % q;

        //        for (i = 0; i < M; i++)
        //        {
        //            p = (d * p + item[i]) % q;
        //            t = (d * t + input[i]) % q;
        //        }

        //        for (i = 0; i <= N - M; i++)
        //        {

        //            if (p == t)
        //            {
        //                for (j = 0; j < M; j++)
        //                {
        //                    if (input[i + j] != item[j])
        //                        break;
        //                }

        //                // if p == t and pat[0...M-1] = txt[i, i+1, ...i+M-1] 

        //                if (j == M)
        //                {
        //                    var test = i + M;
        //                    Console.WriteLine("index " + i + " and " + test);
        //                    return true;
        //                }
        //            }

        //            if (i < N - M)
        //            {
        //                t = (d * (t - input[i] * h) + input[i + M]) % q;

        //                if (t < 0)
        //                    t = (t + q);
        //            }
        //        }
        //    }
        //    return false;
        //}
    }
}
