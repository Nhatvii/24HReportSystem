using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace _24HReportSystemData.Models
{
    public partial class _24HReportSystemContext : DbContext
    {
        public _24HReportSystemContext()
        {
        }

        public _24HReportSystemContext(DbContextOptions<_24HReportSystemContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<AccountInfo> AccountInfos { get; set; }
        public virtual DbSet<Board> Boards { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<CommentBadword> CommentBadwords { get; set; }
        public virtual DbSet<Emotion> Emotions { get; set; }
        public virtual DbSet<OfficeInfo> OfficeInfos { get; set; }
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<PostSave> PostSaves { get; set; }
        public virtual DbSet<PostView> PostViews { get; set; }
        public virtual DbSet<Promotion> Promotions { get; set; }
        public virtual DbSet<PromotionHistory> PromotionHistories { get; set; }
        public virtual DbSet<Report> Reports { get; set; }
        public virtual DbSet<ReportDetail> ReportDetails { get; set; }
        public virtual DbSet<ReportTask> ReportTasks { get; set; }
        public virtual DbSet<ReportView> ReportViews { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<RootCategory> RootCategories { get; set; }
        public virtual DbSet<Task> Tasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("Account");

                entity.Property(e => e.AccountId)
                    .HasMaxLength(50)
                    .HasColumnName("Account_ID");

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(10)
                    .HasColumnName("Phone_Number")
                    .IsFixedLength(true);

                entity.Property(e => e.RoleId).HasColumnName("Role_ID");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Account_Role");
            });

            modelBuilder.Entity<AccountInfo>(entity =>
            {
                entity.HasKey(e => e.AccountId);

                entity.ToTable("Account_Info");

                entity.Property(e => e.AccountId)
                    .HasMaxLength(50)
                    .HasColumnName("Account_ID");

                entity.Property(e => e.Address).HasMaxLength(200);

                entity.Property(e => e.IdentityCard)
                    .HasMaxLength(12)
                    .HasColumnName("Identity_Card")
                    .IsFixedLength(true);

                entity.Property(e => e.IsAuthen).HasColumnName("Is_Authen");

                entity.Property(e => e.OfficeId)
                    .HasMaxLength(50)
                    .HasColumnName("Office_ID");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.HasOne(d => d.Account)
                    .WithOne(p => p.AccountInfo)
                    .HasForeignKey<AccountInfo>(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Account_Info_Account");

                entity.HasOne(d => d.Office)
                    .WithMany(p => p.AccountInfos)
                    .HasForeignKey(d => d.OfficeId)
                    .HasConstraintName("FK_Account_Info_Office_Info");

                entity.HasOne(d => d.SpecializeNavigation)
                    .WithMany(p => p.AccountInfos)
                    .HasForeignKey(d => d.Specialize)
                    .HasConstraintName("FK_Account_Info_Root_Category");
            });

            modelBuilder.Entity<Board>(entity =>
            {
                entity.ToTable("Board");

                entity.Property(e => e.BoardId)
                    .HasMaxLength(50)
                    .HasColumnName("Board_ID");

                entity.Property(e => e.BoardName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Board_Name");

                entity.Property(e => e.CreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("Create_Time");

                entity.Property(e => e.IsDelete).HasColumnName("Is_Delete");

                entity.Property(e => e.ManagerId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Manager_ID");

                entity.HasOne(d => d.Manager)
                    .WithMany(p => p.Boards)
                    .HasForeignKey(d => d.ManagerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Board_Account");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.CategoryId)
                    .ValueGeneratedNever()
                    .HasColumnName("Category_ID");

                entity.Property(e => e.RootCategory).HasColumnName("Root_Category");

                entity.Property(e => e.SubCategory)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Sub_Category");

                entity.HasOne(d => d.RootCategoryNavigation)
                    .WithMany(p => p.Categories)
                    .HasForeignKey(d => d.RootCategory)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Category_Root_Category");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("Comment");

                entity.Property(e => e.CommentId)
                    .HasMaxLength(50)
                    .HasColumnName("Comment_ID");

                entity.Property(e => e.CommentTitle)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("Comment_Title");

                entity.Property(e => e.CreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("Create_Time");

                entity.Property(e => e.IsDelete).HasColumnName("Is_Delete");

                entity.Property(e => e.PostId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Post_ID");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("User_ID");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_Post");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_Account");
            });

            modelBuilder.Entity<CommentBadword>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Comment_Badword");

                entity.Property(e => e.LabelId).HasColumnName("Label_ID");

                entity.Property(e => e.Text).IsRequired();
            });

            modelBuilder.Entity<Emotion>(entity =>
            {
                entity.HasKey(e => new { e.PostId, e.UserId });

                entity.ToTable("Emotion");

                entity.Property(e => e.PostId)
                    .HasMaxLength(50)
                    .HasColumnName("Post_ID");

                entity.Property(e => e.UserId)
                    .HasMaxLength(50)
                    .HasColumnName("User_ID");

                entity.Property(e => e.EmotionStatus).HasColumnName("Emotion_Status");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Emotions)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Emotion_Post");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Emotions)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Emotion_Account");
            });

            modelBuilder.Entity<OfficeInfo>(entity =>
            {
                entity.HasKey(e => e.OfficeId);

                entity.ToTable("Office_Info");

                entity.Property(e => e.OfficeId)
                    .HasMaxLength(50)
                    .HasColumnName("Office_ID");

                entity.Property(e => e.District)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Latitude).HasColumnType("decimal(8, 6)");

                entity.Property(e => e.Longitude).HasColumnType("decimal(9, 6)");

                entity.Property(e => e.OfficeName)
                    .IsRequired()
                    .HasMaxLength(200)
                    .HasColumnName("Office_Name");

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("Phone_Number")
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("Post");

                entity.Property(e => e.PostId)
                    .HasMaxLength(50)
                    .HasColumnName("Post_ID");

                entity.Property(e => e.CategoryId).HasColumnName("Category_ID");

                entity.Property(e => e.CommentCount).HasColumnName("Comment_Count");

                entity.Property(e => e.CreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("Create_Time");

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.EditorId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Editor_ID");

                entity.Property(e => e.Image)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.IsDelete).HasColumnName("Is_Delete");

                entity.Property(e => e.LikeCount).HasColumnName("Like_Count");

                entity.Property(e => e.PublicTime)
                    .HasColumnType("datetime")
                    .HasColumnName("Public_Time");

                entity.Property(e => e.ShareCount).HasColumnName("Share_Count");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SubTitle)
                    .IsRequired()
                    .HasMaxLength(300)
                    .HasColumnName("Sub_Title");

                entity.Property(e => e.TaskId)
                    .HasMaxLength(50)
                    .HasColumnName("Task_ID");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.UpdateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("Update_Time");

                entity.Property(e => e.ViewCount).HasColumnName("View_Count");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Post_Catgory");

                entity.HasOne(d => d.Editor)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.EditorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Post_Account");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK_Post_Task");
            });

            modelBuilder.Entity<PostSave>(entity =>
            {
                entity.HasKey(e => new { e.PostId, e.UserId });

                entity.ToTable("Post_Save");

                entity.Property(e => e.PostId)
                    .HasMaxLength(50)
                    .HasColumnName("Post_ID");

                entity.Property(e => e.UserId)
                    .HasMaxLength(50)
                    .HasColumnName("User_ID");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.PostSaves)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Post_Save_Post");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.PostSaves)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Post_Save_Account");
            });

            modelBuilder.Entity<PostView>(entity =>
            {
                entity.HasKey(e => new { e.PostId, e.UserId });

                entity.ToTable("Post_View");

                entity.Property(e => e.PostId)
                    .HasMaxLength(50)
                    .HasColumnName("Post_ID");

                entity.Property(e => e.UserId)
                    .HasMaxLength(50)
                    .HasColumnName("User_ID");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.PostViews)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Post_View_Post");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.PostViews)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Post_View_Account");
            });

            modelBuilder.Entity<Promotion>(entity =>
            {
                entity.ToTable("Promotion");

                entity.Property(e => e.PromotionId)
                    .HasMaxLength(50)
                    .HasColumnName("Promotion_ID");

                entity.Property(e => e.TotalScore).HasColumnName("Total_Score");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("User_ID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Promotions)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Promotion_Account");
            });

            modelBuilder.Entity<PromotionHistory>(entity =>
            {
                entity.ToTable("Promotion_History");

                entity.Property(e => e.PromotionHistoryId)
                    .HasMaxLength(50)
                    .HasColumnName("Promotion_History_ID");

                entity.Property(e => e.CreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("Create_Time");

                entity.Property(e => e.PromotionId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Promotion_ID");

                entity.Property(e => e.ReportId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Report_ID");

                entity.HasOne(d => d.Promotion)
                    .WithMany(p => p.PromotionHistories)
                    .HasForeignKey(d => d.PromotionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Promotion_History_Promotion");

                entity.HasOne(d => d.Report)
                    .WithMany(p => p.PromotionHistories)
                    .HasForeignKey(d => d.ReportId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Promotion_History_Report");
            });

            modelBuilder.Entity<Report>(entity =>
            {
                entity.ToTable("Report");

                entity.Property(e => e.ReportId)
                    .HasMaxLength(50)
                    .HasColumnName("Report_ID");

                entity.Property(e => e.CategoryId).HasColumnName("Category_ID");

                entity.Property(e => e.CreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("Create_Time");

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.EditorId)
                    .HasMaxLength(50)
                    .HasColumnName("Editor_ID");

                entity.Property(e => e.IsAnonymous).HasColumnName("Is_Anonymous");

                entity.Property(e => e.IsDelete).HasColumnName("Is_Delete");

                entity.Property(e => e.Location)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.ReportTitle)
                    .HasMaxLength(200)
                    .HasColumnName("Report_Title");

                entity.Property(e => e.StaffId)
                    .HasMaxLength(50)
                    .HasColumnName("Staff_ID");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.TimeFraud)
                    .HasColumnType("datetime")
                    .HasColumnName("Time_Fraud");

                entity.Property(e => e.UserId)
                    .HasMaxLength(50)
                    .HasColumnName("User_ID");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Reports)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Report_Catgory");

                entity.HasOne(d => d.Editor)
                    .WithMany(p => p.ReportEditors)
                    .HasForeignKey(d => d.EditorId)
                    .HasConstraintName("FK_Report_Account5");

                entity.HasOne(d => d.Staff)
                    .WithMany(p => p.ReportStaffs)
                    .HasForeignKey(d => d.StaffId)
                    .HasConstraintName("FK_Report_Account3");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ReportUsers)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Report_Account4");
            });

            modelBuilder.Entity<ReportDetail>(entity =>
            {
                entity.ToTable("Report_Detail");

                entity.Property(e => e.ReportDetailId).HasColumnName("Report_Detail_ID");

                entity.Property(e => e.Media).IsUnicode(false);

                entity.Property(e => e.ReportId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Report_ID");

                entity.Property(e => e.Type).HasMaxLength(50);

                entity.HasOne(d => d.Report)
                    .WithMany(p => p.ReportDetails)
                    .HasForeignKey(d => d.ReportId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Report_Detail_Report");
            });

            modelBuilder.Entity<ReportTask>(entity =>
            {
                entity.HasKey(e => new { e.TaskId, e.ReportId });

                entity.ToTable("Report_Task");

                entity.Property(e => e.TaskId)
                    .HasMaxLength(50)
                    .HasColumnName("Task_ID");

                entity.Property(e => e.ReportId)
                    .HasMaxLength(50)
                    .HasColumnName("Report_ID");

                entity.Property(e => e.CreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("Create_Time");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Report)
                    .WithMany(p => p.ReportTasks)
                    .HasForeignKey(d => d.ReportId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Report_Task_Report");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.ReportTasks)
                    .HasForeignKey(d => d.TaskId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Report_Task_Task");
            });

            modelBuilder.Entity<ReportView>(entity =>
            {
                entity.HasKey(e => new { e.ReportId, e.UserId });

                entity.ToTable("Report_View");

                entity.Property(e => e.ReportId)
                    .HasMaxLength(50)
                    .HasColumnName("Report_ID");

                entity.Property(e => e.UserId)
                    .HasMaxLength(50)
                    .HasColumnName("User_ID");

                entity.HasOne(d => d.Report)
                    .WithMany(p => p.ReportViews)
                    .HasForeignKey(d => d.ReportId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Report_View_Report");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ReportViews)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Report_View_Account");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.RoleId)
                    .ValueGeneratedNever()
                    .HasColumnName("Role_ID");

                entity.Property(e => e.RoleName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Role_Name");
            });

            modelBuilder.Entity<RootCategory>(entity =>
            {
                entity.ToTable("Root_Category");

                entity.Property(e => e.RootCategoryId)
                    .ValueGeneratedNever()
                    .HasColumnName("Root_Category_ID");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Task>(entity =>
            {
                entity.ToTable("Task");

                entity.Property(e => e.TaskId)
                    .HasMaxLength(50)
                    .HasColumnName("Task_ID");

                entity.Property(e => e.BoardId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Board_ID");

                entity.Property(e => e.CreateTime)
                    .HasColumnType("datetime")
                    .HasColumnName("Create_Time");

                entity.Property(e => e.DeadLineTime)
                    .HasColumnType("datetime")
                    .HasColumnName("DeadLine_Time");

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.EditorId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("Editor_ID");

                entity.Property(e => e.IsDelete).HasColumnName("Is_Delete");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.SubTaskId)
                    .HasMaxLength(50)
                    .HasColumnName("Sub_Task_ID");

                entity.HasOne(d => d.Board)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.BoardId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Task_Board");

                entity.HasOne(d => d.Editor)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.EditorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Task_Account");

                entity.HasOne(d => d.SubTask)
                    .WithMany(p => p.InverseSubTask)
                    .HasForeignKey(d => d.SubTaskId)
                    .HasConstraintName("FK_Task_Task");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
